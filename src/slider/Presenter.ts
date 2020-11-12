/// <reference path='./slider.d.ts' />

import { Model } from './model/Model';
import { ModelGUI } from './model/ModelGUI';
import { View } from './view/View';

class Presenter {
  private model: Model;

  private modelGUI: ModelGUI;

  private view: View;

  private leftHandleExternalSubscriber: Function = () => {};

  private rightHandleExternalSubscriber: Function = () => {};

  constructor(container: HTMLElement, config?: Config) {
    this.model = new Model(config);
    this.modelGUI = new ModelGUI(this.model);
    this.view = new View(container);

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

  public get scaleDisplayed() {
    return this.model.scaleDisplayed.get();
  }

  public set scaleDisplayed(value: boolean) {
    this.model.scaleDisplayed.set(value);
  }

  public get minValue() {
    return this.model.minValue.get();
  }

  public set minValue(value: number) {
    this.model.minValue.set(value);
  }

  public get maxValue() {
    return this.model.maxValue.get();
  }

  public set maxValue(value: number) {
    this.model.maxValue.set(value);
  }

  public get step() {
    return this.model.step.get();
  }

  public set step(value: number) {
    this.model.step.set(value);
  }

  public get pointsNumber() {
    return this.model.pointsNumber.get();
  }

  public set pointsNumber(value: number) {
    this.model.pointsNumber.set(value);
  }

  public get leftHandleValue() {
    return this.model.leftHandleValue.get();
  }

  public set leftHandleValue(value: number) {
    this.model.leftHandleValue.set(value);
  }

  public get rightHandleValue() {
    return this.model.rightHandleValue.get();
  }

  public set rightHandleValue(value: number) {
    this.model.rightHandleValue.set(value);
  }

  public setLeftHandleSubscriber(subscriber: Function) {
    this.leftHandleExternalSubscriber = subscriber;
  }

  public setRightHandleSubscriber(subscriber: Function) {
    this.rightHandleExternalSubscriber = subscriber;
  }

  private setSubscriptions() {
    this.view.setLeftHandlePositionSubscriber(this.modelGUI.calculateLeftHandleValue.bind(this.modelGUI));
    this.view.setRightHandlePositionSubscriber(this.modelGUI.calculateRightHandleValue.bind(this.modelGUI));
    this.modelGUI.setIsRangeSubscriber(this.view.updateIsRange.bind(this.view));
    this.modelGUI.setIsVerticalSubscriber(this.view.updateIsVertical.bind(this.view));
    this.modelGUI.setValueLabelDisplayedSubscriber(this.view.updateValueLabelDisplayed.bind(this.view));
    this.modelGUI.setScaleDisplayedSubscriber(this.view.updateScaleDisplayed.bind(this.view));
    this.modelGUI.setMinValueSubscriber(this.view.updateMinValue.bind(this.view));
    this.modelGUI.setMaxValueSubscriber(this.view.updateMaxValue.bind(this.view));
    this.modelGUI.setStepSubscriber(this.view.updateStep.bind(this.view));
    this.modelGUI.setPointsNumberSubscriber(this.view.updatePointsNumber.bind(this.view));
    this.modelGUI.setLeftHandleSubscriber(this.leftHandleSubscriber.bind(this));
    this.modelGUI.setRightHandleSubscriber(this.rightHandleSubscriber.bind(this));
  }

  private leftHandleSubscriber(state: State) {
    this.view.updateLeftHandleValue(state);
    this.leftHandleExternalSubscriber(state.leftHandleValue);
  }

  private rightHandleSubscriber(state: State) {
    this.view.updateRightHandleValue(state);
    this.rightHandleExternalSubscriber(state.rightHandleValue);
  }

  private setInitialState() {
    const state = this.modelGUI.getCurrentState();

    this.view.updateIsRange(state);
    this.view.updateIsVertical(state);
    this.view.updateValueLabelDisplayed(state);
    this.view.updateScaleDisplayed(state);
    this.view.updateStep(state);
    this.view.updatePointsNumber(state);
    this.view.updateMinValue(state);
    this.view.updateMaxValue(state);
    this.view.updateLeftHandleValue(state);
    this.view.updateRightHandleValue(state);
  }
}

export { Presenter };
