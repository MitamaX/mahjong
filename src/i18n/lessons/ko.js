const NOT_TENPAI = '고른 패는 {tile}입니다. 버리면 텐파이가 되지 않습니다.';
const IN_MELD = '고른 패는 {tile}입니다. 몸통이나 머리에 쓰이는 패입니다.';
const WIDER = '대기패가 더 많은 텐파이가 되도록 패 1장을 버리세요.';
const MAKE_TENPAI = '패 1장을 버려 텐파이를 만드세요.';
const DRILL_COUNT = 5;
const DRILL_IDS = Array.from({ length: DRILL_COUNT }, (unused, order) => `pick${order + 1}`);
const READING_PICKS = 3;
const everyDrill = (value, count = DRILL_COUNT) => Object.fromEntries(DRILL_IDS.slice(0, count).map((id) => [id, value]));
const SUITED_PICKED = '고른 패는 {tile}, 숫자가 있는 수패입니다.';
const HONOR_PICKED = '고른 패는 {tile}, 숫자가 없는 자패입니다.';
const SEAT_NOTES = {
  right: '8삭은 하가가 버린 패입니다.',
  across: '3만은 대면이 버린 패입니다.',
  left: '발은 상가가 버린 패입니다.'
};
const HONOR_LOOSE = '고른 패는 {tile}입니다. 자패는 같은 패가 와야만 블록이 됩니다.';
const TERMINAL_LOOSE = '고른 패는 {tile}입니다. 1과 9는 유효패가 3종류뿐입니다.';
const EDGE_LOOSE = '고른 패는 {tile}입니다. 2와 8은 유효패가 4종류뿐입니다.';
const WEAK_TAATSU = '고른 패는 {tile}입니다. 유효패가 4장뿐인 타쯔입니다.';
const IN_MELD_ONLY = '고른 패는 {tile}입니다. 몸통에 쓰이는 패입니다.';
const IN_BLOCK = '고른 패는 {tile}입니다. 블록에 쓰이는 패입니다.';
const LOOSE_FIRST = '블록 5개에 들지 않는 패 1장을 버리세요.';
const WEAKER_LOOSE = '고른 패는 {tile}입니다. 블록이 되기 더 어려운 고립패가 있습니다.';
const isolatedNotes = (loose) => ({ loose, kept: WEAKER_LOOSE, other: IN_BLOCK });
const TRIM_TO_FIVE = '블록이 5개가 되도록 패 1장을 버리세요.';
const TOITSU_PICKED = '고른 패는 {tile}입니다. 1장 더 오면 커쯔가 되는 또이쯔입니다.';
const FIRST_SHAPE_NOTES = {
  ryanmen: '고른 패는 {tile}입니다. 2삭이 오면 234삭, 5삭이 오면 345삭 슌쯔가 됩니다.',
  kanchan: '고른 패는 {tile}입니다. 6통이 오면 567통 슌쯔가 됩니다.',
  penchan: '고른 패는 {tile}입니다. 7만이 오면 789만 슌쯔가 됩니다.',
  toitsu: TOITSU_PICKED,
  other: IN_MELD_ONLY
};
const SECOND_SHAPE_NOTES = {
  ryanmen: '고른 패는 {tile}입니다. 5만이 오면 567만, 8만이 오면 678만 슌쯔가 됩니다.',
  kanchan: '고른 패는 {tile}입니다. 3삭이 오면 234삭 슌쯔가 됩니다.',
  penchan: '고른 패는 {tile}입니다. 7삭이 오면 789삭 슌쯔가 됩니다.',
  toitsu: TOITSU_PICKED,
  other: IN_MELD_ONLY
};
const TRIM_NOTES = {
  penchan: WEAK_TAATSU,
  kanchan: WEAK_TAATSU,
  ryanmen: '고른 패는 {tile}입니다. 유효패가 8장인 타쯔입니다.',
  toitsu: '고른 패는 {tile}입니다. 하나뿐인 또이쯔라 머리로 남깁니다.',
  other: IN_MELD_ONLY
};

const BETAORI_NOTES = {
  genbutsu: '고른 패는 {tile}, 대면이 버린 현물입니다.',
  loose: '고른 패는 {tile}입니다. 조패에는 필요 없지만 대면의 현물이 아닙니다.',
  tenpai: '고른 패는 {tile}입니다. 텐파이는 유지되지만 대면의 현물이 아닙니다.',
  other: '고른 패는 {tile}입니다. 대면의 현물이 아닙니다.'
};
const PASSED_NOTES = {
  before: '고른 패는 {tile}입니다. 대면이 리치하기 전에 버려진 패라 현물이 아닙니다.',
  other: '고른 패는 {tile}입니다. 대면의 현물이 아닙니다.'
};
const passedNote = (safe) => ({ ...PASSED_NOTES, safe });
const sujiNote = (suji) => ({
  suji,
  kata: '고른 패는 {tile}입니다. 현물 반대쪽 양면이 남아 있습니다.',
  other: '고른 패는 {tile}입니다. 현물에서 세 칸 떨어진 패가 아닙니다.'
});

const nakaNote = (naka) => ({
  naka,
  kata: '고른 패는 {tile}입니다. 한쪽 스지만 현물인 카타스지입니다.',
  other: '고른 패는 {tile}입니다. 나카스지가 아닙니다.'
});
const kabeNote = (kabe) => ({
  kabe,
  beside: '고른 패는 {tile}입니다. 벽 반대쪽 양면이 남아 있습니다.',
  other: '고른 패는 {tile}입니다. 벽으로 막힌 패가 아닙니다.'
});
const SAFETY_NOTES = {
  genbutsu: '고른 패는 {tile}, 대면의 현물입니다.',
  honor: '고른 패는 {tile}, 여러 장 보이는 자패입니다.',
  kabe: '고른 패는 {tile}입니다. 벽 덕분에 양면으로 방총당하지 않습니다.',
  naka: '고른 패는 {tile}, 양쪽 스지가 모두 현물인 나카스지입니다.',
  suji: '고른 패는 {tile}, 현물에서 세 칸 떨어진 스지입니다.',
  kata: '고른 패는 {tile}입니다. 한쪽 스지만 현물인 카타스지입니다.'
};
const OUTRANKED = {
  second: '더욱 안전한 패를 찾아보세요.',
  wrong: '훨씬 안전한 패가 있습니다.'
};
const CHASE_NOTES = {
  across: '고른 패는 {tile}입니다. 대면에게만 현물입니다.',
  left: '고른 패는 {tile}입니다. 상가에게만 현물입니다.',
  other: '고른 패는 {tile}입니다. 두 사람 모두의 현물이 아닙니다.'
};
const chaseNote = (both) => ({ ...CHASE_NOTES, both });
const countedNote = (seen) => ({ seen, other: '고른 패는 {tile}입니다. 더 많이 보이는 쪽이 있습니다.' });

