/* eslint-disable class-methods-use-this */
// import { ModelMemoryCell } from '../ModelMemoryCell/ModelMemoryCell';
import { ModelMemoryCell } from './ModelMemoryCell';

class SliderModel {
  public isRange: ModelMemoryCell<boolean>;

  public isVertical: ModelMemoryCell<boolean>;

  public valueLabelDisplayed: ModelMemoryCell<boolean>;

  public scaleDisplayed: ModelMemoryCell<boolean>;

  public minValue: ModelMemoryCell<number>;

  public maxValue: ModelMemoryCell<number>;

  public step: ModelMemoryCell<number>;

  public pointsNumber: ModelMemoryCell<number>;

  public leftHandleValue: ModelMemoryCell<number>;

  public rightHandleValue: ModelMemoryCell<number>;

  constructor() {
    const config: State = require('./sliderDefaultConfig.json');

    this.isRange = new ModelMemoryCell(config.isRange);
    this.isVertical = new ModelMemoryCell(config.isVertical);
    this.valueLabelDisplayed = new ModelMemoryCell(config.valueLabelDisplayed);
    this.scaleDisplayed = new ModelMemoryCell(config.scaleDisplayed);
    this.minValue = new ModelMemoryCell(config.minValue, this.checkMinValue.bind(this));
    this.maxValue = this.setNumber(config.maxValue, this.checkMaxValue.bind(this));
    this.step = this.setNumber(config.step, this.checkStep.bind(this));
    this.pointsNumber = this.setNumber(config.pointsNumber, this.checkPointsNumber.bind(this));
    this.leftHandleValue = this.setNumber(config.leftHandleValue, this.checkLeftHandleValue.bind(this));
    this.rightHandleValue = this.setNumber(config.rightHandleValue, this.checkRightHandleValue.bind(this));

    this.setSubscriptions();
  }

  private setNumber(givenValue: number, checkFunction?: Function): ModelMemoryCell<number> {
    const value = checkFunction ? checkFunction(givenValue) : givenValue;
    return new ModelMemoryCell(value, checkFunction?.bind(this));
  }

  private setSubscriptions() {
    this.isRange.addSubscriber(this.updateHandlesValues.bind(this));
    this.minValue.addSubscriber(this.updateHandlesValues.bind(this));
    this.maxValue.addSubscriber(this.updateHandlesValues.bind(this));
  }

  private updateHandlesValues() {
    this.leftHandleValue.set(this.leftHandleValue.get());
    this.rightHandleValue.set(this.rightHandleValue.get());
    this.leftHandleValue.set(this.leftHandleValue.get());
  }

  private checkMinValue(givenValue: number): number {
    return givenValue > this.maxValue.get()
      ? this.maxValue.get()
      : givenValue;
  }

  private checkMaxValue(givenValue: number): number {
    return givenValue < this.minValue.get()
      ? this.minValue.get()
      : givenValue;
  }

  private checkStep(givenStep: number): number {
    return givenStep >= 1 ? givenStep : 1;
  }

  private checkPointsNumber(givenValue: number): number {
    return givenValue >= 2 ? givenValue : 2;
  }

  private checkLeftHandleValue(givenValue: number): number {
    let value = this.checkHandleValue(givenValue);

    if (this.isRange.get() === true && this.rightHandleValue && value > this.rightHandleValue.get()) {
      value = this.rightHandleValue.get();
    }

    return value;
  }

  private checkRightHandleValue(givenValue: number): number {
    let value = givenValue;

    if (this.isRange.get()) {
      value = this.checkHandleValue(givenValue);
      if (value < this.leftHandleValue.get()) value = this.leftHandleValue.get();
    } else value = this.maxValue.get();

    return value;
  }

  private checkHandleValue(givenValue: number): number {
    let value = givenValue;

    const step = this.step.get();
    if (value % step > step / 2) value += step;
    value = value - (value % step) + this.minValue.get();

    if (value < this.minValue.get()) value = this.minValue.get();
    if (value > this.maxValue.get()) value = this.maxValue.get();

    return value;
  }
}

export { SliderModel };
