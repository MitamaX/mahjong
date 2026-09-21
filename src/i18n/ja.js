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
      description: '現物・字牌・壁・筋で牌の危険度を見分けるリーチ麻雀の守備基準と用語解説。',
      parts: [
        {
          name: 'ranking',
          title: '基本',
          lines: [
            'ベタオリは[[agari]]を諦め、[[dealIn]]しないことだけに集中する守備です。',
            '手作りより、安全に切ることを優先しましょう。',
            '残りの[[turn|巡目]]の数だけ[[safeTile]]があれば、最後まで凌げます。'
          ],
          groups: [
            {
              title: '安全度',
              lines: [
                '[[safeTile]]がなければ、当たりうる[[wait|待ち]]が少ない牌から選びます。',
                'おおむね下に行くほど危険です。[[honor]]の危険度は見えている枚数で大きく変わります。'
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
              title: '現物',
              lines: [
                '[[riichi]]者が切った牌は、その人の[[genbutsu]]です。',
                '[[riichi]]後は、誰が切った牌でも[[ron]]せずに見逃せば[[genbutsu]]になります。',
                '',
                '[[genbutsu]]はその人にしか通りません。'
              ]
            },
            {
              title: '筋',
              lines: [
                '[[genbutsu]]から3つ離れた牌が[[suji]]です。1・4・7 / 2・5・8 / 3・6・9が互いに筋です。',
                '[[suji]]は[[ryanmen]]だけを防ぎます。[[tanki]]と[[shanpon]]はどの[[suji]]にも当たります。[[kanchan]]・[[penchan]]の可能性も否定できません。',
                '',
                '4・5・6は両側の[[suji]]がどちらも[[genbutsu]]のときだけ[[nakaSuji]]になります。片側だけなら[[kataSuji]]です。',
                '[[kataSuji]]は[[nakaSuji]]に比べてはるかに危険です。'
              ]
            },
            {
              title: '壁',
              lines: [
                '同じ牌が4枚すべて見えている状態を[[kabe]]と呼びます。手牌と捨て牌、[[dora|ドラ表示牌]]を合わせて数えます。',
                '',
                '3の[[kabe]]があれば、1と2は[[ryanmen]]で[[dealIn]]しません。2は[[kanchan]]でも[[dealIn]]しません。',
                '4の[[kabe]]があっても、1は2・3の[[ryanmen]]が残るため安全ではありません。つまり、[[kabe]]が効くのは2・3・7・8です。',
                '',
                '[[tanki]]と[[shanpon]]は[[kabe]]では防げません。'
              ]
            },
            {
              title: '字牌',
              lines: [
                '[[honor]]には[[ryanmen]]がないため、[[tanki]]と[[shanpon]]だけが残ります。',
                '枚数は自分の手牌も含めて数えます。3枚見えれば[[shanpon]]がなくなり、[[tanki]]だけが残ります。',
                '',
                '1枚も見えていない[[honor]]は[[nakaSuji]]より危険です。終盤に近づくほどさらに危険になります。'
              ]
            }
          ]
        },
        {
          name: 'fold',
          title: '切り方',
          groups: [
            {
              title: '順番',
              lines: [
                '最も安全な牌から切ります。面子や[[tenpai]]が崩れても構いません。',
                '[[safeTile]]があるうちは[[suji]]を先に切りません。1[[turn|巡]]待てば[[safeTile]]が増えることもあります。',
                '',
                '[[safeTile]]が複数あれば、他の人の[[genbutsu]]でもある牌を残しておきます。追いかけ[[riichi]]に備えられます。',
                '',
                '[[genbutsu]]が増えるほど、まだ通っていない牌はより危険になります。残りの[[wait|待ち]]がそれだけ絞られるからです。'
              ]
            },
            {
              title: '追いかけリーチ',
              lines: [
                '[[riichi]]者が二人なら、どちらにも[[dealIn]]しない牌だけが[[safeTile]]です。',
                '二人目の[[riichi]]の後、二人とも[[ron]]しなかった牌は両者の[[genbutsu]]です。',
                '二人目の[[riichi]]宣言牌を先制[[riichi]]者が[[ron]]しなかったなら、その牌も両者の[[genbutsu]]です。',
                '',
                '[[kabe]]と[[honor]]の枚数は二人に共通です。[[suji]]は人ごとに別々に見ます。',
                '片方だけの[[genbutsu]]より、両者に[[suji]]の牌のほうが良いこともあります。'
              ]
            },
            {
              title: '危険牌',
              lines: [
                '[[genbutsu]]・[[honor]]・[[kabe]]・[[suji]]がどれもなければ、[[noSuji]]の中から選びます。その中でも、少しでも危険の少ない牌があります。',
                '',
                '1・9の危険が最も低く、4・5・6が最も高いです。端に近いほど、その牌を使う[[wait|待ち]]の形が少ないからです。',
                '',
                '端の牌がなければ、その牌自身と周りの牌が多く見えている牌を切ります。多く見えているほど、その牌に当たる[[wait|待ち]]が少なくなります。',
                '切ろうとする牌が多く見えているほど、[[tanki]]と[[shanpon]]が減ります。',
                '周りの牌が多く見えているほど、その牌を使う[[ryanmen]]と[[kanchan]]が減ります。'
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
  guard: { genbutsu: '現物', kabe: '壁', suji: '筋', noSuji: '危険牌', honor: '字牌' },
  annotation: { safe: '安全', discard: '捨て牌', seen: '見えている牌', indicator: 'ドラ表示牌', declare: '宣言牌' },
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
      dora: { name: 'ドラ', text: '[[agari]]の点数を上げるボーナス牌です。ドラ表示牌の次の牌がドラです。' },
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
      genbutsu: { name: '現物', text: '特定の[[riichi]]者が切ったことがあるか、[[ron]]しなかった牌です。[[furiten]]により[[dealIn]]になりません。完全に安全です。ただし[[riichi]]者が二人いる場合は、両者の現物でなければなりません。' },
      suji: { name: '筋', text: '[[safeTile]]（4～6限定）の±3になる牌です。[[furiten]]により[[ryanmen]][[wait|待ち]]では[[dealIn]]になりません。比較的安全です。[[kanchan]]・[[penchan]]・[[tanki]]・[[shanpon]][[wait|待ち]]は防げません。' },
      nakaSuji: { name: '中筋', text: '4・5・6のうち両側の[[suji]]がどちらも[[genbutsu]]の牌です。その牌を使う[[ryanmen]][[wait|待ち]]がすべて消えます。' },
      kataSuji: { name: '片筋', text: '片側の[[suji]]だけが[[genbutsu]]の牌です。残った側の[[ryanmen]][[wait|待ち]]が生きているため[[nakaSuji]]より危険です。' },
      kabe: { name: '壁', text: 'ある牌が4枚見えて、その牌を使う[[ryanmen]][[wait|待ち]]が消えた状態です。比較的安全です。手牌と捨て牌、[[dora|ドラ表示牌]]を合わせて数えます。' },
      honor: { name: '字牌', text: '風牌と三元牌です。[[ryanmen]]で待てないので[[shanpon]]と[[tanki]][[wait|待ち]]だけが残り、見えている枚数が多いほど安全になります。3枚見えていれば[[shanpon]]が消えて[[tanki]]だけが残ります。' },
      noSuji: { name: '危険牌', text: '[[genbutsu]]・[[suji]]・[[kabe]]のどれにも当てはまらない牌です。[[riichi]]宣言牌の周りは特に危険です。' }
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
