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

  private min: HTMLElement;

  private max: HTMLElement;

  private step: HTMLElement;

  private firstValue: HTMLElement;

  private secondValue: HTMLElement;

  private secondValueContainer: HTMLElement | null;

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
    this.min = this.createValueElement('Min value', '');
    this.max = this.createValueElement('Max value', '');
    this.step = this.createValueElement('Step', '');
    this.firstValue = this.createValueElement('Handle value', '');
    this.secondValue = this.createValueElement('SecondValue handle value', '');
    this.secondValueContainer = this.secondValue.closest(`.${this.classes.value}`);

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
    (this.rangeSwitcher as HTMLFormElement).checked = this.$slider.getSliderOption('isRange');
    (this.isVerticalSwitcher as HTMLFormElement).checked = this.$slider.getSliderOption('isVertical');
    (this.valueLabelDisplayedSwitcher as HTMLFormElement).checked = this.$slider.getSliderOption('valueLabelDisplayed');
    (this.scaleDisplayedSwitcher as HTMLFormElement).checked = this.$slider.getSliderOption('scaleDisplayed');
    (this.min as HTMLFormElement).value = this.$slider.getSliderOption('min');
    (this.max as HTMLFormElement).value = this.$slider.getSliderOption('max');
    (this.step as HTMLFormElement).value = this.$slider.getSliderOption('step');
    (this.firstValue as HTMLFormElement).value = this.$slider.getSliderOption('firstValue');
    (this.secondValue as HTMLFormElement).value = this.$slider.getSliderOption('secondValue');
    this.secondValueContainerSwitch(this.$slider.getSliderOption('isRange') as boolean);
  }

  private setSubscriptions() {
    this.$slider.subscribe('firstValue', this.leftHandleSubscriber.bind(this));
    this.$slider.subscribe('secondValue', this.rightHandleSubscriber.bind(this));
  }

  private leftHandleSubscriber(state: State) {
    (this.firstValue as HTMLFormElement).value = state.firstValue;
  }

  private rightHandleSubscriber(state: State) {
    (this.secondValue as HTMLFormElement).value = state.secondValue;
  }

  private bindEventsListeners() {
    this.rangeSwitcher.addEventListener('change', this.rangeSwitcherHandler.bind(this));
    this.isVerticalSwitcher.addEventListener('change', this.booleanChangeHandler('isVertical'));
    this.valueLabelDisplayedSwitcher.addEventListener('change', this.booleanChangeHandler('valueLabelDisplayed'));
    this.scaleDisplayedSwitcher.addEventListener('change', this.booleanChangeHandler('scaleDisplayed'));
    this.min.addEventListener('change', this.numberChangeHandler('min'));
    this.max.addEventListener('change', this.numberChangeHandler('max'));
    this.step.addEventListener('change', this.numberChangeHandler('step'));
    this.firstValue.addEventListener('change', this.numberChangeHandler('firstValue'));
    this.secondValue.addEventListener('change', this.numberChangeHandler('secondValue'));
  }

  private rangeSwitcherHandler() {
    const isRange = (this.rangeSwitcher as HTMLFormElement).checked;
    this.$slider.setSliderOption('isRange', isRange);
    this.secondValueContainerSwitch(isRange);
  }

  private booleanChangeHandler(fieldName: keyof JQuerySliderConfigBooleans) {
    return (event: Event) => this.updateBoolean(event, fieldName);
  }

  private updateBoolean(event: Event, fieldName: keyof JQuerySliderConfigBooleans) {
    const checkbox = event.target as HTMLFormElement;
    this.$slider.setSliderOption(fieldName, checkbox.checked);
  }

  private numberChangeHandler(fieldName: keyof JQuerySliderConfigNumbers) {
    return (event: Event) => this.updateNumber(event, fieldName);
  }

  private updateNumber(event: Event, fieldName: keyof JQuerySliderConfigNumbers) {
    const input = event.target as HTMLFormElement;
    let value = parseInt(input.value.replace(/-\D/g, ''), 10);
    if (isNaN(value)) value = this.$slider.getSliderOption(fieldName) as number;
    input.value = this.$slider.setSliderOption(fieldName, value);
  }

  private secondValueContainerSwitch(isRange: boolean) {
    if (isRange && this.secondValueContainer) this.panelWrapper.appendChild(this.secondValueContainer);
    else this.secondValueContainer?.remove();
  }
}

export { DemoSlider };
