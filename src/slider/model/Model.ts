import autobind from 'autobind-decorator';
import { ModelMemoryCell } from './ModelMemoryCell';
import defaultConfig from './default.config';

class Model {
  public isRange: ModelMemoryCell<boolean>;

  public isVertical: ModelMemoryCell<boolean>;

  public valueLabelDisplayed: ModelMemoryCell<boolean>;

  public scaleDisplayed: ModelMemoryCell<boolean>;

  public min: ModelMemoryCell<number>;

  public max: ModelMemoryCell<number>;

  public step: ModelMemoryCell<number>;

  public firstValue: ModelMemoryCell<number>;

  public secondValue: ModelMemoryCell<number>;

  constructor(config?: any) {
    const {
      isRange,
      isVertical,
      valueLabelDisplayed,
      scaleDisplayed,
      min,
      max,
      step,
      firstValue,
      secondValue,
    } = defaultConfig;

    this.isRange = new ModelMemoryCell(isRange, Model.checkIfBoolean);
    this.isVertical = new ModelMemoryCell(isVertical, Model.checkIfBoolean);
    this.valueLabelDisplayed = new ModelMemoryCell(valueLabelDisplayed, Model.checkIfBoolean);
    this.scaleDisplayed = new ModelMemoryCell(scaleDisplayed, Model.checkIfBoolean);
    this.min = new ModelMemoryCell(min, this.checkMin);
    this.step = new ModelMemoryCell(step, this.checkStep);
    this.max = new ModelMemoryCell(max, this.checkMax);
    this.firstValue = new ModelMemoryCell(firstValue, this.checkFirstValue);
    this.secondValue = new ModelMemoryCell(secondValue, this.checkSecondValue);

    this.setSubscriptions();
    this.setInitialState({ ...defaultConfig, ...config });
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

  private setInitialState(config: State) {
    this.isRange.set(config.isRange);
    this.isVertical.set(config.isVertical);
    this.valueLabelDisplayed.set(config.valueLabelDisplayed);
    this.scaleDisplayed.set(config.scaleDisplayed);
    this.min.set(config.min);
    this.step.set(config.step);
    this.max.set(config.max);
    this.firstValue.set(config.firstValue);
    this.secondValue.set(config.secondValue);
  }

  @autobind
  private checkMin(givenValue: number): number {
    const value = Model.checkIfNumber(givenValue);
    const { max, step } = this.getCurrentState();

    if (value > max - step) return max - step;

    return Math.floor(value);
  }

  @autobind
  private checkMax(givenValue: number): number {
    const value = Model.checkIfNumber(givenValue);
    const { min, step } = this.getCurrentState();

    if (value < min + step) return min + step;

    return Math.floor(value);
  }

  @autobind
  private checkStep(givenStep: number): number {
    const step = Model.checkIfNumber(givenStep);
    const { min, max } = this.getCurrentState();
    const range = max - min;

    if (step < 1) return 1;
    if (max && step > range) return range;

    return Math.floor(step);
  }

  @autobind
  private checkFirstValue(givenValue: number): number {
    const { isRange, secondValue } = this.getCurrentState();
    const value = this.checkHandleValue(Model.checkIfNumber(givenValue));

    if (!this.secondValue) return value; // necessary for inital value check, when rigthHandleValue was not defined yet
    if (isRange && value > secondValue) return secondValue;

    return value;
  }

  @autobind
  private checkSecondValue(givenValue: number): number {
    const { isRange, max, firstValue } = this.getCurrentState();
    const value = this.checkHandleValue(Model.checkIfNumber(givenValue));

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

  @autobind
  private static checkIfNumber(value: number): number {
    if (typeof value === 'string' && parseInt(value, 10)) return parseInt(value, 10);

    if (typeof value !== 'number') throw new TypeError(`'${value}' is not a number. Number expected.`);
    return value;
  }

  @autobind
  private static checkIfBoolean(value: boolean): boolean {
    if (typeof value !== 'boolean') throw new TypeError(`'${value}' is not boolean. Boolean expected.`);
    return value;
  }
}

export { Model };
