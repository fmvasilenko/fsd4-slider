/* eslint-disable no-new */
import { Presenter } from './Presenter';

// eslint-disable-next-line func-names
export default $.fn.slider = function (this: JQuery, config?: Config) {
  const slider = new Presenter(this[0], config);

  this.config = {
    isRange(value?: boolean): boolean {
      if (value !== undefined) slider.isRange = value;
      return slider.isRange;
    },

    isVertical(value?: boolean): boolean {
      if (value !== undefined) slider.isVertical = value;
      return slider.isVertical;
    },

    valueLabelDisplayed(value?: boolean): boolean {
      if (value !== undefined) slider.valueLabelDisplayed = value;
      return slider.valueLabelDisplayed;
    },

    scaleDisplayed(value?: boolean): boolean {
      if (value !== undefined) slider.scaleDisplayed = value;
      return slider.scaleDisplayed;
    },

    minValue(value?: number): number {
      if (value !== undefined) slider.minValue = value;
      return slider.minValue;
    },

    maxValue(value?: number): number {
      if (value !== undefined) slider.maxValue = value;
      return slider.maxValue;
    },

    step(value?: number): number {
      if (value !== undefined) slider.step = value;
      return slider.step;
    },

    pointsNumber(value?: number): number {
      if (value !== undefined) slider.pointsNumber = value;
      return slider.pointsNumber;
    },

    leftHandleValue(value?: number): number {
      if (value !== undefined) slider.leftHandleValue = value;
      return slider.leftHandleValue;
    },

    rightHandleValue(value?: number): number {
      if (value !== undefined) slider.rightHandleValue = value;
      return slider.rightHandleValue;
    },

    setLeftHandleSubscriber(subscriber: Function) {
      slider.setLeftHandleSubscriber(subscriber);
    },

    setRightHandleSubscriber(subscriber: Function) {
      slider.setRightHandleSubscriber(subscriber);
    },
  };

  return this;
};
