/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */

import './main.scss';
import { DemoSlider } from './demoSlider/DemoSlider';

const pageWrapper = $('.page-wrapper');

for (let i = 0; i < 4; i++) {
  const demoSlider = new DemoSlider(pageWrapper[0]);
}
