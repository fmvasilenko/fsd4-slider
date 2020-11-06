/* eslint-disable class-methods-use-this */
/// <reference path='./demoSlider.d.ts' />

import './slider/slider.scss';
import './slider/slider';

class DemoSlider {
  private classes: DemoSliderClasses;

  private root: HTMLElement;

  private $slider: JQuery;

  private panelWrapper: HTMLElement;

  private rangeSwitcher: HTMLElement;

  private isVerticalSwitcher: HTMLElement;

  private valueLabelDisplayedSwitcher: HTMLElement;

  constructor(container: HTMLElement) {
    this.classes = require('./demoSlider.classes.json');
    this.root = this.createRoot(container);
    this.$slider = $(this.createScaleContainer()).slider();
    this.panelWrapper = this.createElement('div', this.classes.panelWrapper);
    this.root.appendChild(this.panelWrapper);

    this.rangeSwitcher = this.createSwitcher('Is range', '');
    this.isVerticalSwitcher = this.createSwitcher('Is vertical', '');
    this.valueLabelDisplayedSwitcher = this.createSwitcher('Display value label', '');

    this.bindEventsListeners();
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

  private createSwitcher(label: string, className: string): HTMLElement {
    const switcher = this.createElement('label', this.classes.switcher);
    const input = this.createElement('input', className);
    const text = this.createElement('p', '', label);

    input.setAttribute('type', 'checkbox');

    switcher.appendChild(input);
    switcher.appendChild(text);
    this.panelWrapper.appendChild(switcher);

    return input;
  }

  private createElement(
    tag: string,
    className: string | string[],
    value?: string,
  ): HTMLElement {
    const element = document.createElement(tag);

    if (Array.isArray(className)) {
      className.forEach((cssClass) => {
        element.classList.add(cssClass);
      });
    } else if (className !== '') element.classList.add(className);

    if (value) element.innerHTML = value;
    return element;
  }

  private bindEventsListeners() {
    this.rangeSwitcher.addEventListener('change', this.rangeSwitcherHandler.bind(this));
    this.isVerticalSwitcher.addEventListener('change', this.isVerticalSwitcherHandler.bind(this));
    this.valueLabelDisplayedSwitcher.addEventListener('change', this.valueLabelDisplayedSwitcherHandler.bind(this));
  }

  private rangeSwitcherHandler() {
    this.$slider.config.isRange((this.rangeSwitcher as HTMLFormElement).checked);
  }

  private isVerticalSwitcherHandler() {
    this.$slider.config.isVertical((this.isVerticalSwitcher as HTMLFormElement).checked);
  }

  private valueLabelDisplayedSwitcherHandler() {
    this.$slider.config.valueLabelDisplayed((this.valueLabelDisplayedSwitcher as HTMLFormElement).checked);
  }
}

export { DemoSlider };
