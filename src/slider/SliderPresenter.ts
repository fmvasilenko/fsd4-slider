/// <reference path='./slider.d.ts' />

import { SliderModel } from './sliderModel/SliderModel';
import { SliderModelGUI } from './sliderModel/SliderModelGUI';
import { SliderView } from './sliderView/SliderView';

class SliderPresenter {
  private model: SliderModel;

  private modelGUI: SliderModelGUI;

  private view: SliderView;

  private isRangeExternalSubscriber: Function = () => {};

  private isVerticalExternalSubscriber: Function = () => {};

  constructor(container: HTMLElement) {
    this.model = new SliderModel();
    this.modelGUI = new SliderModelGUI(this.model);
    this.view = new SliderView(container);

    this.setSubscriptions();
    this.setInitialState();
  }

  public get isRange() {
    return this.model.isRange.get();
  }

  public set isRange(value: boolean) {
    this.model.isRange.set(value);
  }

  public get isVertical() {
    return this.model.isVertical.get();
  }

  public set isVertical(value: boolean) {
    this.model.isVertical.set(value);
  }

  public get valueLabelDisplayed() {
    return this.model.valueLabelDisplayed.get();
  }

  public set valueLabelDisplayed(value: boolean) {
    this.model.valueLabelDisplayed.set(value);
  }

  private setSubscriptions() {
    this.view.setLeftHandlePositionSubscriber(this.modelGUI.calculateLeftHandleValue.bind(this.modelGUI));
    this.view.setRightHandlePositionSubscriber(this.modelGUI.calculateRightHandleValue.bind(this.modelGUI));
    this.modelGUI.setLeftHandleSubscriber(this.view.updateLeftHandleValue.bind(this.view));
    this.modelGUI.setRightHandleSubscriber(this.view.updateRightHandleValue.bind(this.view));
    this.modelGUI.setIsRangeSubscriber(this.view.updateIsRange.bind(this.view));
    this.modelGUI.setIsVerticalSubscriber(this.view.updateIsVertical.bind(this.view));
    this.modelGUI.setValueLabelDisplayedSubscriber(this.view.updateValueLabelDisplayed.bind(this.view));

    this.model.isRange.addSubscriber(this.isRangeSubscriber.bind(this));
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

  private isRangeSubscriber(value: boolean) {
    this.isRangeExternalSubscriber(value);
  }
}

export { SliderPresenter };
