/* eslint-disable no-new */
import Facade from './Facade';

// eslint-disable-next-line func-names
export default $.fn.slider = function (this: JQuery, config?: any) {
  const slider = new Facade(this[0], config);

  this.subscribe = (option: ModelOption, subscriber: (value: number | boolean) => void) => {
    slider.subscribe(option, subscriber);
  };

  this.unsubscribe = (option: ModelOption, subscriber: (value: number | boolean) => void) => {
    slider.unsubscribe(option, subscriber);
  };

  this.setSliderOption = (option: ModelOption, value: State[ModelOption]): State[ModelOption] => {
    slider.set(option, value);
    return slider.get(option);
  };

  this.getSliderOption = (option: ModelOption): State[ModelOption] => slider.get(option);

  return this;
};
