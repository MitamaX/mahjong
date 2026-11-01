export const ja = {
  brand: 'ベタオリ',
  tagline: '麻雀 守備シミュレーター',
  description: '先制リーチに対する安全牌を選ぶリーチ麻雀の守備練習。相手の捨て牌を読み、最善の打牌で放銃せずに1局を凌いでみてください。',
  riichi: 'リーチ',
  restart: 'もう一度',
  course: {
    title: 'リーチ麻雀レッスン',
    description: 'リーチ麻雀のルールの基本から現物・筋・壁まで、盤上で実際に牌を切りながら学ぶ守備レッスン。',
    practice: '実戦'
  },
  lesson: { back: '戻る', next: '次へ', correct: '正解', second: '次善', wrong: '不正解', nextLesson: '次のレッスン', complete: 'レッスン完了', picked: '選んだ牌は{tile}です。' },
  help: {
    title: 'ヘルプ',
    name: 'betaori.app',
    tab: { basic: '基本', terms: '用語', info: '情報' },
    intro: ['リーチ麻雀を学び、守備を練習できます。'],
    pages: {
      home: [
        'ルールの基本から守備まで段階的に学んでみてください。',
        '盤上で実際に牌を切りながら身につけられます。'
      ],
      practice: [
        '先制[[riichi]]に対して[[safeTile]]を選んでみてください。',
        '押し引きの判断は評価しません。',
        '相手は最善の打牌で勝負し、追いかけ[[riichi]]をすることもあります。',
        '[[dealIn]]せずに1局を凌いでみてください。'
      ]
    },
    control: {
      title: '操作',
      lines: [
        '牌を押して切ってください。',
        'レポートの各[[turn]]を押すと評価を確認できます。',
        '用語を押すと意味を確認できます。'
      ]
    },
    info: { issues: '報告', art: '牌画', license: 'ライセンス' }
  },
  doc: {
    privacy: {
      title: 'プライバシーポリシー',
      nav: 'プライバシー',
      description: 'betaori.appが扱う情報の範囲とGoogle AdSenseのCookie利用についてのご案内。',
      sections: [
        {
          title: '収集する情報',
          lines: [
            'betaori.appは会員登録がなく、利用者の個人情報を直接収集しません。',
            '言語・打牌・牌の設定は利用者のブラウザのローカルストレージにのみ保存され、サーバーには送信されません。'
          ]
        },
        {
          title: 'Cookieと広告',
          lines: [
            '本サイトはGoogle AdSenseで広告を配信しています。',
            'Googleを含む第三者配信事業者はCookieを使用し、利用者の本サイトおよび他サイトへのアクセス情報に基づいて広告を配信します。',
            'パーソナライズ広告は以下の設定から無効にできます。'
          ],
          links: ['ads', 'aboutads']
        },
        {
          title: 'お問い合わせ',
          lines: ['サイトの運営および情報の取り扱いに関するお問い合わせは以下で受け付けます。'],
          links: ['issues']
        }
      ]
    },
    home: 'レッスン',
    pages: 'サイト',
    link: { ads: 'Google 広告設定', aboutads: 'aboutads.info', issues: 'GitHub Issues' }
  },
  close: '閉じる',
  call: { ron: 'ロン', tsumo: 'ツモ', draw: '流局' },
  outcome: { aborted: '中断', draw: '流局', tsumo: 'ツモ', ron: 'ロン', dealIn: '放銃' },
  stat: { danger: '危険', shanten: 'シャンテン', hits: '最善', overall: '総合', ukeire: '受け入れ' },
  ledger: { turn: '巡', picked: '選択', best: '最善', shanten: 'シャンテン', danger: '危険', verdict: '判定' },
  compare: { best: '最善', picked: '選択' },
  verdict: { best: '最善', second: '次善', good: '良好', weak: '不足', risky: '危険', worst: '最悪' },
  edge: 'より安全な',
  seen: (count, guard) => `${count}枚見えの${guard}`,
  turnMark: (turn) => `${turn}巡目`,
  score: (value) => `${value}点`,
  note: {
    kabe: ({ choice, cites }) => [...cites, 'が壁なので', choice, 'が最善。'],
    suji: ({ choice, cites, edge, guard }) => [choice, `が${edge}`, ...cites, `の${guard}なので最善。`],
    safe: ({ choice, edge, guard }) => [choice, `が${edge}${guard}なので最善。`],
    risk: ({ choice, danger }) => [choice, `が危険度${danger}で最善。`]
  },
  glossary: {
    group: { tiles: '牌', flow: '進行', melds: '面子と雀頭', build: '手作り', waits: '待ち', riichi: 'リーチと和了', defense: '守備' },
    term: {
      suited: { name: '数牌', text: '1から9までの数字を持つ牌。[[man]]・[[pin]]・[[sou]]の3種類がある。' },
      honor: { name: '字牌', text: '数字を持たない牌。[[winds]]4種類と[[dragons]]3種類がある。' },
      man: { name: '萬子', text: '[[suited]]の一種。1萬から9萬までの9種類がある。' },
      pin: { name: '筒子', text: '[[suited]]の一種。1筒から9筒までの9種類がある。' },
      sou: { name: '索子', text: '[[suited]]の一種。1索から9索までの9種類がある。' },
      winds: { name: '風牌', text: '[[honor]]の一種。東・南・西・北の4種類がある。' },
      dragons: { name: '三元牌', text: '[[honor]]の一種。白・發・中の3種類がある。' },
      shimocha: { name: '下家', text: '自分の右隣に座る人。' },
      toimen: { name: '対面', text: '自分の向かいに座る人。' },
      kamicha: { name: '上家', text: '自分の左隣に座る人。' },
      oya: { name: '親', text: '各局で最初に手番を始める席。[[agari]]すると1.5倍の点数を得る。' },
      ko: { name: '子', text: '[[oya]]以外の残り3席。' },
      hand: { name: '手牌', text: '各自が持っている牌。4人とも13枚から始める。' },
      wall: { name: '牌山', text: '[[hand]]として配った残りの牌を積み上げたもの。手番ごとにここから1枚ずつ引く。' },
      draw: { name: '流局', text: '誰も[[agari]]できないまま[[wall]]が尽き、その局が終わること。' },
      turn: { name: '巡', text: '4人が手番を1回ずつ終える一周を数える単位。' },
      discard: { name: '捨て牌', text: '各自が切って自分の前に並べた牌。' },
      dora: { name: 'ドラ', text: '[[agari]]したときに点数を上げるボーナス牌。[[indicator]]の次の牌にあたる。' },
      indicator: { name: 'ドラ表示牌', text: '表向きにめくられ、[[dora]]を示す牌。その次の牌がドラになる。' },
      agari: { name: '和了', text: '手牌を[[meld]]4つと[[pair]]1つで完成させること。[[tsumo]]と[[ron]]の2種類がある。' },
      meld: { name: '面子', text: '牌3枚の組み合わせ。[[run]]と[[triplet]]の2種類がある。' },
      run: { name: '順子', text: '同じ種類の数牌3枚が数字順に連なった面子。' },
      triplet: { name: '刻子', text: '同じ牌3枚で作る面子。' },
      pair: { name: '雀頭', text: '完成した手牌に必ず1つ入る、同じ牌2枚の組み合わせ。' },
      tenpai: { name: 'テンパイ', text: 'あと1枚で[[agari]]できる状態。' },
      build: { name: '手作り', text: '牌を引いては切り、手牌を[[agari]]の形に近づけていくこと。' },
      taatsu: { name: 'ターツ', text: 'あと1枚で[[run]]になる2枚の牌。' },
      toitsu: { name: '対子', text: '同じ牌2枚からなる形。あと1枚で[[triplet]]になり、そのまま[[pair]]としても使える。' },
      ukeire: { name: '受け入れ', text: '手牌を[[agari]]に近づける牌。種類と枚数で数える。' },
      shanten: { name: 'シャンテン', text: '[[tenpai]]まであと何枚の[[ukeire]]が必要かを表す数。1枚必要なら1シャンテンという。' },
      block: { name: 'ブロック', text: '[[meld]]・[[taatsu]]・[[toitsu]]の総称。' },
      fiveBlocks: { name: '5ブロック理論', text: '手牌を[[block]]5つに分けて[[build]]を進める方法。' },
      isolated: { name: '孤立牌', text: 'どの[[block]]にも属さない牌。' },
      menzen: { name: '門前', text: '他家の捨て牌で面子を作らず、自分で引いた牌で手牌を作ること。' },
      wait: { name: '待ち牌', text: '[[tenpai]]した手牌で[[agari]]できる牌。待ち牌を待つことを待ちという。' },
      ryanmen: { name: '両面', text: '連続した数牌2枚で両端を待つ形。' },
      kanchan: { name: 'カンチャン', text: '数字が1つ離れた数牌2枚で、間の1枚を待つ形。' },
      penchan: { name: 'ペンチャン', text: '12や89のように片側に続きがなく、反対側の1枚だけを待つ形。' },
      tanki: { name: '単騎', text: '1枚の牌で同じ牌を待ち、[[pair]]を作る形。' },
      shanpon: { name: 'シャンポン', text: '[[toitsu]]2つで、どちらかと同じ牌1枚を待つ形。来た側が[[triplet]]、残った側が[[pair]]になる。' },
      riichi: { name: 'リーチ', text: '[[tenpai]]であることを告げる宣言。宣言後は手牌を変えられない。' },
      declare: { name: '宣言牌', text: '[[riichi]]を宣言するときに切った牌。横向きに置く。' },
      tsumogiri: { name: 'ツモ切り', text: '引いた牌をそのまま切ること。' },
      tsumo: { name: 'ツモ', text: '自分で引いた牌で[[agari]]すること。他の3人が点数を分けて支払う。' },
      ron: { name: 'ロン', text: '他家が切った牌で[[agari]]すること。' },
      dealIn: { name: '放銃', text: '自分が切った牌で他家が[[ron]]すること。その点数は自分一人ですべて支払う。' },
      furiten: { name: 'フリテン', text: '自分の[[wait]]をすでに切っているか見逃したために、[[ron]]できない状態。[[riichi]]後に見逃すと、その局の終わりまで続く。' },
      betaori: { name: 'ベタオリ', text: '[[agari]]を諦め、[[dealIn]]しないことだけに集中する守備。' },
      safeTile: { name: '安全牌', text: '[[riichi]]者の誰にも[[dealIn]]しない牌。' },
      genbutsu: { name: '現物', text: '[[riichi]]者がすでに切った牌。リーチ後にその人が[[ron]]せずに見逃した牌も現物になる。' },
      suji: { name: '筋', text: '[[genbutsu]]から3つ離れた牌。147 / 258 / 369が互いに筋の関係にある。' },
      nakaSuji: { name: '中筋', text: '4・5・6のうち、両側の[[suji]]がどちらも[[genbutsu]]の牌。' },
      kataSuji: { name: '片筋', text: '4・5・6のうち、片側の[[suji]]だけが[[genbutsu]]の牌。' },
      kabe: { name: '壁', text: '4枚すべてが[[seen|見えている]]牌。その牌を含む[[run]]と[[ryanmen]]が作れなくなる。' },
      noSuji: { name: '危険牌', text: '[[genbutsu]]でも[[suji]]でもなく、[[kabe]]にも当てはまらない[[suited]]。' },
      seen: { name: '見えている牌', text: '自分の席から表が見える牌。捨て牌と自分の手牌、[[indicator]]を合わせて数える。' },
      chase: { name: '追いかけリーチ', text: 'すでに[[riichi]]者がいるときに、後からかけるリーチ。' }
    }
  },
  settings: {
    title: '設定',
    discardInput: '打牌',
    tileStyle: '牌',
    value: {
      discardInput: { single: 'シングル', double: 'ダブル' },
      tileStyle: { standard: '標準', simple: 'シンプル', classic: 'クラシック' }
    }
  }
};
