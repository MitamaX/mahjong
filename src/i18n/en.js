import { spaced } from './phrase.js';

export const en = {
  brand: 'Betaori',
  tagline: 'Mahjong Defense Simulator',
  description: 'Practice riichi mahjong defense against a preemptive riichi. Read the discards, pick the safest tile, and survive the hand without dealing in.',
  riichi: 'Riichi',
  restart: 'Again',
  help: {
    title: 'Help',
    name: 'betaori.app',
    tab: { basic: 'Basics', defense: 'Defense', terms: 'Terms', info: 'About' },
    guide: 'See the Defense Guide for details.',
    intro: [
      'A riichi mahjong defense simulator that helps you find [[safeTile|safe tiles]] against a preemptive [[riichi]].',
      'This site does not grade push-or-fold judgment. Practice rule-based defense built to never deal in.'
    ],
    control: {
      title: 'Controls',
      lines: [
        'Click any tile to discard it.',
        'Click a part of the report to see the review for that [[turn]].'
      ]
    },
    info: { issues: 'Feedback', art: 'Tile art', license: 'License' },
    flow: {
      title: 'Flow',
      lines: [
        'Defense starts when an opponent calls [[riichi]].',
        'Opponents play their best discards. They may chase with a [[riichi]].',
        'Survive the hand without a [[dealIn]].'
      ]
    }
  },
  doc: {
    guide: {
      title: 'Defense Guide',
      nav: 'Defense Guide',
      description: 'How genbutsu, honors, kabe, and suji sort out the safe tiles in riichi mahjong defense, with a full glossary.',
      parts: [
        {
          name: 'ranking',
          title: 'Ranking',
          lines: [
            'When a preemptive [[riichi]] lands, count your [[safeTile|safe tiles]] before you protect the hand.',
            'One safe tile for every [[turn]] left is enough to survive the hand.'
          ],
          groups: [
            {
              title: 'Grades',
              lines: [
                'Work down the list from the top.',
                'Only [[genbutsu]] is absolute; everything below it is relative.'
              ],
              cases: true
            }
          ]
        },
        {
          name: 'reading',
          title: 'Reading',
          groups: [
            {
              title: 'Honors',
              lines: [
                '[[honor|Honors]] cannot form a [[ryanmen]] [[wait]], so only [[shanpon]] and [[tanki]] remain.',
                'With no copies seen, both waits are live. Past the middle of the hand that is close to a [[noSuji]].',
                'Two copies seen cuts [[shanpon]] to one shape; three copies leaves [[tanki]] alone.'
              ]
            },
            {
              title: 'Suji',
              lines: [
                '[[suji]] only covers [[ryanmen]]. [[kanchan]], [[penchan]], [[tanki]], and [[shanpon]] stay live.',
                '4, 5, and 6 need both sides to become [[nakaSuji]]. One side alone is [[kataSuji]].',
                '1-2-3 and 7-8-9 have a single [[suji]] side, so [[kataSuji]] is all they ever get.',
                'The [[suji]] of the [[riichi]] declaration tile is worse. It was drawn right before the call, so the [[wait]] may have changed on that tile.'
              ]
            },
            {
              title: 'Kabe',
              lines: [
                'Count [[kabe]] across your hand, the discards, and the [[dora|indicator]].',
                'With all four 3s gone, 1s and 2s cannot build a [[ryanmen]].',
                '[[kabe]] also covers only [[ryanmen]]. [[kanchan]] and [[tanki]] remain.'
              ]
            }
          ]
        },
        {
          name: 'fold',
          title: 'Folding',
          groups: [
            {
              title: 'Order',
              lines: [
                'Match the [[turn|turns]] left against the [[safeTile|safe tiles]] in hand first.',
                'Spend them freely and discard the safest tile you hold.',
                'Hold them back and you run out late, then draw into a [[noSuji]].'
              ]
            },
            {
              title: 'Chase riichi',
              lines: [
                'Against two [[riichi]] players, only a tile that is [[genbutsu]] to both is complete.',
                'With no overlap, look at [[honor|honors]] and [[kabe]] first.',
                '[[suji]] passes one player only; to the other it is a [[noSuji]].'
              ]
            }
          ]
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      nav: 'Privacy',
      description: 'What betaori.app stores and how Google AdSense cookies are used on this site.',
      sections: [
        {
          title: 'Information we collect',
          lines: [
            'betaori.app has no accounts and does not collect personal information directly.',
            'Language, discard, and tile settings are kept only in your browser local storage and are never sent to a server.'
          ]
        },
        {
          title: 'Cookies and ads',
          lines: [
            'This site serves ads through Google AdSense.',
            'Third-party vendors, including Google, use cookies to serve ads based on your visits to this site and other sites.',
            'You can turn personalized ads off in the settings below.'
          ],
          links: ['ads', 'aboutads']
        },
        {
          title: 'Contact',
          lines: ['Questions about the site or about how data is handled are taken here.'],
          links: ['issues']
        }
      ]
    },
    home: 'Start playing',
    link: { ads: 'Google Ad Settings', aboutads: 'aboutads.info', issues: 'GitHub Issues' }
  },
  close: 'Close',
  call: { ron: 'Ron', tsumo: 'Tsumo', draw: 'Draw' },
  outcome: { aborted: 'Aborted', draw: 'Draw', tsumo: 'Tsumo', ron: 'Ron', dealIn: 'Deal-in' },
  stat: { danger: 'Risk', shanten: 'Shanten', hits: 'Best', overall: 'Score', ukeire: 'Ukeire' },
  ledger: { turn: 'Turn', picked: 'Pick', best: 'Best', shanten: 'Shanten', danger: 'Risk', verdict: 'Grade' },
  compare: { best: 'Best', picked: 'Pick' },
  verdict: { best: 'Best', second: 'Second', good: 'Good', weak: 'Weak', risky: 'Risky', worst: 'Worst' },
  guard: { genbutsu: 'genbutsu', kabe: 'kabe', suji: 'suji', noSuji: 'no-suji', honor: 'honor' },
  annotation: { safe: 'Safe', discard: 'Discard', seen: 'Seen', indicator: 'Indicator', declare: 'Declared' },
  edge: { danger: 'safer', shanten: 'shanten-keeping', ukeire: 'wider-ukeire' },
  seen: (count, guard) => `${count}-seen ${guard}`,
  turnMark: (turn) => `Turn ${turn}`,
  shantenMark: (value) => `${value}-shanten`,
  score: (value) => `${value} pts`,
  note: {
    kabe: ({ choice, cites }) => [...cites, ' is a wall, so ', choice, ' is best.'],
    suji: ({ choice, cites, edge, guard }) => [choice, ` is best — a ${spaced(edge)}${guard} off `, ...cites, '.'],
    safe: ({ choice, edge, guard }) => [choice, ` is best — a ${spaced(edge)}${guard}.`],
    risk: ({ choice, danger }) => [choice, ` is best — ${danger} risk.`]
  },
  glossary: {
    group: { flow: 'Play', win: 'Winning', wait: 'Waits', defense: 'Defense' },
    term: {
      turn: { name: 'Turn', text: 'One go around the table, starting from the [[oya]].' },
      oya: { name: 'Oya', text: 'The seat that scores 1.5x and keeps the deal on an [[agari]].' },
      ko: { name: 'Ko', text: 'The three seats that are not the [[oya]].' },
      dora: { name: 'Dora', text: 'Bonus tiles that raise the score of an [[agari]]. The dora is the tile after the indicator.' },
      draw: { name: 'Draw', text: 'The wall runs out with nobody reaching an [[agari]].' },
      agari: { name: 'Agari', text: 'Completing the hand for points, either by [[tsumo]] or by [[ron]].' },
      tenpai: { name: 'Tenpai', text: 'One tile away from an [[agari]]. [[shanten]] of zero.' },
      shanten: { name: 'Shanten', text: 'How many more [[ukeire]] you need to reach [[tenpai]]. Lower is closer.' },
      ukeire: { name: 'Ukeire', text: 'The tiles that lower [[shanten]], counted by kind and copies.' },
      riichi: { name: 'Riichi', text: 'A yaku declared at [[tenpai]]. The hand is locked afterwards.' },
      tsumo: { name: 'Tsumo', text: 'An [[agari]] on a tile you drew yourself.' },
      ron: { name: 'Ron', text: 'An [[agari]] on a tile someone else discarded.' },
      dealIn: { name: 'Deal-in', text: 'Your discard gives an opponent their [[ron]].' },
      furiten: { name: 'Furiten', text: 'If a tile you discarded is a [[wait]], [[ron]] is not allowed. On a [[ryanmen]] [[wait]], if you already discarded 2p, [[ron]] is blocked on both 2p and 5p.' },
      wait: { name: 'Wait', text: 'The tiles that turn a [[tenpai]] hand into an [[agari]].' },
      ryanmen: { name: 'Ryanmen', text: 'A 3-4 shape waiting on [[ukeire]] from both sides. The widest [[wait]].' },
      kanchan: { name: 'Kanchan', text: 'A 3-5 shape waiting on the tile in between.' },
      penchan: { name: 'Penchan', text: 'A 1-2 shape waiting on one end only.' },
      tanki: { name: 'Tanki', text: 'A single tile waiting to become the pair.' },
      shanpon: { name: 'Shanpon', text: 'Two pairs waiting for either one to become a triplet. One turns into the triplet, the other stays as the pair.' },
      safeTile: { name: 'Safe tile', text: 'A tile that cannot cause a [[dealIn]]. [[genbutsu]] is the safest, followed by [[honor]], [[kabe]], and [[suji]].' },
      genbutsu: { name: 'Genbutsu', text: 'A tile a given [[riichi]] player has discarded, or has passed up for [[ron]]. [[furiten]] keeps it from becoming a [[dealIn]]. Perfectly safe. Against two [[riichi]] players, only a tile safe to both is complete.' },
      suji: { name: 'Suji', text: 'A tile three away from a [[safeTile|safe tile]] (4-6 only). [[furiten]] keeps it from a [[dealIn]] on a [[ryanmen]] [[wait]]. Relatively safe. It does not cover [[kanchan]], [[penchan]], [[tanki]], or [[shanpon]] [[wait|waits]].' },
      nakaSuji: { name: 'Naka-suji', text: 'A 4, 5, or 6 whose [[suji]] on both sides are [[genbutsu]]. Every [[ryanmen]] [[wait]] using it is gone.' },
      kataSuji: { name: 'Kata-suji', text: 'Only one side of the [[suji]] is [[genbutsu]]. The other side of the [[ryanmen]] [[wait]] is still live, so it is riskier than [[nakaSuji]].' },
      kabe: { name: 'Kabe', text: 'All four copies are visible, so every [[ryanmen]] [[wait]] using them is gone. Relatively safe. Count your hand, the discards, and the indicator together.' },
      honor: { name: 'Honor', text: 'Winds and dragons. No [[ryanmen]] [[wait]] is possible, only [[shanpon]] and [[tanki]], so more copies seen means safer. With three copies seen, [[shanpon]] is gone and only [[tanki]] remains.' },
      noSuji: { name: 'No-suji', text: 'A tile covered by none of [[genbutsu]], [[suji]], or [[kabe]]. Tiles around the [[riichi]] declaration are the most dangerous.' }
    }
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    discardInput: 'Discard',
    tileStyle: 'Tiles',
    value: {
      discardInput: { single: 'Single', double: 'Double' },
      tileStyle: { standard: 'Standard', simple: 'Simple', classic: 'Classic' }
    }
  }
};
