import { spaced } from './phrase.js';

export const en = {
  brand: 'Betaori',
  tagline: 'Mahjong Defense Simulator',
  description: 'Practice riichi mahjong defense against a preemptive riichi. Read the discards, pick the safest tile, and survive the hand without dealing in.',
  riichi: 'Riichi',
  restart: 'Again',
  course: {
    title: 'Riichi Mahjong Lessons',
    description: 'Riichi mahjong lessons from the basic rules to genbutsu, suji and kabe. Learn defense by discarding on a real board.',
    practice: 'Practice'
  },
  lesson: { back: 'Back', next: 'Next', correct: 'Correct', second: 'Second', wrong: 'Wrong', nextLesson: 'Next lesson', complete: 'Lesson complete', picked: 'You picked {tile}.' },
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
      title: 'Riichi Mahjong Defense Guide',
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
                'When all four copies of a tile are visible, that tile forms a [[kabe]]. Count your hand, the discards, and the [[indicator]] together.',
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
              title: 'Dangerous tiles',
              lines: [
                'With no [[genbutsu]], [[honor]], [[kabe]], or [[suji]] tile left, pick from the [[noSuji|dangerous tiles]]. Even then, some are less dangerous than others.',
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
    home: 'Lessons',
    pages: 'Site',
    link: { ads: 'Google Ad Settings', aboutads: 'aboutads.info', issues: 'GitHub Issues' }
  },
  close: 'Close',
  call: { ron: 'Ron', tsumo: 'Tsumo', draw: 'Draw' },
  outcome: { aborted: 'Aborted', draw: 'Draw', tsumo: 'Tsumo', ron: 'Ron', dealIn: 'Deal-in' },
  stat: { danger: 'Risk', shanten: 'Shanten', hits: 'Best', overall: 'Score', ukeire: 'Ukeire' },
  ledger: { turn: 'Turn', picked: 'Pick', best: 'Best', shanten: 'Shanten', danger: 'Risk', verdict: 'Grade' },
  compare: { best: 'Best', picked: 'Pick' },
  verdict: { best: 'Best', second: 'Second', good: 'Good', weak: 'Weak', risky: 'Risky', worst: 'Worst' },
  edge: { danger: 'safer', shanten: 'shanten-keeping', ukeire: 'wider-ukeire' },
  seen: (count, guard) => `${count}-seen ${guard}`,
  turnMark: (turn) => `Turn ${turn}`,
  score: (value) => `${value} pts`,
  note: {
    kabe: ({ choice, cites }) => [...cites, ' is a wall, so ', choice, ' is best.'],
    suji: ({ choice, cites, edge, guard }) => [choice, ` is best — a ${spaced(edge)}${guard} off `, ...cites, '.'],
    safe: ({ choice, edge, guard }) => [choice, ` is best — a ${spaced(edge)}${guard}.`],
    risk: ({ choice, danger }) => [choice, ` is best — ${danger} risk.`]
  },
  glossary: {
    group: { tiles: 'Tiles', flow: 'Play', melds: 'Melds and pairs', build: 'Hand building', waits: 'Waits', riichi: 'Riichi and agari', defense: 'Defense' },
    term: {
      suited: { name: 'Suited tile', text: 'A tile numbered 1 to 9. It comes in three suits: [[man]], [[pin]], and [[sou]].' },
      honor: { name: 'Honor', text: 'A tile with no number. There are four [[winds]] and three [[dragons]].' },
      man: { name: 'Man', text: 'One of the three suits of [[suited|suited tiles]]. It has nine kinds, from 1-man to 9-man.' },
      pin: { name: 'Pin', text: 'One of the three suits of [[suited|suited tiles]]. It has nine kinds, from 1-pin to 9-pin.' },
      sou: { name: 'Sou', text: 'One of the three suits of [[suited|suited tiles]]. It has nine kinds, from 1-sou to 9-sou.' },
      winds: { name: 'Winds', text: 'One of the two kinds of [[honor|honors]]. There are four: East, South, West, and North.' },
      dragons: { name: 'Dragons', text: 'One of the two kinds of [[honor|honors]]. There are three: White, Green, and Red.' },
      shimocha: { name: 'Shimocha', text: 'The player to your right.' },
      toimen: { name: 'Toimen', text: 'The player across from you.' },
      kamicha: { name: 'Kamicha', text: 'The player to your left.' },
      oya: { name: 'Oya', text: 'The seat that plays first in each hand. Its [[agari]] is worth 1.5 times the points.' },
      ko: { name: 'Ko', text: 'The three seats other than the [[oya]].' },
      hand: { name: 'Hand', text: 'The tiles a player holds. Every player starts with 13.' },
      wall: { name: 'Wall', text: 'The stack of tiles left after each player’s [[hand]] is dealt. Players draw from it one tile at a time.' },
      draw: { name: 'Draw', text: 'The end of a hand when nobody reaches an [[agari]] before the [[wall]] runs out.' },
      turn: { name: 'Turn', text: 'A unit counting one lap of the table, in which each of the four players plays once.' },
      discard: { name: 'Discard', text: 'A tile a player has thrown away and placed in front of their seat.' },
      dora: { name: 'Dora', text: 'A bonus tile that raises the score of an [[agari]]. It is the tile after the [[indicator]].' },
      indicator: { name: 'Dora indicator', text: 'A face-up tile that marks the [[dora]]. The tile after it becomes the dora.' },
      agari: { name: 'Agari', text: 'Completing your hand with four [[meld|melds]] and one [[pair]]. It is either a [[tsumo]] or a [[ron]].' },
      meld: { name: 'Meld', text: 'A set of three tiles. It is either a [[run]] or a [[triplet]].' },
      run: { name: 'Sequence', text: 'A meld of three consecutive tiles in the same suit.' },
      triplet: { name: 'Triplet', text: 'A meld of three identical tiles.' },
      pair: { name: 'Pair', text: 'Two identical tiles grouped together. A complete hand always has exactly one.' },
      tenpai: { name: 'Tenpai', text: 'The state of being one tile away from an [[agari]].' },
      build: { name: 'Hand building', text: 'The process of drawing and discarding to shape your hand toward an [[agari]].' },
      taatsu: { name: 'Taatsu', text: 'Two tiles that become a [[run]] with one more tile.' },
      toitsu: { name: 'Toitsu', text: 'A shape of two identical tiles. One more copy makes it a [[triplet]], or it can serve as the [[pair]] as it is.' },
      ukeire: { name: 'Ukeire', text: 'Tiles that bring your hand closer to an [[agari]]. Both kinds and copies are counted.' },
      shanten: { name: 'Shanten', text: 'The number of [[ukeire]] tiles still needed to reach [[tenpai]]. A hand that needs one is 1-shanten.' },
      block: { name: 'Block', text: 'A general term for a [[meld]], [[taatsu]], or [[toitsu]].' },
      fiveBlocks: { name: 'Five-block theory', text: 'A method of splitting your hand into five [[block|blocks]] for [[build]].' },
      isolated: { name: 'Isolated tile', text: 'A tile that belongs to no [[block]].' },
      menzen: { name: 'Menzen', text: 'Building your hand from your own draws, without making melds from other players’ discards.' },
      wait: { name: 'Wait', text: 'A tile that turns a [[tenpai]] hand into an [[agari]]. The shape waiting on it is also called a wait.' },
      ryanmen: { name: 'Ryanmen', text: 'A shape of two consecutive suited tiles waiting on either end.' },
      kanchan: { name: 'Kanchan', text: 'A shape of two suited tiles with a one-tile gap, waiting on the tile in between.' },
      penchan: { name: 'Penchan', text: 'A shape like 1-2 or 8-9 that is cut off at one end and waits only on the other.' },
      tanki: { name: 'Tanki', text: 'A shape of a single tile waiting on its match to form the [[pair]].' },
      shanpon: { name: 'Shanpon', text: 'A shape of two [[toitsu]] waiting on a third copy of either. The one completed becomes a [[triplet]], and the other stays as the [[pair]].' },
      riichi: { name: 'Riichi', text: 'A declaration that you are in [[tenpai]]. Once declared, the hand can no longer be changed.' },
      declare: { name: 'Declaration tile', text: 'The tile discarded to declare [[riichi]]. It is placed sideways.' },
      tsumogiri: { name: 'Tsumogiri', text: 'The act of discarding the tile you just drew.' },
      tsumo: { name: 'Tsumo', text: 'An [[agari]] on a tile you drew yourself. The other three players share the payment.' },
      ron: { name: 'Ron', text: 'An [[agari]] on a tile another player discarded.' },
      dealIn: { name: 'Deal-in', text: 'Another player’s [[ron]] on your discard. You alone pay all the points.' },
      furiten: { name: 'Furiten', text: 'The state of being unable to [[ron]] after discarding or passing up one of your own [[wait|waits]]. If you pass one up after [[riichi]], it lasts for the rest of the hand.' },
      betaori: { name: 'Betaori', text: 'A defense that gives up on [[agari]] and focuses only on avoiding a [[dealIn]].' },
      safeTile: { name: 'Safe tile', text: 'A tile that cannot [[dealIn|deal into]] any [[riichi]] player.' },
      genbutsu: { name: 'Genbutsu', text: 'A tile the [[riichi]] player has already discarded. A tile that player passes up for [[ron]] after the riichi is genbutsu too.' },
      suji: { name: 'Suji', text: 'A tile three ranks away from a [[genbutsu]] tile. 1-4-7, 2-5-8, and 3-6-9 are suji to each other.' },
      nakaSuji: { name: 'Naka-suji', text: 'A 4, 5, or 6 whose [[suji]] on both sides are [[genbutsu]].' },
      kataSuji: { name: 'Kata-suji', text: 'A 4, 5, or 6 whose [[suji]] is [[genbutsu]] on one side only.' },
      kabe: { name: 'Kabe', text: 'A tile whose four copies are all [[seen|visible]]. Every [[run]] and [[ryanmen]] using it is blocked.' },
      noSuji: { name: 'Dangerous tile', text: 'A [[suited]] that is neither [[genbutsu]] nor [[suji]] and is not blocked by a [[kabe]].' },
      seen: { name: 'Visible tile', text: 'A tile you can see face up from your seat. The discards, your hand, and the [[indicator]] all count.' },
      chase: { name: 'Chase riichi', text: 'A riichi declared while another player is already in [[riichi]].' }
    }
  },
  settings: {
    title: 'Settings',
    discardInput: 'Discard',
    tileStyle: 'Tiles',
    value: {
      discardInput: { single: 'Single', double: 'Double' },
      tileStyle: { standard: 'Standard', simple: 'Simple', classic: 'Classic' }
    }
  }
};
