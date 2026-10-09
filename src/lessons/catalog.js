import { Lesson } from '../core/lesson.js';
import { TILE_LESSONS } from './tiles.js';
import { FLOW_LESSONS } from './flow.js';
import { MELD_LESSONS } from './melds.js';
import { BUILD_LESSONS } from './build.js';
import { WAIT_LESSONS } from './waits.js';
import { RIICHI_LESSONS } from './riichi.js';
import { DEFENSE_BASIC_LESSONS } from './basicDefense.js';
import { DEFENSE_INTERMEDIATE_LESSONS } from './intermediateDefense.js';
import { DEFENSE_ADVANCED_LESSONS } from './advancedDefense.js';

const UNIT_SPECS = [
  { id: 'tiles', lessons: TILE_LESSONS },
  { id: 'flow', lessons: FLOW_LESSONS },
  { id: 'melds', lessons: MELD_LESSONS },
  { id: 'build', lessons: BUILD_LESSONS },
  { id: 'waits', lessons: WAIT_LESSONS },
  { id: 'riichi', lessons: RIICHI_LESSONS },
  { id: 'basicDefense', lessons: DEFENSE_BASIC_LESSONS },
  { id: 'intermediateDefense', lessons: DEFENSE_INTERMEDIATE_LESSONS },
  { id: 'advancedDefense', lessons: DEFENSE_ADVANCED_LESSONS }
];

export const UNITS = UNIT_SPECS.map(({ id, lessons }) => ({
  id,
  lessons: lessons.map((spec) => new Lesson(spec))
}));

export const LESSONS = UNITS.flatMap((unit) => unit.lessons);

export const lessonOf = (id) => LESSONS.find((lesson) => lesson.id === id);

export const lessonAfter = (lesson) => LESSONS[LESSONS.indexOf(lesson) + 1] ?? null;
