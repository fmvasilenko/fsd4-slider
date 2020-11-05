/* eslint-disable class-methods-use-this */
/// <reference path='./demoSlider.d.ts' />

import './sliderNew/slider.scss';
import './sliderNew/slider';

class DemoSlider {
  private classes: DemoSliderClasses;

  private root: HTMLElement;

  private $slider: JQuery;

  constructor(container: HTMLElement) {
    this.classes = require('./demoSlider.classes.json');
    this.root = this.createRoot(container);
    this.$slider = $(this.createScaleContainer()).slider();
  }

  private createRoot(container: HTMLElement): HTMLElement {
    const root = document.createElement('div');
    root.classList.add(this.classes.root);
    container.appendChild(root);
    return root;
  }

  private createScaleContainer(): HTMLElement {
    const scaleContainer = document.createElement('div');
    scaleContainer.classList.add(this.classes.scaleContainer);
    this.root.appendChild(scaleContainer);
    return scaleContainer;
  }
}

export { DemoSlider };
