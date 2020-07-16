import { SliderConfig } from './sliderConfig/sliderConfig';
import { SliderState } from './sliderState/sliderState';

class SliderModel {
  private config: SliderConfig;

  private state: SliderState;

  constructor(config: SliderConfig, state: SliderState) {
    this.config = config;
    this.state = state;
    this.state.leftHandlePosition.addSubscriber(this.calculateLeftHandleValue.bind(this));
    this.state.rightHandlePosition.addSubscriber(this.calculateRightHandleValue.bind(this));
  }

  private calculateLeftHandleValue(position: number): number {
    if (this.config.hasDefaultValues.get()) this.config.leftHandleValue.set(this.calculateDefaultValue(position));
    else this.config.leftHandleValue.set(this.calculateValue(position));

    return this.config.leftHandleValue.get() as number;
  }

  private calculateRightHandleValue(position: number): number {
    if (this.config.hasDefaultValues.get()) this.config.rightHandleValue.set(this.calculateDefaultValue(position));
    else this.config.rightHandleValue.set(this.calculateValue(position));

    return this.config.rightHandleValue.get() as number;
  }

  private calculateValue(position: number): number {
    const minValue = this.config.minValue.get() as number;
    const maxValue = this.config.maxValue.get() as number;
    const step = this.config.step.get() as number;

    const range = maxValue - minValue;
    let value = Math.floor(position * range);

    if (value % step > step / 2) value += step;
    value = value - (value % step) + minValue;

    return value;
  }

  private calculateDefaultValue(position: number): number {
    const defaultValues = this.config.defaultValues.get() as number[] | string[];
    return this.config.defaultValues !== undefined
      ? Math.round((defaultValues.length - 1) * position)
      : 0;
  }
}

export { SliderModel };
