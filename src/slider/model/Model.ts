/* eslint-disable class-methods-use-this */
import { ModelMemoryCell } from './ModelMemoryCell';

class Model {
  private config: State;

  public isRange: ModelMemoryCell<boolean>;

  public isVertical: ModelMemoryCell<boolean>;

  public valueLabelDisplayed: ModelMemoryCell<boolean>;

  public scaleDisplayed: ModelMemoryCell<boolean>;

  public min: ModelMemoryCell<number>;

  public max: ModelMemoryCell<number>;

  public step: ModelMemoryCell<number>;

  public firstValue: ModelMemoryCell<number>;

  public secondValue: ModelMemoryCell<number>;

  constructor(config?: Config) {
    this.config = { ...require('./defaultConfig.json'), ...config };

    this.isRange = new ModelMemoryCell(this.config.isRange, this.getCurrentState.bind(this));
    this.isVertical = new ModelMemoryCell(this.config.isVertical, this.getCurrentState.bind(this));
    this.valueLabelDisplayed = new ModelMemoryCell(this.config.valueLabelDisplayed, this.getCurrentState.bind(this));
    this.scaleDisplayed = new ModelMemoryCell(this.config.scaleDisplayed, this.getCurrentState.bind(this));
    this.min = new ModelMemoryCell(this.config.min, this.getCurrentState.bind(this), this.checkMin.bind(this));
    this.max = new ModelMemoryCell(this.config.max, this.getCurrentState.bind(this), this.checkMax.bind(this));
    this.step = new ModelMemoryCell(this.config.step, this.getCurrentState.bind(this), this.checkStep.bind(this));
    this.firstValue = new ModelMemoryCell(this.config.firstValue, this.getCurrentState.bind(this), this.checkFirstValue.bind(this));
    this.secondValue = new ModelMemoryCell(this.config.secondValue, this.getCurrentState.bind(this), this.checkSecondValue.bind(this));

    this.setSubscriptions();
  }

  public getCurrentState(): State {
    return {
      isRange: this.isRange?.get(),
      isVertical: this.isVertical?.get(),
      valueLabelDisplayed: this.valueLabelDisplayed?.get(),
      scaleDisplayed: this.scaleDisplayed?.get(),
      min: this.min?.get(),
      max: this.max?.get(),
      step: this.step?.get(),
      firstValue: this.firstValue?.get(),
      secondValue: this.secondValue?.get(),
    };
  }

  private setSubscriptions() {
    this.isRange.addSubscriber(this.updateHandlesValues.bind(this));
    this.step.addSubscriber(this.updateHandlesValues.bind(this));
    this.min.addSubscriber(this.updateHandlesValues.bind(this));
    this.max.addSubscriber(this.updateHandlesValues.bind(this));
  }

  private updateHandlesValues() {
    /**
     * If leftHandle and rightHandle values are lower then min, we need to update rigthHandle value firstValue.
     * If both of them are higher then max, then we update leftHandle value firstValue.
     *
     * Following approach helps to avoid unnecessary handle choice logic.
     */

    this.firstValue.update();
    this.secondValue.update();
    this.firstValue.update();
  }

  private checkMin(givenValue: number): number {
    const { max, step } = this.getCurrentState();
    return givenValue > max - step ? max - step : givenValue;
  }

  private checkMax(givenValue: number): number {
    const { min, step } = this.getCurrentState();
    return givenValue < min + step ? min + step : givenValue;
  }

  private checkStep(givenStep: number): number {
    const range = this.max.get() - this.min.get();

    if (givenStep < 1) return 1;
    if (givenStep > range) return range;

    return givenStep;
  }

  private checkFirstValue(givenValue: number): number {
    const { isRange, secondValue } = this.getCurrentState();
    const value = this.checkHandleValue(givenValue);

    if (!this.secondValue) return value; // necessary for inital value check, when rigthHandleValue was not defined yet
    if (isRange && value > secondValue) return secondValue;

    return value;
  }

  private checkSecondValue(givenValue: number): number {
    const { isRange, max, firstValue } = this.getCurrentState();
    const value = this.checkHandleValue(givenValue);

    if (!isRange) return max;
    if (value < firstValue) return firstValue;

    return value;
  }

  private checkHandleValue(givenValue: number): number {
    const { min, max, step } = this.getCurrentState();
    const maxAccuracy = (max - min) % step;
    const value = givenValue < max - maxAccuracy / 2 ? this.checkIfFitsTheSteps(givenValue) : max;

    if (value < min) return min;
    if (value > max) return max;

    return value;
  }

  private checkIfFitsTheSteps(givenValue: number) {
    const { step, min, max } = this.getCurrentState();
    const normValue = givenValue - min; // normValue is always between 0 and (max - min)
    const accuracy = normValue % step;
    const value = normValue - accuracy + min;

    if (accuracy > step / 2 && value + step <= max) return value + step;

    return value;
  }
}

export { Model };
