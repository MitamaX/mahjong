import { spaced } from './phrase.js';

export const ko = {
  brand: '베타오리',
  tagline: '마작 수비 시뮬레이터',
  description: '선제 리치에 맞서 안전패를 고르는 리치마작 수비 연습. 상대 버림패를 읽고 최선의 타패를 골라 방총 없이 1국을 버텨보세요.',
  riichi: '리치',
  restart: '다시',
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
      title: '수비 가이드',
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
                '[[genbutsu]]에서 세 칸 떨어진 패가 [[suji]]입니다. 1·4·7 / 2·5·8 / 3·6·9가 서로 스지입니다.',
                '[[suji]]는 [[ryanmen]]만 막습니다. [[tanki]]와 [[shanpon]]는 어느 [[suji]]에나 남습니다. [[kanchan]], [[penchan]]의 가능성도 배제할 수는 없습니다.',
                '',
                '4·5·6은 양쪽이 모두 [[genbutsu]]이어야 [[nakaSuji]]입니다. 한쪽만이면 [[kataSuji]]입니다.',
                '[[kataSuji]]는 [[nakaSuji]]에 비해 매우 위험합니다.'
              ]
            },
            {
              title: '벽',
              lines: [
                '같은 패가 4장 모두 보이면 그 패를 [[kabe]]이라고 합니다. 손패와 버림패, [[dora|도라 표시패]]를 합쳐 셉니다.',
                '',
                '3이 [[kabe]]이면 1과 2는 [[ryanmen]]에 [[dealIn]]당하지 않습니다. 2는 [[kanchan]]도 막힙니다.',
                '4가 [[kabe]]이어도 1은 2·3 [[ryanmen]]이 남아 안전하지 않습니다. 즉, [[kabe]]은 2, 3, 7, 8일 때 강력합니다.',
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
                '1·9가 가장 덜 위험하고, 4·5·6이 가장 위험합니다. 끝으로 갈수록 그 패를 쓰는 [[wait|대기]]의 모양이 적기 때문입니다.',
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
    home: '시작하기',
    link: { ads: 'Google 광고 설정', aboutads: 'aboutads.info', issues: 'GitHub Issues' }
  },
  close: '닫기',
  call: { ron: '론', tsumo: '쯔모', draw: '유국' },
  outcome: { aborted: '중단', draw: '유국', tsumo: '쯔모', ron: '론', dealIn: '방총' },
  stat: { danger: '위험', shanten: '샹텐', hits: '최선', overall: '종합', ukeire: '유효패' },
  ledger: { turn: '순', picked: '선택', best: '최선', shanten: '샹텐', danger: '위험', verdict: '판정' },
  compare: { best: '최선', picked: '선택' },
  verdict: { best: '최선', second: '차선', good: '좋음', weak: '미흡', risky: '위험', worst: '최악' },
  guard: { genbutsu: '현물', kabe: '벽', suji: '스지', noSuji: '위험패', honor: '자패' },
  annotation: { safe: '안전', discard: '버림패', seen: '보이는 패', indicator: '도라 표시패', declare: '선언패' },
  edge: { danger: '더 안전한', shanten: '샹텐수를 늘리지 않는', ukeire: '유효패가 더 많은' },
  seen: (count, guard) => `${count}장 보이는 ${guard}`,
  turnMark: (turn) => `${turn}순`,
  shantenMark: (value) => `${value}샹텐`,
  score: (value) => `${value}점`,
  note: {
    kabe: ({ choice, cites }) => [...cites, '가 벽이기에', choice, '가 최선.'],
    suji: ({ choice, cites, edge, guard }) => [choice, `가 ${spaced(edge)}`, ...cites, `의 ${guard}이기에 최선.`],
    safe: ({ choice, edge, guard }) => [choice, `가 ${spaced(edge)}${guard}이기에 최선.`],
    risk: ({ choice, danger }) => [choice, `가 위험 ${danger}로 최선.`]
  },
  glossary: {
    group: { flow: '진행', win: '화료', wait: '대기', defense: '수비' },
    term: {
      turn: { name: '순', text: '한 바퀴를 세는 단위입니다. [[oya]]부터 한 명씩 돌아갑니다.' },
      oya: { name: '오야', text: '점수를 1.5배 받고 [[agari]]하면 자리를 유지하는 자리입니다.' },
      ko: { name: '코', text: '[[oya]]가 아닌 나머지 세 자리입니다.' },
      dora: { name: '도라', text: '[[agari]] 점수를 올려 주는 보너스 패입니다. 도라 표시패의 다음 패가 도라입니다.' },
      draw: { name: '유국', text: '아무도 [[agari]]하지 못한 채 패산이 떨어져 끝나는 것입니다.' },
      agari: { name: '화료', text: '손패를 완성해 점수를 얻는 것입니다. [[tsumo]]와 [[ron]] 두 가지가 있습니다.' },
      tenpai: { name: '텐파이', text: '한 장만 더 들어오면 [[agari]]하는 상태입니다. [[shanten]] 0입니다.' },
      shanten: { name: '샹텐', text: '[[tenpai]]하기 위해 필요한 [[ukeire]] 개수입니다. 낮을수록 완성에 가깝습니다.' },
      ukeire: { name: '유효패', text: '[[shanten]]을 줄여 주는 패의 종류와 장수입니다.' },
      riichi: { name: '리치', text: '[[tenpai]]에서 선언하는 역입니다. 선언 뒤에는 손패를 바꿀 수 없습니다.' },
      tsumo: { name: '쯔모', text: '스스로 뽑은 패로 [[agari]]하는 것입니다.' },
      ron: { name: '론', text: '다른 사람이 버린 패로 [[agari]]하는 것입니다.' },
      dealIn: { name: '방총', text: '내가 버린 패로 상대가 [[ron]]하는 것입니다.' },
      furiten: { name: '후리텐', text: '자신이 버렸던 패가 [[wait]]라면 [[ron]]을 할 수 없습니다. 만일, [[ryanmen]] [[wait|대기]] 상태에서 2통을 이미 버렸다면 2통·5통 [[wait|대기]] 전부 [[ron]]이 막힙니다.' },
      wait: { name: '대기패', text: '[[tenpai]]에서 [[agari]]로 이어지는 패입니다.' },
      ryanmen: { name: '양면', text: '3·4처럼 양쪽으로 [[ukeire]]를 기다리는 모양입니다. [[wait|대기]]가 가장 넓습니다.' },
      kanchan: { name: '간짱', text: '3·5처럼 사이 한 장을 기다리는 모양입니다.' },
      penchan: { name: '변짱', text: '1·2처럼 한쪽 끝만 기다리는 모양입니다.' },
      tanki: { name: '단기', text: '한 장으로 머리를 기다리는 모양입니다.' },
      shanpon: { name: '샤보', text: '두 쌍 중 한쪽을 기다리는 모양입니다. 한 쌍은 몸통이 되고 한 쌍은 머리로 남습니다.' },
      safeTile: { name: '안전패', text: '[[dealIn]]으로 이어지지 않는 패입니다. [[genbutsu]]이 가장 안전하고 [[honor]]·[[kabe]]·[[suji]] 순으로 안전도가 내려갑니다.' },
      genbutsu: { name: '현물', text: '특정 [[riichi]]자가 버린 적이 있거나 [[ron]]하지 않은 패입니다. [[furiten]]으로 인해 [[dealIn]]당하지 않습니다. 완벽하게 안전합니다. 다만 [[riichi]]자가 둘이면 양쪽 모두에게 현물인 패만 완전합니다.' },
      suji: { name: '스지', text: '[[safeTile]](4~6 한정)의 ±3이 되는 패입니다. [[furiten]]으로 인해 [[ryanmen]] [[wait|대기]]에 [[dealIn]]당하지 않습니다. 상대적으로 안전합니다. [[kanchan]]·[[penchan]]·[[tanki]]·[[shanpon]] [[wait|대기]]는 막지 못합니다.' },
      nakaSuji: { name: '나카스지', text: '4·5·6 중 양쪽 [[suji]]가 모두 [[genbutsu]]인 패입니다. 그 패를 쓰는 [[ryanmen]] [[wait|대기]]가 전부 막힙니다.' },
      kataSuji: { name: '카타스지', text: '한쪽 [[suji]]만 [[genbutsu]]인 패입니다. 남은 쪽 [[ryanmen]] [[wait|대기]]가 살아 있어 [[nakaSuji]]보다 위험합니다.' },
      kabe: { name: '벽', text: '어떤 패가 4장 다 보여 그 패를 쓰는 [[ryanmen]] [[wait|대기]]가 사라진 상태입니다. 상대적으로 안전합니다. 손패와 버림패, [[dora|도라 표시패]]를 합쳐 셉니다.' },
      honor: { name: '자패', text: '풍패와 삼원패입니다. [[ryanmen]]으로 [[wait|대기]]할 수 없어 [[shanpon]]와 [[tanki]] [[wait|대기]]만 남기에 보이는 장수가 많을수록 안전해집니다. 3장 보이면 [[shanpon]]가 사라져 [[tanki]]만 남습니다.' },
      noSuji: { name: '위험패', text: '[[genbutsu]]·[[suji]]·[[kabe]] 어디에도 들지 않는 패입니다. [[riichi]] 선언패 주변이 특히 위험합니다.' }
    }
  },
  settings: {
    title: '설정',
    language: '언어',
    discardInput: '타패',
    tileStyle: '패',
    value: {
      discardInput: { single: '원클릭', double: '더블클릭' },
      tileStyle: { standard: '기본', simple: '심플', classic: '클래식' }
    }
  }
};
