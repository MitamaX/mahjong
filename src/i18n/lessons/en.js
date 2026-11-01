const NOT_TENPAI = 'You picked {tile}. Discarding it does not reach tenpai.';
const IN_MELD = 'You picked {tile}. It is part of a meld or the pair.';
const RIGHT_TILE = 'You picked {tile}. Both the number and the suit match.';
const WIDER = 'Discard one tile to reach tenpai with more waiting tiles.';
const MAKE_TENPAI = 'Discard one tile to reach tenpai.';
const DRILL_COUNT = 5;
const DRILL_IDS = Array.from({ length: DRILL_COUNT }, (unused, order) => `pick${order + 1}`);
const READING_PICKS = 3;
const everyDrill = (value, count = DRILL_COUNT) => Object.fromEntries(DRILL_IDS.slice(0, count).map((id) => [id, value]));
const GUIDED_PICKS = 2;
const guidedDrill = (guide, task) => ({ ...everyDrill(task), ...everyDrill(`${guide} ${task}`, GUIDED_PICKS) });
const eachDrill = (values) => Object.fromEntries(values.map((value, order) => [DRILL_IDS[order], value]));
const SUITED_PICKED = 'You picked {tile}, a suited tile with a number.';
const HONOR_PICKED = 'You picked {tile}, an honor with no number.';
const SEAT_NOTES = {
  right: '8-sou is shimocha’s discard.',
  across: '3-man is toimen’s discard.',
  left: 'Green is kamicha’s discard.'
};
const HONOR_LOOSE = 'You picked {tile}. An honor becomes a block only when a matching tile arrives.';
const TERMINAL_LOOSE = 'You picked {tile}. A 1 or 9 has only three kinds of ukeire.';
const EDGE_LOOSE = 'You picked {tile}. A 2 or 8 has only four kinds of ukeire.';
const WEAK_TAATSU = 'You picked {tile}. This taatsu has only 4 ukeire tiles.';
const IN_MELD_ONLY = 'You picked {tile}. It is part of a meld.';
const IN_BLOCK = 'You picked {tile}. It is part of a block.';
const LOOSE_FIRST = 'Discard one tile that is not part of the five blocks.';
const WEAKER_LOOSE = 'You picked {tile}. Another isolated tile is harder to turn into a block.';
const isolatedNotes = (loose) => ({ loose, kept: WEAKER_LOOSE, other: IN_BLOCK });
const TRIM_TO_FIVE = 'Discard one tile to bring your blocks down to five.';
const TOITSU_PICKED = 'You picked {tile}. It is a toitsu that becomes a triplet with one more copy.';
const FIRST_SHAPE_NOTES = {
  ryanmen: 'You picked {tile}. With 2-sou, it becomes a 234-sou sequence; with 5-sou, 345-sou.',
  kanchan: 'You picked {tile}. With 6-pin, it becomes a 567-pin sequence.',
  penchan: 'You picked {tile}. With 7-man, it becomes a 789-man sequence.',
  toitsu: TOITSU_PICKED,
  other: IN_MELD_ONLY
};
const SECOND_SHAPE_NOTES = {
  ryanmen: 'You picked {tile}. With 5-man, it becomes a 567-man sequence; with 8-man, 678-man.',
  kanchan: 'You picked {tile}. With 3-sou, it becomes a 234-sou sequence.',
  penchan: 'You picked {tile}. With 7-sou, it becomes a 789-sou sequence.',
  toitsu: TOITSU_PICKED,
  other: IN_MELD_ONLY
};
const TRIM_NOTES = {
  penchan: WEAK_TAATSU,
  kanchan: WEAK_TAATSU,
  ryanmen: 'You picked {tile}. This taatsu has 8 ukeire tiles.',
  toitsu: 'You picked {tile}. It is your only toitsu, so you keep it as the pair.',
  other: IN_MELD_ONLY
};

const BETAORI_NOTES = {
  genbutsu: 'You picked {tile}, a genbutsu toimen discarded.',
  loose: 'You picked {tile}. Your hand does not need it, but it is not toimen’s genbutsu.',
  tenpai: 'You picked {tile}. It keeps you in tenpai, but it is not toimen’s genbutsu.',
  other: 'You picked {tile}. It is not toimen’s genbutsu.'
};
const PASSED_NOTES = {
  before: 'You picked {tile}. It was discarded before toimen’s riichi, so it is not genbutsu.',
  other: 'You picked {tile}. It is not toimen’s genbutsu.'
};
const passedNote = (safe) => ({ ...PASSED_NOTES, safe });
const sujiNote = (suji) => ({
  suji,
  kata: 'You picked {tile}. The ryanmen on the other side of the genbutsu is still open.',
  other: 'You picked {tile}. It is not three ranks away from a genbutsu.'
});

const nakaNote = (naka) => ({
  naka,
  kata: 'You picked {tile}. It is a kata-suji, with genbutsu on one side only.',
  other: 'You picked {tile}. It is not a naka-suji.'
});
const kabeNote = (kabe) => ({
  kabe,
  beside: 'You picked {tile}. The ryanmen on the other side of the kabe is still open.',
  other: 'You picked {tile}. It is not blocked by a kabe.'
});
const SAFETY_NOTES = {
  genbutsu: 'You picked {tile}, toimen’s genbutsu.',
  honor: 'You picked {tile}, an honor with several copies visible.',
  kabe: 'You picked {tile}. Thanks to a kabe, it cannot deal into a ryanmen.',
  naka: 'You picked {tile}, a naka-suji with genbutsu on both sides.',
  suji: 'You picked {tile}, a suji three ranks away from a genbutsu.',
  kata: 'You picked {tile}. It is a kata-suji, with genbutsu on one side only.'
};
const OUTRANKED = {
  second: 'Look for an even safer tile.',
  wrong: 'There is a much safer tile.'
};
const CHASE_NOTES = {
  across: 'You picked {tile}. It is genbutsu against toimen only.',
  left: 'You picked {tile}. It is genbutsu against kamicha only.',
  other: 'You picked {tile}. It is genbutsu against neither player.'
};
const chaseNote = (both) => ({ ...CHASE_NOTES, both });
const READING_WAITS = ['6-pin and 9-pin with a 78-pin ryanmen', '5-sou with a 46-sou kanchan', '3-sou with a 12-sou penchan', '2-pin and 7-sou with a shanpon', '4-man with a tanki'];
const readingNote = (wait) => ({
  safe: `The tile you picked is not toimen’s wait. Toimen is waiting on ${wait}.`,
  dealIn: `The tile you picked is toimen’s wait. Toimen is waiting on ${wait}.`
});
const countedNote = (seen) => ({ seen, other: 'You picked {tile}. Another option has more tiles visible.' });

