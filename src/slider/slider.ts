/* eslint-disable no-new */
import { SliderPresenter } from './SliderPresenter';

export default $.fn.slider = function (this: JQuery) {
  const slider = new SliderPresenter(this[0]);

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
  };

  return this;
};
