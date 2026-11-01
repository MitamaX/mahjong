const NOT_TENPAI = '選んだ牌は{tile}です。切ってもテンパイになりません。';
const IN_MELD = '選んだ牌は{tile}です。面子か雀頭に使う牌です。';
const RIGHT_TILE = '選んだ牌は{tile}です。数字も種類も合っています。';
const WIDER = '待ち牌が多いテンパイになるように、牌を1枚切ってください。';
const MAKE_TENPAI = '牌を1枚切ってテンパイにしてください。';
const DRILL_COUNT = 5;
const DRILL_IDS = Array.from({ length: DRILL_COUNT }, (unused, order) => `pick${order + 1}`);
const READING_PICKS = 3;
const everyDrill = (value, count = DRILL_COUNT) => Object.fromEntries(DRILL_IDS.slice(0, count).map((id) => [id, value]));
const GUIDED_PICKS = 2;
const guidedDrill = (guide, task) => ({ ...everyDrill(task), ...everyDrill(`${guide}${task}`, GUIDED_PICKS) });
const eachDrill = (values) => Object.fromEntries(values.map((value, order) => [DRILL_IDS[order], value]));
const SUITED_PICKED = '選んだ牌は{tile}、数字のある数牌です。';
const HONOR_PICKED = '選んだ牌は{tile}、数字のない字牌です。';
const SEAT_NOTES = {
  right: '8索は下家が切った牌です。',
  across: '3萬は対面が切った牌です。',
  left: '發は上家が切った牌です。'
};
const HONOR_LOOSE = '選んだ牌は{tile}です。字牌は同じ牌が来ないとブロックになりません。';
const TERMINAL_LOOSE = '選んだ牌は{tile}です。1と9は受け入れが3種類しかありません。';
const EDGE_LOOSE = '選んだ牌は{tile}です。2と8は受け入れが4種類しかありません。';
const WEAK_TAATSU = '選んだ牌は{tile}です。受け入れが4枚しかないターツです。';
const IN_MELD_ONLY = '選んだ牌は{tile}です。面子に使う牌です。';
const IN_BLOCK = '選んだ牌は{tile}です。ブロックに使う牌です。';
const LOOSE_FIRST = '5つのブロックに入らない牌を1枚切ってください。';
const WEAKER_LOOSE = '選んだ牌は{tile}です。もっとブロックになりにくい孤立牌があります。';
const isolatedNotes = (loose) => ({ loose, kept: WEAKER_LOOSE, other: IN_BLOCK });
const TRIM_TO_FIVE = 'ブロックが5つになるように、牌を1枚切ってください。';
const TOITSU_PICKED = '選んだ牌は{tile}です。もう1枚来ると刻子になる対子です。';
const FIRST_SHAPE_NOTES = {
  ryanmen: '選んだ牌は{tile}です。2索が来れば234索、5索が来れば345索の順子になります。',
  kanchan: '選んだ牌は{tile}です。6筒が来れば567筒の順子になります。',
  penchan: '選んだ牌は{tile}です。7萬が来れば789萬の順子になります。',
  toitsu: TOITSU_PICKED,
  other: IN_MELD_ONLY
};
const SECOND_SHAPE_NOTES = {
  ryanmen: '選んだ牌は{tile}です。5萬が来れば567萬、8萬が来れば678萬の順子になります。',
  kanchan: '選んだ牌は{tile}です。3索が来れば234索の順子になります。',
  penchan: '選んだ牌は{tile}です。7索が来れば789索の順子になります。',
  toitsu: TOITSU_PICKED,
  other: IN_MELD_ONLY
};
const TRIM_NOTES = {
  penchan: WEAK_TAATSU,
  kanchan: WEAK_TAATSU,
  ryanmen: '選んだ牌は{tile}です。受け入れが8枚あるターツです。',
  toitsu: '選んだ牌は{tile}です。1つしかない対子なので、雀頭として残します。',
  other: IN_MELD_ONLY
};

const BETAORI_NOTES = {
  genbutsu: '選んだ牌は{tile}、対面が切った現物です。',
  loose: '選んだ牌は{tile}です。手作りには不要ですが、対面の現物ではありません。',
  tenpai: '選んだ牌は{tile}です。テンパイは保てますが、対面の現物ではありません。',
  other: '選んだ牌は{tile}です。対面の現物ではありません。'
};
const PASSED_NOTES = {
  before: '選んだ牌は{tile}です。対面がリーチする前に切られた牌なので、現物ではありません。',
  other: '選んだ牌は{tile}です。対面の現物ではありません。'
};
const passedNote = (safe) => ({ ...PASSED_NOTES, safe });
const sujiNote = (suji) => ({
  suji,
  kata: '選んだ牌は{tile}です。現物の反対側の両面が残っています。',
  other: '選んだ牌は{tile}です。現物から3つ離れた牌ではありません。'
});

const nakaNote = (naka) => ({
  naka,
  kata: '選んだ牌は{tile}です。片側の筋だけが現物の片筋です。',
  other: '選んだ牌は{tile}です。中筋ではありません。'
});
const kabeNote = (kabe) => ({
  kabe,
  beside: '選んだ牌は{tile}です。壁の反対側の両面が残っています。',
  other: '選んだ牌は{tile}です。壁でふさがれた牌ではありません。'
});
const SAFETY_NOTES = {
  genbutsu: '選んだ牌は{tile}、対面の現物です。',
  honor: '選んだ牌は{tile}、何枚も見えている字牌です。',
  kabe: '選んだ牌は{tile}です。壁のおかげで両面には放銃しません。',
  naka: '選んだ牌は{tile}、両側の筋がどちらも現物の中筋です。',
  suji: '選んだ牌は{tile}、現物から3つ離れた筋です。',
  kata: '選んだ牌は{tile}です。片側の筋だけが現物の片筋です。'
};
const OUTRANKED = {
  second: 'さらに安全な牌を探してみてください。',
  wrong: 'はるかに安全な牌があります。'
};
const CHASE_NOTES = {
  across: '選んだ牌は{tile}です。対面だけの現物です。',
  left: '選んだ牌は{tile}です。上家だけの現物です。',
  other: '選んだ牌は{tile}です。2人共通の現物ではありません。'
};
const chaseNote = (both) => ({ ...CHASE_NOTES, both });
const READING_WAITS = ['78筒の両面で6筒と9筒を', '46索のカンチャンで5索を', '12索のペンチャンで3索を', '2筒と7索のシャンポンで', '4萬の単騎で'];
const readingNote = (wait) => ({
  safe: `選んだ牌は対面の待ち牌ではありません。対面は${wait}待っています。`,
  dealIn: `選んだ牌は対面の待ち牌です。対面は${wait}待っています。`
});
const countedNote = (seen) => ({ seen, other: '選んだ牌は{tile}です。もっと多く見えている方があります。' });

