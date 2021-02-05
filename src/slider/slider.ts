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

    min(value?: number): number {
      if (value !== undefined) slider.set('min', value);
      return slider.get('min') as number;
    },

    max(value?: number): number {
      if (value !== undefined) slider.set('max', value);
      return slider.get('max') as number;
    },

    step(value?: number): number {
      if (value !== undefined) slider.set('step', value);
      return slider.get('step') as number;
    },

    firstValue(value?: number): number {
      if (value !== undefined) slider.set('firstValue', value);
      return slider.get('firstValue') as number;
    },

    secondValue(value?: number): number {
      if (value !== undefined) slider.set('secondValue', value);
      return slider.get('secondValue') as number;
    },

    setFirstValueSubscriber(subscriber: Function) {
      slider.subscribe('firstValue', subscriber);
    },

    setSecondValueSubscriber(subscriber: Function) {
      slider.subscribe('secondValue', subscriber);
    },
  };

  return this;
};