export const en = {
  units: {
    tiles: 'Tiles',
    flow: 'Play',
    melds: 'Melds and pairs',
    build: 'Hand building',
    waits: 'Waits',
    riichi: 'Riichi and agari',
    basicDefense: 'Basic defense',
    intermediateDefense: 'Intermediate defense',
    advancedDefense: 'Advanced defense'
  },
  labels: {
    copies: '×4'
  },
  suits: { man: '-man', pin: '-pin', sou: '-sou' },
  honors: ['East', 'South', 'West', 'North', 'White', 'Green', 'Red'],
  lessons: {
    count: {
      title: '136 tiles',
      summary: '34 kinds, 4 copies each',
      beats: {
        count: 'Riichi mahjong is played with 136 tiles.',
        kinds: 'There are 34 kinds of tiles in all.',
        copies: 'Each kind has 4 identical copies.',
        total: '34 kinds with 4 copies each makes 136 tiles.',
        pick: 'Four identical tiles are on the board. Try picking one of them.'
      },
      notes: {
        pick: {
          four: 'You found the four identical tiles.',
          other: 'You picked {tile}. There is only one of it.'
        }
      }
    },
    families: {
      title: 'Suited tiles and honors',
      summary: 'Tiles with and without numbers',
      beats: {
        families: 'Tiles fall broadly into two groups: [[suited|suited tiles]] and [[honor|honors]].',
        suited: 'Suited tiles are numbered from 1 to 9.',
        suits: 'There are three suits: [[man]], [[pin]], and [[sou]]. Each runs from 1 to 9.',
        honor: 'Honors have no numbers.',
        honors: 'Honors come in four [[winds]] and three [[dragons]].',
        total: '27 kinds of suited tiles and 7 kinds of honors make 34 kinds.',
        pick1: 'Try picking a suited tile.',
        pick2: 'This time, try picking an honor.'
      },
      notes: {
        pick1: { suited: SUITED_PICKED, other: HONOR_PICKED },
        pick2: { honor: HONOR_PICKED, other: SUITED_PICKED }
      }
    },
    man: {
      title: 'Man',
      summary: '1-man to 9-man',
      beats: {
        names: '[[man|Man]] is one suit of [[suited|suited tiles]]. It has nine kinds, from 1-man to 9-man.',
        read: 'Add “man” after the number: 1-man, 2-man, and so on.',
        copies: 'With 4 copies of each kind, there are 36 man tiles in all.',
        pick1: 'Try picking 3-man.',
        pick2: 'Try picking 7-man.',
        pick3: 'Try picking 6-man.'
      },
      notes: everyDrill({ right: RIGHT_TILE }, READING_PICKS)
    },
    pin: {
      title: 'Pin',
      summary: '1-pin to 9-pin',
      beats: {
        names: '[[pin|Pin]] is one suit of [[suited|suited tiles]]. It has nine kinds, from 1-pin to 9-pin.',
        read: 'Add “pin” after the number: 1-pin, 2-pin, and so on.',
        copies: 'With 4 copies of each kind, there are 36 pin tiles in all.',
        pick1: 'Try picking 3-pin.',
        pick2: 'Try picking 8-pin.',
        pick3: 'Try picking 5-pin.'
      },
      notes: everyDrill({ right: RIGHT_TILE }, READING_PICKS)
    },
    sou: {
      title: 'Sou',
      summary: '1-sou to 9-sou',
      beats: {
        names: '[[sou|Sou]] is one suit of [[suited|suited tiles]]. It has nine kinds, from 1-sou to 9-sou.',
        read: 'Add “sou” after the number: 1-sou, 2-sou, and so on.',
        copies: 'With 4 copies of each kind, there are 36 sou tiles in all.',
        pick1: 'Try picking 1-sou.',
        pick2: 'Try picking 8-sou.',
        pick3: 'Try picking 5-sou.'
      },
      notes: everyDrill({ right: RIGHT_TILE }, READING_PICKS)
    },
    suited: {
      title: 'Reading suited tiles',
      summary: 'Number and suit together',
      beats: {
        same: 'Tiles with the same number are still different tiles if the suit differs: [[man]], [[pin]], or [[sou]].',
        read: 'Read [[suited|suited tiles]] by number and suit together. 5-man, 5-pin, and 5-sou are all different tiles.',
        pick1: 'Try picking 5-pin.',
        pick2: 'Try picking 7-sou.',
        pick3: 'Try picking 9-man.'
      },
      notes: everyDrill({ right: RIGHT_TILE }, READING_PICKS)
    },
    winds: {
      title: 'Winds',
      summary: 'East, South, West, North',
      beats: {
        names: '[[winds|Winds]] are one kind of [[honor|honors]]. There are four: East, South, West, and North.',
        read: 'Memorize them in order: East, South, West, North.',
        copies: 'With 4 copies of each kind, there are 16 wind tiles in all.',
        pick1: 'Try picking South.',
        pick2: 'Try picking North.',
        pick3: 'Try picking West.'
      },
      notes: {
        pick1: { right: 'The tile marked 南 is South.' },
        pick2: { right: 'The tile marked 北 is North.' },
        pick3: { right: 'The tile marked 西 is West.' }
      }
    },
    dragons: {
      title: 'Dragons',
      summary: 'White, Green, Red',
      beats: {
        names: '[[dragons|Dragons]] are one kind of [[honor|honors]]. There are three: White, Green, and Red.',
        read: 'Memorize them in order: White, Green, Red.',
        copies: 'With 4 copies of each kind, there are 12 dragon tiles in all.',
        pick1: 'Try picking Green.',
        pick2: 'Try picking White.',
        pick3: 'Try picking Red.'
      },
      notes: {
        pick1: { right: 'The tile marked 發 is Green.' },
        pick2: { right: 'The blank tile is White.' },
        pick3: { right: 'The tile marked 中 is Red.' }
      }
    },
    seats: {
      title: 'Seats',
      summary: 'Shimocha, toimen, kamicha',
      beats: {
        four: 'Riichi mahjong is played by four players around a table.',
        self: 'The bottom of the board is your seat.',
        right: 'The player to your right is called [[shimocha]].',
        across: 'The player across from you is called [[toimen]].',
        left: 'The player to your left is called [[kamicha]].',
        plates: 'The 東, 南, 西, and 北 in the middle of the board label each seat.',
        rivers: 'Each player places their [[discard|discards]] in front of them.',
        use: 'So you can tell who discarded a tile by where it sits.',
        pick1: 'Try picking the tile that matches shimocha’s discard.',
        pick2: 'Try picking the tile that matches toimen’s discard.',
        pick3: 'Try picking the tile that matches kamicha’s discard.'
      },
      notes: everyDrill(SEAT_NOTES, READING_PICKS)
    },
    hand: {
      title: 'Hand',
      summary: 'Your 13 tiles',
      beats: {
        hand: 'The 13 tiles at the bottom of the board are your [[hand]].',
        sorted: 'Your hand is sorted [[man]], [[pin]], [[sou]], then [[honor|honors]], lowest number first.',
        hidden: 'You see only the backs of other players’ hands, so you cannot tell what they hold.',
        start: 'All four players start with 13 tiles in hand.'
      }
    },
    wall: {
      title: 'Wall',
      summary: 'Tiles left and the draw',
      beats: {
        pile: 'The tiles left after each [[hand]] is dealt are stacked into the [[wall]].',
        wall: 'The number in the middle of the board is how many tiles can still be drawn from the wall.',
        dead: 'The wall keeps 14 tiles aside that are never drawn. That leaves 70 tiles to draw at the start.',
        shrink: 'It goes down by one each time a tile is drawn.',
        empty: 'If nobody completes a hand before the wall reaches 0, the hand ends in a [[draw]].',
        over: 'In a draw, the hand ends with no winner.'
      }
    },
    turn: {
      title: 'Your turn',
      summary: 'Draw and discard',
      beats: {
        draw: 'On your turn, you draw one tile from the [[wall]]. It sits slightly apart, to the right of your [[hand]].',
        full: 'Your hand now has 14 tiles.',
        discard: 'Then you choose one tile and discard it. It goes in front of you.',
        back: 'After discarding, your hand is back to 13 tiles.',
        next: 'Now it is [[shimocha]]’s turn.',
        order: 'Turns pass from shimocha to [[toimen]] to [[kamicha]], then back to you.',
        pick1: 'Discard one tile.',
        pick2: 'This time, discard the tile you just drew.'
      },
      notes: {
        pick1: { any: 'Your discard is placed in front of you.' },
        pick2: {
          drawn: 'You discarded the tile you just drew.',
          other: 'You picked {tile}. The tile you just drew sits apart, to the right of your hand.'
        }
      }
    },
    dora: {
      title: 'Dora',
      summary: 'The tile after the indicator',
      beats: {
        indicator: 'The face-up tile at the top left of the board is the [[indicator]].',
        next: 'The tile after the dora indicator is the [[dora]]. If 3-pin is shown, 4-pin is the dora.',
        notItself: 'The tile matching the dora indicator is not a dora.',
        bonus: 'Dora are bonus tiles that raise your score when you complete your [[hand]].',
        wrap: 'For [[suited|suited tiles]], 1 comes after 9. If 9-man is shown, 1-man is the dora.',
        winds: '[[winds|Winds]] cycle East, South, West, North. After North comes East again.',
        dragons: '[[dragons|Dragons]] cycle White, Green, Red. After Red comes White again.',
        pick1: 'Try picking the dora.',
        pick2: 'Try picking the dora.',
        pick3: 'Try picking the dora.'
      },
      notes: {
        pick1: {
          dora: '5-sou, the tile after 4-sou, is the dora.',
          indicator: '4-sou is the same tile as the dora indicator. The dora is the next tile.',
          other: 'You picked {tile}. Find the tile after 4-sou.'
        },
        pick2: {
          dora: '1 comes after 9, so 1-pin is the dora.',
          indicator: '9-pin is the same tile as the dora indicator. 1 comes after 9.',
          other: 'You picked {tile}. Find the tile after 9-pin.'
        },
        pick3: {
          dora: 'White comes after Red, so White is the dora.',
          indicator: 'Red is the same tile as the dora indicator. White comes after Red.',
          other: 'You picked {tile}. Find the tile after Red.'
        }
      }
    },
    shape: {
      title: 'Winning shape',
      summary: 'Four melds and a pair',
      beats: {
        agari: 'Completing your [[hand]] is called [[agari]]. The first player to reach agari scores points.',
        goal: 'A complete hand is made of four [[meld|melds]] and one [[pair]].',
        meld: 'A meld is a set of three tiles. Only certain shapes count as melds.',
        pair: 'A pair is two identical tiles.',
        total: 'Four melds make 12 tiles and one pair makes 2, for 14 in all.',
        hand: 'All 14 tiles in this hand split into melds and a pair. That makes it an agari.',
        kinds: 'There are two kinds of melds: [[run|sequences]] and [[triplet|triplets]].'
      }
    },
    runs: {
      title: 'Sequences',
      summary: 'Three consecutive numbers',
      beats: {
        run: 'A [[run]] is a [[meld]] of three consecutive [[suited|suited tiles]] in the same suit.',
        mixed: 'Mixing [[man]], [[pin]], and [[sou]] does not make a sequence.',
        gap: 'Skipping a number, as in 135, does not make a sequence either.',
        honorRun: '[[honor|Honors]] have no numbers, so they cannot form sequences.',
        wrap: 'Unlike with [[dora]], 9 does not connect back to 1.',
        ...everyDrill('Discard one tile not used in a sequence.')
      },
      notes: everyDrill({
        loose: 'You picked {tile}. It is not part of any sequence.',
        other: 'You picked {tile}. It is part of a sequence.'
      })
    },
    triplets: {
      title: 'Triplets',
      summary: 'Three identical tiles',
      beats: {
        triplet: 'A [[triplet]] is a [[meld]] of three identical tiles.',
        honor: '[[honor|Honors]] also make a triplet with three identical tiles.',
        broken: 'If even the number or the suit differs, it is not a triplet.',
        ...everyDrill('Discard one tile not used in a triplet.')
      },
      notes: everyDrill({
        loose: 'You picked {tile}. It is not part of any triplet.',
        other: 'You picked {tile}. It is part of a triplet.'
      })
    },
    pairs: {
      title: 'Pairs',
      summary: 'Two identical tiles',
      beats: {
        pair: 'A [[pair]] is two identical tiles. They can be [[suited|suited tiles]] or [[honor|honors]].',
        one: 'A complete [[hand]] always has exactly one pair. Even with several sets of two identical tiles, only one serves as the pair.',
        broken: 'Tiles with a different number or suit are not a pair.',
        ...everyDrill('Discard one tile without a match.')
      },
      notes: everyDrill({
        loose: 'You picked {tile}. With only one copy, it cannot be a pair.',
        other: 'You picked {tile}. With two copies, it can be a pair.'
      })
    },
    split: {
      title: 'Splitting the hand',
      summary: 'Finding melds and the pair',
      beats: {
        split: 'Splitting your [[hand]] into [[meld|melds]] and a [[pair]] shows how close it is to complete.',
        loose: 'In this hand, 9-pin fits into no group. A tile like this is best discarded.',
        ...everyDrill('Discard one tile not used in a meld or the pair.')
      },
      notes: {
        ...everyDrill({ loose: 'You picked {tile}. It is part of neither a meld nor the pair.', other: IN_MELD }),
        pick1: {
          loose: 'Without 7-pin and 8-pin in your hand, 9-pin cannot form a meld.',
          other: IN_MELD
        }
      }
    },
    tenpai: {
      title: 'Tenpai',
      summary: 'One tile away',
      beats: {
        ready: 'Being one tile away from [[agari]] is called [[tenpai]].',
        readyWait: 'Your [[hand]] now has three [[meld|melds]] and two [[toitsu]]. East or White completes it.',
        east: 'With East, the three Easts form a [[triplet]] and the two Whites become the [[pair]].',
        ...everyDrill(MAKE_TENPAI)
      },
      notes: {
        pick1: {
          tenpai: 'With 7-sou, 89-sou becomes a [[run]] for agari.',
          other: NOT_TENPAI
        },
        pick2: {
          tenpai: 'With 3-sou, 24-sou becomes a sequence for agari.',
          other: NOT_TENPAI
        },
        pick3: {
          tenpai: 'With 9-sou or East, a triplet forms for agari.',
          other: NOT_TENPAI
        },
        pick4: {
          tenpai: 'With 1-pin or 4-pin, 23-pin becomes a sequence for agari.',
          other: NOT_TENPAI
        },
        pick5: {
          tenpai: 'With 7-pin, 89-pin becomes a sequence for agari.',
          other: NOT_TENPAI
        }
      }
    },
    taatsu: {
      title: 'Taatsu',
      summary: 'A meld one tile short',
      beats: {
        taatsu: 'Two tiles that become a [[run]] with one more tile are called a [[taatsu]].',
        ryanmen: '34-pin becomes a 234-pin sequence with 2-pin, or 345-pin with 5-pin. Tiles that bring your [[hand]] closer to [[agari]] like this are called [[ukeire]].',
        kanchan: 'For two tiles one apart, like 79-pin, only the 8-pin in between is ukeire.',
        penchan: '12-sou has only 3-sou as ukeire, since there is no number below 1. 89 likewise has only 7.',
        toitsu: 'Two identical tiles are called a [[toitsu]]. One more copy makes a [[triplet]], or it can serve as the [[pair]] as it is.',
        pick1: 'Try picking a tile from the taatsu that becomes a sequence with 2-sou or 5-sou.',
        pick2: 'Try picking a tile from the taatsu that becomes a sequence with 6-pin.',
        pick3: 'Try picking a tile from the taatsu that becomes a sequence with 7-sou.',
        pick4: 'Try picking a tile from the taatsu that becomes a sequence with 5-man or 8-man.',
        pick5: 'Try picking a tile from the taatsu that becomes a sequence with 3-sou.'
      },
      notes: {
        ...everyDrill(SECOND_SHAPE_NOTES),
        pick1: FIRST_SHAPE_NOTES,
        pick2: FIRST_SHAPE_NOTES
      }
    },
    blocks: {
      title: 'Five blocks',
      summary: 'Building five blocks',
      beats: {
        five: 'An [[agari]] [[hand]] is made of four [[meld|melds]] and one [[pair]]: five groups.',
        block: 'Melds, [[taatsu]], and [[toitsu]] are called [[block|blocks]].',
        count: 'This hand has two melds, two taatsu, and one toitsu: five blocks.',
        theory: 'Shaping your hand toward agari by drawing and discarding is called [[build]]. Building by splitting your hand into five blocks is called the [[fiveBlocks]].',
        grow: 'When every taatsu becomes a meld and the toitsu stays as the pair, the hand is complete.',
        loose: 'With five blocks, tiles outside them are not used in the agari. You discard those first.',
        ...everyDrill(LOOSE_FIRST)
      },
      notes: everyDrill({ loose: 'You picked {tile}. It is not part of the five blocks.', other: IN_BLOCK })
    },
    isolated: {
      title: 'Isolated tiles',
      summary: 'Discard order',
      beats: {
        isolated: 'A tile that belongs to no [[block]] is called an [[isolated]].',
        short: 'This [[hand]] has only four blocks. You need to grow an isolated tile into a [[taatsu]] to fill out five blocks.',
        honor: 'An [[honor]] becomes a block only when a matching tile arrives to form a [[toitsu]]. It has only one kind of [[ukeire]].',
        terminal: 'A 1 or 9 has three kinds of ukeire.',
        edge: 'A 2 or 8 has four kinds.',
        middle: 'Tiles from 3 to 7 have five kinds.',
        order: 'So you discard honors first, then 1s and 9s, then 2s and 8s, and keep the middle [[suited|suited tiles]].',
        ...everyDrill('Discard the isolated tile that should go first.')
      },
      notes: {
        pick1: isolatedNotes(HONOR_LOOSE),
        pick2: isolatedNotes(TERMINAL_LOOSE),
        pick3: isolatedNotes(EDGE_LOOSE),
        pick4: isolatedNotes(HONOR_LOOSE),
        pick5: isolatedNotes(TERMINAL_LOOSE)
      }
    },
    trim: {
      title: 'Trimming blocks',
      summary: 'When you have six',
      beats: {
        six: 'This [[hand]] has six [[block|blocks]]. An [[agari]] uses five, so one is extra.',
        count: '34-pin has 8 [[ukeire]] tiles of two kinds. 79-pin and 12-sou have 4 tiles of one kind.',
        weak: 'So you discard the [[taatsu]] with fewer ukeire, bringing your blocks down to five.',
        head: 'If you have only one [[toitsu]], you keep it as the [[pair]].',
        one: 'You trim a taatsu one tile at a time. The remaining tile becomes an [[isolated]].',
        ...everyDrill(TRIM_TO_FIVE)
      },
      notes: everyDrill(TRIM_NOTES)
    },
    menzen: {
      title: 'Menzen building',
      summary: 'Draw and discard to tenpai',
      beats: {
        menzen: 'You can also take another player’s discard to make a [[meld]]. Building your [[hand]] only from your own draws, without doing that, is called [[menzen]].',
        turn: 'Each turn, draw one and discard one, turning five [[block|blocks]] into four melds and one [[pair]].',
        order: 'You choose discards starting with [[isolated|isolated tiles]]. With no isolated tiles and six blocks, you trim the [[taatsu]] with fewer [[ukeire]].',
        ...everyDrill('Discard one tile.'),
        pick5: 'Discard one tile to reach [[tenpai]].'
      },
      notes: {
        pick1: isolatedNotes(HONOR_LOOSE),
        pick2: isolatedNotes(HONOR_LOOSE),
        pick3: isolatedNotes(TERMINAL_LOOSE),
        pick4: isolatedNotes(EDGE_LOOSE),
        pick5: {
          loose: 'You are in tenpai. 6-pin or 9-pin completes 78-pin for [[agari]].',
          other: NOT_TENPAI
        }
      }
    },
    waits: {
      title: 'Waits',
      summary: 'Tiles that complete the hand',
      beats: {
        wait: 'A tile that turns a [[tenpai]] [[hand]] into an [[agari]] is called a [[wait]].',
        waitHere: 'This hand reaches agari when 2-sou or 5-sou turns 34-sou into a [[run]]. So the waits are 2-sou and 5-sou.',
        shapes: 'The waits depend on the shape of the remaining tiles. There are five wait shapes: [[ryanmen]], [[kanchan]], [[penchan]], [[tanki]], and [[shanpon]].',
        known: 'Ryanmen, kanchan, and penchan keep the shape of a [[taatsu]]. Shanpon waits with two [[toitsu]], and tanki with a single leftover tile.',
        strongest: 'Of these, ryanmen has the most waiting tiles. Let’s learn ryanmen in the next lesson.'
      }
    },
    ryanmen: {
      title: 'Ryanmen',
      summary: 'Waiting on both ends',
      beats: {
        ryanmen: 'A [[ryanmen]] is two consecutive [[suited|suited tiles]] waiting on either end. 12 and 89 lack one end, so they are not ryanmen.',
        how: '34-sou becomes a 234-sou [[run]] with 2-sou, or 345-sou with 5-sou.',
        wide: 'Its [[wait|waits]] cover two kinds, up to 8 tiles. That is the most of the five shapes.',
        compare: 'A [[kanchan]] like 35-sou waits only on 4-sou. If you can reach [[tenpai]] with either, you choose the ryanmen.',
        ...everyDrill('Discard one tile to leave a ryanmen wait.')
      },
      notes: {
        pick1: {
          ryanmen: 'A 34-sou ryanmen is left. The waits are 2-sou and 5-sou.',
          kanchan: 'Discarding 3-sou leaves a 46-sou kanchan. The only wait is 5-sou.',
          other: NOT_TENPAI
        },
        pick2: {
          ryanmen: 'A 56-man ryanmen is left. The waits are 4-man and 7-man.',
          kanchan: 'Discarding 5-man leaves a 68-man kanchan. The only wait is 7-man.',
          other: NOT_TENPAI
        },
        pick3: {
          ryanmen: 'A 67-sou ryanmen is left. The waits are 5-sou and 8-sou.',
          kanchan: 'Discarding 6-sou leaves a 79-sou kanchan. The only wait is 8-sou.',
          other: NOT_TENPAI
        },
        pick4: {
          ryanmen: 'A 45-sou ryanmen is left. The waits are 3-sou and 6-sou.',
          kanchan: 'Discarding 4-sou leaves a 57-sou kanchan. The only wait is 6-sou.',
          other: NOT_TENPAI
        },
        pick5: {
          ryanmen: 'A 23-pin ryanmen is left. The waits are 1-pin and 4-pin.',
          kanchan: 'Discarding 2-pin leaves a 35-pin kanchan. The only wait is 4-pin.',
          other: NOT_TENPAI
        }
      }
    },
    compare: {
      title: 'Comparing waits',
      summary: 'Choose more waiting tiles',
      beats: {
        two: 'Sometimes two different discards both reach [[tenpai]].',
        ryanmen: 'Discarding 3-sou leaves a 56-sou [[ryanmen]]. The [[wait|waits]] are 4-sou and 7-sou.',
        kanchan: 'Discarding 6-sou leaves a 35-sou [[kanchan]]. The only wait is 4-sou.',
        count: 'Each tile has 4 copies, so a ryanmen waits on up to 8 tiles and a kanchan on up to 4.',
        more: 'The more waiting tiles, the easier the [[agari]]. That is why ryanmen, with its many waits, is good.',
        held: 'Waits already in your [[hand]] are subtracted from the count. A [[shanpon]] waits on up to 4 tiles and a [[tanki]] on up to 3.',
        indicator: 'Waits [[seen|visible]] in the [[discard|discards]] or as the [[indicator]] are subtracted too. 7-sou is visible as the indicator, so 56-sou waits on up to 7 tiles.',
        ...everyDrill(WIDER)
      },
      notes: {
        pick1: {
          ryanmen: 'A 34-sou ryanmen is left. The waits are 2-sou and 5-sou, up to 8 tiles.',
          kanchan: 'Discarding 4-sou leaves a 13-sou kanchan. The wait is 2-sou, up to 4 tiles.',
          other: NOT_TENPAI
        },
        pick2: {
          ryanmen: 'A 56-sou ryanmen is left. The waits are 4-sou and 7-sou, up to 8 tiles.',
          shanpon: 'Discarding 5-sou leaves a shanpon on 6-sou and East. It waits on up to 4 tiles.',
          other: NOT_TENPAI
        },
        pick3: {
          kanchan: 'The two Easts become the [[pair]], leaving a 57-sou kanchan. The wait is 6-sou, up to 4 tiles.',
          tanki: 'Discarding 5-sou or 7-sou leaves a tanki. It waits on up to 3 tiles.',
          other: NOT_TENPAI
        },
        pick4: {
          ryanmen: 'A 34-man ryanmen is left. The waits are 2-man and 5-man, up to 8 tiles.',
          kanchan: 'Discarding 3-man leaves a 46-man kanchan. The wait is 5-man, up to 4 tiles.',
          other: NOT_TENPAI
        },
        pick5: {
          ryanmen: 'A 78-pin ryanmen is left. The waits are 6-pin and 9-pin, up to 8 tiles.',
          kanchan: 'Discarding 8-pin leaves a 57-pin kanchan. The wait is 6-pin, up to 4 tiles.',
          other: NOT_TENPAI
        }
      }
    },
    riichi: {
      title: 'Riichi',
      summary: 'Declaring tenpai',
      beats: {
        tenpai: 'Once you reach [[tenpai]], you can declare [[riichi]].',
        what: 'Riichi is a declaration that you are in tenpai. You can declare it only while [[menzen]]. Reaching [[agari]] after riichi raises your score.',
        declare: '[[toimen|Toimen]] has declared riichi. The riichi marker is lit on toimen’s nameplate.',
        sideways: 'The tile discarded with a riichi declaration is placed sideways, unlike other discards. This tile is called the [[declare]].'
      }
    },
    tsumogiri: {
      title: 'After riichi',
      summary: 'A locked hand',
      beats: {
        lock: 'After declaring [[riichi]], you can no longer change your [[hand]].',
        tsumogiri: 'So if a drawn tile does not give you [[agari]], you discard it as is.',
        name: 'Discarding the tile you just drew is called [[tsumogiri]].'
      }
    },
    tsumo: {
      title: 'Tsumo',
      summary: 'Agari on your own draw',
      beats: {
        tsumo: '[[tsumo|Tsumo]] is an [[agari]] on a tile you drew yourself.',
        complete: 'In riichi, you drew 5-sou for your 34-sou, completing your [[hand]].',
        pay: 'On a tsumo, the other three players share the payment.'
      }
    },
    ron: {
      title: 'Ron',
      summary: 'Agari on another’s discard',
      beats: {
        ron: '[[ron|Ron]] is an [[agari]] on a tile another player discarded.',
        example: '[[shimocha|Shimocha]] discarded 5-sou. Adding 5-sou to your 34-sou completes your [[hand]], so you can ron on 5-sou.',
        anyone: 'You can ron on a discard from anyone: [[shimocha]], [[toimen]], or [[kamicha]].',
        pay: 'On a ron, the player who discarded that tile pays all the points alone.'
      }
    },
    dealin: {
      title: 'Deal-in',
      summary: 'Ron on your discard',
      beats: {
        dealIn: 'Another player’s [[ron]] on your discard is called a [[dealIn]].',
        pay: 'When you deal in, you alone pay all the points.',
        avoid: 'So when an opponent is in [[tenpai]], you must not discard their [[wait|waits]].'
      }
    },
    reading: {
      title: 'Avoiding waits',
      summary: 'Discard a tile that is not a wait',
      beats: {
        reveal: 'Here is [[toimen]]’s [[hand]], face up.',
        waits: 'Toimen has a 23-sou [[ryanmen]] and reaches [[agari]] on 1-sou or 4-sou.',
        ...everyDrill('Find the waits in toimen’s hand and discard one tile that is not a wait.')
      },
      notes: eachDrill(READING_WAITS.map(readingNote))
    },
    furiten: {
      title: 'Furiten',
      summary: 'No ron on your own discards',
      beats: {
        furiten: 'Having already discarded one of your own [[wait|waits]] is called [[furiten]].',
        rule: 'In furiten, you cannot [[ron]]. You can reach [[agari]] only by [[tsumo]].',
        discarded: '[[toimen|Toimen]] discarded 1-sou before [[riichi]].',
        noRon: '1-sou is one of toimen’s waits. Once you discard even one of your waits, you cannot ron on your other waits either. So toimen cannot ron even on 4-sou.',
        pickFuriten: 'Discard 4-sou.'
      },
      notes: {
        pickFuriten: {
          furiten: 'Toimen is in furiten and cannot ron on 4-sou.',
          other: 'You picked {tile}. Find 4-sou.'
        }
      }
    },
    genbutsu: {
      title: 'Genbutsu',
      summary: 'Tiles the riichi player discarded',
      beats: {
        hidden: 'In a real game, you cannot see an opponent’s [[hand]].',
        visible: 'But you can see the tiles they discard.',
        genbutsu: 'You do not [[dealIn|deal into]] a [[riichi]] player with a tile they discarded, because they are in [[furiten]] on that tile and cannot [[ron]] on it.',
        name: 'A tile the riichi player has already discarded is called [[genbutsu]]. It is the safest tile.',
        pick: 'Discard one of [[toimen]]’s genbutsu.'
      },
      notes: {
        pick: {
          genbutsu: 'Toimen has already discarded this tile.',
          furiten: 'Toimen is in furiten and cannot ron on 4-sou, but it is not a genbutsu toimen discarded.',
          other: 'You picked {tile}. Toimen has not discarded it.'
        }
      }
    },
    betaori: {
      title: 'Betaori',
      summary: 'Defense over agari',
      beats: {
        riichi: '[[toimen|Toimen]] declared [[riichi]]. Your [[hand]] is not in [[tenpai]] yet.',
        betaori: 'In this case, you can give up on [[agari]] and focus only on avoiding a [[dealIn]]. This defense is called [[betaori]].',
        build: 'Thinking only of [[build]], you would discard North or 9-pin. But neither is toimen’s [[genbutsu]].',
        safe: '3-man is a genbutsu toimen discarded. In betaori, you discard 3-man even if it breaks a [[meld]].',
        turns: 'With [[safeTile|safe tiles]] for every remaining [[turn]], you can hold out to the end.',
        ...everyDrill('Discard one of toimen’s [[genbutsu]] for betaori.')
      },
      notes: everyDrill(BETAORI_NOTES)
    },
    passed: {
      title: 'Passed tiles',
      summary: 'Tiles not called after riichi',
      beats: {
        river: 'A tile a [[riichi]] player discarded is [[genbutsu]] against that player.',
        passed: 'After [[toimen]]’s riichi, [[kamicha]] discarded White. Toimen did not call [[ron]].',
        mark: 'Tiles discarded after the riichi are marked with a band.',
        furiten: 'Once a riichi player passes up a [[wait]], they stay in [[furiten]] for the rest of the hand, even without discarding it themselves. So toimen can no longer ron on White.',
        anyone: 'A tile passed up after riichi like this also becomes genbutsu, no matter who discarded it.',
        before: 'Tiles other players discarded before the riichi are not genbutsu.',
        only: 'Genbutsu is safe only against the player who declared riichi.',
        ...guidedDrill('Only tiles discarded after the riichi are marked with a band.', 'Discard one of toimen’s [[genbutsu]].')
      },
      notes: {
        pick1: passedNote('Kamicha discarded 9-pin after the riichi. Toimen did not call ron.'),
        pick2: passedNote('[[shimocha|Shimocha]] discarded 5-man after the riichi. Toimen did not call ron.'),
        pick3: passedNote('You discarded 2-sou after the riichi. Toimen did not call ron.'),
        pick4: passedNote('Shimocha discarded 1-pin after the riichi. Toimen did not call ron.'),
        pick5: passedNote('Kamicha discarded North after the riichi. Toimen did not call ron.')
      }
    },
    honor: {
      title: 'Honors',
      summary: 'Counting visible copies',
      beats: {
        none: 'If there is no [[genbutsu]], let’s look for [[honor|honors]].',
        shapes: '[[honor|Honors]] have no numbers, so they cannot form a [[ryanmen]]. They wait only as [[tanki]] or [[shanpon]].',
        count: 'So count how many copies of an honor are [[seen|visible]] in the [[discard|discards]], your [[hand]], and the [[indicator]]. Three Norths are visible.',
        three: 'With three visible, the last copy cannot form a shanpon. It can only [[dealIn|deal into]] a tanki.',
        one: 'Red is not visible apart from the one in your hand. Both tanki and shanpon remain, so it is dangerous.',
        late: 'As the hand goes on, an honor nobody has shown is more likely held by someone, so it grows more dangerous.',
        ...everyDrill('Discard the [[honor]] with the most copies visible.')
      },
      notes: everyDrill({
        three: 'You picked {tile}. With three visible, it can only deal into a [[tanki]].',
        two: 'You picked {tile}. With two visible, it can still deal into a [[shanpon]].',
        one: 'You picked {tile}. No copies are visible outside your hand.',
        other: 'You picked {tile}. It is not an honor.'
      })
    },
    suji: {
      title: 'Suji',
      summary: 'Three ranks from genbutsu',
      beats: {
        none: 'If there are no [[genbutsu]] or [[honor|honors]], let’s look for [[suji]].',
        genbutsu: '4-man is [[toimen]]’s [[genbutsu]].',
        ryanmen: 'With a 23-man [[ryanmen]], toimen waits on 1-man and 4-man; with a 56-man ryanmen, on 4-man and 7-man.',
        furiten: 'Either way, toimen has discarded 4-man, one of the [[wait|waits]], and is in [[furiten]]. Toimen cannot [[ron]] on 1-man or 7-man.',
        suji: 'So 1-man and 7-man cannot [[dealIn|deal into]] a ryanmen. A tile three ranks away from a genbutsu like this is called [[suji]].',
        lines: '147, 258, and 369 are suji to each other.',
        outer: 'For 1, 2, 3, 7, 8, and 9, a single genbutsu blocks every ryanmen.',
        middle: 'Even if 1-man is genbutsu, 4-man can still deal into a 56-man [[ryanmen]]. Do not discard 4, 5, or 6 carelessly.',
        limit: 'Suji blocks only ryanmen. You can still deal into [[kanchan]], [[penchan]], [[tanki]], or [[shanpon]] waits.',
        ...everyDrill('Discard one tile that suji keeps from dealing into a [[ryanmen]].')
      },
      notes: {
        pick1: sujiNote('7-man, three ranks from 4-man, is suji.'),
        pick2: sujiNote('8-pin, three ranks from 5-pin, is suji.'),
        pick3: sujiNote('9-sou, three ranks from 6-sou, is suji.'),
        pick4: sujiNote('2-man, three ranks from 5-man, is suji.'),
        pick5: sujiNote('1-pin, three ranks from 4-pin, is suji.')
      }
    },
    nakasuji: {
      title: 'Naka-suji',
      summary: 'Genbutsu suji on both sides',
      beats: {
        two: 'A 4, 5, or 6 is the [[wait]] of two different [[ryanmen]]. 5-man is waited on by both a 34-man ryanmen and a 67-man ryanmen.',
        sources: '[[toimen|Toimen]] has discarded both 2-man and 8-man.',
        naka: 'So both ryanmen are in [[furiten]]. A tile whose [[suji]] on both sides are [[genbutsu]] like this is called [[nakaSuji]].',
        kata: 'For 5-pin, only 2-pin is genbutsu. The 34-pin ryanmen is blocked, but the 67-pin ryanmen remains. A tile whose suji is genbutsu on one side only like this is called [[kataSuji]].',
        danger: 'A [[kataSuji]] is far more dangerous than a [[nakaSuji]]. 5-man has both ryanmen blocked, but 5-pin still has the 67-pin ryanmen.',
        lines: 'A 4 is naka-suji only when 1 and 7 are both genbutsu. A 5 needs 2 and 8, and a 6 needs 3 and 9.',
        check: 'If only one of 1 and 7 is genbutsu, the 4 is kata-suji. You need to check that both are genbutsu.',
        ...everyDrill('Discard one [[nakaSuji]] tile against toimen.')
      },
      notes: {
        pick1: nakaNote('2-man and 8-man are both genbutsu, so 5-man is naka-suji.'),
        pick2: nakaNote('3-man and 9-man are both genbutsu, so 6-man is naka-suji.'),
        pick3: nakaNote('1-pin and 7-pin are both genbutsu, so 4-pin is naka-suji.'),
        pick4: nakaNote('2-pin and 8-pin are both genbutsu, so 5-pin is naka-suji.'),
        pick5: nakaNote('3-sou and 9-sou are both genbutsu, so 6-sou is naka-suji.')
      }
    },
    kabe: {
      title: 'Kabe',
      summary: 'All four copies visible',
      beats: {
        none: 'If there are no [[genbutsu]] or [[honor|honors]], let’s look for [[kabe]] before [[suji]].',
        four: 'When all four copies of a tile are [[seen|visible]], that tile is called a [[kabe]]. Count the [[discard|discards]], your [[hand]], and the [[indicator]].',
        blocked: 'With no 3-sou left, neither a 23-sou [[ryanmen]] nor a 34-sou ryanmen is possible.',
        safe: 'So 1-sou and 2-sou cannot [[dealIn|deal into]] a ryanmen.',
        kanchan: 'For 2-sou, the 13-sou [[kanchan]] is blocked too.',
        weak: 'Even if 4 is a kabe, 1 is not safe, because the 23 [[ryanmen]] remains.',
        strong: 'That is why a kabe is powerful when it is a 2, 3, 7, or 8.',
        pairs: '[[tanki|Tanki]] and [[shanpon]] waits cannot be blocked by a kabe.',
        ...everyDrill('Discard one tile that a kabe keeps from dealing into a [[ryanmen]].')
      },
      notes: {
        pick1: kabeNote('7-pin is a kabe, so 8-pin and 9-pin cannot deal into a ryanmen.'),
        pick2: kabeNote('2-sou is a kabe, so 1-sou cannot deal into a ryanmen.'),
        pick3: kabeNote('3-man is a kabe, so 2-man cannot deal into a ryanmen.'),
        pick4: kabeNote('7-sou is a kabe, so 8-sou and 9-sou cannot deal into a ryanmen.'),
        pick5: kabeNote('8-man is a kabe, so 9-man cannot deal into a ryanmen.')
      }
    },
    safety: {
      title: 'Safety',
      summary: 'From genbutsu to dangerous tiles',
      beats: {
        fewer: 'With no [[safeTile]], you pick tiles with fewer remaining [[wait|waits]] first.',
        order: 'Danger generally rises in this order: [[genbutsu]], [[honor|honors]], [[kabe]], [[suji]], then [[noSuji|dangerous tiles]].',
        suji: 'Among suji, a [[nakaSuji]] is safer than a [[kataSuji]]. 5-man is naka-suji and 6-pin is kata-suji.',
        honor: 'An [[honor]] varies widely with how many copies are [[seen|visible]]. An honor not visible outside your [[hand]] is more dangerous than a [[nakaSuji]].',
        ...everyDrill('Discard the safest tile.')
      },
      notes: everyDrill(SAFETY_NOTES),
      outranked: OUTRANKED
    },
    order: {
      title: 'Discard order',
      summary: 'Safest first',
      beats: {
        first: 'You discard the safest tile first. 9-sou is [[toimen]]’s [[genbutsu]].',
        save: '2-man is [[suji]], but you do not discard it yet. While you still have [[genbutsu]], you discard those first.',
        later: 'One [[turn]] later, [[shimocha]] discarded 2-man. Now 2-man is genbutsu too. [[safeTile|Safe tiles]] can increase like this.',
        narrow: 'As genbutsu increase, tiles nobody has discarded yet become more dangerous, because the remaining [[wait|waits]] narrow down.',
        ...everyDrill('Discard the safest tile.')
      },
      notes: everyDrill(SAFETY_NOTES),
      outranked: OUTRANKED
    },
    chase: {
      title: 'Chase riichi',
      summary: 'Two riichi at once',
      beats: {
        two: 'After [[toimen]], [[kamicha]] also declared [[riichi]]. A riichi that follows another like this is called a [[chase]].',
        safe: 'With two riichi, only tiles that cannot [[dealIn|deal into]] either player are [[safeTile|safe tiles]].',
        one: '2-pin is toimen’s [[genbutsu]] but not kamicha’s.',
        both: 'Toimen and kamicha both discarded 8-sou. It is genbutsu against both.',
        declare: 'Toimen did not call [[ron]] on kamicha’s [[declare]], 5-pin. So 5-pin is genbutsu against both.',
        after: 'A tile neither player called after the second riichi is also genbutsu against both.',
        ...guidedDrill('Only tiles discarded after the second riichi are marked with a band.', 'Discard one [[genbutsu]] against both players.')
      },
      notes: {
        pick1: chaseNote('[[shimocha|Shimocha]] discarded 1-sou after kamicha’s riichi. Neither player called ron.'),
        pick2: chaseNote('You discarded 2-sou after kamicha’s riichi. Neither player called ron.'),
        pick3: chaseNote('Toimen and kamicha both discarded 8-pin.'),
        pick4: chaseNote('2-pin is kamicha’s declaration tile. Toimen did not call ron.'),
        pick5: chaseNote('Kamicha discarded 4-sou after riichi. Toimen did not call ron either.')
      }
    },
    shared: {
      title: 'Shared or separate',
      summary: 'Kabe and honors shared, suji separate',
      beats: {
        shared: '[[kabe|Kabe]] and [[honor]] counts apply to both players alike. With 3-sou a kabe, 2-sou cannot [[dealIn|deal into]] a [[ryanmen]] from either player. North is an honor with three copies [[seen|visible]] to both.',
        apart: '[[suji|Suji]] is judged separately for each player. 7-man is suji against [[toimen]] but not against [[kamicha]].',
        double: 'Toimen and kamicha both discarded 4-pin, so 1-pin is suji against both.',
        better: '9-sou is [[genbutsu]] against toimen only and dangerous against kamicha. A tile that is suji against both can be better than one that is genbutsu against only one.',
        ...everyDrill('Discard the safest tile against both players.')
      },
      notes: everyDrill({
        double: 'You picked {tile}, suji against both players.',
        kabe: 'You picked {tile}. A kabe applies to both players.',
        honor: 'You picked {tile}. An honor’s count applies to both players.',
        one: 'You picked {tile}. It is genbutsu against only one player, so it is dangerous against the other.',
        half: 'You picked {tile}. It is suji against only one player.'
      }),
      outranked: OUTRANKED
    },
    keep: {
      title: 'Genbutsu to keep',
      summary: 'Ready for a chase riichi',
      beats: {
        two: 'Your [[hand]] holds two kinds of [[toimen]]’s [[genbutsu]]: 9-sou and 2-pin.',
        keep: '[[shimocha|Shimocha]] has also discarded 9-sou. Even if shimocha makes a [[chase]], 9-sou is genbutsu against shimocha.',
        first: 'With several [[safeTile|safe tiles]], you keep the one that is also genbutsu against another player. So discard 2-pin first.',
        ...everyDrill('Discard one of toimen’s [[genbutsu]] to prepare for a chase riichi.')
      },
      notes: everyDrill({
        first: 'You picked {tile}. It is genbutsu against toimen only.',
        keep: 'You picked {tile}. Another player discarded it too, so it is better to keep.',
        other: 'You picked {tile}. It is not toimen’s genbutsu.'
      })
    },
    nosuji: {
      title: 'Dangerous tiles',
      summary: 'Edge tiles first',
      beats: {
        none: 'With no [[genbutsu]], [[honor|honors]], [[kabe]], or [[suji]], you choose among [[noSuji|dangerous tiles]]. Even then, some are a little less dangerous.',
        edge: '1 and 9 are the least dangerous, and 4, 5, and 6 are the most.',
        why: 'The closer to the edge, the fewer [[wait]] shapes use the tile. Only a 23-man [[ryanmen]] waits on 1-man, but 5-man is waited on by 34-man and 67-man ryanmen and a 46-man [[kanchan]]. [[tanki|Tanki]] and [[shanpon]] remain regardless of number.',
        ...everyDrill('Discard the least dangerous tile.')
      },
      notes: everyDrill({
        terminal: 'You picked {tile}. As an edge tile, it has the fewest shapes waiting on it.',
        edge: 'You picked {tile}. After 1 and 9, a 2 or 8 has the fewest shapes waiting on it.',
        side: 'You picked {tile}. A 3 or 7 has more shapes waiting on it than a 2 or 8.',
        middle: 'You picked {tile}. A 4, 5, or 6 has the most shapes waiting on it.'
      })
    },
    counted: {
      title: 'Visible tiles',
      summary: 'Where more are visible',
      beats: {
        far: 'If there are no edge tiles, you discard the side where the tile and its neighbors are more [[seen|visible]]. The more visible, the fewer [[wait|waits]] on that tile.',
        self: 'The more copies of the tile itself are visible, the fewer [[tanki]] and [[shanpon]] waits. Three 5-sou are visible.',
        near: 'The more its neighbors are visible, the fewer [[ryanmen]] and [[kanchan]] use it. Many 3-sou and 5-sou, the neighbors of 4-sou, are visible.',
        ...everyDrill('Discard the least dangerous tile.')
      },
      notes: {
        pick1: countedNote('Many 2-pin and 4-pin, the neighbors of 3-pin, are visible.'),
        pick2: countedNote('All four 4-sou, next to 3-sou, are visible, making a [[kabe]].'),
        pick3: countedNote('Three 6-man, next to 7-man, are visible.'),
        pick4: countedNote('Three 8-pin, next to 7-pin, are visible.'),
        pick5: countedNote('All four 6-sou, next to 7-sou, are visible, making a [[kabe]].')
      }
    }
  }
};
