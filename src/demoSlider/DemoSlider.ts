/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
/// <reference path='./demoSlider.d.ts' />

import '../slider/slider.scss';
import '../slider/slider';

class DemoSlider {
  private classes: DemoSliderClasses;

  private root: HTMLElement;

  private $slider: JQuery;

  private panelWrapper: HTMLElement;

  private rangeSwitcher: HTMLElement;

  private isVerticalSwitcher: HTMLElement;

  private valueLabelDisplayedSwitcher: HTMLElement;

  private scaleDisplayedSwitcher: HTMLElement;

  private minValue: HTMLElement;

  private maxValue: HTMLElement;

  private step: HTMLElement;

  private leftHandleValue: HTMLElement;

  private rightHandleValue: HTMLElement;

  private rightHandleValueContainer: HTMLElement | null;

  constructor(container: HTMLElement) {
    this.classes = require('./demoSlider.classes.json');
    this.root = this.createRoot(container);
    this.$slider = $(this.createScaleContainer()).slider();
    this.panelWrapper = this.createElement('div', this.classes.panelWrapper);
    this.root.appendChild(this.panelWrapper);

    this.rangeSwitcher = this.createSwitcher('Is range', '');
    this.isVerticalSwitcher = this.createSwitcher('Is vertical', '');
    this.valueLabelDisplayedSwitcher = this.createSwitcher('Display value label', '');
    this.scaleDisplayedSwitcher = this.createSwitcher('Display scale', '');
    this.minValue = this.createValueElement('Min value', '');
    this.maxValue = this.createValueElement('Max value', '');
    this.step = this.createValueElement('Step', '');
    this.leftHandleValue = this.createValueElement('Handle value', '');
    this.rightHandleValue = this.createValueElement('Second handle value', '');
    this.rightHandleValueContainer = this.rightHandleValue.closest(`.${this.classes.value}`);

    this.setInitialState();
    this.setSubscriptions();
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

  private createValueElement(text: string, className?: string) {
    const valueElement = this.createElement('div', this.classes.value);
    const label = this.createElement('p', '', text);
    const input = this.createElement('input', this.classes.valueInput);

    if (className) input.classList.add(className);

    valueElement.appendChild(label);
    valueElement.appendChild(input);
    this.panelWrapper.appendChild(valueElement);

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

  private setInitialState() {
    (this.rangeSwitcher as HTMLFormElement).checked = this.$slider.config.isRange();
    (this.isVerticalSwitcher as HTMLFormElement).checked = this.$slider.config.isVertical();
    (this.valueLabelDisplayedSwitcher as HTMLFormElement).checked = this.$slider.config.valueLabelDisplayed();
    (this.scaleDisplayedSwitcher as HTMLFormElement).checked = this.$slider.config.scaleDisplayed();
    (this.minValue as HTMLFormElement).value = this.$slider.config.minValue();
    (this.maxValue as HTMLFormElement).value = this.$slider.config.maxValue();
    (this.step as HTMLFormElement).value = this.$slider.config.step();
    (this.leftHandleValue as HTMLFormElement).value = this.$slider.config.leftHandleValue();
    (this.rightHandleValue as HTMLFormElement).value = this.$slider.config.rightHandleValue();
    this.rightHandleValueContainerSwitch(this.$slider.config.isRange());
  }

  private setSubscriptions() {
    this.$slider.config.setLeftHandleSubscriber(this.leftHandleSubscriber.bind(this));
    this.$slider.config.setRightHandleSubscriber(this.rightHandleSubscriber.bind(this));
  }

  private leftHandleSubscriber(value: number) {
    (this.leftHandleValue as HTMLFormElement).value = value;
  }

  private rightHandleSubscriber(value: number) {
    (this.rightHandleValue as HTMLFormElement).value = value;
  }

  private bindEventsListeners() {
    this.rangeSwitcher.addEventListener('change', this.rangeSwitcherHandler.bind(this));
    this.isVerticalSwitcher.addEventListener('change', this.isVerticalSwitcherHandler.bind(this));
    this.valueLabelDisplayedSwitcher.addEventListener('change', this.valueLabelDisplayedSwitcherHandler.bind(this));
    this.scaleDisplayedSwitcher.addEventListener('change', this.scaleDisplayedSwitcherHandler.bind(this));
    this.minValue.addEventListener('change', this.minValueChangeHandler.bind(this));
    this.maxValue.addEventListener('change', this.maxValueChangeHandler.bind(this));
    this.step.addEventListener('change', this.stepChangeHandler.bind(this));
    this.leftHandleValue.addEventListener('change', this.leftHandleValueChangeHandler.bind(this));
    this.rightHandleValue.addEventListener('change', this.rightHandleValueChangeHandler.bind(this));
  }

  private rangeSwitcherHandler() {
    const isRange = (this.rangeSwitcher as HTMLFormElement).checked;
    this.$slider.config.isRange(isRange);
    this.rightHandleValueContainerSwitch(isRange);
  }

  private isVerticalSwitcherHandler() {
    this.$slider.config.isVertical((this.isVerticalSwitcher as HTMLFormElement).checked);
  }

  private valueLabelDisplayedSwitcherHandler() {
    this.$slider.config.valueLabelDisplayed((this.valueLabelDisplayedSwitcher as HTMLFormElement).checked);
  }

  private scaleDisplayedSwitcherHandler() {
    this.$slider.config.scaleDisplayed((this.scaleDisplayedSwitcher as HTMLFormElement).checked);
  }

  private minValueChangeHandler() {
    const input = this.minValue as HTMLFormElement;
    let value = parseInt(input.value.replace(/-\D/g, ''), 10);
    if (isNaN(value)) value = this.$slider.config.minValue();
    input.value = this.$slider.config.minValue(value);
  }

  private maxValueChangeHandler() {
    const input = this.maxValue as HTMLFormElement;
    let value = parseInt(input.value.replace(/-\D/g, ''), 10);
    if (isNaN(value)) value = this.$slider.config.maxValue();
    input.value = this.$slider.config.maxValue(value);
  }

  private stepChangeHandler() {
    const input = this.step as HTMLFormElement;
    let value = parseInt(input.value.replace(/-\D/g, ''), 10);
    if (isNaN(value)) value = this.$slider.config.step();
    input.value = this.$slider.config.step(value);
  }

  private leftHandleValueChangeHandler() {
    const input = this.leftHandleValue as HTMLFormElement;
    let value = parseInt(input.value.replace(/-\D/g, ''), 10);
    if (isNaN(value)) value = this.$slider.config.leftHandleValue();
    input.value = this.$slider.config.leftHandleValue(value);
  }

  private rightHandleValueChangeHandler() {
    const input = this.rightHandleValue as HTMLFormElement;
    let value = parseInt(input.value.replace(/-\D/g, ''), 10);
    if (isNaN(value)) value = this.$slider.config.rightHandleValue();
    input.value = this.$slider.config.rightHandleValue(value);
  }

  private rightHandleValueContainerSwitch(isRange: boolean) {
    if (isRange && this.rightHandleValueContainer) this.panelWrapper.appendChild(this.rightHandleValueContainer);
    else this.rightHandleValueContainer?.remove();
  }
}

export { DemoSlider };
