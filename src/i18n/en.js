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
      description: 'How genbutsu, honors, kabe, and suji rank tile danger in riichi mahjong defense, with a full glossary.',
      parts: [
        {
          name: 'ranking',
          title: 'Basics',
          lines: [
            'Betaori is a defense style that gives up on [[agari]] and focuses only on avoiding a [[dealIn]].',
            'Prioritize safe discards over building your hand.',
            'With one [[safeTile|safe tile]] for every [[turn]] left, you can hold out to the end.'
          ],
          groups: [
            {
              title: 'Safety',
              lines: [
                'Without a [[safeTile|safe tile]], pick the tile the fewest [[wait|waits]] can hit.',
                'Risk generally rises down the list. [[honor|Honor]] safety varies widely with how many copies are visible.'
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
              title: 'Genbutsu',
              lines: [
                'A tile the [[riichi]] player has discarded is [[genbutsu]] against that player.',
                'After the [[riichi]], any tile passed up for [[ron]] also becomes [[genbutsu]], no matter who discarded it.',
                '',
                'A [[genbutsu]] tile is safe only against its own [[riichi]] player.'
              ]
            },
            {
              title: 'Suji',
              lines: [
                'A tile three ranks away from a [[genbutsu]] tile is [[suji]]. 1-4-7, 2-5-8, and 3-6-9 form the suji lines.',
                '[[suji|Suji]] only stops [[ryanmen]]. [[tanki|Tanki]] and [[shanpon]] can still hit any [[suji]] tile. [[kanchan|Kanchan]] and [[penchan]] cannot be ruled out either.',
                '',
                'A 4, 5, or 6 is [[nakaSuji]] only when the [[suji]] on both sides are [[genbutsu]]. One side alone makes it [[kataSuji]].',
                '[[kataSuji|Kata-suji]] is far riskier than [[nakaSuji]].'
              ]
            },
            {
              title: 'Kabe',
              lines: [
                'When all four copies of a tile are visible, that tile forms a [[kabe]]. Count your hand, the discards, and the [[dora|dora indicator]] together.',
                '',
                'If 3 forms a [[kabe]], 1 and 2 cannot [[dealIn|deal into]] a [[ryanmen]]. 2 is safe from [[kanchan]] as well.',
                'If 4 forms a [[kabe]], 1 is still open to a 2-3 [[ryanmen]], so it is not safe. In short, [[kabe]] is strongest on 2, 3, 7, and 8.',
                '',
                '[[kabe|Kabe]] cannot stop [[tanki]] or [[shanpon]].'
              ]
            },
            {
              title: 'Honors',
              lines: [
                '[[honor|Honors]] have no [[ryanmen]], so only [[tanki]] and [[shanpon]] remain.',
                'Count the copies in your own hand too. With three visible, [[shanpon]] is impossible and only [[tanki]] remains.',
                '',
                'An [[honor]] with no copies visible is riskier than a [[nakaSuji]] tile. It grows riskier as the hand goes on.'
              ]
            }
          ]
        },
        {
          name: 'fold',
          title: 'Discarding',
          groups: [
            {
              title: 'Order',
              lines: [
                'Discard the safest tile first, even if it breaks a set or your [[tenpai]].',
                'Do not discard a [[suji]] tile while you still hold a [[safeTile|safe tile]]. One [[turn]] later, you may have more [[safeTile|safe tiles]].',
                '',
                'With several [[safeTile|safe tiles]], keep the ones that are also [[genbutsu]] against other players. That prepares you for a chase [[riichi]].',
                '',
                'As [[genbutsu]] piles up, tiles not yet shown safe grow riskier, because the remaining [[wait|waits]] narrow just as much.'
              ]
            },
            {
              title: 'Chase riichi',
              lines: [
                'Against two [[riichi]] players, only a tile that [[dealIn|deals into]] neither is a [[safeTile|safe tile]].',
                'After the second [[riichi]], a tile both players pass up for [[ron]] is [[genbutsu]] against both.',
                'If the first [[riichi]] player lets the second player’s declaration tile pass without a [[ron]], that tile is [[genbutsu]] against both as well.',
                '',
                '[[kabe|Kabe]] and [[honor]] counts apply to both players equally. [[suji|Suji]] is read separately for each player.',
                'A tile that is [[suji]] against both can beat one that is [[genbutsu]] against only one.'
              ]
            },
            {
              title: 'No-suji',
              lines: [
                'With no [[genbutsu]], [[honor]], [[kabe]], or [[suji]] tile left, pick from the [[noSuji]] tiles. Even then, some are less dangerous than others.',
                '',
                '1 and 9 are the least dangerous; 4, 5, and 6 are the most. The closer a tile sits to the edge, the fewer [[wait|waits]] can use it.',
                '',
                'Without an edge tile, discard the tile whose copies and neighbors are most visible. The more you see, the fewer [[wait|waits]] remain on it.',
                'More visible copies of the tile itself mean fewer [[tanki]] and [[shanpon]] waits.',
                'More visible neighbors mean fewer [[ryanmen]] and [[kanchan]] waits using it.'
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
  annotation: { safe: 'Safe', discard: 'Discard', seen: 'Seen', indicator: 'Dora indicator', declare: 'Declared' },
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
      dora: { name: 'Dora', text: 'Bonus tiles that raise the score of an [[agari]]. The dora is the tile after the dora indicator.' },
      draw: { name: 'Draw', text: 'The wall runs out with nobody reaching an [[agari]].' },
      agari: { name: 'Agari', text: 'Completing the hand for points, either by [[tsumo]] or by [[ron]].' },
      tenpai: { name: 'Tenpai', text: 'One tile away from an [[agari]]. [[shanten|Shanten]] of zero.' },
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
      safeTile: { name: 'Safe tile', text: 'A tile that cannot cause a [[dealIn]]. [[genbutsu|Genbutsu]] is the safest, followed by [[honor]], [[kabe]], and [[suji]].' },
      genbutsu: { name: 'Genbutsu', text: 'A tile a given [[riichi]] player has discarded, or has passed up for [[ron]]. [[furiten|Furiten]] keeps it from becoming a [[dealIn]]. Perfectly safe. Against two [[riichi]] players, it must be genbutsu to both.' },
      suji: { name: 'Suji', text: 'A tile three away from a [[safeTile|safe tile]] (4-6 only). [[furiten|Furiten]] keeps it from a [[dealIn]] on a [[ryanmen]] [[wait]]. Relatively safe. It does not cover [[kanchan]], [[penchan]], [[tanki]], or [[shanpon]] [[wait|waits]].' },
      nakaSuji: { name: 'Naka-suji', text: 'A 4, 5, or 6 whose [[suji]] on both sides are [[genbutsu]]. Every [[ryanmen]] [[wait]] using it is gone.' },
      kataSuji: { name: 'Kata-suji', text: 'Only one side of the [[suji]] is [[genbutsu]]. The other side of the [[ryanmen]] [[wait]] is still live, so it is riskier than [[nakaSuji]].' },
      kabe: { name: 'Kabe', text: 'All four copies of a tile are visible, so every [[ryanmen]] [[wait]] using that tile is gone. Relatively safe. Count your hand, the discards, and the [[dora|dora indicator]] together.' },
      honor: { name: 'Honor', text: 'Winds and dragons. No [[ryanmen]] [[wait]] is possible, only [[shanpon]] and [[tanki]], so the more copies seen, the safer it is. With three copies seen, [[shanpon]] is gone and only [[tanki]] remains.' },
      noSuji: { name: 'No-suji', text: 'A tile covered by none of [[genbutsu]], [[suji]], or [[kabe]]. Tiles around the [[riichi]] declaration tile are especially dangerous.' }
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
