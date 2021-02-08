/// <reference path='../slider.d.ts' />

import { ModelGUI } from '../model/ModelGUI';
import { View } from '../view/View';

class Presenter {
  private modelGUI: ModelGUI;

  private view: View;

  constructor(modelGUI: ModelGUI, view: View) {
    this.modelGUI = modelGUI;
    this.view = view;

    this.setSubscriptions();
    this.setInitialState();
  }

  private setSubscriptions() {
    this.view.setLeftHandlePositionSubscriber(this.modelGUI.calculateFirstValue);
    this.view.setRightHandlePositionSubscriber(this.modelGUI.calculateSecondValue);
    this.view.setScaleClickSubscriber(this.modelGUI.calculateAndChooseHandle);

    this.modelGUI.subscribe('isRange', this.view.updateIsRange);
    this.modelGUI.subscribe('isVertical', this.view.updateIsVertical);
    this.modelGUI.subscribe('valueLabelDisplayed', this.view.updateValueLabelDisplayed);
    this.modelGUI.subscribe('scaleDisplayed', this.view.updateScaleDisplayed);
    this.modelGUI.subscribe('min', this.view.updateMin);
    this.modelGUI.subscribe('max', this.view.updateMax);
    this.modelGUI.subscribe('step', this.view.updateStep);
    this.modelGUI.subscribe('firstValue', this.view.updateFirstValue);
    this.modelGUI.subscribe('secondValue', this.view.updateSecondValue);
  }

  private setInitialState() {
    const state = this.modelGUI.getCurrentState();

    this.view.updateIsRange(state);
    this.view.updateIsVertical(state);
    this.view.updateValueLabelDisplayed(state);
    this.view.updateScaleDisplayed(state);
    this.view.updateStep(state);
    this.view.updateMin(state);
    this.view.updateMax(state);
    this.view.updateFirstValue(state);
    this.view.updateSecondValue(state);
  }
}

export { Presenter };