export const ko = {
  units: {
    tiles: '패',
    flow: '진행',
    melds: '몸통과 머리',
    build: '조패',
    waits: '대기',
    riichi: '리치와 화료',
    basicDefense: '수비 기초',
    intermediateDefense: '수비 중급',
    advancedDefense: '수비 고급'
  },
  labels: {
    copies: '4장'
  },
  honors: ['동', '남', '서', '북', '백', '발', '중'],
  lessons: {
    count: {
      title: '패 136장',
      summary: '34종류, 4장씩',
      beats: {
        count: '리치마작은 패 136장으로 합니다.',
        kinds: '패의 종류는 모두 34가지입니다.',
        copies: '종류마다 똑같은 패가 4장씩 있습니다.',
        total: '34종류가 4장씩이라 모두 136장입니다.',
        pick: '[[hand]]에 똑같은 패 4장이 모두 들어 있습니다. 그 패를 1장 버리세요.'
      },
      notes: {
        pick: {
          four: '5통 4장이 모두 손패에 있었습니다.',
          other: '고른 패는 {tile}입니다. 손패에 1장뿐입니다.'
        }
      }
    },
    families: {
      title: '수패와 자패',
      summary: '숫자가 있는 패와 없는 패',
      beats: {
        families: '패는 크게 [[suited]]와 [[honor]], 두 가지로 나뉩니다.',
        suited: '수패는 1부터 9까지 숫자가 있는 패입니다.',
        suits: '수패에는 [[man]]·[[pin]]·[[sou]] 세 가지가 있습니다. 세 가지 모두 1부터 9까지 있습니다.',
        honor: '자패는 숫자가 없는 패입니다.',
        honors: '자패에는 [[winds]] 4종류와 [[dragons]] 3종류가 있습니다.',
        total: '수패 27종류와 자패 7종류를 합쳐 34종류입니다.',
        pick1: '수패 1장을 골라 보세요.',
        pick2: '이번에는 자패 1장을 골라 보세요.'
      },
      notes: {
        pick1: { suited: SUITED_PICKED, other: HONOR_PICKED },
        pick2: { honor: HONOR_PICKED, other: SUITED_PICKED }
      }
    },
    man: {
      title: '만',
      summary: '1만부터 9만까지',
      beats: {
        names: '[[man]]은 [[suited]]의 한 가지입니다. 1만부터 9만까지 9종류가 있습니다.',
        read: '숫자 뒤에 만을 붙여 1만, 2만처럼 부릅니다.',
        copies: '종류마다 4장씩, 만은 모두 36장입니다.',
        pick1: '3만을 골라 보세요.',
        pick2: '7만을 골라 보세요.',
        pick3: '6만을 골라 보세요.'
      },
      notes: everyDrill({ right: '고른 패는 {tile}입니다. 萬 자 위의 한자가 숫자입니다.' }, READING_PICKS)
    },
    pin: {
      title: '통',
      summary: '1통부터 9통까지',
      beats: {
        names: '[[pin]]은 [[suited]]의 한 가지입니다. 1통부터 9통까지 9종류가 있습니다.',
        read: '숫자 뒤에 통을 붙여 1통, 2통처럼 부릅니다.',
        copies: '종류마다 4장씩, 통은 모두 36장입니다.',
        pick1: '3통을 골라 보세요.',
        pick2: '8통을 골라 보세요.',
        pick3: '5통을 골라 보세요.'
      },
      notes: everyDrill({ right: '고른 패는 {tile}입니다. 동그라미 개수가 숫자입니다.' }, READING_PICKS)
    },
    sou: {
      title: '삭',
      summary: '1삭부터 9삭까지',
      beats: {
        names: '[[sou]]은 [[suited]]의 한 가지입니다. 1삭부터 9삭까지 9종류가 있습니다.',
        read: '숫자 뒤에 삭을 붙여 1삭, 2삭처럼 부릅니다.',
        copies: '종류마다 4장씩, 삭은 모두 36장입니다.',
        pick1: '1삭을 골라 보세요.',
        pick2: '8삭을 골라 보세요.',
        pick3: '5삭을 골라 보세요.'
      },
      notes: everyDrill({ right: '고른 패는 {tile}입니다. 막대 개수가 숫자입니다.' }, READING_PICKS)
    },
    suited: {
      title: '수패 구분',
      summary: '숫자와 종류 함께 읽기',
      beats: {
        same: '숫자가 같아도 [[man]]·[[pin]]·[[sou]]이 다르면 서로 다른 패입니다.',
        read: '[[suited]]는 숫자와 종류를 함께 읽습니다. 5만, 5통, 5삭은 모두 다른 패입니다.',
        pick1: '5통을 골라 보세요.',
        pick2: '7삭을 골라 보세요.',
        pick3: '9만을 골라 보세요.'
      },
      notes: everyDrill({ right: '고른 패는 {tile}입니다. 숫자와 종류가 모두 맞습니다.' }, READING_PICKS)
    },
    winds: {
      title: '풍패',
      summary: '동·남·서·북',
      beats: {
        names: '[[winds]]는 [[honor]]의 한 가지입니다. 동·남·서·북 4종류가 있습니다.',
        read: '동·남·서·북 순서로 외워 두세요. [[dora]]를 찾을 때 이 순서를 씁니다.',
        copies: '종류마다 4장씩, 풍패는 모두 16장입니다.',
        pick1: '남을 골라 보세요.',
        pick2: '북을 골라 보세요.',
        pick3: '서를 골라 보세요.'
      },
      notes: {
        pick1: { right: '南 자가 적힌 패가 남입니다.' },
        pick2: { right: '北 자가 적힌 패가 북입니다.' },
        pick3: { right: '西 자가 적힌 패가 서입니다.' }
      }
    },
    dragons: {
      title: '삼원패',
      summary: '백·발·중',
      beats: {
        names: '[[dragons]]는 [[honor]]의 한 가지입니다. 백·발·중 3종류가 있습니다.',
        read: '백·발·중 순서로 외워 두세요. [[dora]]를 찾을 때 이 순서를 씁니다.',
        copies: '종류마다 4장씩, 삼원패는 모두 12장입니다.',
        pick1: '발을 골라 보세요.',
        pick2: '백을 골라 보세요.',
        pick3: '중을 골라 보세요.'
      },
      notes: {
        pick1: { right: '發 자가 적힌 패가 발입니다.' },
        pick2: { right: '테두리만 그려진 패가 백입니다.' },
        pick3: { right: '中 자가 적힌 패가 중입니다.' }
      }
    },
    seats: {
      title: '자리',
      summary: '하가·대면·상가',
      beats: {
        four: '리치마작은 4명이 둘러앉아 합니다.',
        self: '보드 아래쪽이 내 자리입니다.',
        right: '내 오른쪽 사람을 [[shimocha]]라고 합니다.',
        across: '내 맞은편 사람을 [[toimen]]이라고 합니다.',
        left: '내 왼쪽 사람을 [[kamicha]]라고 합니다.',
        rivers: '사람마다 자기 앞에 [[discard|버린 패]]를 놓습니다.',
        use: '그래서 버린 패가 놓인 곳을 보면 누가 버렸는지 알 수 있습니다.',
        pick1: '하가가 버린 패와 같은 패를 골라 보세요.',
        pick2: '대면이 버린 패와 같은 패를 골라 보세요.',
        pick3: '상가가 버린 패와 같은 패를 골라 보세요.'
      },
      notes: everyDrill(SEAT_NOTES, READING_PICKS)
    },
    hand: {
      title: '손패',
      summary: '내 패 13장',
      beats: {
        hand: '보드 아래의 패 13장이 내 [[hand]]입니다.',
        sorted: '손패는 [[man]]·[[pin]]·[[sou]]·[[honor]] 순서로, 숫자가 작은 패부터 놓입니다.',
        hidden: '다른 사람의 손패는 뒷면만 보입니다. 무슨 패인지 알 수 없습니다.',
        start: '네 사람 모두 손패 13장으로 시작합니다.'
      }
    },
    wall: {
      title: '패산',
      summary: '남은 패와 유국',
      beats: {
        pile: '[[hand]]로 나눠 주고 남은 패를 쌓아 둔 것을 [[wall]]이라고 합니다.',
        wall: '보드 가운데 숫자는 패산에서 더 뽑을 수 있는 패의 장수입니다.',
        shrink: '패를 1장 뽑을 때마다 1장씩 줄어듭니다.',
        empty: '패산이 0장이 될 때까지 아무도 손패를 완성하지 못하면 [[draw]]입니다.',
        over: '유국이 되면 이긴 사람 없이 그 판이 끝납니다.'
      }
    },
    turn: {
      title: '차례',
      summary: '뽑고 버리기',
      beats: {
        draw: '내 차례가 되면 [[wall]]에서 패 1장을 뽑습니다. 뽑은 패는 [[hand]] 오른쪽에 조금 떨어져 놓입니다.',
        full: '이때 손패는 14장입니다.',
        discard: '그다음 패 1장을 골라 버립니다. 버린 패는 내 앞에 놓입니다.',
        back: '버리고 나면 손패는 다시 13장이 됩니다.',
        next: '이제 [[shimocha]]의 차례입니다.',
        order: '차례는 하가, [[toimen]], [[kamicha]] 순서로 돌아 다시 나에게 옵니다.',
        pick1: '패 1장을 골라 버리세요.',
        pick2: '이번에는 방금 뽑은 패를 버리세요.'
      },
      notes: {
        pick1: { any: '버린 패가 내 앞에 놓였습니다.' },
        pick2: {
          drawn: '방금 뽑은 패를 그대로 버렸습니다.',
          other: '고른 패는 {tile}입니다. 방금 뽑은 패는 손패 오른쪽에 떨어져 있습니다.'
        }
      }
    },
    dora: {
      title: '도라',
      summary: '도라 표시패의 다음 패',
      beats: {
        indicator: '보드 왼쪽 위에 앞면으로 놓인 패를 [[indicator]]라고 합니다.',
        next: '도라 표시패의 다음 패가 [[dora]]입니다. 3통이 표시되면 4통이 도라입니다.',
        notItself: '도라 표시패와 같은 패는 도라가 아닙니다.',
        bonus: '도라는 [[hand]]를 완성했을 때 점수를 올려 주는 보너스 패입니다.',
        wrap: '[[suited]]는 9 다음이 1입니다. 9만이 표시되면 1만이 도라입니다.',
        winds: '[[winds]]는 동·남·서·북 순서로 돕니다. 북 다음은 다시 동입니다.',
        dragons: '[[dragons]]는 백·발·중 순서로 돕니다. 중 다음은 다시 백입니다.',
        pick1: '도라를 골라 보세요.',
        pick2: '도라를 골라 보세요.',
        pick3: '도라를 골라 보세요.'
      },
      notes: {
        pick1: {
          dora: '4삭 다음 패인 5삭이 도라입니다.',
          indicator: '4삭은 도라 표시패와 같은 패입니다. 도라는 그다음 패입니다.',
          other: '고른 패는 {tile}입니다. 4삭 다음 패를 찾으세요.'
        },
        pick2: {
          dora: '9 다음은 1이라 1통이 도라입니다.',
          indicator: '9통은 도라 표시패와 같은 패입니다. 9 다음은 1입니다.',
          other: '고른 패는 {tile}입니다. 9통 다음 패를 찾으세요.'
        },
        pick3: {
          dora: '중 다음은 백이라 백이 도라입니다.',
          indicator: '중은 도라 표시패와 같은 패입니다. 중 다음은 백입니다.',
          other: '고른 패는 {tile}입니다. 중 다음 패를 찾으세요.'
        }
      }
    },
    shape: {
      title: '화료 모양',
      summary: '몸통 4개와 머리 1개',
      beats: {
        agari: '[[hand]]를 완성하는 것을 [[agari]]라고 합니다. 먼저 화료한 사람이 점수를 얻습니다.',
        goal: '완성된 손패는 [[meld]] 4개와 [[pair]] 1개로 이루어집니다.',
        meld: '몸통은 패 3장으로 만든 묶음입니다.',
        pair: '머리는 같은 패 2장으로 만든 묶음입니다.',
        total: '몸통 4개는 12장, 머리 1개는 2장이라 합치면 14장입니다.',
        hand: '이 손패는 14장이 모두 몸통과 머리로 나뉩니다. 그래서 화료입니다.',
        kinds: '몸통에는 [[run]]와 [[triplet]], 두 가지가 있습니다.'
      }
    },
    runs: {
      title: '슌쯔',
      summary: '이어지는 숫자 3장',
      beats: {
        run: '[[run]]는 같은 종류의 [[suited]] 3장이 숫자 순서대로 이어진 [[meld]]입니다.',
        mixed: '[[man]]·[[pin]]·[[sou]]을 섞으면 슌쯔가 아닙니다.',
        gap: '135처럼 숫자를 건너뛰어도 슌쯔가 아닙니다.',
        honorRun: '[[honor]]는 숫자가 없어서 슌쯔를 만들 수 없습니다.',
        wrap: '[[dora]]와 달리 9 다음 1로는 이어지지 않습니다.',
        ...everyDrill('슌쯔에 쓰지 않는 패 1장을 버리세요.')
      },
      notes: everyDrill({
        loose: '고른 패는 {tile}입니다. 어느 슌쯔에도 들지 않는 패입니다.',
        other: '고른 패는 {tile}입니다. 슌쯔에 쓰이는 패입니다.'
      })
    },
    triplets: {
      title: '커쯔',
      summary: '같은 패 3장',
      beats: {
        triplet: '[[triplet]]는 같은 패 3장으로 만든 [[meld]]입니다.',
        honor: '[[honor]]도 같은 패 3장을 모으면 커쯔가 됩니다.',
        broken: '숫자나 종류가 하나라도 다르면 커쯔가 아닙니다.',
        ...everyDrill('커쯔에 쓰지 않는 패 1장을 버리세요.')
      },
      notes: everyDrill({
        loose: '고른 패는 {tile}입니다. 어느 커쯔에도 들지 않는 패입니다.',
        other: '고른 패는 {tile}입니다. 커쯔에 쓰이는 패입니다.'
      })
    },
    pairs: {
      title: '머리',
      summary: '같은 패 2장',
      beats: {
        pair: '[[pair]]는 같은 패 2장입니다. [[suited]]든 [[honor]]든 상관없습니다.',
        one: '완성된 [[hand]]에는 머리가 꼭 1개 있습니다.',
        broken: '숫자나 종류가 다르면 머리가 아닙니다.',
        ...everyDrill('짝이 없는 패 1장을 버리세요.')
      },
      notes: everyDrill({
        loose: '고른 패는 {tile}입니다. 같은 패가 1장뿐이라 머리가 될 수 없습니다.',
        other: '고른 패는 {tile}입니다. 같은 패가 2장 있어 머리가 될 수 있습니다.'
      })
    },
    split: {
      title: '손패 나누기',
      summary: '몸통과 머리 찾기',
      beats: {
        split: '[[hand]]를 [[meld]]과 [[pair]]로 나누어 보면 얼마나 완성되었는지 알 수 있습니다.',
        loose: '이 손패에서는 9통이 어느 묶음에도 들어가지 않습니다. 이런 패는 버리는 것이 좋습니다.',
        ...everyDrill('몸통과 머리에 쓰지 않는 패 1장을 버리세요.')
      },
      notes: {
        ...everyDrill({ loose: '고른 패는 {tile}입니다. 몸통에도 머리에도 들지 않는 패입니다.', other: IN_MELD }),
        pick1: {
          loose: '손패에 7통과 8통이 없어서 9통은 몸통이 되지 않습니다.',
          other: IN_MELD
        }
      }
    },
    tenpai: {
      title: '텐파이',
      summary: '1장 남은 손패',
      beats: {
        ready: '패 1장만 더 있으면 [[agari]]하는 상태를 [[tenpai]]라고 합니다.',
        readyWait: '지금 [[hand]]는 [[meld]] 3개와 같은 패 2쌍입니다. 동이나 백이 오면 화료합니다.',
        east: '동이 오면 동 3장이 [[triplet]]가 되고, 백 2장이 [[pair]]가 됩니다.',
        ...everyDrill(MAKE_TENPAI)
      },
      notes: {
        pick1: {
          tenpai: '89삭에 7삭이 오면 [[run]]가 되어 화료합니다.',
          other: NOT_TENPAI
        },
        pick2: {
          tenpai: '24삭에 3삭이 오면 슌쯔가 되어 화료합니다.',
          other: NOT_TENPAI
        },
        pick3: {
          tenpai: '9삭이나 동이 오면 커쯔가 되어 화료합니다.',
          other: NOT_TENPAI
        },
        pick4: {
          tenpai: '23통에 1통이나 4통이 오면 슌쯔가 되어 화료합니다.',
          other: NOT_TENPAI
        },
        pick5: {
          tenpai: '89통에 7통이 오면 슌쯔가 되어 화료합니다.',
          other: NOT_TENPAI
        }
      }
    },
    taatsu: {
      title: '타쯔',
      summary: '1장 모자란 몸통',
      beats: {
        taatsu: '1장만 더 오면 [[run]]가 되는 패 2장을 [[taatsu]]라고 합니다.',
        ryanmen: '34통은 2통이 오면 234통, 5통이 오면 345통 슌쯔가 됩니다. 이렇게 [[hand]]를 [[agari]]에 가깝게 만드는 패를 [[ukeire]]라고 합니다.',
        kanchan: '79통처럼 1칸 떨어진 2장은 가운데 8통만 유효패입니다.',
        penchan: '12삭은 유효패가 3삭뿐입니다. 1 앞에는 숫자가 없기 때문입니다. 89도 유효패가 7뿐입니다.',
        toitsu: '같은 패 2장은 [[toitsu]]라고 합니다. 1장 더 오면 [[triplet]]가 되고, 그대로 [[pair]]로 쓸 수도 있습니다.',
        pick1: '2삭이나 5삭이 오면 슌쯔가 되는 타쯔의 패 1장을 골라 보세요.',
        pick2: '6통이 오면 슌쯔가 되는 타쯔의 패 1장을 골라 보세요.',
        pick3: '7삭이 오면 슌쯔가 되는 타쯔의 패 1장을 골라 보세요.',
        pick4: '5만이나 8만이 오면 슌쯔가 되는 타쯔의 패 1장을 골라 보세요.',
        pick5: '3삭이 오면 슌쯔가 되는 타쯔의 패 1장을 골라 보세요.'
      },
      notes: {
        ...everyDrill(SECOND_SHAPE_NOTES),
        pick1: FIRST_SHAPE_NOTES,
        pick2: FIRST_SHAPE_NOTES
      }
    },
    blocks: {
      title: '5블록',
      summary: '블록 5개 갖추기',
      beats: {
        five: '[[agari]] [[hand]]는 [[meld]] 4개와 [[pair]] 1개, 묶음 5개로 이루어집니다.',
        block: '몸통과 [[taatsu]], [[toitsu]]를 [[block]]이라고 합니다.',
        count: '이 손패는 몸통 2개, 타쯔 2개, 또이쯔 1개로 블록이 5개입니다.',
        theory: '손패를 블록 5개로 나누어 [[build]]하는 방법을 [[fiveBlocks]]이라고 합니다.',
        grow: '타쯔가 모두 몸통이 되고 또이쯔가 머리로 남으면 화료입니다.',
        loose: '블록이 5개면, 블록에 들지 않는 패는 화료에 쓰이지 않습니다. 이런 패부터 버립니다.',
        ...everyDrill(LOOSE_FIRST)
      },
      notes: everyDrill({ loose: '고른 패는 {tile}입니다. 블록 5개에 들지 않는 패입니다.', other: IN_BLOCK })
    },
    isolated: {
      title: '고립패',
      summary: '버리는 순서',
      beats: {
        isolated: '어느 [[block]]에도 들지 않는 패를 [[isolated]]라고 합니다.',
        short: '이 [[hand]]는 블록이 4개뿐입니다. 고립패 1장을 [[taatsu]]로 키워 블록 5개를 채워야 합니다.',
        honor: '[[honor]]는 같은 패가 와야만 블록이 됩니다. [[ukeire]]가 1종류뿐입니다.',
        terminal: '1과 9는 유효패가 3종류입니다.',
        edge: '2와 8은 유효패가 4종류입니다.',
        middle: '3부터 7까지는 유효패가 5종류입니다.',
        order: '그래서 자패, 1과 9, 2와 8 순서로 버리고 가운데 [[suited]]를 남깁니다.',
        ...everyDrill('고립패 1장을 버리세요.')
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
      title: '블록 정리',
      summary: '6블록일 때',
      beats: {
        six: '이 [[hand]]는 [[block]]이 6개입니다. [[agari]]에 쓰는 블록은 5개라 1개가 남습니다.',
        count: '34통은 [[ukeire]]가 2종류 8장입니다. 79통과 12삭은 1종류 4장입니다.',
        weak: '그래서 유효패가 적은 [[taatsu]]를 버려 블록을 5개로 줄입니다.',
        head: '[[toitsu]]가 1개뿐이면 [[pair]]로 남겨 둡니다.',
        one: '타쯔는 1장씩 버려 정리합니다. 남은 1장은 [[isolated]]가 됩니다.',
        ...everyDrill(TRIM_TO_FIVE)
      },
      notes: everyDrill(TRIM_NOTES)
    },
    menzen: {
      title: '멘젠 조패',
      summary: '뽑고 버리며 텐파이',
      beats: {
        menzen: '다른 사람이 버린 패로 [[meld]]을 만들지 않고, 직접 뽑은 패로 [[hand]]를 만드는 것을 [[menzen]]이라고 합니다.',
        turn: '차례마다 1장 뽑고 1장 버리며, [[block]] 5개를 몸통 4개와 [[pair]] 1개로 바꿔 갑니다.',
        order: '버릴 패는 [[isolated]]부터 고릅니다. 고립패가 없는데 블록이 6개라면 [[ukeire]]가 적은 [[taatsu]]를 정리합니다.',
        ...everyDrill('패 1장을 버리세요.'),
        pick5: '[[tenpai]]가 되도록 패 1장을 버리세요.'
      },
      notes: {
        pick1: isolatedNotes(HONOR_LOOSE),
        pick2: isolatedNotes(HONOR_LOOSE),
        pick3: isolatedNotes(TERMINAL_LOOSE),
        pick4: isolatedNotes(EDGE_LOOSE),
        pick5: {
          loose: '텐파이입니다. 78통에 6통이나 9통이 오면 [[agari]]합니다.',
          other: NOT_TENPAI
        }
      }
    },
    waits: {
      title: '대기패',
      summary: '화료하게 하는 패',
      beats: {
        wait: '[[tenpai]] [[hand]]를 [[agari]]하게 하는 패를 [[wait|대기패]]라고 합니다.',
        waitHere: '이 손패는 34삭에 2삭이나 5삭이 오면 [[run]]가 되어 화료합니다. 그래서 대기패는 2삭과 5삭입니다.',
        shapes: '남은 패의 모양에 따라 대기패가 달라집니다. 대기 모양은 [[ryanmen]]·[[kanchan]]·[[penchan]]·[[tanki]]·[[shanpon]], 다섯 가지입니다.',
        strongest: '그중 가장 강력한 모양은 양면입니다. 다음 레슨에서 양면을 배웁니다.'
      }
    },
    ryanmen: {
      title: '양면',
      summary: '양쪽 끝 기다리기',
      beats: {
        ryanmen: '[[ryanmen]]은 숫자가 이어진 [[suited]] 2장으로 양쪽 끝을 기다리는 모양입니다. 12와 89는 한쪽 끝이 없어 양면이 아닙니다.',
        how: '34삭은 2삭이 오면 234삭, 5삭이 오면 345삭 [[run]]가 됩니다.',
        wide: '[[wait]]는 2종류, 최대 8장입니다. 다섯 모양 중 가장 많습니다.',
        compare: '[[kanchan]]인 35삭은 4삭 1종류만 기다립니다. 그래서 같은 [[tenpai]]라면 양면을 남깁니다.',
        ...everyDrill('양면 대기가 남도록 패 1장을 버리세요.')
      },
      notes: {
        pick1: {
          ryanmen: '34삭 양면이 남았습니다. 대기패는 2삭과 5삭입니다.',
          kanchan: '3삭을 버리면 46삭 간짱이 남습니다. 대기패가 5삭뿐입니다.',
          other: NOT_TENPAI
        },
        pick2: {
          ryanmen: '56만 양면이 남았습니다. 대기패는 4만과 7만입니다.',
          kanchan: '5만을 버리면 68만 간짱이 남습니다. 대기패가 7만뿐입니다.',
          other: NOT_TENPAI
        },
        pick3: {
          ryanmen: '67삭 양면이 남았습니다. 대기패는 5삭과 8삭입니다.',
          kanchan: '6삭을 버리면 79삭 간짱이 남습니다. 대기패가 8삭뿐입니다.',
          other: NOT_TENPAI
        },
        pick4: {
          ryanmen: '45삭 양면이 남았습니다. 대기패는 3삭과 6삭입니다.',
          kanchan: '4삭을 버리면 57삭 간짱이 남습니다. 대기패가 6삭뿐입니다.',
          other: NOT_TENPAI
        },
        pick5: {
          ryanmen: '23통 양면이 남았습니다. 대기패는 1통과 4통입니다.',
          kanchan: '2통을 버리면 35통 간짱이 남습니다. 대기패가 4통뿐입니다.',
          other: NOT_TENPAI
        }
      }
    },
    compare: {
      title: '대기 비교',
      summary: '대기패가 많은 쪽 고르기',
      beats: {
        two: '버려서 [[tenpai]]가 되는 패가 2가지일 때가 있습니다.',
        ryanmen: '3삭을 버리면 56삭 [[ryanmen]]이 남습니다. [[wait]]는 4삭과 7삭입니다.',
        kanchan: '6삭을 버리면 35삭 [[kanchan]]이 남습니다. 대기패는 4삭뿐입니다.',
        count: '같은 패는 4장씩이라 양면은 최대 8장, 간짱은 최대 4장을 기다립니다.',
        more: '대기패가 많을수록 [[agari]]하기 쉽습니다. 그래서 대기패가 많은 쪽을 남깁니다.',
        held: '[[hand]]에 이미 있는 대기패는 장수에서 뺍니다. [[shanpon]]는 최대 4장, [[tanki]]는 최대 3장입니다.',
        indicator: '[[indicator]]로 [[seen|보이는]] 대기패도 장수에서 뺍니다. 7삭이 보여서 56삭의 대기패는 최대 7장입니다.',
        ...everyDrill(WIDER)
      },
      notes: {
        pick1: {
          ryanmen: '34삭 양면이 남았습니다. 대기패는 2삭과 5삭, 최대 8장입니다.',
          kanchan: '4삭을 버리면 13삭 간짱이 남습니다. 대기패는 2삭, 최대 4장입니다.',
          other: NOT_TENPAI
        },
        pick2: {
          ryanmen: '56삭 양면이 남았습니다. 대기패는 4삭과 7삭, 최대 8장입니다.',
          shanpon: '5삭을 버리면 6삭과 동의 샤보가 남습니다. 대기패는 최대 4장입니다.',
          other: NOT_TENPAI
        },
        pick3: {
          kanchan: '동 2장이 [[pair]]가 되고 57삭 간짱이 남았습니다. 대기패는 6삭, 최대 4장입니다.',
          tanki: '5삭이나 7삭을 버리면 단기가 남습니다. 대기패는 최대 3장입니다.',
          other: NOT_TENPAI
        },
        pick4: {
          ryanmen: '34만 양면이 남았습니다. 대기패는 2만과 5만, 최대 8장입니다.',
          kanchan: '3만을 버리면 46만 간짱이 남습니다. 대기패는 5만, 최대 4장입니다.',
          other: NOT_TENPAI
        },
        pick5: {
          ryanmen: '78통 양면이 남았습니다. 대기패는 6통과 9통, 최대 8장입니다.',
          kanchan: '8통을 버리면 57통 간짱이 남습니다. 대기패는 6통, 최대 4장입니다.',
          other: NOT_TENPAI
        }
      }
    },
    riichi: {
      title: '리치',
      summary: '텐파이 선언',
      beats: {
        tenpai: '[[tenpai]]가 되면 [[riichi]]를 선언할 수 있습니다.',
        what: '리치는 텐파이라고 알리는 선언입니다. 리치를 하고 [[agari]]하면 점수가 올라갑니다.',
        declare: '[[toimen]]이 리치를 선언했습니다. 대면 이름표에 리치 표시가 켜졌습니다.',
        sideways: '리치를 선언하며 버린 패는 옆으로 눕혀 놓습니다. 이 패를 [[declare]]라고 합니다.'
      }
    },
    tsumogiri: {
      title: '리치 후',
      summary: '손패 고정',
      beats: {
        lock: '[[riichi]]를 선언하면 [[hand]]를 더 이상 바꿀 수 없습니다.',
        tsumogiri: '그래서 뽑은 패로 [[agari]]하지 못하면 그 패를 그대로 버립니다.',
        name: '뽑은 패를 그대로 버리는 것을 [[tsumogiri]]라고 합니다.'
      }
    },
    tsumo: {
      title: '쯔모',
      summary: '내가 뽑은 패로 화료',
      beats: {
        tsumo: '[[tsumo]]는 내가 뽑은 패로 [[agari]]하는 것입니다.',
        complete: '34삭에 5삭을 뽑아 [[hand]]가 완성되었습니다.',
        pay: '쯔모하면 다른 세 사람이 점수를 나누어 냅니다.'
      }
    },
    ron: {
      title: '론',
      summary: '남이 버린 패로 화료',
      beats: {
        ron: '[[ron]]은 다른 사람이 버린 패로 [[agari]]하는 것입니다.',
        anyone: '[[shimocha]]·[[toimen]]·[[kamicha]] 누가 버린 패든 론할 수 있습니다.'
      }
    },
    dealin: {
      title: '방총',
      summary: '내 패로 방총당하기',
      beats: {
        dealIn: '내가 버린 패로 다른 사람이 [[ron]]하는 것을 [[dealIn]]이라고 합니다.',
        pay: '방총당하면 그 점수를 나 혼자 모두 냅니다.',
        avoid: '그래서 상대가 [[tenpai]]일 때는 상대의 [[wait]]를 버리지 않아야 합니다.'
      }
    },
    reading: {
      title: '대기 피하기',
      summary: '대기패가 아닌 패 버리기',
      beats: {
        reveal: '[[toimen]]의 [[hand]]를 공개합니다.',
        waits: '대면은 23삭 [[ryanmen]]입니다. 1삭이나 4삭이 오면 [[agari]]합니다.',
        ...everyDrill('대면에게 [[dealIn]]당하지 않는 패 1장을 버리세요.')
      },
      notes: everyDrill({
        safe: '고른 패는 대면의 대기패가 아닙니다.',
        dealIn: '고른 패는 대면의 대기패입니다. 대면이 론합니다.'
      })
    },
    furiten: {
      title: '후리텐',
      summary: '자기 버림패로는 론 불가',
      beats: {
        furiten: '자기 [[wait]]를 이미 버린 상태를 [[furiten]]이라고 합니다.',
        rule: '후리텐이면 [[ron]]할 수 없습니다. [[tsumo]]로만 [[agari]]할 수 있습니다.',
        discarded: '[[toimen]]은 [[riichi]] 전에 1삭을 버렸습니다.',
        noRon: '1삭은 대면의 대기패입니다. 대기패를 하나라도 버렸으면 다른 대기패로도 론할 수 없습니다. 그래서 대면은 4삭으로도 론할 수 없습니다.',
        pickFuriten: '4삭을 버리세요.'
      },
      notes: {
        pickFuriten: {
          furiten: '대면은 후리텐이라 4삭으로 론할 수 없습니다.',
          other: '고른 패는 {tile}입니다. 4삭을 찾으세요.'
        }
      }
    },
    genbutsu: {
      title: '현물',
      summary: '리치한 사람이 버린 패',
      beats: {
        hidden: '실전에서는 상대의 [[hand]]를 볼 수 없습니다.',
        visible: '하지만 상대가 버린 패는 볼 수 있습니다.',
        genbutsu: '[[riichi]]한 사람이 버린 패로는 [[dealIn]]당하지 않습니다. 그 패로는 [[furiten]]이라 [[ron]]할 수 없기 때문입니다.',
        name: '리치한 사람이 이미 버린 패를 [[genbutsu]]이라고 합니다. 가장 안전한 패입니다.',
        pick: '[[toimen]]의 현물 1장을 버리세요.'
      },
      notes: {
        pick: {
          genbutsu: '대면이 이미 버린 패입니다.',
          furiten: '4삭도 후리텐이라 안전하지만, 대면이 버린 패는 아닙니다.',
          other: '고른 패는 {tile}입니다. 대면이 버린 패가 아닙니다.'
        }
      }
    },
    betaori: {
      title: '베타오리',
      summary: '화료보다 수비',
      beats: {
        riichi: '[[toimen]]이 [[riichi]]했습니다. 내 [[hand]]는 아직 [[tenpai]]가 아닙니다.',
        betaori: '이럴 때는 [[agari]]를 포기하고 [[dealIn]]당하지 않는 데만 집중할 수 있습니다. 이런 수비를 [[betaori]]라고 합니다.',
        build: '[[build]]만 생각하면 북이나 9통을 버립니다. 하지만 둘 다 대면의 [[genbutsu]]이 아닙니다.',
        safe: '3만은 대면이 버린 현물입니다. 베타오리할 때는 [[meld]]이 깨져도 3만을 버립니다.',
        turns: '남은 [[turn|순]]만큼 [[safeTile]]가 있으면 끝까지 버틸 수 있습니다.',
        ...everyDrill('베타오리하세요.')
      },
      notes: everyDrill(BETAORI_NOTES)
    },
    passed: {
      title: '넘긴 패',
      summary: '리치 뒤 론하지 않은 패',
      beats: {
        river: '[[riichi]]한 사람이 버린 패는 그 사람에게 [[genbutsu]]입니다.',
        passed: '[[toimen]]이 리치한 뒤 [[kamicha]]가 백을 버렸습니다. 대면은 [[ron]]하지 않았습니다.',
        furiten: '리치한 사람은 [[wait]]를 한 번 놓치면 그 판 내내 [[furiten]]입니다. 그래서 대면은 앞으로 백으로 론할 수 없습니다.',
        anyone: '이렇게 리치 뒤에 론하지 않고 넘긴 패도 현물이 됩니다. 누가 버렸든 마찬가지입니다.',
        before: '리치하기 전에 다른 사람이 버린 패는 현물이 아닙니다.',
        only: '현물은 리치한 그 사람에게만 안전합니다.',
        ...everyDrill('대면의 [[genbutsu]] 1장을 버리세요.')
      },
      notes: {
        pick1: passedNote('상가가 리치 뒤에 버린 9통입니다. 대면은 론하지 않았습니다.'),
        pick2: passedNote('[[shimocha]]가 리치 뒤에 버린 5만입니다. 대면은 론하지 않았습니다.'),
        pick3: passedNote('내가 리치 뒤에 버린 2삭입니다. 대면은 론하지 않았습니다.'),
        pick4: passedNote('하가가 리치 뒤에 버린 1통입니다. 대면은 론하지 않았습니다.'),
        pick5: passedNote('상가가 리치 뒤에 버린 북입니다. 대면은 론하지 않았습니다.')
      }
    },
    honor: {
      title: '자패',
      summary: '보이는 장수 세기',
      beats: {
        none: '[[genbutsu]]이 없다면, [[honor]]를 찾아봅시다.',
        shapes: '[[honor]]는 숫자가 없어 [[ryanmen]]이 될 수 없습니다. [[tanki]]와 [[shanpon]]로만 기다립니다.',
        count: '그래서 자패는 몇 장 [[seen|보이는지]] 셉니다. [[discard]]와 내 [[hand]], [[indicator]]를 모두 합칩니다. 북은 3장 보입니다.',
        three: '3장 보이면 남은 1장으로는 샤보가 되지 않습니다. 단기로만 [[dealIn]]당합니다.',
        one: '중은 내 손패 1장 말고는 보이지 않습니다. 단기와 샤보가 모두 남아 위험합니다.',
        late: '보이지 않는 자패는 후반으로 갈수록 더 위험해집니다.',
        ...everyDrill('가장 많이 보이는 [[honor]] 1장을 버리세요.')
      },
      notes: everyDrill({
        three: '고른 패는 {tile}입니다. 3장 보여 [[tanki]]로만 방총당합니다.',
        two: '고른 패는 {tile}입니다. 2장 보여 [[shanpon]]로도 방총당할 수 있습니다.',
        one: '고른 패는 {tile}입니다. 내 손패 말고는 보이지 않습니다.',
        other: '고른 패는 {tile}입니다. 자패가 아닙니다.'
      })
    },
    suji: {
      title: '스지',
      summary: '현물에서 세 칸',
      beats: {
        none: '[[genbutsu]]과 [[honor]]가 없다면, [[suji]]를 찾아봅시다.',
        genbutsu: '4만은 [[toimen]]의 [[genbutsu]]입니다.',
        ryanmen: '대면이 23만 [[ryanmen]]이면 1만과 4만을, 56만 양면이면 4만과 7만을 기다립니다.',
        furiten: '어느 쪽이든 [[wait]]인 4만을 버렸으니 [[furiten]]입니다. 1만이나 7만으로 [[ron]]할 수 없습니다.',
        suji: '그래서 1만과 7만은 양면으로는 [[dealIn]]당하지 않습니다. 이렇게 현물에서 세 칸 떨어진 패를 [[suji]]라고 합니다.',
        lines: '1, 4, 7 / 2, 5, 8 / 3, 6, 9가 서로 스지입니다.',
        outer: '현물 1장으로 양면이 모두 막히는 스지는 4, 5, 6을 제외한 패뿐입니다.',
        middle: '1만이 현물이어도 4만은 56만 [[ryanmen]]이 남아 있습니다. 4, 5, 6은 무턱대고 버리면 안 됩니다.',
        limit: '스지는 양면만 막습니다. [[kanchan]]·[[penchan]]·[[tanki]]·[[shanpon]] 대기로는 방총당할 수 있습니다.',
        ...everyDrill('스지 덕분에 [[ryanmen]]으로 방총당하지 않는 패 1장을 버리세요.')
      },
      notes: {
        pick1: sujiNote('4만에서 세 칸 떨어진 7만은 스지입니다.'),
        pick2: sujiNote('5통에서 세 칸 떨어진 8통은 스지입니다.'),
        pick3: sujiNote('6삭에서 세 칸 떨어진 9삭은 스지입니다.'),
        pick4: sujiNote('5만에서 세 칸 떨어진 2만은 스지입니다.'),
        pick5: sujiNote('4통에서 세 칸 떨어진 1통은 스지입니다.')
      }
    },
    nakasuji: {
      title: '나카스지',
      summary: '양쪽 스지가 현물인 패',
      beats: {
        two: '4, 5, 6은 [[ryanmen]] 두 가지의 [[wait]]입니다. 5만은 34만 양면과 67만 양면이 모두 기다립니다.',
        sources: '[[toimen]]은 2만과 8만을 모두 버렸습니다.',
        naka: '그래서 두 양면 모두 [[furiten]]입니다. 이렇게 양쪽 [[suji]]가 모두 [[genbutsu]]인 패를 [[nakaSuji]]라고 합니다.',
        kata: '5통은 2통만 현물입니다. 34통 양면은 막혔지만 67통 양면이 남아 있습니다. 이렇게 한쪽 스지만 현물인 패를 [[kataSuji]]라고 합니다.',
        danger: '[[kataSuji]]는 [[nakaSuji]]에 비해 매우 위험합니다. 5만은 양면이 모두 막혔지만, 5통은 67통 양면이 남아 있습니다.',
        lines: '4는 1과 7, 5는 2와 8, 6은 3과 9가 모두 현물이어야 나카스지입니다.',
        check: '1과 7 중 한쪽만 현물이면 4는 카타스지입니다. 둘 다 현물인지 확인해야 합니다.',
        ...everyDrill('대면의 [[nakaSuji]] 1장을 버리세요.')
      },
      notes: {
        pick1: nakaNote('2만과 8만이 모두 현물이라 5만은 나카스지입니다.'),
        pick2: nakaNote('3만과 9만이 모두 현물이라 6만은 나카스지입니다.'),
        pick3: nakaNote('1통과 7통이 모두 현물이라 4통은 나카스지입니다.'),
        pick4: nakaNote('2통과 8통이 모두 현물이라 5통은 나카스지입니다.'),
        pick5: nakaNote('3삭과 9삭이 모두 현물이라 6삭은 나카스지입니다.')
      }
    },
    kabe: {
      title: '벽',
      summary: '4장 모두 보인 패',
      beats: {
        none: '[[genbutsu]]과 [[honor]]가 없다면, [[suji]]보다 먼저 [[kabe]]을 찾아봅시다.',
        four: '같은 패가 4장 모두 [[seen|보이면]] 그 패를 [[kabe]]이라고 합니다. [[discard]]와 내 [[hand]], [[indicator]]를 합쳐 셉니다.',
        blocked: '3삭이 더 남아 있지 않아 23삭 [[ryanmen]]과 34삭 양면을 만들 수 없습니다.',
        safe: '그래서 1삭과 2삭은 양면으로 [[dealIn]]당하지 않습니다.',
        kanchan: '2삭은 13삭 [[kanchan]]도 막힙니다.',
        weak: '4가 벽이어도 1은 23 [[ryanmen]]이 남아 안전하지 않습니다.',
        strong: '그래서 벽은 2, 3, 7, 8일 때 강력합니다.',
        pairs: '[[tanki]]와 [[shanpon]]는 벽으로 막을 수 없습니다.',
        ...everyDrill('벽 덕분에 [[ryanmen]]으로 방총당하지 않는 패 1장을 버리세요.')
      },
      notes: {
        pick1: kabeNote('7통이 벽이라 8통과 9통은 양면으로 방총당하지 않습니다.'),
        pick2: kabeNote('2삭이 벽이라 1삭은 양면으로 방총당하지 않습니다.'),
        pick3: kabeNote('3만이 벽이라 2만은 양면으로 방총당하지 않습니다.'),
        pick4: kabeNote('7삭이 벽이라 8삭과 9삭은 양면으로 방총당하지 않습니다.'),
        pick5: kabeNote('8만이 벽이라 9만은 양면으로 방총당하지 않습니다.')
      }
    },
    safety: {
      title: '안전도',
      summary: '현물부터 위험패까지',
      beats: {
        fewer: '[[safeTile]]가 없으면 남은 [[wait|대기]]가 적은 패부터 고릅니다.',
        order: '대체로 [[genbutsu]]·[[honor]]·[[kabe]]·[[suji]]·[[noSuji]] 순서로 위험해집니다.',
        suji: '스지 중에서는 [[nakaSuji]]가 [[kataSuji]]보다 안전합니다. 5만은 나카스지, 6통은 카타스지입니다.',
        honor: '[[honor]]는 [[seen|보이는]] 장수에 따라 크게 달라집니다. 내 [[hand]] 말고는 보이지 않는 자패는 [[nakaSuji]]보다 위험합니다.',
        ...everyDrill('가장 안전한 패 1장을 버리세요.')
      },
      notes: everyDrill(SAFETY_NOTES),
      outranked: OUTRANKED
    },
    order: {
      title: '버리는 순서',
      summary: '안전한 패부터',
      beats: {
        first: '가장 안전한 패부터 버립니다. 9삭은 [[toimen]]의 [[genbutsu]]입니다.',
        save: '2만은 [[suji]]지만 아직 버리지 않습니다. [[genbutsu]]이 남아 있으면 현물부터 버립니다.',
        later: '한 [[turn|순]]이 지나자 [[shimocha]]가 2만을 버렸습니다. 2만도 이제 현물입니다. 이렇게 [[safeTile]]는 늘어날 수 있습니다.',
        narrow: '현물이 늘어날수록 아직 통하지 않은 패는 더 위험해집니다. 남은 [[wait|대기]]가 그만큼 좁혀지기 때문입니다.',
        ...everyDrill('가장 안전한 패 1장을 버리세요.')
      },
      notes: everyDrill(SAFETY_NOTES),
      outranked: OUTRANKED
    },
    chase: {
      title: '추격 리치',
      summary: '리치가 둘일 때',
      beats: {
        two: '[[toimen]]에 이어 [[kamicha]]도 [[riichi]]했습니다. 리치가 둘이면 두 사람 모두에게 [[dealIn]]당하지 않는 패만 [[safeTile]]입니다.',
        one: '2통은 대면의 [[genbutsu]]이지만 상가에게는 아닙니다.',
        both: '8삭은 대면과 상가가 모두 버렸습니다. 두 사람 모두에게 현물입니다.',
        declare: '상가의 [[declare]] 5통을 대면은 [[ron]]하지 않았습니다. 그래서 5통은 두 사람 모두에게 현물입니다.',
        after: '두 번째 리치 뒤에 둘 다 론하지 않은 패도 두 사람 모두에게 현물입니다.',
        ...everyDrill('두 사람 모두의 [[genbutsu]] 1장을 버리세요.')
      },
      notes: {
        pick1: chaseNote('8통은 대면과 상가가 모두 버린 패입니다.'),
        pick2: chaseNote('2통은 상가의 선언패입니다. 대면이 론하지 않았습니다.'),
        pick3: chaseNote('상가의 리치 뒤에 [[shimocha]]가 버린 1삭입니다. 둘 다 론하지 않았습니다.'),
        pick4: chaseNote('상가의 리치 뒤에 내가 버린 2삭입니다. 둘 다 론하지 않았습니다.'),
        pick5: chaseNote('상가가 리치 뒤에 버린 4삭입니다. 대면도 론하지 않았습니다.')
      }
    },
    shared: {
      title: '공통과 따로',
      summary: '벽·자패는 공통, 스지는 따로',
      beats: {
        shared: '[[kabe]]과 [[honor]]의 장수는 두 사람에게 똑같이 적용됩니다. 3삭이 벽이라 2삭은 두 사람 모두에게 [[ryanmen]]으로 [[dealIn]]당하지 않습니다. 북은 두 사람 모두에게 3장 [[seen|보이는]] 자패입니다.',
        apart: '[[suji]]는 사람마다 따로 봅니다. 7만은 [[toimen]]에게는 스지지만 [[kamicha]]에게는 아닙니다.',
        double: '대면과 상가가 모두 4통을 버려, 1통은 두 사람 모두에게 스지입니다.',
        better: '9삭은 대면에게만 [[genbutsu]]이고 상가에게는 위험합니다. 한 사람에게만 현물인 패보다, 두 사람 모두에게 스지인 패가 나을 수 있습니다.',
        ...everyDrill('두 사람 모두에게 가장 안전한 패 1장을 버리세요.')
      },
      notes: everyDrill({
        double: '고른 패는 {tile}, 두 사람 모두에게 스지입니다.',
        kabe: '고른 패는 {tile}입니다. 벽은 두 사람 모두에게 통합니다.',
        honor: '고른 패는 {tile}입니다. 자패의 장수는 두 사람 모두에게 통합니다.',
        one: '고른 패는 {tile}입니다. 한 사람에게만 현물이라 다른 사람에게는 위험합니다.',
        half: '고른 패는 {tile}입니다. 한 사람에게만 스지입니다.'
      }),
      outranked: OUTRANKED
    },
    keep: {
      title: '남길 현물',
      summary: '추격 리치 대비',
      beats: {
        two: '[[toimen]]의 [[genbutsu]]이 [[hand]]에 두 가지 있습니다. 9삭과 2통입니다.',
        keep: '9삭은 [[shimocha]]도 버린 패입니다. 하가가 [[chase]]를 해도 9삭은 하가의 현물입니다.',
        first: '[[safeTile]]가 여러 장이면 다른 사람의 현물이기도 한 패를 남겨 둡니다. 그래서 2통부터 버립니다.',
        ...everyDrill('추격 리치에 대비해 대면의 [[genbutsu]] 1장을 버리세요.')
      },
      notes: everyDrill({
        first: '고른 패는 {tile}입니다. 대면에게만 현물인 패입니다.',
        keep: '고른 패는 {tile}입니다. 다른 사람도 버린 패라 남겨 두는 편이 좋습니다.',
        other: '고른 패는 {tile}입니다. 대면의 현물이 아닙니다.'
      })
    },
    nosuji: {
      title: '위험패',
      summary: '끝 패부터',
      beats: {
        none: '[[genbutsu]]·[[honor]]·[[kabe]]·[[suji]]가 모두 없다면 [[noSuji]] 중에서 고릅니다. 이때도 조금이라도 덜 위험한 패가 있습니다.',
        edge: '1, 9가 가장 덜 위험하고, 4, 5, 6이 가장 위험합니다.',
        why: '끝으로 갈수록 그 패를 쓰는 [[wait|대기]]의 모양이 적기 때문입니다. 1만은 23만 [[ryanmen]]만 기다리지만, 5만은 34만·67만 양면과 46만 [[kanchan]]이 기다립니다.',
        ...everyDrill('가장 덜 위험한 패 1장을 버리세요.')
      },
      notes: everyDrill({
        terminal: '고른 패는 {tile}입니다. 끝 패라 기다리는 모양이 가장 적습니다.',
        edge: '고른 패는 {tile}입니다. 2, 8은 1, 9 다음으로 기다리는 모양이 적습니다.',
        side: '고른 패는 {tile}입니다. 3, 7은 2, 8보다 기다리는 모양이 많습니다.',
        middle: '고른 패는 {tile}입니다. 4, 5, 6은 기다리는 모양이 가장 많습니다.'
      })
    },
    counted: {
      title: '보이는 패',
      summary: '많이 보이는 쪽',
      beats: {
        far: '끝 패가 없다면, 버릴 패와 그 주변의 패가 많이 [[seen|보이는]] 쪽을 버립니다. 많이 보일수록 그 패를 기다리는 [[wait|대기]]가 적습니다.',
        self: '버리려는 패가 많이 보일수록 [[tanki]]와 [[shanpon]]가 줄어듭니다. 5삭은 3장 보입니다.',
        near: '주변의 패가 많이 보일수록 그 패를 쓰는 [[ryanmen]]과 [[kanchan]]이 줄어듭니다. 4삭 주변의 3삭과 5삭이 많이 보입니다.',
        ...everyDrill('가장 덜 위험한 패 1장을 버리세요.')
      },
      notes: {
        pick1: countedNote('3통 주변의 2통과 4통이 많이 보입니다.'),
        pick2: countedNote('3삭 주변의 4삭이 4장 모두 보입니다.'),
        pick3: countedNote('7만 주변의 6만이 3장 보입니다.'),
        pick4: countedNote('7통 주변의 8통이 3장 보입니다.'),
        pick5: countedNote('7삭 주변의 6삭이 4장 모두 보입니다.')
      }
    }
  }
};
