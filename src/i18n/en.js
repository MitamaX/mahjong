import { spaced } from './phrase.js';

export const en = {
  title: 'Defense Simulator',
  riichi: 'Riichi',
  restart: 'Again',
  help: {
    title: 'Help',
    name: 'betaori.app',
    tab: { basic: 'Basics', defense: 'Defense', terms: 'Terms' },
    intro: [
      'A riichi mahjong defense simulator that helps you find [[safeTile|safe tiles]] against a preemptive [[riichi]].',
      'Read the opponent discards to find the best tile to cut.'
    ],
    control: {
      title: 'Controls',
      lines: [
        'Click any tile to discard it.',
        'Tap a part of the report to see that [[turn]] review.'
      ]
    },
    flow: {
      title: 'Flow',
      lines: [
        'Defense starts from an opponent [[riichi]].',
        'Opponents play their best discards. They may chase with a [[riichi]].',
        'Survive the hand without a [[dealIn]].'
      ]
    }
  },
  close: 'Close',
  call: { ron: 'Ron', tsumo: 'Tsumo', draw: 'Draw' },
  outcome: { aborted: 'Aborted', draw: 'Draw', tsumo: 'Tsumo', ron: 'Ron', dealIn: 'Deal-in' },
  stat: { danger: 'Risk', shanten: 'Shanten', hits: 'Best', overall: 'Score', ukeire: 'Ukeire' },
  ledger: { turn: 'Turn', picked: 'Pick', best: 'Best', shanten: 'Shanten', danger: 'Risk', verdict: 'Grade' },
  compare: { best: 'Best', picked: 'Pick' },
  verdict: { best: 'Best', second: 'Close', good: 'Good', weak: 'Weak', risky: 'Risky', worst: 'Worst' },
  guard: { genbutsu: 'genbutsu', kabe: 'kabe', suji: 'suji', noSuji: 'no-suji', honor: 'honor' },
  edge: { danger: 'safer', shanten: 'shanten-keeping', ukeire: 'wider' },
  seen: (count, guard) => `${guard} with ${count} seen`,
  turnMark: (turn) => `Turn ${turn}`,
  shantenMark: (value) => `${value}-shanten`,
  score: (value) => `${value} pts`,
  note: {
    kabe: ({ choice, cites }) => [...cites, ' walls it off, so ', choice, ' is best.'],
    suji: ({ choice, cites, edge, guard }) => [choice, ` is best — ${spaced(edge)}`, ...cites, ` ${guard}.`],
    safe: ({ choice, edge, guard }) => [choice, ` is best — ${spaced(edge)}${guard}.`],
    risk: ({ choice, danger }) => [choice, ` is best at ${danger} risk.`]
  },
  glossary: {
    group: { flow: 'Play', win: 'Winning', wait: 'Waits', defense: 'Defense' },
    term: {
      turn: { name: 'Turn', text: 'One go around the table, starting from the [[oya]].' },
      oya: { name: 'Oya', text: 'The seat that scores 1.5x and keeps the seat on an [[agari]].' },
      ko: { name: 'Ko', text: 'The three seats that are not the [[oya]].' },
      dora: { name: 'Dora', text: 'Bonus tiles that raise an [[agari]]. The dora is the tile after the indicator.' },
      draw: { name: 'Draw', text: 'The wall runs out with nobody reaching an [[agari]].' },
      agari: { name: 'Agari', text: 'Completing the hand for points, either by [[tsumo]] or by [[ron]].' },
      tenpai: { name: 'Tenpai', text: 'One tile away from an [[agari]]. [[shanten]] of zero.' },
      shanten: { name: 'Shanten', text: 'How many more [[ukeire]] you need to reach [[tenpai]]. Lower is closer.' },
      ukeire: { name: 'Ukeire', text: 'The tiles that lower [[shanten]], counted by kind and copies.' },
      riichi: { name: 'Riichi', text: 'A yaku declared at [[tenpai]]. The hand is locked afterwards.' },
      tsumo: { name: 'Tsumo', text: 'An [[agari]] on a tile you drew yourself.' },
      ron: { name: 'Ron', text: 'An [[agari]] on a tile someone else discarded.' },
      dealIn: { name: 'Deal-in', text: 'Your discard gives an opponent their [[ron]].' },
      furiten: { name: 'Furiten', text: 'If a tile you discarded is a [[wait]], [[ron]] is not allowed. On a [[ryanmen]] [[wait]], having discarded 2p locks [[ron]] on both 2p and 5p.' },
      wait: { name: 'Wait', text: 'The tiles that turn a [[tenpai]] hand into an [[agari]].' },
      ryanmen: { name: 'Ryanmen', text: 'A 3-4 shape waiting on [[ukeire]] from both sides. The widest [[wait]].' },
      kanchan: { name: 'Kanchan', text: 'A 3-5 shape waiting on the tile in between.' },
      penchan: { name: 'Penchan', text: 'A 1-2 shape waiting on one end only.' },
      tanki: { name: 'Tanki', text: 'A single tile waiting to become the pair.' },
      shanpon: { name: 'Shanpon', text: 'Two pairs waiting for either one to become a triplet. One turns into the set, the other stays as the pair.' },
      safeTile: { name: 'Safe tile', text: 'A tile that cannot give a [[dealIn]].' },
      genbutsu: { name: 'Genbutsu', text: 'Discarded by that [[riichi]] player, or passed up for [[ron]] since the [[riichi]]. [[furiten]] keeps it from becoming a [[dealIn]]. Perfectly safe.' },
      suji: { name: 'Suji', text: 'Three away from a [[safeTile|safe tile]], 4-6 only. [[furiten]] keeps it from a [[dealIn]] on a [[ryanmen]] [[wait]]. Relatively safe.' },
      kabe: { name: 'Kabe', text: 'All four copies are visible, so every [[ryanmen]] [[wait]] using them is gone. Relatively safe.' },
      honor: { name: 'Honor', text: 'Winds and dragons. No [[ryanmen]] [[wait]] is possible, only [[shanpon]] and [[tanki]], so more copies seen means safer.' },
      noSuji: { name: 'No-suji', text: 'A tile covered by neither [[genbutsu]], [[suji]], nor [[kabe]].' }
    }
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    discardInput: 'Discard',
    tileStyle: 'Tiles',
    value: {
      discardInput: { single: 'Single', double: 'Double' },
      tileStyle: { classic: 'Classic', simple: 'Simple' }
    }
  }
};
