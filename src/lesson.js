import { lessonOf } from './lessons/catalog.js';
import { LessonPlayer } from './ui/lessonView.js';
import { bootPage } from './ui/pageBoot.js';

const FIRST_STEP = 0;

bootPage();

const root = document.querySelector('[data-lesson]');
new LessonPlayer(root, lessonOf(root.dataset.lesson)).show(FIRST_STEP);
