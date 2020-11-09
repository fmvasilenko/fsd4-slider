/* eslint-disable class-methods-use-this */
// import { ModelMemoryCell } from '../ModelMemoryCell/ModelMemoryCell';
import { ModelMemoryCell } from './ModelMemoryCell';

class Model {
  private config: State;

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

  constructor(config?: Config) {
    this.config = { ...require('./DefaultConfig.json'), ...config };

    this.isRange = new ModelMemoryCell(this.config.isRange);
    this.isVertical = new ModelMemoryCell(this.config.isVertical);
    this.valueLabelDisplayed = new ModelMemoryCell(this.config.valueLabelDisplayed);
    this.scaleDisplayed = new ModelMemoryCell(this.config.scaleDisplayed);
    this.minValue = new ModelMemoryCell(this.config.minValue, this.checkMinValue.bind(this));
    this.maxValue = this.setNumber(this.config.maxValue, this.checkMaxValue.bind(this));
    this.step = this.setNumber(this.config.step, this.checkStep.bind(this));
    this.pointsNumber = this.setNumber(this.config.pointsNumber, this.checkPointsNumber.bind(this));
    this.leftHandleValue = this.setNumber(this.config.leftHandleValue, this.checkLeftHandleValue.bind(this));
    this.rightHandleValue = this.setNumber(this.config.rightHandleValue, this.checkRightHandleValue.bind(this));

    this.setSubscriptions();
  }

  public getCurrentState(): State {
    return {
      isRange: this.isRange?.get(),
      isVertical: this.isVertical?.get(),
      valueLabelDisplayed: this.valueLabelDisplayed?.get(),
      scaleDisplayed: this.scaleDisplayed?.get(),
      minValue: this.minValue?.get(),
      maxValue: this.maxValue?.get(),
      step: this.step?.get(),
      pointsNumber: this.pointsNumber?.get(),
      leftHandleValue: this.leftHandleValue?.get(),
      rightHandleValue: this.rightHandleValue?.get(),
    };
  }

  private setNumber(givenValue: number, checkFunction?: Function): ModelMemoryCell<number> {
    const value = checkFunction ? checkFunction(givenValue) : givenValue;
    return new ModelMemoryCell(value, checkFunction?.bind(this));
  }

  private setSubscriptions() {
    this.isRange.addSubscriber(this.updateHandlesValues.bind(this));
    this.step.addSubscriber(this.updateHandlesValues.bind(this));
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
    const { isRange, rightHandleValue } = this.getCurrentState();
    const value = this.checkHandleValue(givenValue);

    if (!this.rightHandleValue) return value; // necessary for inital value check, when rigthHandleValue was not defined yet
    if (isRange && value > rightHandleValue) return rightHandleValue;

    return value;
  }

  private checkRightHandleValue(givenValue: number): number {
    const { isRange, maxValue, leftHandleValue } = this.getCurrentState();
    const value = this.checkHandleValue(givenValue);

    if (!isRange) return maxValue;
    if (value < leftHandleValue) return leftHandleValue;

    return value;
  }

  private checkHandleValue(givenValue: number): number {
    const { minValue, maxValue } = this.getCurrentState();
    const value = this.checkIfFitsTheSteps(givenValue);

    if (value < minValue) return minValue;
    if (value > maxValue) return maxValue;

    return value;
  }

  private checkIfFitsTheSteps(givenValue: number) {
    const { step, minValue, maxValue } = this.getCurrentState();
    const normValue = givenValue - minValue; // normValue is always between 0 and (maxValue - minValue)
    const accuracy = normValue % step;
    const value = normValue - accuracy + minValue;

    if (accuracy > step / 2 && value + step <= maxValue) return value + step;

    return value;
  }
}

export { Model };
