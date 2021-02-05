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
    this.view.setLeftHandlePositionSubscriber(this.modelGUI.calculateFirstValue.bind(this.modelGUI));
    this.view.setRightHandlePositionSubscriber(this.modelGUI.calculateSecondValue.bind(this.modelGUI));
    this.view.setScaleClickSubscriber(this.modelGUI.calculateAndChooseHandle.bind(this.modelGUI));
    this.modelGUI.subscribe('isRange', this.view.updateIsRange.bind(this.view));
    this.modelGUI.subscribe('isVertical', this.view.updateIsVertical.bind(this.view));
    this.modelGUI.subscribe('valueLabelDisplayed', this.view.updateValueLabelDisplayed.bind(this.view));
    this.modelGUI.subscribe('scaleDisplayed', this.view.updateScaleDisplayed.bind(this.view));
    this.modelGUI.subscribe('min', this.view.updateMin.bind(this.view));
    this.modelGUI.subscribe('max', this.view.updateMax.bind(this.view));
    this.modelGUI.subscribe('step', this.view.updateStep.bind(this.view));
    this.modelGUI.subscribe('firstValue', this.leftHandleSubscriber.bind(this));
    this.modelGUI.subscribe('secondValue', this.rightHandleSubscriber.bind(this));
  }

  private leftHandleSubscriber(state: State) {
    this.view.updateFirstValue(state);
  }

  private rightHandleSubscriber(state: State) {
    this.view.updateSecondValue(state);
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
