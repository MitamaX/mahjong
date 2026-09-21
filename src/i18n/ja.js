export const ja = {
  brand: 'ベタオリ',
  tagline: '麻雀 守備シミュレーター',
  description: '先制リーチに対する安全牌を選ぶリーチ麻雀の守備練習。相手の捨て牌を読み、最善の打牌で放銃せずに1局を凌いでみてください。',
  riichi: 'リーチ',
  restart: 'もう一度',
  help: {
    title: 'ヘルプ',
    name: 'betaori.app',
    tab: { basic: '基本', defense: '守備', terms: '用語', info: '情報' },
    guide: '詳しくは守備ガイドを参照してください。',
    intro: [
      '先制[[riichi]]に対して[[safeTile]]を見つけるためのリーチ麻雀の守備シミュレーターです。',
      '本サイトでは押し引きの判断を評価しません。放銃回避に徹したセオリー通りの守備を練習してみてください。'
    ],
    control: {
      title: '操作',
      lines: [
        '好きな牌をクリックすると切れます。',
        'レポートの各部分をクリックするとその[[turn]]の評価を確認できます。'
      ]
    },
    info: { issues: '報告', art: '牌画', license: 'ライセンス' },
    flow: {
      title: '進行',
      lines: [
        '相手の[[riichi]]から守備が始まります。',
        '相手は最善の打牌で勝負します。追いかけ[[riichi]]をすることもあります。',
        '[[dealIn]]せずに1局を凌いでみてください。'
      ]
    }
  },
  doc: {
    guide: {
      title: '守備ガイド',
      nav: '守備ガイド',
      description: '現物・字牌・壁・筋で安全牌を見抜くリーチ麻雀の守備の基準と用語解説。',
      parts: [
        {
          name: 'ranking',
          title: '判定',
          lines: [
            '先制[[riichi]]を受けたら、手牌を守る前に[[safeTile]]を数えます。',
            '残りの[[turn|巡]]の分だけ[[safeTile]]があれば1局を凌げます。'
          ],
          groups: [
            {
              title: '等級',
              lines: [
                '下の順に上から選びます。',
                '[[genbutsu]]だけが完全で、残りはすべて相対的です。'
              ],
              cases: true
            }
          ]
        },
        {
          name: 'reading',
          title: '読み',
          groups: [
            {
              title: '字牌',
              lines: [
                '[[honor]]は[[ryanmen]]で[[wait|待ち]]できないので[[shanpon]]と[[tanki]]だけが残ります。',
                '1枚も見えていなければ両方の[[wait|待ち]]が生きています。中盤以降は[[noSuji]]と大きな差がありません。',
                '2枚見えれば[[shanpon]]が一通りに減り、3枚見えれば[[tanki]]だけが残ります。'
              ]
            },
            {
              title: '筋',
              lines: [
                '[[suji]]は[[ryanmen]]だけを防ぎます。[[kanchan]]・[[penchan]]・[[tanki]]・[[shanpon]]はそのまま残ります。',
                '4・5・6は両側が立って初めて[[nakaSuji]]になります。片側だけなら[[kataSuji]]です。',
                '1・2・3と7・8・9は[[suji]]が片側だけなので[[kataSuji]]がすべてです。',
                '[[riichi]]宣言牌の[[suji]]はより危険です。宣言直前に引いた牌なので[[wait|待ち]]がその場で変わっている可能性があります。'
              ]
            },
            {
              title: '壁',
              lines: [
                '[[kabe]]は手牌と捨て牌、[[dora|表示牌]]を合わせて数えます。',
                '3索が4枚見えていれば1索・2索で[[ryanmen]]を作れません。',
                '[[kabe]]も[[ryanmen]]だけを防ぎます。[[kanchan]]と[[tanki]]は残ります。'
              ]
            }
          ]
        },
        {
          name: 'fold',
          title: 'オリ',
          groups: [
            {
              title: '順番',
              lines: [
                '残りの[[turn|巡]]と手の中の[[safeTile]]の枚数をまず突き合わせます。',
                '[[safeTile]]を出し惜しみせず、最も安全な牌から切ります。',
                '後回しにすると終盤に[[safeTile]]が足りず[[noSuji]]を掴みます。'
              ]
            },
            {
              title: '追いかけリーチ',
              lines: [
                '[[riichi]]者が二人なら、両方に対する[[genbutsu]]だけが完全です。',
                '重なる[[genbutsu]]がなければ[[honor]]と[[kabe]]から見ます。',
                '[[suji]]は片方にしか通らないので、もう一人には[[noSuji]]です。'
              ]
            }
          ]
        }
      ]
    },
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
    home: 'はじめる',
    link: { ads: 'Google 広告設定', aboutads: 'aboutads.info', issues: 'GitHub Issues' }
  },
  close: '閉じる',
  call: { ron: 'ロン', tsumo: 'ツモ', draw: '流局' },
  outcome: { aborted: '中断', draw: '流局', tsumo: 'ツモ', ron: 'ロン', dealIn: '放銃' },
  stat: { danger: '危険', shanten: 'シャンテン', hits: '最善', overall: '総合', ukeire: '受け入れ' },
  ledger: { turn: '巡', picked: '選択', best: '最善', shanten: 'シャンテン', danger: '危険', verdict: '判定' },
  compare: { best: '最善', picked: '選択' },
  verdict: { best: '最善', second: '次善', good: '良好', weak: '不足', risky: '危険', worst: '最悪' },
  guard: { genbutsu: '現物', kabe: '壁', suji: '筋', noSuji: '無筋', honor: '字牌' },
  annotation: { safe: '安全', discard: '捨て牌', seen: '見えている牌', indicator: '表示牌', declare: '宣言牌' },
  edge: { danger: 'より安全な', shanten: 'シャンテンを戻さない', ukeire: '受け入れの広い' },
  seen: (count, guard) => `${count}枚見えの${guard}`,
  turnMark: (turn) => `${turn}巡目`,
  shantenMark: (value) => `${value}シャンテン`,
  score: (value) => `${value}点`,
  note: {
    kabe: ({ choice, cites }) => [...cites, 'が壁なので', choice, 'が最善。'],
    suji: ({ choice, cites, edge, guard }) => [choice, `が${edge}`, ...cites, `の${guard}なので最善。`],
    safe: ({ choice, edge, guard }) => [choice, `が${edge}${guard}なので最善。`],
    risk: ({ choice, danger }) => [choice, `が危険度${danger}で最善。`]
  },
  glossary: {
    group: { flow: '進行', win: '和了', wait: '待ち', defense: '守備' },
    term: {
      turn: { name: '巡', text: '一周を数える単位です。[[oya]]から一人ずつ回ります。' },
      oya: { name: '親', text: '点数を1.5倍受け取り、[[agari]]すると連荘できる席です。' },
      ko: { name: '子', text: '[[oya]]以外の残り三席です。' },
      dora: { name: 'ドラ', text: '[[agari]]の点数を上げるボーナス牌です。表示牌の次の牌がドラです。' },
      draw: { name: '流局', text: '誰も[[agari]]できないまま山が尽きて終わることです。' },
      agari: { name: '和了', text: '手牌を完成させて点数を得ることです。[[tsumo]]と[[ron]]の二つがあります。' },
      tenpai: { name: 'テンパイ', text: 'あと一枚で[[agari]]する状態です。[[shanten]]0です。' },
      shanten: { name: 'シャンテン', text: '[[tenpai]]するために必要な[[ukeire]]の枚数です。低いほど完成に近いです。' },
      ukeire: { name: '受け入れ', text: '[[shanten]]を減らす牌の種類と枚数です。' },
      riichi: { name: 'リーチ', text: '[[tenpai]]で宣言する役です。宣言後は手牌を変えられません。' },
      tsumo: { name: 'ツモ', text: '自分で引いた牌で[[agari]]することです。' },
      ron: { name: 'ロン', text: '他家が切った牌で[[agari]]することです。' },
      dealIn: { name: '放銃', text: '自分が切った牌で相手に[[ron]]されることです。' },
      furiten: { name: 'フリテン', text: '自分が切った牌が[[wait]]なら[[ron]]ができません。もし[[ryanmen]][[wait|待ち]]で2筒をすでに切っていれば、2筒・5筒の[[wait|待ち]]すべてで[[ron]]ができません。' },
      wait: { name: '待ち牌', text: '[[tenpai]]の手を[[agari]]にする牌です。' },
      ryanmen: { name: '両面', text: '3・4のように両側で[[ukeire]]を待つ形です。[[wait|待ち]]が最も広いです。' },
      kanchan: { name: 'カンチャン', text: '3・5のように間の一枚を待つ形です。' },
      penchan: { name: 'ペンチャン', text: '1・2のように端だけを待つ形です。' },
      tanki: { name: '単騎', text: '一枚で頭を待つ形です。' },
      shanpon: { name: 'シャンポン', text: '二つの対子のどちらかを待つ形です。一方が刻子になり、もう一方が雀頭として残ります。' },
      safeTile: { name: '安全牌', text: '[[dealIn]]にならない牌です。[[genbutsu]]が最も安全で、[[honor]]・[[kabe]]・[[suji]]の順に安全度が下がります。' },
      genbutsu: { name: '現物', text: '特定の[[riichi]]者が切ったことがあるか、[[ron]]しなかった牌です。[[furiten]]により[[dealIn]]になりません。完全に安全です。ただし[[riichi]]者が二人いる場合は、両方に対する現物だけが完全です。' },
      suji: { name: '筋', text: '[[safeTile]]（4～6限定）の±3になる牌です。[[furiten]]により[[ryanmen]][[wait|待ち]]では[[dealIn]]になりません。比較的安全です。[[kanchan]]・[[penchan]]・[[tanki]]・[[shanpon]][[wait|待ち]]は防げません。' },
      nakaSuji: { name: '中筋', text: '4・5・6のうち両側の[[suji]]がどちらも[[genbutsu]]の牌です。その牌を使う[[ryanmen]][[wait|待ち]]がすべて消えます。' },
      kataSuji: { name: '片筋', text: '片側の[[suji]]だけが[[genbutsu]]の牌です。残った側の[[ryanmen]][[wait|待ち]]が生きているため[[nakaSuji]]より危険です。' },
      kabe: { name: '壁', text: 'ある牌が4枚見えて、その牌を使う[[ryanmen]][[wait|待ち]]が消えた状態です。比較的安全です。手牌と捨て牌、表示牌を合わせて数えます。' },
      honor: { name: '字牌', text: '風牌と三元牌です。[[ryanmen]]で待てないので[[shanpon]]と[[tanki]][[wait|待ち]]だけが残り、見えている枚数が多いほど安全になります。3枚見えていれば[[shanpon]]が消えて[[tanki]]だけが残ります。' },
      noSuji: { name: '無筋', text: '[[genbutsu]]・[[suji]]・[[kabe]]のどれにも当てはまらない牌です。[[riichi]]宣言牌の周りは特に危険です。' }
    }
  },
  settings: {
    title: '設定',
    language: '言語',
    discardInput: '打牌',
    tileStyle: '牌',
    value: {
      discardInput: { single: 'シングル', double: 'ダブル' },
      tileStyle: { standard: '標準', simple: 'シンプル', classic: 'クラシック' }
    }
  }
};
