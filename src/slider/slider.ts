/* eslint-disable no-new */
import Facade from './Facade';

// eslint-disable-next-line func-names
export default $.fn.slider = function (this: JQuery, config?: Config) {
  const slider = new Facade(this[0], config);

  this.subscribe = (option: ModelOption, subscriber: Function) => {
    slider.subscribe(option, subscriber);
  };

  this.unsubscribe = (option: ModelOption, subscriber: Function) => {
    slider.unsubscribe(option, subscriber);
  };

  this.setSliderOption = (option: ModelOption, value: State[ModelOption]): State[ModelOption] => {
    slider.set(option, value);
    return slider.get(option);
  };

  this.getSliderOption = (option: ModelOption): State[ModelOption] => slider.get(option);

  return this;
};
