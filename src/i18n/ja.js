export const ja = {
  title: '守備シミュレーター',
  riichi: 'リーチ',
  restart: 'もう一度',
  help: {
    title: 'ヘルプ',
    name: 'betaori.app',
    tab: { basic: '基本', defense: '守備', terms: '用語' },
    intro: [
      '先制[[riichi]]に対して[[safeTile]]を見つける手助けをするリーチ麻雀 守備シミュレーターです。',
      '相手の捨て牌を読んで最善の打牌を見つける手助けをします。'
    ],
    control: {
      title: '操作',
      lines: [
        '好きな牌をクリックして切れます。',
        'レポートの各部分を押すとその[[turn]]の評価を確認できます。'
      ]
    },
    flow: {
      title: '進行',
      lines: [
        '相手の[[riichi]]場面から守備が始まります。',
        '相手は最善の打牌で勝負します。追いかけ[[riichi]]をすることもあります。',
        '[[dealIn]]せずに1局を凌いでみてください。'
      ]
    }
  },
  close: '閉じる',
  call: { ron: 'ロン', tsumo: 'ツモ', draw: '流局' },
  outcome: { aborted: '中断', draw: '流局', tsumo: 'ツモ', ron: 'ロン', dealIn: '放銃' },
  stat: { danger: '危険', shanten: 'シャンテン', hits: '最善', overall: '総合', ukeire: '受け入れ' },
  ledger: { turn: '巡', picked: '選択', best: '最善', shanten: 'シャンテン', danger: '危険', verdict: '判定' },
  compare: { best: '最善', picked: '選択' },
  verdict: { best: '最善', second: '次善', good: '良好', weak: '不足', risky: '危険', worst: '最悪' },
  guard: { genbutsu: '現物', kabe: '壁', suji: '筋', noSuji: '無筋', honor: '字牌' },
  edge: { danger: 'より安全な', shanten: 'シャンテンを落とさない', ukeire: '受け入れの広い' },
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
      oya: { name: '親', text: '点数を1.5倍受け取り、[[agari]]すると席を維持できる席です。' },
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
      safeTile: { name: '安全牌', text: '[[dealIn]]にならない牌です。' },
      genbutsu: { name: '現物', text: '特定の[[riichi]]者が切った牌、または[[riichi]]後に[[ron]]しなかった牌です。[[furiten]]により[[dealIn]]になりません。完全に安全です。' },
      suji: { name: '筋', text: '[[safeTile]](4〜6限定)の±3になる牌です。[[furiten]]により[[ryanmen]][[wait|待ち]]では[[dealIn]]になりません。比較的安全です。' },
      kabe: { name: '壁', text: 'ある牌が4枚見えて、その牌を使う[[ryanmen]][[wait|待ち]]が消えた状態です。比較的安全です。' },
      honor: { name: '字牌', text: '風牌と三元牌です。[[ryanmen]]で待てないので[[shanpon]]と[[tanki]][[wait|待ち]]だけが残り、見えている枚数が多いほど安全になります。' },
      noSuji: { name: '無筋', text: '[[genbutsu]]・[[suji]]・[[kabe]]のどれにも当てはまらない牌です。' }
    }
  },
  settings: {
    title: '設定',
    language: '言語',
    discardInput: '打牌',
    tileStyle: '牌',
    value: {
      discardInput: { single: 'シングル', double: 'ダブル' },
      tileStyle: { classic: '標準', simple: 'シンプル' }
    }
  }
};
