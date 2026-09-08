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
  close: '닫기',
  call: { ron: '론', tsumo: '쯔모', draw: '유국' },
  outcome: { aborted: '중단', draw: '유국', tsumo: '쯔모', ron: '론', dealIn: '방총' },
  stat: { danger: '위험', shanten: '샹텐', hits: '최선', overall: '종합', ukeire: '유효패' },
  ledger: { turn: '순', picked: '선택', best: '최선', shanten: '샹텐', danger: '위험', verdict: '판정' },
  compare: { best: '최선', picked: '선택' },
  verdict: { best: '최선', second: '차선', good: '좋음', weak: '미흡', risky: '위험', worst: '최악' },
  guard: { genbutsu: '현물', kabe: '벽', suji: '스지', noSuji: '위험패', honor: '자패' },
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
      dora: { name: '도라', text: '[[agari]] 점수를 올려 주는 보너스 패입니다. 표시패의 다음 패가 도라입니다.' },
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
      safeTile: { name: '안전패', text: '[[dealIn]]으로 이어지지 않는 패입니다.' },
      genbutsu: { name: '현물', text: '특정 [[riichi]]자가 버린 적이 있거나 [[ron]]하지 않은 패입니다. [[furiten]]으로 인해 [[dealIn]]당하지 않습니다. 완벽하게 안전합니다.' },
      suji: { name: '스지', text: '[[safeTile]](4~6 한정)의 ±3이 되는 패입니다. [[furiten]]으로 인해 [[ryanmen]] [[wait|대기]]에 [[dealIn]]당하지 않습니다. 상대적으로 안전합니다.' },
      kabe: { name: '벽', text: '어떤 패가 4장 다 보여 그 패를 쓰는 [[ryanmen]] [[wait|대기]]가 사라진 상태입니다. 상대적으로 안전합니다.' },
      honor: { name: '자패', text: '풍패와 삼원패입니다. [[ryanmen]]으로 [[wait|대기]]할 수 없어 [[shanpon]]와 [[tanki]] [[wait|대기]]만 남기에 보이는 장수가 많을수록 안전해집니다.' },
      noSuji: { name: '위험패', text: '[[genbutsu]]·[[suji]]·[[kabe]] 어디에도 들지 않는 패입니다.' }
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
