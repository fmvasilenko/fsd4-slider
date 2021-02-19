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
    const { getCurrentState } = this.modelAPI;

    this.view.subscribe('firstHandle', this.modelAPI.calculateFirstValue);
    this.view.subscribe('secondHandle', this.modelAPI.calculateSecondValue);
    this.view.subscribe('scale', this.modelAPI.calculateAndChooseHandle);

    this.modelAPI.subscribe('isRange', () => this.view.updateIsRange(getCurrentState()));
    this.modelAPI.subscribe('isVertical', () => this.view.updateIsVertical(getCurrentState()));
    this.modelAPI.subscribe('valueLabelDisplayed', () => this.view.updateValueLabelDisplayed(getCurrentState()));
    this.modelAPI.subscribe('scaleDisplayed', () => this.view.updateScaleDisplayed(getCurrentState()));
    this.modelAPI.subscribe('min', () => this.view.updateScale(getCurrentState()));
    this.modelAPI.subscribe('max', () => this.view.updateScale(getCurrentState()));
    this.modelAPI.subscribe('step', () => this.view.updateScale(getCurrentState()));
    this.modelAPI.subscribe('firstValue', () => this.view.updateValues(getCurrentState()));
    this.modelAPI.subscribe('secondValue', () => this.view.updateValues(getCurrentState()));
  }

  private setInitialState() {
    const state = this.modelAPI.getCurrentState();

    this.view.updateIsRange(state);
    this.view.updateIsVertical(state);
    this.view.updateValueLabelDisplayed(state);
    this.view.updateScaleDisplayed(state);
    this.view.updateScale(state);
    this.view.updateValues(state);
  }
}

export { Presenter };
