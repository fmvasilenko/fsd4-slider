/// <reference path='./slider.d.ts' />

import { SliderView } from './sliderView/SliderView';
import { SliderModel } from './sliderModel/SliderModel';
import { SliderModelGUI } from './sliderModel/SliderModelGUI';

class SliderPresenter {
  private modelGUI: SliderModelGUI;

  private view: SliderView;

  constructor(container: HTMLElement) {
    const model = new SliderModel();
    this.modelGUI = new SliderModelGUI(model);
    this.view = new SliderView(container);

    this.setSubscriptions();
    this.setInitialState();
  }

  private setSubscriptions() {
    this.view.setLeftHandlePositionSubscriber(this.modelGUI.calculateLeftHandleValue.bind(this.modelGUI));
    this.view.setRightHandlePositionSubscriber(this.modelGUI.calculateRightHandleValue.bind(this.modelGUI));
    this.modelGUI.setLeftHandleSubscriber(this.view.updateLeftHandleValue.bind(this.view));
    this.modelGUI.setRightHandleSubscriber(this.view.updateRightHandleValue.bind(this.view));
    this.modelGUI.setIsVerticalSubscriber(this.view.updateIsVertical.bind(this.view));
  }

  private setInitialState() {
    const state = this.modelGUI.getCurrentState();

    this.view.updateIsRange(state);
    this.view.updateIsVertical(state);
    this.view.updateValueLabelDisplayed(state);
    this.view.updateStep(state);
    this.view.updatePointsNumber(state);
    this.view.updateMinValue(state);
    this.view.updateMaxValue(state);
    this.view.updateLeftHandleValue(state);
    this.view.updateRightHandleValue(state);
  }
}

export { SliderPresenter };
