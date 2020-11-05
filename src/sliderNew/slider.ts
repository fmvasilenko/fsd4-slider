/* eslint-disable no-new */
import { SliderPresenter } from './SliderPresenter';

export default $.fn.slider = function (this: JQuery) {
  new SliderPresenter(this[0]);

  return this;
};
