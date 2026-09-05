import { Tiles } from './tiles.js';
import { Danger } from './danger.js';

const PUSH_SHANTEN_CAP = 1;
const PUSH_DANGER_CAP = 6.0;

function bestOf(options, rank) {
  return options.reduce((best, option) => (rank(option) > rank(best) ? option : best));
}

function waitVolume(option, remaining) {
  return option.waits.reduce((sum, tile) => sum + Math.max(0, remaining[tile]), 0);
}

function byEfficiency(options) {
  const minShanten = Math.min(...options.map((option) => option.shanten));
  const pool = options.filter((option) => option.shanten === minShanten);
  return bestOf(pool, (option) => option.ukeire * 4 + (Tiles.isHonor(option.tile) ? 1 : 0));
}

function bySafety(options) {
  return options.reduce((best, option) => {
    if (option.danger !== best.danger) return option.danger < best.danger ? option : best;
    return option.shanten < best.shanten ? option : best;
  });
}

export const OpponentBrain = {
  decide({ hand, remaining, threats, drawn, declared, canRiichi }) {
    if (declared) return { tile: drawn, riichi: false };

    const options = hand.discardOptions(remaining);
    const tenpai = options.filter((option) => option.shanten === 0);
    if (canRiichi && tenpai.length) {
      const choice = bestOf(tenpai, (option) => waitVolume(option, remaining));
      return { tile: choice.tile, riichi: true };
    }
    if (!threats.length) return { tile: byEfficiency(options).tile, riichi: false };

    const profile = Danger.profile(threats, remaining);
    const guarded = options.map((option) => ({
      ...option,
      danger: profile.rate(option.tile)
    }));
    const minShanten = Math.min(...guarded.map((option) => option.shanten));
    const pushable = guarded.filter((option) => option.shanten === minShanten && option.danger <= PUSH_DANGER_CAP);
    if (minShanten <= PUSH_SHANTEN_CAP && pushable.length) {
      return { tile: byEfficiency(pushable).tile, riichi: false };
    }
    return { tile: bySafety(guarded).tile, riichi: false };
  }
};
