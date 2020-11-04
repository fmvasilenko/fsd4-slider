import { SliderController } from './SliderController';
import { SliderConfig } from './sliderConfig/SliderConfig';

// eslint-disable-next-line func-names
export default $.fn.slider = function (
  this: JQuery,
  options?: ImportedSliderConfig,
  slide?: SliderCallBackFunction,
) {
  const sliderConfig = new SliderConfig(options);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const slider = new SliderController(this[0], sliderConfig, slide);

  this.config = {
    isRange(value?: boolean): boolean {
      if (value !== undefined) sliderConfig.isRange.set(value);
      return sliderConfig.isRange.get() as boolean;
    },

    hasDefaultValues(value?: boolean): boolean {
      if (value !== undefined) sliderConfig.hasDefaultValues.set(value);
      return sliderConfig.hasDefaultValues.get() as boolean;
    },

    isVertical(value?: boolean): boolean {
      if (value !== undefined) sliderConfig.isVertical.set(value);
      return sliderConfig.isVertical.get() as boolean;
    },

    valueLabelDisplayed(value?: boolean): boolean {
      if (value !== undefined) sliderConfig.valueLabelDisplayed.set(value);
      return sliderConfig.valueLabelDisplayed.get() as boolean;
    },

    limitsDisplayed(value?: boolean): boolean {
      if (value !== undefined) sliderConfig.limitsDisplayed.set(value);
      return sliderConfig.limitsDisplayed.get() as boolean;
    },

    minValue(value?: number): number {
      if (value !== undefined) sliderConfig.minValue.set(value);
      return sliderConfig.minValue.get() as number;
    },

    maxValue(value?: number): number {
      if (value !== undefined) sliderConfig.maxValue.set(value);
      return sliderConfig.maxValue.get() as number;
    },

    step(value?: number): number {
      if (value !== undefined) sliderConfig.step.set(value);
      return sliderConfig.step.get() as number;
    },

    leftHandleValue(value?: number): number {
      if (value !== undefined) sliderConfig.leftHandleValue.set(value);
      return sliderConfig.leftHandleValue.get() as number;
    },

    rightHandleValue(value?: number): number {
      if (value !== undefined) sliderConfig.rightHandleValue.set(value);
      return sliderConfig.rightHandleValue.get() as number;
    },

    defaultValues(value?: number[] | string[]): number[] | string[] {
      if (value !== undefined) sliderConfig.defaultValues.set(value);
      return sliderConfig.defaultValues.get() as number[] | string[];
    },

    pointsNumber(value?: number): number {
      if (value !== undefined) sliderConfig.pointsNumber.set(value);
      return sliderConfig.pointsNumber.get() as number;
    },
  };

  return this;
};
