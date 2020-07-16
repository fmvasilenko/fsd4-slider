/// <reference path='./slider.d.ts' />

import { SliderView } from './view/sliderView';
import { SliderModel } from './sliderModel';
import { SliderConfig } from './sliderConfig/sliderConfig';
import { SliderState } from './sliderState/sliderState';

class SliderController {
  private ROOT: HTMLElement;

  private config: SliderConfig;

  private state: SliderState;

  private MODEL: SliderModel;

  private VIEW: SliderView;

  private slide: SliderCallBackFunction;

  constructor(root: HTMLElement, config: SliderConfig, slide?: SliderCallBackFunction) {
    this.ROOT = root;
    this.config = config;
    this.state = new SliderState();
    this.MODEL = new SliderModel(this.config, this.state);
    this.VIEW = new SliderView(this.ROOT, this.config, this.state);
    this.slide = slide || (() => {});

    this.config.leftHandleValue.addSubscriber(this.slideFunction.bind(this));
    this.config.rightHandleValue.addSubscriber(this.slideFunction.bind(this));
  }

  private slideFunction() {
    const leftHandleValue = this.config.leftHandleValue.get() as number;
    const rightHandleValue = this.config.rightHandleValue.get() as number;
    this.slide(leftHandleValue, rightHandleValue);
  }
}

export { SliderController };