export const ja = {
  units: {
    tiles: '牌',
    flow: '進行',
    melds: '面子と雀頭',
    build: '手作り',
    waits: '待ち',
    riichi: 'リーチと和了',
    basicDefense: '守備の基礎',
    intermediateDefense: '守備の中級',
    advancedDefense: '守備の上級'
  },
  labels: {
    copies: '4枚'
  },
  suits: { man: '萬', pin: '筒', sou: '索' },
  honors: ['東', '南', '西', '北', '白', '發', '中'],
  lessons: {
    count: {
      title: '牌136枚',
      summary: '34種類、4枚ずつ',
      beats: {
        count: 'リーチ麻雀は136枚の牌で遊びます。',
        kinds: '牌の種類は全部で34種類です。',
        copies: '種類ごとに同じ牌が4枚ずつあります。',
        total: '34種類が4枚ずつなので、全部で136枚です。',
        pick: '同じ牌が4枚あります。その牌を選んでみてください。'
      },
      notes: {
        pick: {
          four: '同じ牌4枚を見つけました。',
          other: '選んだ牌は{tile}です。1枚しかない牌です。'
        }
      }
    },
    families: {
      title: '数牌と字牌',
      summary: '数字のある牌とない牌',
      beats: {
        families: '牌は大きく[[suited]]と[[honor]]の2つに分かれます。',
        suited: '数牌は1から9までの数字がある牌です。',
        suits: '数牌には[[man]]・[[pin]]・[[sou]]の3種類があります。どれも1から9まであります。',
        honor: '字牌は数字のない牌です。',
        honors: '字牌には[[winds]]4種類と[[dragons]]3種類があります。',
        total: '数牌27種類と字牌7種類を合わせて34種類です。',
        pick1: '数牌を1枚選んでみてください。',
        pick2: '今度は字牌を1枚選んでみてください。'
      },
      notes: {
        pick1: { suited: SUITED_PICKED, other: HONOR_PICKED },
        pick2: { honor: HONOR_PICKED, other: SUITED_PICKED }
      }
    },
    man: {
      title: '萬子',
      summary: '1萬から9萬まで',
      beats: {
        names: '[[man]]は[[suited]]の一種です。1萬から9萬までの9種類があります。',
        read: '数字の後に萬を付けて、1萬、2萬のように呼びます。',
        copies: '種類ごとに4枚ずつ、萬子は全部で36枚です。',
        pick1: '3萬を選んでみてください。',
        pick2: '7萬を選んでみてください。',
        pick3: '6萬を選んでみてください。'
      },
      notes: everyDrill({ right: RIGHT_TILE }, READING_PICKS)
    },
    pin: {
      title: '筒子',
      summary: '1筒から9筒まで',
      beats: {
        names: '[[pin]]は[[suited]]の一種です。1筒から9筒までの9種類があります。',
        read: '数字の後に筒を付けて、1筒、2筒のように呼びます。',
        copies: '種類ごとに4枚ずつ、筒子は全部で36枚です。',
        pick1: '3筒を選んでみてください。',
        pick2: '8筒を選んでみてください。',
        pick3: '5筒を選んでみてください。'
      },
      notes: everyDrill({ right: RIGHT_TILE }, READING_PICKS)
    },
    sou: {
      title: '索子',
      summary: '1索から9索まで',
      beats: {
        names: '[[sou]]は[[suited]]の一種です。1索から9索までの9種類があります。',
        read: '数字の後に索を付けて、1索、2索のように呼びます。',
        copies: '種類ごとに4枚ずつ、索子は全部で36枚です。',
        pick1: '1索を選んでみてください。',
        pick2: '8索を選んでみてください。',
        pick3: '5索を選んでみてください。'
      },
      notes: everyDrill({ right: RIGHT_TILE }, READING_PICKS)
    },
    suited: {
      title: '数牌の見分け方',
      summary: '数字と種類を一緒に読む',
      beats: {
        same: '数字が同じでも、[[man]]・[[pin]]・[[sou]]が違えば別の牌です。',
        read: '[[suited]]は数字と種類を一緒に読みます。5萬、5筒、5索はすべて別の牌です。',
        pick1: '5筒を選んでみてください。',
        pick2: '7索を選んでみてください。',
        pick3: '9萬を選んでみてください。'
      },
      notes: everyDrill({ right: RIGHT_TILE }, READING_PICKS)
    },
    winds: {
      title: '風牌',
      summary: '東・南・西・北',
      beats: {
        names: '[[winds]]は[[honor]]の一種です。東・南・西・北の4種類があります。',
        read: '東・南・西・北の順で覚えておいてください。',
        copies: '種類ごとに4枚ずつ、風牌は全部で16枚です。',
        pick1: '南を選んでみてください。',
        pick2: '北を選んでみてください。',
        pick3: '西を選んでみてください。'
      },
      notes: {
        pick1: { right: '「南」と書かれた牌が南です。' },
        pick2: { right: '「北」と書かれた牌が北です。' },
        pick3: { right: '「西」と書かれた牌が西です。' }
      }
    },
    dragons: {
      title: '三元牌',
      summary: '白・發・中',
      beats: {
        names: '[[dragons]]は[[honor]]の一種です。白・發・中の3種類があります。',
        read: '白・發・中の順で覚えておいてください。',
        copies: '種類ごとに4枚ずつ、三元牌は全部で12枚です。',
        pick1: '發を選んでみてください。',
        pick2: '白を選んでみてください。',
        pick3: '中を選んでみてください。'
      },
      notes: {
        pick1: { right: '「發」と書かれた牌が發です。' },
        pick2: { right: '何も書かれていない牌が白です。' },
        pick3: { right: '「中」と書かれた牌が中です。' }
      }
    },
    seats: {
      title: '席',
      summary: '下家・対面・上家',
      beats: {
        four: 'リーチ麻雀は4人で卓を囲んで遊びます。',
        self: '盤面の下側が自分の席です。',
        right: '自分の右隣の人を[[shimocha]]といいます。',
        across: '自分の向かいの人を[[toimen]]といいます。',
        left: '自分の左隣の人を[[kamicha]]といいます。',
        plates: '盤面中央の東・南・西・北は、それぞれの席の名札です。',
        rivers: '各自、自分の前に[[discard]]を並べます。',
        use: 'なので、捨て牌が置かれた場所を見れば、誰が切ったか分かります。',
        pick1: '下家が切った牌と同じ牌を選んでみてください。',
        pick2: '対面が切った牌と同じ牌を選んでみてください。',
        pick3: '上家が切った牌と同じ牌を選んでみてください。'
      },
      notes: everyDrill(SEAT_NOTES, READING_PICKS)
    },
    hand: {
      title: '手牌',
      summary: '自分の牌13枚',
      beats: {
        hand: '盤面下の13枚の牌が自分の[[hand]]です。',
        sorted: '手牌は[[man]]・[[pin]]・[[sou]]・[[honor]]の順に、数字の小さい牌から並びます。',
        hidden: '他の人の手牌は裏側しか見えません。何の牌かは分かりません。',
        start: '4人とも手牌13枚から始めます。'
      }
    },
    wall: {
      title: '牌山',
      summary: '残りの牌と流局',
      beats: {
        pile: '[[hand]]として配った残りの牌を積んだものを[[wall]]といいます。',
        wall: '盤面中央の数字は、牌山からあと何枚引けるかを表します。',
        dead: '牌山のうち14枚は引かずに残しておきます。そのため、最初に引ける牌は70枚です。',
        shrink: '牌を1枚引くたびに1枚ずつ減ります。',
        empty: '牌山が0枚になるまで誰も手牌を完成できなければ[[draw]]です。',
        over: '流局になると、勝者なしでその局が終わります。'
      }
    },
    turn: {
      title: '手番',
      summary: '引いて切る',
      beats: {
        draw: '自分の手番になると、[[wall]]から牌を1枚引きます。引いた牌は[[hand]]の右側に少し離して置かれます。',
        full: 'このとき手牌は14枚です。',
        discard: '次に牌を1枚選んで切ります。切った牌は自分の前に置かれます。',
        back: '切ると、手牌はまた13枚になります。',
        next: '次は[[shimocha]]の手番です。',
        order: '手番は下家、[[toimen]]、[[kamicha]]の順に回り、また自分に戻ってきます。',
        pick1: '牌を1枚選んで切ってください。',
        pick2: '今度は、いま引いた牌を切ってください。'
      },
      notes: {
        pick1: { any: '切った牌が自分の前に置かれました。' },
        pick2: {
          drawn: 'いま引いた牌をそのまま切りました。',
          other: '選んだ牌は{tile}です。いま引いた牌は手牌の右側に離れて置かれています。'
        }
      }
    },
    dora: {
      title: 'ドラ',
      summary: 'ドラ表示牌の次の牌',
      beats: {
        indicator: '盤面左上に表向きで置かれた牌を[[indicator]]といいます。',
        next: 'ドラ表示牌の次の牌が[[dora]]です。3筒が表示されたら、4筒がドラです。',
        notItself: 'ドラ表示牌と同じ牌はドラではありません。',
        bonus: 'ドラは[[hand]]を完成させたときに点数を上げてくれるボーナス牌です。',
        wrap: '[[suited]]は9の次が1です。9萬が表示されたら、1萬がドラです。',
        winds: '[[winds]]は東・南・西・北の順に回ります。北の次はまた東です。',
        dragons: '[[dragons]]は白・發・中の順に回ります。中の次はまた白です。',
        pick1: 'ドラを選んでみてください。',
        pick2: 'ドラを選んでみてください。',
        pick3: 'ドラを選んでみてください。'
      },
      notes: {
        pick1: {
          dora: '4索の次の牌、5索がドラです。',
          indicator: '4索はドラ表示牌と同じ牌です。ドラはその次の牌です。',
          other: '選んだ牌は{tile}です。4索の次の牌を探してください。'
        },
        pick2: {
          dora: '9の次は1なので、1筒がドラです。',
          indicator: '9筒はドラ表示牌と同じ牌です。9の次は1です。',
          other: '選んだ牌は{tile}です。9筒の次の牌を探してください。'
        },
        pick3: {
          dora: '中の次は白なので、白がドラです。',
          indicator: '中はドラ表示牌と同じ牌です。中の次は白です。',
          other: '選んだ牌は{tile}です。中の次の牌を探してください。'
        }
      }
    },
    shape: {
      title: '和了の形',
      summary: '面子4つと雀頭1つ',
      beats: {
        agari: '[[hand]]を完成させることを[[agari]]といいます。先に和了した人が点数を得ます。',
        goal: '完成した手牌は[[meld]]4つと[[pair]]1つでできています。',
        meld: '面子は牌3枚で作る組み合わせです。決まった形だけが面子になります。',
        pair: '雀頭は同じ牌2枚で作る組み合わせです。',
        total: '面子4つで12枚、雀頭1つで2枚、合わせて14枚です。',
        hand: 'この手牌は14枚すべてが面子と雀頭に分かれます。なので和了です。',
        kinds: '面子には[[run]]と[[triplet]]の2種類があります。'
      }
    },
    runs: {
      title: '順子',
      summary: '連続する数字3枚',
      beats: {
        run: '[[run]]は、同じ種類の[[suited]]3枚が数字順に連なった[[meld]]です。',
        mixed: '[[man]]・[[pin]]・[[sou]]が混ざると順子ではありません。',
        gap: '135のように数字が飛んでいても順子ではありません。',
        honorRun: '[[honor]]は数字がないので、順子を作れません。',
        wrap: '[[dora]]と違って、9の次の1にはつながりません。',
        ...everyDrill('順子に使わない牌を1枚切ってください。')
      },
      notes: everyDrill({
        loose: '選んだ牌は{tile}です。どの順子にも入らない牌です。',
        other: '選んだ牌は{tile}です。順子に使う牌です。'
      })
    },
    triplets: {
      title: '刻子',
      summary: '同じ牌3枚',
      beats: {
        triplet: '[[triplet]]は同じ牌3枚で作る[[meld]]です。',
        honor: '[[honor]]も同じ牌を3枚集めれば刻子になります。',
        broken: '数字か種類が1つでも違えば刻子ではありません。',
        ...everyDrill('刻子に使わない牌を1枚切ってください。')
      },
      notes: everyDrill({
        loose: '選んだ牌は{tile}です。どの刻子にも入らない牌です。',
        other: '選んだ牌は{tile}です。刻子に使う牌です。'
      })
    },
    pairs: {
      title: '雀頭',
      summary: '同じ牌2枚',
      beats: {
        pair: '[[pair]]は同じ牌2枚です。[[suited]]でも[[honor]]でも構いません。',
        one: '完成した[[hand]]には雀頭が必ず1つあります。同じ牌2枚の組がいくつあっても、雀頭にするのは1組だけです。',
        broken: '数字か種類が違えば雀頭ではありません。',
        ...everyDrill('対になる相手がいない牌を1枚切ってください。')
      },
      notes: everyDrill({
        loose: '選んだ牌は{tile}です。同じ牌が1枚しかないので、雀頭になれません。',
        other: '選んだ牌は{tile}です。同じ牌が2枚あるので、雀頭になれます。'
      })
    },
    split: {
      title: '手牌の分解',
      summary: '面子と雀頭を探す',
      beats: {
        split: '[[hand]]を[[meld]]と[[pair]]に分けてみると、どこまで完成しているか分かります。',
        loose: 'この手牌では、9筒がどの組み合わせにも入りません。こういう牌は切ったほうがよいです。',
        ...everyDrill('面子と雀頭に使わない牌を1枚切ってください。')
      },
      notes: {
        ...everyDrill({ loose: '選んだ牌は{tile}です。面子にも雀頭にも入らない牌です。', other: IN_MELD }),
        pick1: {
          loose: '手牌に7筒と8筒がないので、9筒は面子になりません。',
          other: IN_MELD
        }
      }
    },
    tenpai: {
      title: 'テンパイ',
      summary: 'あと1枚の手牌',
      beats: {
        ready: 'あと1枚で[[agari]]できる状態を[[tenpai]]といいます。',
        readyWait: '今の[[hand]]は[[meld]]3つと[[toitsu]]2つです。東か白が来れば和了です。',
        east: '東が来れば東3枚が[[triplet]]になり、白2枚が[[pair]]になります。',
        ...everyDrill(MAKE_TENPAI)
      },
      notes: {
        pick1: {
          tenpai: '89索に7索が来れば[[run]]になって和了です。',
          other: NOT_TENPAI
        },
        pick2: {
          tenpai: '24索に3索が来れば順子になって和了です。',
          other: NOT_TENPAI
        },
        pick3: {
          tenpai: '9索か東が来れば刻子になって和了です。',
          other: NOT_TENPAI
        },
        pick4: {
          tenpai: '23筒に1筒か4筒が来れば順子になって和了です。',
          other: NOT_TENPAI
        },
        pick5: {
          tenpai: '89筒に7筒が来れば順子になって和了です。',
          other: NOT_TENPAI
        }
      }
    },
    taatsu: {
      title: 'ターツ',
      summary: '1枚足りない面子',
      beats: {
        taatsu: 'あと1枚で[[run]]になる2枚の牌を[[taatsu]]といいます。',
        ryanmen: '34筒は、2筒が来れば234筒、5筒が来れば345筒の順子になります。このように[[hand]]を[[agari]]に近づける牌を[[ukeire]]といいます。',
        kanchan: '79筒のように1つ離れた2枚は、間の8筒だけが受け入れです。',
        penchan: '12索の受け入れは3索だけです。1の前には数字がないからです。89も受け入れは7だけです。',
        toitsu: '同じ牌2枚は[[toitsu]]といいます。もう1枚来れば[[triplet]]になり、そのまま[[pair]]としても使えます。',
        pick1: '2索か5索が来れば順子になるターツの牌を1枚選んでみてください。',
        pick2: '6筒が来れば順子になるターツの牌を1枚選んでみてください。',
        pick3: '7索が来れば順子になるターツの牌を1枚選んでみてください。',
        pick4: '5萬か8萬が来れば順子になるターツの牌を1枚選んでみてください。',
        pick5: '3索が来れば順子になるターツの牌を1枚選んでみてください。'
      },
      notes: {
        ...everyDrill(SECOND_SHAPE_NOTES),
        pick1: FIRST_SHAPE_NOTES,
        pick2: FIRST_SHAPE_NOTES
      }
    },
    blocks: {
      title: '5ブロック',
      summary: 'ブロックを5つそろえる',
      beats: {
        five: '[[agari]]の[[hand]]は、[[meld]]4つと[[pair]]1つ、5つの組み合わせでできています。',
        block: '面子と[[taatsu]]、[[toitsu]]を[[block]]といいます。',
        count: 'この手牌は面子2つ、ターツ2つ、対子1つで、ブロックが5つです。',
        theory: '引いては切りながら和了の形を作っていくことを[[build]]といいます。手牌を5つのブロックに分けて手作りする方法を[[fiveBlocks]]といいます。',
        grow: 'ターツがすべて面子になり、対子が雀頭として残れば和了です。',
        loose: 'ブロックが5つあれば、ブロックに入らない牌は和了に使いません。こういう牌から切ります。',
        ...everyDrill(LOOSE_FIRST)
      },
      notes: everyDrill({ loose: '選んだ牌は{tile}です。5つのブロックに入らない牌です。', other: IN_BLOCK })
    },
    isolated: {
      title: '孤立牌',
      summary: '切る順番',
      beats: {
        isolated: 'どの[[block]]にも入らない牌を[[isolated]]といいます。',
        short: 'この[[hand]]はブロックが4つしかありません。孤立牌1枚を[[taatsu]]に育てて、ブロックを5つにそろえる必要があります。',
        honor: '[[honor]]は同じ牌が来ないと[[toitsu]]にならず、ブロックになりません。[[ukeire]]は1種類だけです。',
        terminal: '1と9は受け入れが3種類です。',
        edge: '2と8は受け入れが4種類です。',
        middle: '3から7までは受け入れが5種類です。',
        order: 'なので、字牌、1と9、2と8の順に切り、真ん中の[[suited]]を残します。',
        ...everyDrill('最初に切るべき孤立牌を1枚切ってください。')
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
      title: 'ブロック整理',
      summary: '6ブロックのとき',
      beats: {
        six: 'この[[hand]]は[[block]]が6つあります。[[agari]]に使うブロックは5つなので、1つ余ります。',
        count: '34筒の[[ukeire]]は2種類8枚です。79筒と12索は1種類4枚です。',
        weak: 'なので、受け入れの少ない[[taatsu]]を切って、ブロックを5つに減らします。',
        head: '[[toitsu]]が1つしかなければ、[[pair]]として残しておきます。',
        one: 'ターツは1枚ずつ切って整理します。残った1枚は[[isolated]]になります。',
        ...everyDrill(TRIM_TO_FIVE)
      },
      notes: everyDrill(TRIM_NOTES)
    },
    menzen: {
      title: '門前の手作り',
      summary: '引いて切ってテンパイ',
      beats: {
        menzen: '他の人が切った牌をもらって[[meld]]を作ることもできます。そうせず、自分で引いた牌だけで[[hand]]を作ることを[[menzen]]といいます。',
        turn: '手番ごとに1枚引いて1枚切り、[[block]]5つを面子4つと[[pair]]1つに変えていきます。',
        order: '切る牌は[[isolated]]から選びます。孤立牌がなくブロックが6つなら、[[ukeire]]の少ない[[taatsu]]を整理します。',
        ...everyDrill('牌を1枚切ってください。'),
        pick5: '[[tenpai]]になるように牌を1枚切ってください。'
      },
      notes: {
        pick1: isolatedNotes(HONOR_LOOSE),
        pick2: isolatedNotes(HONOR_LOOSE),
        pick3: isolatedNotes(TERMINAL_LOOSE),
        pick4: isolatedNotes(EDGE_LOOSE),
        pick5: {
          loose: 'テンパイです。78筒に6筒か9筒が来れば[[agari]]です。',
          other: NOT_TENPAI
        }
      }
    },
    waits: {
      title: '待ち牌',
      summary: '和了できる牌',
      beats: {
        wait: '[[tenpai]]の[[hand]]を[[agari]]させる牌を[[wait]]といいます。',
        waitHere: 'この手牌は、34索に2索か5索が来れば[[run]]になって和了です。なので待ち牌は2索と5索です。',
        shapes: '残った牌の形によって待ち牌が変わります。待ちの形は[[ryanmen]]・[[kanchan]]・[[penchan]]・[[tanki]]・[[shanpon]]の5種類です。',
        known: '両面・カンチャン・ペンチャンは[[taatsu]]の形そのままです。シャンポンは[[toitsu]]2つで、単騎は1枚残った牌で待ちます。',
        strongest: 'その中で待ち牌がいちばん多い形は両面です。次のレッスンで両面を学んでみましょう。'
      }
    },
    ryanmen: {
      title: '両面',
      summary: '両端を待つ',
      beats: {
        ryanmen: '[[ryanmen]]は、数字が連続した[[suited]]2枚で両端を待つ形です。12と89は片側の端がないので両面ではありません。',
        how: '34索は、2索が来れば234索、5索が来れば345索の[[run]]になります。',
        wide: '[[wait]]は2種類、最大8枚です。5つの形の中でいちばん多いです。',
        compare: '[[kanchan]]の35索は4索1種類しか待てません。[[tenpai]]にできるなら、両面を選びます。',
        ...everyDrill('両面待ちが残るように牌を1枚切ってください。')
      },
      notes: {
        pick1: {
          ryanmen: '34索の両面が残りました。待ち牌は2索と5索です。',
          kanchan: '3索を切ると46索のカンチャンが残ります。待ち牌は5索だけです。',
          other: NOT_TENPAI
        },
        pick2: {
          ryanmen: '56萬の両面が残りました。待ち牌は4萬と7萬です。',
          kanchan: '5萬を切ると68萬のカンチャンが残ります。待ち牌は7萬だけです。',
          other: NOT_TENPAI
        },
        pick3: {
          ryanmen: '67索の両面が残りました。待ち牌は5索と8索です。',
          kanchan: '6索を切ると79索のカンチャンが残ります。待ち牌は8索だけです。',
          other: NOT_TENPAI
        },
        pick4: {
          ryanmen: '45索の両面が残りました。待ち牌は3索と6索です。',
          kanchan: '4索を切ると57索のカンチャンが残ります。待ち牌は6索だけです。',
          other: NOT_TENPAI
        },
        pick5: {
          ryanmen: '23筒の両面が残りました。待ち牌は1筒と4筒です。',
          kanchan: '2筒を切ると35筒のカンチャンが残ります。待ち牌は4筒だけです。',
          other: NOT_TENPAI
        }
      }
    },
    compare: {
      title: '待ちの比較',
      summary: '待ち牌が多い方を選ぶ',
      beats: {
        two: '切って[[tenpai]]になる牌が2通りあることがあります。',
        ryanmen: '3索を切ると56索の[[ryanmen]]が残ります。[[wait]]は4索と7索です。',
        kanchan: '6索を切ると35索の[[kanchan]]が残ります。待ち牌は4索だけです。',
        count: '同じ牌は4枚ずつなので、両面は最大8枚、カンチャンは最大4枚を待ちます。',
        more: '待ち牌が多いほど[[agari]]しやすくなります。待ち牌の多い両面がよい理由です。',
        held: '[[hand]]にすでにある待ち牌は枚数から引きます。[[shanpon]]は最大4枚、[[tanki]]は最大3枚です。',
        indicator: '[[discard]]や[[indicator]]で[[seen|見えている]]待ち牌も枚数から引きます。7索が表示牌で見えているので、56索の待ち牌は最大7枚です。',
        ...everyDrill(WIDER)
      },
      notes: {
        pick1: {
          ryanmen: '34索の両面が残りました。待ち牌は2索と5索、最大8枚です。',
          kanchan: '4索を切ると13索のカンチャンが残ります。待ち牌は2索、最大4枚です。',
          other: NOT_TENPAI
        },
        pick2: {
          ryanmen: '56索の両面が残りました。待ち牌は4索と7索、最大8枚です。',
          shanpon: '5索を切ると6索と東のシャンポンが残ります。待ち牌は最大4枚です。',
          other: NOT_TENPAI
        },
        pick3: {
          kanchan: '東2枚が[[pair]]になり、57索のカンチャンが残りました。待ち牌は6索、最大4枚です。',
          tanki: '5索か7索を切ると単騎が残ります。待ち牌は最大3枚です。',
          other: NOT_TENPAI
        },
        pick4: {
          ryanmen: '34萬の両面が残りました。待ち牌は2萬と5萬、最大8枚です。',
          kanchan: '3萬を切ると46萬のカンチャンが残ります。待ち牌は5萬、最大4枚です。',
          other: NOT_TENPAI
        },
        pick5: {
          ryanmen: '78筒の両面が残りました。待ち牌は6筒と9筒、最大8枚です。',
          kanchan: '8筒を切ると57筒のカンチャンが残ります。待ち牌は6筒、最大4枚です。',
          other: NOT_TENPAI
        }
      }
    },
    riichi: {
      title: 'リーチ',
      summary: 'テンパイの宣言',
      beats: {
        tenpai: '[[tenpai]]になると[[riichi]]を宣言できます。',
        what: 'リーチはテンパイであることを告げる宣言です。[[menzen]]のときだけできます。リーチをして[[agari]]すると点数が上がります。',
        declare: '[[toimen]]がリーチを宣言しました。対面の名札にリーチの表示がつきました。',
        sideways: 'リーチを宣言して切った牌は、他の捨て牌と向きを変えて置きます。この牌を[[declare]]といいます。'
      }
    },
    tsumogiri: {
      title: 'リーチ後',
      summary: '手牌の固定',
      beats: {
        lock: '[[riichi]]を宣言すると、[[hand]]はもう変えられません。',
        tsumogiri: 'なので、引いた牌で[[agari]]できなければ、その牌をそのまま切ります。',
        name: '引いた牌をそのまま切ることを[[tsumogiri]]といいます。'
      }
    },
    tsumo: {
      title: 'ツモ',
      summary: '自分で引いた牌で和了',
      beats: {
        tsumo: '[[tsumo]]は、自分で引いた牌で[[agari]]することです。',
        complete: 'リーチした自分が34索に5索を引いて、[[hand]]が完成しました。',
        pay: 'ツモすると、他の3人が点数を分けて支払います。'
      }
    },
    ron: {
      title: 'ロン',
      summary: '他の人が切った牌で和了',
      beats: {
        ron: '[[ron]]は、他の人が切った牌で[[agari]]することです。',
        example: '[[shimocha]]が5索を切りました。自分の34索に5索が加われば[[hand]]が完成します。なので5索でロンできます。',
        anyone: '[[shimocha]]・[[toimen]]・[[kamicha]]、誰が切った牌でもロンできます。',
        pay: 'ロンすると、その牌を切った人が一人で点数をすべて支払います。'
      }
    },
    dealin: {
      title: '放銃',
      summary: '自分が切った牌でロン',
      beats: {
        dealIn: '自分が切った牌で他の人が[[ron]]することを[[dealIn]]といいます。',
        pay: '放銃すると、その点数を自分一人ですべて支払います。',
        avoid: 'なので、相手が[[tenpai]]のときは、相手の[[wait]]を切らないようにしなければなりません。'
      }
    },
    reading: {
      title: '待ちを避ける',
      summary: '待ち牌ではない牌を切る',
      beats: {
        reveal: '[[toimen]]の[[hand]]を公開します。',
        waits: '対面は23索の[[ryanmen]]です。1索か4索が来れば[[agari]]です。',
        ...everyDrill('対面の手牌から待ち牌を見つけ、待ち牌ではない牌を1枚切ってください。')
      },
      notes: eachDrill(READING_WAITS.map(readingNote))
    },
    furiten: {
      title: 'フリテン',
      summary: '自分の捨て牌ではロンできない',
      beats: {
        furiten: '自分の[[wait]]をすでに切っている状態を[[furiten]]といいます。',
        rule: 'フリテンだと[[ron]]できません。[[tsumo]]でしか[[agari]]できません。',
        discarded: '[[toimen]]は[[riichi]]の前に1索を切りました。',
        noRon: '1索は対面の待ち牌です。待ち牌を1つでも切っていれば、ほかの待ち牌でもロンできません。なので、対面は4索でもロンできません。',
        pickFuriten: '4索を切ってください。'
      },
      notes: {
        pickFuriten: {
          furiten: '対面はフリテンなので、4索でロンできません。',
          other: '選んだ牌は{tile}です。4索を探してください。'
        }
      }
    },
    genbutsu: {
      title: '現物',
      summary: 'リーチした人が切った牌',
      beats: {
        hidden: '実戦では相手の[[hand]]は見えません。',
        visible: 'でも、相手が切った牌は見えます。',
        genbutsu: '[[riichi]]した人が切った牌では[[dealIn]]しません。その牌では[[furiten]]で[[ron]]できないからです。',
        name: 'リーチした人がすでに切った牌を[[genbutsu]]といいます。いちばん安全な牌です。',
        pick: '[[toimen]]の現物を1枚切ってください。'
      },
      notes: {
        pick: {
          genbutsu: '対面がすでに切った牌です。',
          furiten: '4索は対面がフリテンでロンできませんが、対面が切った現物ではありません。',
          other: '選んだ牌は{tile}です。対面が切った牌ではありません。'
        }
      }
    },
    betaori: {
      title: 'ベタオリ',
      summary: '和了より守備',
      beats: {
        riichi: '[[toimen]]が[[riichi]]しました。自分の[[hand]]はまだ[[tenpai]]ではありません。',
        betaori: 'こういうときは[[agari]]を諦め、[[dealIn]]しないことだけに集中できます。この守備を[[betaori]]といいます。',
        build: '[[build]]だけを考えるなら、北か9筒を切ります。しかし、どちらも対面の[[genbutsu]]ではありません。',
        safe: '3萬は対面が切った現物です。ベタオリするときは、[[meld]]が崩れても3萬を切ります。',
        turns: '残りの[[turn]]の数だけ[[safeTile]]があれば、最後までしのげます。',
        ...everyDrill('対面の[[genbutsu]]を1枚切って、ベタオリしてください。')
      },
      notes: everyDrill(BETAORI_NOTES)
    },
    passed: {
      title: '見逃した牌',
      summary: 'リーチ後にロンしなかった牌',
      beats: {
        river: '[[riichi]]した人が切った牌は、その人にとって[[genbutsu]]です。',
        passed: '[[toimen]]がリーチした後、[[kamicha]]が白を切りました。対面は[[ron]]しませんでした。',
        mark: 'リーチ後に切られた牌を帯で示しています。',
        furiten: 'リーチした人は[[wait]]を一度見逃すと、自分で切っていなくても、その局が終わるまで[[furiten]]です。なので、対面はこの先、白でロンできません。',
        anyone: 'このように、リーチ後にロンせず見逃した牌も現物になります。誰が切った牌でも同じです。',
        before: 'リーチする前に他の人が切った牌は現物ではありません。',
        only: '現物は、リーチしたその人に対してだけ安全です。',
        ...guidedDrill('リーチ後に切られた牌だけを帯で示しています。', '対面の[[genbutsu]]を1枚切ってください。')
      },
      notes: {
        pick1: passedNote('上家がリーチ後に切った9筒です。対面はロンしませんでした。'),
        pick2: passedNote('[[shimocha]]がリーチ後に切った5萬です。対面はロンしませんでした。'),
        pick3: passedNote('自分がリーチ後に切った2索です。対面はロンしませんでした。'),
        pick4: passedNote('下家がリーチ後に切った1筒です。対面はロンしませんでした。'),
        pick5: passedNote('上家がリーチ後に切った北です。対面はロンしませんでした。')
      }
    },
    honor: {
      title: '字牌',
      summary: '見えている枚数を数える',
      beats: {
        none: '[[genbutsu]]がなければ、[[honor]]を探してみましょう。',
        shapes: '[[honor]]は数字がないので、[[ryanmen]]になれません。[[tanki]]と[[shanpon]]でしか待てません。',
        count: 'なので、字牌は何枚[[seen|見えている]]かを数えます。[[discard]]と自分の[[hand]]、[[indicator]]をすべて合わせます。北は3枚見えています。',
        three: '3枚見えていれば、残り1枚ではシャンポンになりません。[[dealIn]]するのは単騎だけです。',
        one: '中は、自分の手牌の1枚以外は見えていません。単騎もシャンポンも残っているので危険です。',
        late: '局が進むほど、見えていない字牌は誰かが持っている可能性が高くなり、より危険になります。',
        ...everyDrill('いちばん多く見えている[[honor]]を1枚切ってください。')
      },
      notes: everyDrill({
        three: '選んだ牌は{tile}です。3枚見えているので、[[tanki]]にしか放銃しません。',
        two: '選んだ牌は{tile}です。2枚見えているので、[[shanpon]]にも放銃することがあります。',
        one: '選んだ牌は{tile}です。自分の手牌以外では見えていません。',
        other: '選んだ牌は{tile}です。字牌ではありません。'
      })
    },
    suji: {
      title: '筋',
      summary: '現物から3つ',
      beats: {
        none: '[[genbutsu]]も[[honor]]もなければ、[[suji]]を探してみましょう。',
        genbutsu: '4萬は[[toimen]]の[[genbutsu]]です。',
        ryanmen: '対面が23萬の[[ryanmen]]なら1萬と4萬を、56萬の両面なら4萬と7萬を待っています。',
        furiten: 'どちらでも[[wait]]の4萬を切っているので[[furiten]]です。1萬や7萬で[[ron]]できません。',
        suji: 'なので、1萬と7萬は両面には[[dealIn]]しません。このように現物から3つ離れた牌を[[suji]]といいます。',
        lines: '147 / 258 / 369が互いに筋です。',
        outer: '1・2・3・7・8・9は、現物1枚で両面がすべてふさがります。',
        middle: '1萬が現物でも、4萬には56萬の[[ryanmen]]が残っています。4・5・6はむやみに切ってはいけません。',
        limit: '筋が防ぐのは両面だけです。[[kanchan]]・[[penchan]]・[[tanki]]・[[shanpon]]待ちには放銃することがあります。',
        ...everyDrill('筋のおかげで[[ryanmen]]には放銃しない牌を1枚切ってください。')
      },
      notes: {
        pick1: sujiNote('4萬から3つ離れた7萬は筋です。'),
        pick2: sujiNote('5筒から3つ離れた8筒は筋です。'),
        pick3: sujiNote('6索から3つ離れた9索は筋です。'),
        pick4: sujiNote('5萬から3つ離れた2萬は筋です。'),
        pick5: sujiNote('4筒から3つ離れた1筒は筋です。')
      }
    },
    nakasuji: {
      title: '中筋',
      summary: '両側の筋が現物の牌',
      beats: {
        two: '4・5・6は、2通りの[[ryanmen]]の[[wait]]になります。5萬は34萬の両面でも67萬の両面でも待ち牌です。',
        sources: '[[toimen]]は2萬と8萬をどちらも切っています。',
        naka: 'なので、どちらの両面も[[furiten]]です。このように両側の[[suji]]がどちらも[[genbutsu]]の牌を[[nakaSuji]]といいます。',
        kata: '5筒は2筒だけが現物です。34筒の両面はふさがっていますが、67筒の両面が残っています。このように片側の筋だけが現物の牌を[[kataSuji]]といいます。',
        danger: '[[kataSuji]]は[[nakaSuji]]に比べてとても危険です。5萬は両面がすべてふさがっていますが、5筒は67筒の両面が残っています。',
        lines: '4は1と7、5は2と8、6は3と9がどちらも現物のとき、はじめて中筋です。',
        check: '1と7のどちらか一方だけが現物なら、4は片筋です。両方とも現物か確かめる必要があります。',
        ...everyDrill('対面の[[nakaSuji]]を1枚切ってください。')
      },
      notes: {
        pick1: nakaNote('2萬と8萬がどちらも現物なので、5萬は中筋です。'),
        pick2: nakaNote('3萬と9萬がどちらも現物なので、6萬は中筋です。'),
        pick3: nakaNote('1筒と7筒がどちらも現物なので、4筒は中筋です。'),
        pick4: nakaNote('2筒と8筒がどちらも現物なので、5筒は中筋です。'),
        pick5: nakaNote('3索と9索がどちらも現物なので、6索は中筋です。')
      }
    },
    kabe: {
      title: '壁',
      summary: '4枚すべて見えている牌',
      beats: {
        none: '[[genbutsu]]も[[honor]]もなければ、[[suji]]より先に[[kabe]]を探してみましょう。',
        four: '同じ牌が4枚すべて[[seen|見えている]]とき、その牌を[[kabe]]といいます。[[discard]]と自分の[[hand]]、[[indicator]]を合わせて数えます。',
        blocked: '3索がもう残っていないので、23索の[[ryanmen]]も34索の両面も作れません。',
        safe: 'なので、1索と2索は両面には[[dealIn]]しません。',
        kanchan: '2索は13索の[[kanchan]]もふさがっています。',
        weak: '4が壁でも、1は23の[[ryanmen]]が残っているので安全ではありません。',
        strong: 'なので、壁は2・3・7・8のときに強力です。',
        pairs: '[[tanki]]と[[shanpon]]は壁では防げません。',
        ...everyDrill('壁のおかげで[[ryanmen]]には放銃しない牌を1枚切ってください。')
      },
      notes: {
        pick1: kabeNote('7筒が壁なので、8筒と9筒は両面には放銃しません。'),
        pick2: kabeNote('2索が壁なので、1索は両面には放銃しません。'),
        pick3: kabeNote('3萬が壁なので、2萬は両面には放銃しません。'),
        pick4: kabeNote('7索が壁なので、8索と9索は両面には放銃しません。'),
        pick5: kabeNote('8萬が壁なので、9萬は両面には放銃しません。')
      }
    },
    safety: {
      title: '安全度',
      summary: '現物から危険牌まで',
      beats: {
        fewer: '[[safeTile]]がなければ、残っている[[wait|待ち]]が少ない牌から選びます。',
        order: 'おおむね[[genbutsu]]・[[honor]]・[[kabe]]・[[suji]]・[[noSuji]]の順に危険になります。',
        suji: '筋の中では、[[nakaSuji]]が[[kataSuji]]より安全です。5萬は中筋、6筒は片筋です。',
        honor: '[[honor]]は[[seen|見えている]]枚数によって大きく変わります。自分の[[hand]]以外で見えていない字牌は、[[nakaSuji]]より危険です。',
        ...everyDrill('いちばん安全な牌を1枚切ってください。')
      },
      notes: everyDrill(SAFETY_NOTES),
      outranked: OUTRANKED
    },
    order: {
      title: '切る順番',
      summary: '安全な牌から',
      beats: {
        first: 'いちばん安全な牌から切ります。9索は[[toimen]]の[[genbutsu]]です。',
        save: '2萬は[[suji]]ですが、まだ切りません。[[genbutsu]]が残っていれば、現物から切ります。',
        later: '1[[turn]]たつと、[[shimocha]]が2萬を切りました。これで2萬も現物です。このように[[safeTile]]は増えることがあります。',
        narrow: '現物が増えるほど、まだ誰も切っていない牌はより危険になります。残っている[[wait|待ち]]がそれだけ絞られるからです。',
        ...everyDrill('いちばん安全な牌を1枚切ってください。')
      },
      notes: everyDrill(SAFETY_NOTES),
      outranked: OUTRANKED
    },
    chase: {
      title: '追いかけリーチ',
      summary: 'リーチが2人のとき',
      beats: {
        two: '[[toimen]]に続いて[[kamicha]]も[[riichi]]しました。このように後からかけるリーチを[[chase]]といいます。',
        safe: 'リーチが2人いれば、2人のどちらにも[[dealIn]]しない牌だけが[[safeTile]]です。',
        one: '2筒は対面の[[genbutsu]]ですが、上家にとってはそうではありません。',
        both: '8索は対面と上家の両方が切っています。2人どちらにとっても現物です。',
        declare: '上家の[[declare]]の5筒を、対面は[[ron]]しませんでした。なので、5筒は2人どちらにとっても現物です。',
        after: '2人目のリーチの後に2人ともロンしなかった牌も、2人どちらにとっても現物です。',
        ...guidedDrill('2人目のリーチの後に切られた牌だけを帯で示しています。', '2人共通の[[genbutsu]]を1枚切ってください。')
      },
      notes: {
        pick1: chaseNote('上家のリーチ後に[[shimocha]]が切った1索です。2人ともロンしませんでした。'),
        pick2: chaseNote('上家のリーチ後に自分が切った2索です。2人ともロンしませんでした。'),
        pick3: chaseNote('8筒は対面と上家の両方が切った牌です。'),
        pick4: chaseNote('2筒は上家の宣言牌です。対面はロンしませんでした。'),
        pick5: chaseNote('上家がリーチ後に切った4索です。対面もロンしませんでした。')
      }
    },
    shared: {
      title: '共通と個別',
      summary: '壁・字牌は共通、筋は個別',
      beats: {
        shared: '[[kabe]]と[[honor]]の枚数は、2人に同じように当てはまります。3索が壁なので、2索は2人どちらの[[ryanmen]]にも[[dealIn]]しません。北は2人どちらにとっても3枚[[seen|見えている]]字牌です。',
        apart: '[[suji]]は人ごとに別々に見ます。7萬は[[toimen]]には筋ですが、[[kamicha]]にはそうではありません。',
        double: '対面と上家がどちらも4筒を切っているので、1筒は2人どちらにとっても筋です。',
        better: '9索は対面だけの[[genbutsu]]で、上家には危険です。1人だけの現物より、2人どちらにとっても筋の牌のほうがよいこともあります。',
        ...everyDrill('2人どちらにとってもいちばん安全な牌を1枚切ってください。')
      },
      notes: everyDrill({
        double: '選んだ牌は{tile}、2人どちらにとっても筋です。',
        kabe: '選んだ牌は{tile}です。壁は2人どちらにも当てはまります。',
        honor: '選んだ牌は{tile}です。字牌の枚数は2人どちらにも当てはまります。',
        one: '選んだ牌は{tile}です。1人だけの現物なので、もう1人には危険です。',
        half: '選んだ牌は{tile}です。1人だけの筋です。'
      }),
      outranked: OUTRANKED
    },
    keep: {
      title: '残す現物',
      summary: '追いかけリーチへの備え',
      beats: {
        two: '[[toimen]]の[[genbutsu]]が[[hand]]に2種類あります。9索と2筒です。',
        keep: '9索は[[shimocha]]も切った牌です。下家が[[chase]]をしても、9索は下家にとって現物になります。',
        first: '[[safeTile]]が何枚もあるなら、他の人の現物でもある牌を残しておきます。なので、2筒から切ります。',
        ...everyDrill('追いかけリーチに備えて、対面の[[genbutsu]]を1枚切ってください。')
      },
      notes: everyDrill({
        first: '選んだ牌は{tile}です。対面だけの現物です。',
        keep: '選んだ牌は{tile}です。他の人も切った牌なので、残しておくほうがよいです。',
        other: '選んだ牌は{tile}です。対面の現物ではありません。'
      })
    },
    nosuji: {
      title: '危険牌',
      summary: '端の牌から',
      beats: {
        none: '[[genbutsu]]・[[honor]]・[[kabe]]・[[suji]]がどれもなければ、[[noSuji]]の中から選びます。そのときも、少しでも危険度の低い牌があります。',
        edge: '1・9がいちばん危険度が低く、4・5・6がいちばん危険です。',
        why: '端に行くほど、その牌を使う[[wait|待ち]]の形が少ないからです。1萬を待つ[[ryanmen]]は23萬の1つだけですが、5萬は34萬・67萬の両面と46萬の[[kanchan]]が待っています。[[tanki]]と[[shanpon]]は数字に関係なく残ります。',
        ...everyDrill('いちばん危険度の低い牌を1枚切ってください。')
      },
      notes: everyDrill({
        terminal: '選んだ牌は{tile}です。端の牌なので、待ちの形がいちばん少ないです。',
        edge: '選んだ牌は{tile}です。2・8は1・9の次に待ちの形が少ないです。',
        side: '選んだ牌は{tile}です。3・7は2・8より待ちの形が多いです。',
        middle: '選んだ牌は{tile}です。4・5・6は待ちの形がいちばん多いです。'
      })
    },
    counted: {
      title: '見えている牌',
      summary: '多く見えている方',
      beats: {
        far: '端の牌がなければ、切る牌とその周りの牌が多く[[seen|見えている]]方を切ります。多く見えているほど、その牌を待つ[[wait|待ち]]が少なくなります。',
        self: '切ろうとする牌が多く見えているほど、[[tanki]]と[[shanpon]]が減ります。5索は3枚見えています。',
        near: '周りの牌が多く見えているほど、その牌を使う[[ryanmen]]と[[kanchan]]が減ります。4索の周りの3索と5索が多く見えています。',
        ...everyDrill('いちばん危険度の低い牌を1枚切ってください。')
      },
      notes: {
        pick1: countedNote('3筒の周りの2筒と4筒が多く見えています。'),
        pick2: countedNote('3索の周りの4索が4枚すべて見えていて、[[kabe]]です。'),
        pick3: countedNote('7萬の周りの6萬が3枚見えています。'),
        pick4: countedNote('7筒の周りの8筒が3枚見えています。'),
        pick5: countedNote('7索の周りの6索が4枚すべて見えていて、[[kabe]]です。')
      }
    }
  }
};
