import { spaced } from './phrase.js';

export const ko = {
  brand: '베타오리',
  tagline: '마작 수비 시뮬레이터',
  description: '선제 리치에 맞서 안전패를 고르는 리치마작 수비 연습. 상대 버림패를 읽고 최선의 타패를 골라 방총 없이 1국을 버텨보세요.',
  riichi: '리치',
  restart: '다시',
  course: {
    title: '리치마작 레슨',
    description: '리치마작 레슨입니다. 룰의 기초부터 현물·스지·벽 같은 수비까지 배웁니다. 보드에서 직접 패를 버리며 연습합니다.',
    practice: '실전'
  },
  lesson: { back: '이전', next: '다음', correct: '정답', second: '차선', wrong: '오답', nextLesson: '다음 레슨', complete: '레슨 완료', picked: '고른 패는 {tile}입니다.' },
  help: {
    title: '도움말',
    name: 'betaori.app',
    tab: { basic: '기본', defense: '수비', terms: '용어', info: '정보' },
    guide: '자세한 내용은 수비 가이드를 참조하세요.',
    intro: [
      '선제 [[riichi]]로부터 [[safeTile]]를 찾게 도와드리는 리치마작 수비 시뮬레이터입니다.',
      '본 사이트는 공수 판단에 대한 평가가 없습니다. 절대적인 방총 회피의 코딩 수비를 연습해보세요.'
    ],
    control: {
      title: '조작',
      lines: [
        '원하는 패를 클릭해 버릴 수 있습니다.',
        '보고서의 각 부분을 눌러 해당 [[turn]]의 평가를 확인할 수 있습니다.'
      ]
    },
    info: { issues: '제보', art: '패 그림', license: '라이선스' },
    flow: {
      title: '진행',
      lines: [
        '상대의 [[riichi]] 상황으로부터 수비를 시작합니다.',
        '상대는 최선의 타패로 승부합니다. 추격 [[riichi]]를 걸 수도 있습니다.',
        '[[dealIn]]당하지 않고 1국동안 버텨보세요.'
      ]
    }
  },
  doc: {
    guide: {
      title: '리치마작 수비 가이드',
      nav: '수비 가이드',
      description: '현물·자패·벽·스지로 패의 위험도를 가려내는 리치마작 수비 기준과 용어 해설.',
      parts: [
        {
          name: 'ranking',
          title: '기본',
          lines: [
            '베타오리는 [[agari]]를 포기하고 [[dealIn]]당하지 않는 데만 집중하는 수비입니다.',
            '조패보다는 패를 안전하게 버리는 것에 집중해봅시다.',
            '남은 [[turn|순]]만큼 [[safeTile]]가 있으면 끝까지 버틸 수 있습니다.'
          ],
          groups: [
            {
              title: '안전도',
              lines: [
                '[[safeTile]]가 없으면 남은 [[wait|대기]]가 적은 패부터 고릅니다.',
                '대체로 아래로 갈수록 위험합니다. [[honor]]는 보이는 장수에 따라 크게 달라집니다.'
              ],
              cases: true
            }
          ]
        },
        {
          name: 'reading',
          title: '읽기',
          groups: [
            {
              title: '현물',
              lines: [
                '[[riichi]]를 건 사람이 버린 패는 그 사람에게 [[genbutsu]]입니다.',
                '[[riichi]] 뒤에 누가 버렸든 [[ron]]하지 않고 넘긴 패도 [[genbutsu]]이 됩니다.',
                '',
                '[[genbutsu]]은 그 사람에게만 안전합니다.'
              ]
            },
            {
              title: '스지',
              lines: [
                '[[genbutsu]]에서 세 칸 떨어진 패가 [[suji]]입니다. 1, 4, 7 / 2, 5, 8 / 3, 6, 9가 서로 스지입니다.',
                '[[suji]]는 [[ryanmen]]만 막습니다. [[tanki]]와 [[shanpon]]는 어느 [[suji]]에나 남습니다. [[kanchan]], [[penchan]]의 가능성도 배제할 수는 없습니다.',
                '',
                '4, 5, 6은 양쪽이 모두 [[genbutsu]]이어야 [[nakaSuji]]입니다. 한쪽만이면 [[kataSuji]]입니다.',
                '[[kataSuji]]는 [[nakaSuji]]에 비해 매우 위험합니다.'
              ]
            },
            {
              title: '벽',
              lines: [
                '같은 패가 4장 모두 보이면 그 패를 [[kabe]]이라고 합니다. 손패와 버림패, [[indicator]]를 합쳐 셉니다.',
                '',
                '3이 [[kabe]]이면 1과 2는 [[ryanmen]]에 [[dealIn]]당하지 않습니다. 2는 [[kanchan]]도 막힙니다.',
                '4가 [[kabe]]이어도 1은 23 [[ryanmen]]이 남아 안전하지 않습니다. 즉, [[kabe]]은 2, 3, 7, 8일 때 강력합니다.',
                '',
                '[[tanki]]와 [[shanpon]]는 [[kabe]]으로 막을 수 없습니다.'
              ]
            },
            {
              title: '자패',
              lines: [
                '[[honor]]는 [[ryanmen]]이 없어 [[tanki]]와 [[shanpon]]만 남습니다.',
                '장수는 내 손패까지 포함해 셉니다. 3장 보이면 [[shanpon]]가 불가능해 [[tanki]]만 남습니다.',
                '',
                '한 장도 보이지 않은 [[honor]]는 [[nakaSuji]]보다 위험합니다. 후반으로 갈수록 더 위험해집니다.'
              ]
            }
          ]
        },
        {
          name: 'fold',
          title: '버리기',
          groups: [
            {
              title: '순서',
              lines: [
                '가장 안전한 패부터 버립니다. 몸통이나 [[tenpai]]가 깨져도 상관없습니다.',
                '[[safeTile]]를 두고 [[suji]]부터 버리지 않습니다. 한 [[turn|순]]이 지나면 [[safeTile]]가 늘어날 수 있습니다.',
                '',
                '[[safeTile]]가 여러 장이면 다른 사람의 [[genbutsu]]이기도 한 패를 남겨 둡니다. 추격 [[riichi]]에 대비할 수 있습니다.',
                '',
                '[[genbutsu]]이 늘어날수록 아직 통하지 않은 패는 더 위험해집니다. 남은 [[wait|대기]]가 그만큼 좁혀지기 때문입니다.'
              ]
            },
            {
              title: '추격 리치',
              lines: [
                '[[riichi]]가 둘이면 양쪽 모두에게 [[dealIn]]당하지 않는 패만 [[safeTile]]입니다.',
                '두 번째 [[riichi]] 뒤에 둘 다 [[ron]]하지 않은 패는 양쪽 모두에게 [[genbutsu]]입니다.',
                '두 번째 [[riichi]]의 선언패를 먼저 [[riichi]]한 사람이 [[ron]]하지 않았다면, 그 패도 양쪽 모두에게 [[genbutsu]]입니다.',
                '',
                '[[kabe]]과 [[honor]]의 장수는 두 사람에게 똑같이 적용됩니다. [[suji]]는 사람마다 따로 봅니다.',
                '한 사람에게만 [[genbutsu]]인 패보다, 두 사람 모두에게 [[suji]]인 패가 나을 수 있습니다.'
              ]
            },
            {
              title: '위험패',
              lines: [
                '[[genbutsu]]·[[honor]]·[[kabe]]·[[suji]]가 모두 없다면 [[noSuji]] 중에서 고릅니다. 이때도 조금이라도 덜 위험한 패가 있습니다.',
                '',
                '1, 9가 가장 덜 위험하고, 4, 5, 6이 가장 위험합니다. 끝으로 갈수록 그 패를 쓰는 [[wait|대기]]의 모양이 적기 때문입니다.',
                '',
                '끝쪽 패가 없다면, 버릴 패와 그 주변의 패가 많이 보이는 쪽을 버립니다. 많이 보일수록 그 패를 기다리는 [[wait|대기]]가 적습니다.',
                '버리려는 패가 많이 보일수록 [[tanki]]와 [[shanpon]]가 줄어듭니다.',
                '주변의 패가 많이 보일수록 그 패를 쓰는 [[ryanmen]]과 [[kanchan]]이 줄어듭니다.'
              ]
            }
          ]
        }
      ]
    },
    privacy: {
      title: '개인정보처리방침',
      nav: '개인정보',
      description: 'betaori.app의 개인정보 수집 범위와 Google AdSense 쿠키 사용 안내.',
      sections: [
        {
          title: '수집 정보',
          lines: [
            'betaori.app은 회원 가입이 없으며 이용자의 개인정보를 직접 수집하지 않습니다.',
            '언어·타패·패 설정은 이용자 브라우저의 로컬 저장소에만 보관되고 서버로 전송되지 않습니다.'
          ]
        },
        {
          title: '쿠키와 광고',
          lines: [
            '본 사이트는 Google AdSense로 광고를 게재합니다.',
            'Google을 포함한 제3자 공급업체는 쿠키를 사용해 이용자의 본 사이트 및 다른 사이트 방문 기록을 바탕으로 광고를 게재합니다.',
            '맞춤 광고는 아래 설정에서 사용 중지할 수 있습니다.'
          ],
          links: ['ads', 'aboutads']
        },
        {
          title: '문의',
          lines: ['사이트 운영과 개인정보 처리에 대한 문의는 아래로 받습니다.'],
          links: ['issues']
        }
      ]
    },
    home: '레슨',
    pages: '사이트',
    link: { ads: 'Google 광고 설정', aboutads: 'aboutads.info', issues: 'GitHub Issues' }
  },
  close: '닫기',
  call: { ron: '론', tsumo: '쯔모', draw: '유국' },
  outcome: { aborted: '중단', draw: '유국', tsumo: '쯔모', ron: '론', dealIn: '방총' },
  stat: { danger: '위험', shanten: '샹텐', hits: '최선', overall: '종합', ukeire: '유효패' },
  ledger: { turn: '순', picked: '선택', best: '최선', shanten: '샹텐', danger: '위험', verdict: '판정' },
  compare: { best: '최선', picked: '선택' },
  verdict: { best: '최선', second: '차선', good: '좋음', weak: '미흡', risky: '위험', worst: '최악' },
  edge: { danger: '더 안전한', shanten: '샹텐수를 늘리지 않는', ukeire: '유효패가 더 많은' },
  seen: (count, guard) => `${count}장 보이는 ${guard}`,
  turnMark: (turn) => `${turn}순`,
  score: (value) => `${value}점`,
  note: {
    kabe: ({ choice, cites }) => [...cites, '가 벽이기에', choice, '가 최선.'],
    suji: ({ choice, cites, edge, guard }) => [choice, `가 ${spaced(edge)}`, ...cites, `의 ${guard}이기에 최선.`],
    safe: ({ choice, edge, guard }) => [choice, `가 ${spaced(edge)}${guard}이기에 최선.`],
    risk: ({ choice, danger }) => [choice, `가 위험 ${danger}로 최선.`]
  },
  glossary: {
    group: { tiles: '패', flow: '진행', melds: '몸통과 머리', build: '조패', waits: '대기', riichi: '리치와 화료', defense: '수비' },
    term: {
      suited: { name: '수패', text: '1부터 9까지 숫자가 있는 패. [[man]]·[[pin]]·[[sou]] 세 가지가 있다.' },
      honor: { name: '자패', text: '숫자가 없는 패. [[winds]] 4종류와 [[dragons]] 3종류가 있다.' },
      man: { name: '만', text: '[[suited]]의 한 가지. 1만부터 9만까지 9종류가 있다.' },
      pin: { name: '통', text: '[[suited]]의 한 가지. 1통부터 9통까지 9종류가 있다.' },
      sou: { name: '삭', text: '[[suited]]의 한 가지. 1삭부터 9삭까지 9종류가 있다.' },
      winds: { name: '풍패', text: '[[honor]]의 한 가지. 동·남·서·북 4종류가 있다.' },
      dragons: { name: '삼원패', text: '[[honor]]의 한 가지. 백·발·중 3종류가 있다.' },
      shimocha: { name: '하가', text: '내 오른쪽 사람.' },
      toimen: { name: '대면', text: '내 맞은편 사람.' },
      kamicha: { name: '상가', text: '내 왼쪽 사람.' },
      oya: { name: '오야', text: '판마다 가장 먼저 차례를 시작하는 자리. [[agari]]하면 점수를 1.5배 받는다.' },
      ko: { name: '코', text: '[[oya]]가 아닌 나머지 세 자리.' },
      hand: { name: '손패', text: '각자 가지고 있는 패. 네 사람 모두 13장으로 시작한다.' },
      wall: { name: '패산', text: '[[hand]]로 나눠 주고 남은 패를 쌓아 둔 것. 차례마다 여기서 1장씩 뽑는다.' },
      draw: { name: '유국', text: '아무도 [[agari]]하지 못한 채 [[wall]]이 0장이 되어 그 판이 끝나는 것.' },
      turn: { name: '순', text: '네 사람이 차례를 한 번씩 마치는 한 바퀴를 세는 단위.' },
      discard: { name: '버림패', text: '사람마다 버려서 자기 앞에 놓은 패.' },
      dora: { name: '도라', text: '[[agari]]했을 때 점수를 올려 주는 보너스 패. [[indicator]]의 다음 패다.' },
      indicator: { name: '도라 표시패', text: '앞면으로 놓여 [[dora]]를 알려 주는 패. 그다음 패가 도라가 된다.' },
      agari: { name: '화료', text: '손패를 [[meld]] 4개와 [[pair]] 1개로 완성하는 것. [[tsumo]]와 [[ron]] 두 가지가 있다.' },
      meld: { name: '몸통', text: '패 3장으로 만든 묶음. [[run]]와 [[triplet]] 두 가지가 있다.' },
      run: { name: '슌쯔', text: '같은 종류의 수패 3장이 숫자 순서대로 이어진 몸통.' },
      triplet: { name: '커쯔', text: '같은 패 3장으로 만든 몸통.' },
      pair: { name: '머리', text: '완성된 손패에 꼭 1개 들어가는 같은 패 2장의 묶음.' },
      tenpai: { name: '텐파이', text: '패 1장만 더 있으면 [[agari]]하는 상태.' },
      build: { name: '조패', text: '패를 뽑고 버리며 손패를 [[agari]] 모양으로 만들어 가는 것.' },
      taatsu: { name: '타쯔', text: '1장만 더 오면 [[run]]가 되는 패 2장.' },
      toitsu: { name: '또이쯔', text: '같은 패 2장으로 이루어진 모양. 1장 더 오면 [[triplet]]가 되고, 그대로 [[pair]]로 쓸 수도 있다.' },
      ukeire: { name: '유효패', text: '손패를 [[agari]]에 가깝게 만드는 패. 종류와 장수로 센다.' },
      shanten: { name: '샹텐', text: '[[tenpai]]까지 [[ukeire]]가 몇 장 더 필요한지 나타내는 수. 1장이 필요하면 1샹텐이다.' },
      block: { name: '블록', text: '[[meld]]·[[taatsu]]·[[toitsu]]를 묶어 부르는 말.' },
      fiveBlocks: { name: '5블록 이론', text: '손패를 [[block]] 5개로 나누어 [[build]]하는 방법.' },
      isolated: { name: '고립패', text: '어느 [[block]]에도 들지 않는 패.' },
      menzen: { name: '멘젠', text: '다른 사람이 버린 패로 몸통을 만들지 않고 직접 뽑은 패로 손패를 만드는 것.' },
      wait: { name: '대기패', text: '[[tenpai]] 손패를 [[agari]]하게 하는 패. 대기패를 기다리는 것을 대기라고 한다.' },
      ryanmen: { name: '양면', text: '숫자가 이어진 수패 2장으로 양쪽 끝을 기다리는 모양.' },
      kanchan: { name: '간짱', text: '1칸 떨어진 수패 2장으로 가운데 1장을 기다리는 모양.' },
      penchan: { name: '변짱', text: '12와 89처럼 한쪽 끝이 없어 반대쪽 1장만 기다리는 모양.' },
      tanki: { name: '단기', text: '패 1장으로 같은 패를 기다려 [[pair]]를 만드는 모양.' },
      shanpon: { name: '샤보', text: '[[toitsu]] 2개로 어느 쪽이든 같은 패 1장을 기다리는 모양. 온 쪽은 [[triplet]], 남은 쪽은 [[pair]]가 된다.' },
      riichi: { name: '리치', text: '[[tenpai]]라고 알리는 선언. 선언한 뒤에는 손패를 바꿀 수 없다.' },
      declare: { name: '선언패', text: '[[riichi]]를 선언하며 버린 패. 옆으로 눕혀 놓는다.' },
      tsumogiri: { name: '쯔모기리', text: '뽑은 패를 그대로 버리는 것.' },
      tsumo: { name: '쯔모', text: '내가 뽑은 패로 [[agari]]하는 것. 다른 세 사람이 점수를 나누어 낸다.' },
      ron: { name: '론', text: '다른 사람이 버린 패로 [[agari]]하는 것.' },
      dealIn: { name: '방총', text: '내가 버린 패로 다른 사람이 [[ron]]하는 것. 그 점수는 나 혼자 모두 낸다.' },
      furiten: { name: '후리텐', text: '자기 [[wait]]를 이미 버렸거나 놓쳐서 [[ron]]할 수 없는 상태. [[riichi]]한 뒤에 놓치면 그 판 내내 이어진다.' },
      betaori: { name: '베타오리', text: '[[agari]]를 포기하고 [[dealIn]]당하지 않는 데만 집중하는 수비.' },
      safeTile: { name: '안전패', text: '[[riichi]]한 사람 누구에게도 [[dealIn]]당하지 않는 패.' },
      genbutsu: { name: '현물', text: '[[riichi]]한 사람이 이미 버린 패. 리치 뒤에 그 사람이 [[ron]]하지 않고 넘긴 패도 현물이다.' },
      suji: { name: '스지', text: '[[genbutsu]]에서 세 칸 떨어진 패. 1, 4, 7 / 2, 5, 8 / 3, 6, 9가 서로 스지다.' },
      nakaSuji: { name: '나카스지', text: '4, 5, 6 중 양쪽 [[suji]]가 모두 [[genbutsu]]인 패.' },
      kataSuji: { name: '카타스지', text: '4, 5, 6 중 한쪽 [[suji]]만 [[genbutsu]]인 패.' },
      kabe: { name: '벽', text: '4장 모두 [[seen|보이는]] 패. 그 패가 들어가는 [[run]]와 [[ryanmen]]이 막힌다.' },
      noSuji: { name: '위험패', text: '[[genbutsu]]도 [[suji]]도 아니고 [[kabe]]으로 막히지도 않은 [[suited]].' },
      seen: { name: '보이는 패', text: '내 자리에서 앞면이 보이는 패. 버림패와 내 손패, [[indicator]]를 합쳐 센다.' },
      chase: { name: '추격 리치', text: '이미 [[riichi]]한 사람이 있을 때 뒤따라 거는 리치.' }
    }
  },
  settings: {
    title: '설정',
    discardInput: '타패',
    tileStyle: '패',
    value: {
      discardInput: { single: '원클릭', double: '더블클릭' },
      tileStyle: { standard: '기본', simple: '심플', classic: '클래식' }
    }
  }
};
