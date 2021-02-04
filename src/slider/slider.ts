/* eslint-disable no-new */
import Facade from './Facade';

// eslint-disable-next-line func-names
export default $.fn.slider = function (this: JQuery, config?: Config) {
  const slider = new Facade(this[0], config);

  this.config = {
    isRange(value?: boolean): boolean {
      if (value !== undefined) slider.set('isRange', value);
      return slider.get('isRange') as boolean;
    },

    isVertical(value?: boolean): boolean {
      if (value !== undefined) slider.set('isVertical', value);
      return slider.get('isVertical') as boolean;
    },

    valueLabelDisplayed(value?: boolean): boolean {
      if (value !== undefined) slider.set('valueLabelDisplayed', value);
      return slider.get('valueLabelDisplayed') as boolean;
    },

    scaleDisplayed(value?: boolean): boolean {
      if (value !== undefined) slider.set('scaleDisplayed', value);
      return slider.get('scaleDisplayed') as boolean;
    },

    minValue(value?: number): number {
      if (value !== undefined) slider.set('minValue', value);
      return slider.get('minValue') as number;
    },

    maxValue(value?: number): number {
      if (value !== undefined) slider.set('maxValue', value);
      return slider.get('maxValue') as number;
    },

    step(value?: number): number {
      if (value !== undefined) slider.set('step', value);
      return slider.get('step') as number;
    },

    leftHandleValue(value?: number): number {
      if (value !== undefined) slider.set('leftHandleValue', value);
      return slider.get('leftHandleValue') as number;
    },

    rightHandleValue(value?: number): number {
      if (value !== undefined) slider.set('scaleDisplayed', value);
      return slider.get('scaleDisplayed') as number;
    },

    setLeftHandleSubscriber(subscriber: Function) {
      slider.subscribe('leftHandleValue', subscriber);
    },

    setRightHandleSubscriber(subscriber: Function) {
      slider.subscribe('rightHandleValue', subscriber);
    },
  };

  return this;
};
