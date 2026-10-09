import { Danger, GUARD } from './danger.js';
import { Tiles } from './tiles.js';
import { PLAYER, SEATS } from './seats.js';

const NOT_DECLARED = -1;

const momentOf = (seat, index) => index * SEATS.length + seat;

class Threat {
  constructor(seat, declaredAt, entries) {
    this.seat = seat;
    this.moment = momentOf(seat, declaredAt);
    this.discards = new Set(entries.filter((entry) => this.owns(entry)).map(({ tile }) => tile));
    this.safe = new Set(entries.filter((entry) => this.passes(entry)).map(({ tile }) => tile));
  }

  owns(entry) {
    return entry.seat === this.seat;
  }

  passes(entry) {
    return this.owns(entry) || entry.moment > this.moment;
  }
}

const discardedBy = (tiles, by) => ({
  tiles,
  counted: false,
  covers: (entry) => tiles.includes(entry.tile) && by(entry)
});

const countedCopies = (tiles) => ({
  tiles,
  counted: true,
  covers: (entry) => tiles.includes(entry.tile)
});

const PROOFS = {
  [GUARD.GENBUTSU]: ({ tile, threat }) => discardedBy([tile], (entry) => threat.passes(entry)),
  [GUARD.SUJI]: ({ threat, cites }) => discardedBy(cites, (entry) => threat.owns(entry)),
  [GUARD.HONOR]: ({ tile }) => countedCopies([tile]),
  [GUARD.KABE]: ({ cites }) => countedCopies(cites)
};

export const riverTarget = ({ seat, index }) => ({ region: 'river', seat, at: index });

export class Evidence {
  constructor(position) {
    this.position = position;
    this.entries = position.seats.flatMap(({ river }, seat) =>
      river.map(({ tile }, index) => ({ seat, index, tile, moment: momentOf(seat, index) })));
    this.threats = SEATS
      .filter((seat) => seat !== PLAYER)
      .map((seat) => [seat, position.seats[seat].river.findIndex(({ turned }) => turned)])
      .filter(([, declaredAt]) => declaredAt !== NOT_DECLARED)
      .map(([seat, declaredAt]) => new Threat(seat, declaredAt, this.entries));
    this.remaining = Tiles.unseen([...position.held, ...this.entries.map(({ tile }) => tile), position.doraIndicator]);
  }

  proofsOf(discard) {
    return this.threats.flatMap((threat) => {
      const { kind, cites } = Danger.guard(discard, threat, this.remaining);
      const prove = PROOFS[kind];
      return prove ? [prove({ tile: discard, threat, cites })] : [];
    });
  }

  citesOf(discard) {
    const proofs = this.proofsOf(discard);
    const entries = new Set(proofs.flatMap((proof) => this.entries.filter(proof.covers)));
    const counted = new Set(proofs.filter((proof) => proof.counted).flatMap((proof) => proof.tiles));
    return [
      ...[...entries].map(riverTarget),
      ...[...counted].flatMap((tile) => this.offRiverCopies(tile, discard))
    ];
  }

  offRiverCopies(tile, discard) {
    const held = this.position.held.filter((each) => each === tile).slice(tile === discard ? 1 : 0);
    return [
      held.length > 0 && { region: 'hand', tiles: held },
      tile === this.position.doraIndicator && { region: 'dora', tiles: [tile] }
    ].filter(Boolean);
  }
}
