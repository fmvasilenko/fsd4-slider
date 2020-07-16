import { SliderConfigItem } from './sliderConfigItem';

interface ImportedSliderConfig {
  isRange?: boolean;
  hasDefaultValues?: boolean;
  isVertical?: boolean;
  valueLabelDisplayed?: boolean;
  limitsDisplayed?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
  leftHandleValue?: number;
  rightHandleValue?: number;
  defaultValues?: number[] | string[];
}

class SliderConfig {
  public isRange: SliderConfigItem;

  public hasDefaultValues: SliderConfigItem;

  public isVertical: SliderConfigItem;

  public valueLabelDisplayed: SliderConfigItem;

  public limitsDisplayed: SliderConfigItem;

  public minValue: SliderConfigItem;

  public maxValue: SliderConfigItem;

  public step: SliderConfigItem;

  public leftHandleValue: SliderConfigItem;

  public rightHandleValue: SliderConfigItem;

  public defaultValues: SliderConfigItem;

  constructor(importedConfig?: ImportedSliderConfig) {
    const config = Object.assign(this.getDefaultConfig(), importedConfig);
    this.isRange = this.setIsRange(config.isRange);
    this.hasDefaultValues = this.setHasDefaultValues(config.hasDefaultValues);
    this.isVertical = this.setBoolean(config.isVertical);
    this.valueLabelDisplayed = this.setBoolean(config.valueLabelDisplayed);
    this.limitsDisplayed = this.setLimitsDisplayed(config.limitsDisplayed);
    this.minValue = this.setMinValue(config.minValue);
    this.maxValue = this.setMaxValue(config.maxValue);
    this.step = this.setStep(config.step);
    this.defaultValues = this.setDefaultValues(config.defaultValues);
    this.leftHandleValue = this.setLeftHandleValue(config.leftHandleValue);
    this.rightHandleValue = this.setRightHandleValue(config.rightHandleValue);
  }

  // eslint-disable-next-line class-methods-use-this
  private getDefaultConfig() {
    return {
      isRange: false,
      hasDefaultValues: false,
      isVertical: false,
      valueLabelDisplayed: true,
      limitsDisplayed: true,
      minValue: 0,
      maxValue: 100,
      step: 1,
      defaultValues: ['first', 'second', 'third'],
      leftHandleValue: 20,
      rightHandleValue: 80,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private setBoolean(value: boolean): SliderConfigItem {
    return new SliderConfigItem(value);
  }

  private setIsRange(value: boolean): SliderConfigItem {
    const isRange = new SliderConfigItem(value);
    isRange.addSubscriber(this.updateHandlesValues.bind(this));
    return isRange;
  }

  private setHasDefaultValues(value: boolean): SliderConfigItem {
    const hasDefaultValues = new SliderConfigItem(
      value,
      this.checkHasDefaultValues.bind(this),
    );
    hasDefaultValues.addSubscriber(this.updateHandlesValues.bind(this));
    return hasDefaultValues;
  }

  private setLimitsDisplayed(givenValue: boolean): SliderConfigItem {
    const value = this.hasDefaultValues.get() === true
      ? false
      : givenValue;

    return new SliderConfigItem(
      value,
      this.checkLimitsDisplayed.bind(this),
    );
  }

  private setMinValue(value: number): SliderConfigItem {
    const minValue = new SliderConfigItem(value, this.checkMinValue.bind(this));
    minValue.addSubscriber(this.updateHandlesValues.bind(this));
    return minValue;
  }

  private setMaxValue(givenValue: number): SliderConfigItem {
    const value = givenValue < this.minValue.get()
      ? this.minValue.get() as number
      : givenValue;

    const maxValue = new SliderConfigItem(value, this.checkMaxValue.bind(this));
    maxValue.addSubscriber(this.updateHandlesValues.bind(this));
    return maxValue;
  }

  private setStep(givenStep: number): SliderConfigItem {
    const step = this.checkStep(givenStep);
    return new SliderConfigItem(step, this.checkStep.bind(this));
  }

  private setDefaultValues(values: number[] | string[]): SliderConfigItem {
    const defaultValues = new SliderConfigItem(values);
    defaultValues.addSubscriber(this.updateHandlesValues.bind(this));
    return defaultValues;
  }

  private setLeftHandleValue(givenValue: number): SliderConfigItem {
    const value = this.checkHandleValue(givenValue);
    return new SliderConfigItem(value, this.checkLeftHandleValue.bind(this));
  }

  private setRightHandleValue(givenValue: number): SliderConfigItem {
    const value = this.checkRightHandleValue(givenValue);
    return new SliderConfigItem(value, this.checkRightHandleValue.bind(this));
  }

  private updateHandlesValues() {
    this.leftHandleValue.set(this.leftHandleValue.get());
    this.rightHandleValue.set(this.rightHandleValue.get());
    this.leftHandleValue.set(this.leftHandleValue.get());
  }

  private checkHasDefaultValues(value: boolean): boolean {
    if (value === true) this.limitsDisplayed.set(false);
    return value;
  }

  private checkLimitsDisplayed(value: boolean): boolean {
    if (value === true) this.hasDefaultValues.set(false);
    return value;
  }

  private checkMinValue(givenValue: number): number {
    return givenValue > this.maxValue.get()
      ? (this.maxValue.get() as number)
      : givenValue;
  }

  private checkMaxValue(givenValue: number): number {
    return givenValue < this.minValue.get()
      ? (this.minValue.get() as number)
      : givenValue;
  }

  // eslint-disable-next-line class-methods-use-this
  private checkStep(givenStep: number): number {
    return givenStep >= 1 ? givenStep : 1;
  }

  private checkLeftHandleValue(givenValue: number): number {
    let value = this.checkHandleValue(givenValue);

    if (this.isRange.get() === true) {
      if (value > this.rightHandleValue.get()) value = this.rightHandleValue.get() as number;
    }

    return value;
  }

  private checkRightHandleValue(givenValue: number): number {
    let value = givenValue;

    if (this.isRange.get()) {
      value = this.checkHandleValue(givenValue);
      if (value < this.leftHandleValue.get()) value = this.leftHandleValue.get() as number;
    } else {
      const defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length;
      if (this.hasDefaultValues.get()) value = defaultValuesSize - 1;
      else value = this.maxValue.get() as number;
    }

    return value;
  }

  private checkHandleValue(givenValue: number): number {
    let value = givenValue;

    if (this.hasDefaultValues.get()) {
      const defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length;
      if (value < 0) value = 0;
      if (value > defaultValuesSize - 1) value = defaultValuesSize - 1;
    } else {
      const step = this.step.get() as number;
      if (value % step !== 0) value -= value % step;
      if (value < this.minValue.get()) value = this.minValue.get() as number;
      if (value > this.maxValue.get()) value = this.maxValue.get() as number;
    }

    return value;
  }
}

export { SliderConfig };
