import autobind from 'autobind-decorator';
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

    this.isRange = new ModelMemoryCell(this.config.isRange, this.getCurrentState);
    this.isVertical = new ModelMemoryCell(this.config.isVertical, this.getCurrentState);
    this.valueLabelDisplayed = new ModelMemoryCell(this.config.valueLabelDisplayed, this.getCurrentState);
    this.scaleDisplayed = new ModelMemoryCell(this.config.scaleDisplayed, this.getCurrentState);
    this.min = new ModelMemoryCell(this.config.min, this.getCurrentState, this.checkMin);
    this.max = new ModelMemoryCell(this.config.max, this.getCurrentState, this.checkMax);
    this.step = new ModelMemoryCell(this.config.step, this.getCurrentState, this.checkStep);
    this.firstValue = new ModelMemoryCell(this.config.firstValue, this.getCurrentState, this.checkFirstValue);
    this.secondValue = new ModelMemoryCell(this.config.secondValue, this.getCurrentState, this.checkSecondValue);

    this.setSubscriptions();
  }

  @autobind
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
    this.isRange.addSubscriber(this.updateHandlesValues);
    this.step.addSubscriber(this.updateHandlesValues);
    this.min.addSubscriber(this.updateHandlesValues);
    this.max.addSubscriber(this.updateHandlesValues);
  }

  @autobind
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

  @autobind
  private checkMin(givenValue: number): number {
    const { max, step } = this.getCurrentState();
    return givenValue > max - step ? max - step : givenValue;
  }

  @autobind
  private checkMax(givenValue: number): number {
    const { min, step } = this.getCurrentState();
    return givenValue < min + step ? min + step : givenValue;
  }

  @autobind
  private checkStep(givenStep: number): number {
    const range = this.max.get() - this.min.get();

    if (givenStep < 1) return 1;
    if (givenStep > range) return range;

    return givenStep;
  }

  @autobind
  private checkFirstValue(givenValue: number): number {
    const { isRange, secondValue } = this.getCurrentState();
    const value = this.checkHandleValue(givenValue);

    if (!this.secondValue) return value; // necessary for inital value check, when rigthHandleValue was not defined yet
    if (isRange && value > secondValue) return secondValue;

    return value;
  }

  @autobind
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
