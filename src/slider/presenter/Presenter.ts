/// <reference path='../slider.d.ts' />

import { ModelAPI } from '../model/ModelAPI';
import { View } from '../view/View';

class Presenter {
  private modelAPI: ModelAPI;

  private view: View;

  constructor(modelAPI: ModelAPI, view: View) {
    this.modelAPI = modelAPI;
    this.view = view;

    this.setSubscriptions();
    this.setInitialState();
  }

  private setSubscriptions() {
    this.view.subscribe('firstHandle', this.modelAPI.calculateFirstValue);
    this.view.subscribe('secondHandle', this.modelAPI.calculateSecondValue);
    this.view.subscribe('scale', this.modelAPI.calculateAndChooseHandle);

    this.modelAPI.subscribe('isRange', this.view.updateIsRange);
    this.modelAPI.subscribe('isVertical', this.view.updateIsVertical);
    this.modelAPI.subscribe('valueLabelDisplayed', this.view.updateValueLabelDisplayed);
    this.modelAPI.subscribe('scaleDisplayed', this.view.updateScaleDisplayed);
    this.modelAPI.subscribe('min', this.view.updateMin);
    this.modelAPI.subscribe('max', this.view.updateMax);
    this.modelAPI.subscribe('step', this.view.updateStep);
    this.modelAPI.subscribe('firstValue', this.view.updateFirstValue);
    this.modelAPI.subscribe('secondValue', this.view.updateSecondValue);
  }

  private setInitialState() {
    const state = this.modelAPI.getCurrentState();

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
