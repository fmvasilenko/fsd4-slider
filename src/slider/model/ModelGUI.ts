/* eslint-disable object-curly-newline */
import { Model } from './Model';

class ModelGUI {
  private model: Model;

  private isRangeExternalSubscriber: Function = () => {};

  private isVerticalExternalSubscriber: Function = () => {};

  private valueLabelDisplayedExternalSubscriber: Function = () => {};

  private scaleDisplayedExternalSubscriber: Function = () => {};

  private minValueExternalSubscriber: Function = () => {};

  private maxValueExternalSubscriber: Function = () => {};

  private stepExternalSubscriber: Function = () => {};

  private leftHandleExternalSubscriber: Function = () => {};

  private rightHandleExternalSubscriber: Function = () => {};

  constructor(model: Model) {
    this.model = model;
    this.setSubscriptions();
  }

  public calculateLeftHandleValue(position: number) {
    this.model.leftHandleValue.set(this.calculateValue(position));
  }

  public calculateRightHandleValue(position: number) {
    this.model.rightHandleValue.set(this.calculateValue(position));
  }

  public calculateAndChooseHandle(position: number) {
    const { isRange, minValue, leftHandleValue, rightHandleValue } = this.model;
    const value = this.calculateValue(position);
    const normValue = value - minValue.get();
    const middelValue = (rightHandleValue.get() - leftHandleValue.get()) / 2 + leftHandleValue.get();
    const normMiddelValue = middelValue - minValue.get();

    if (isRange.get() && normValue > normMiddelValue) rightHandleValue.set(value);
    else leftHandleValue.set(value);
  }

  public setIsRangeSubscriber(subscriber: Function) {
    this.isRangeExternalSubscriber = subscriber;
  }

  public setIsVerticalSubscriber(subscriber: Function) {
    this.isVerticalExternalSubscriber = subscriber;
  }

  public setValueLabelDisplayedSubscriber(subscriber: Function) {
    this.valueLabelDisplayedExternalSubscriber = subscriber;
  }

  public setScaleDisplayedSubscriber(subscriber: Function) {
    this.scaleDisplayedExternalSubscriber = subscriber;
  }

  public setMinValueSubscriber(subscriber: Function) {
    this.minValueExternalSubscriber = subscriber;
  }

  public setMaxValueSubscriber(subscriber: Function) {
    this.maxValueExternalSubscriber = subscriber;
  }

  public setStepSubscriber(subscriber: Function) {
    this.stepExternalSubscriber = subscriber;
  }

  public setLeftHandleSubscriber(subscriber: Function) {
    this.leftHandleExternalSubscriber = subscriber;
  }

  public setRightHandleSubscriber(subscriber: Function) {
    this.rightHandleExternalSubscriber = subscriber;
  }

  public getCurrentState(): State {
    return this.model.getCurrentState();
  }

  private setSubscriptions() {
    const {
      isRange, isVertical, valueLabelDisplayed, scaleDisplayed, minValue, maxValue, step, leftHandleValue, rightHandleValue,
    } = this.model;

    isRange.addSubscriber(this.isRangeSubscriber.bind(this));
    isVertical.addSubscriber(this.isVerticalSubscriber.bind(this));
    valueLabelDisplayed.addSubscriber(this.valueLabelDisplayedSubscriber.bind(this));
    scaleDisplayed.addSubscriber(this.scaleDisplayedSubscriber.bind(this));
    minValue.addSubscriber(this.minValueSubscriber.bind(this));
    maxValue.addSubscriber(this.maxValueSubscriber.bind(this));
    step.addSubscriber(this.stepSubscriber.bind(this));
    leftHandleValue.addSubscriber(this.leftHandleSubscriber.bind(this));
    rightHandleValue.addSubscriber(this.rightHandleSubscriber.bind(this));
  }

  private calculateValue(position: number): number {
    const { minValue, maxValue } = this.model;
    const range = maxValue.get() - minValue.get();
    return Math.round(position * range) + minValue.get();
  }

  private isRangeSubscriber() {
    this.isRangeExternalSubscriber(this.getCurrentState());
  }

  private isVerticalSubscriber() {
    this.isVerticalExternalSubscriber(this.getCurrentState());
  }

  private valueLabelDisplayedSubscriber() {
    this.valueLabelDisplayedExternalSubscriber(this.getCurrentState());
  }

  private scaleDisplayedSubscriber() {
    this.scaleDisplayedExternalSubscriber(this.getCurrentState());
  }

  private minValueSubscriber() {
    this.minValueExternalSubscriber(this.getCurrentState());
  }

  private maxValueSubscriber() {
    this.maxValueExternalSubscriber(this.getCurrentState());
  }

  private stepSubscriber() {
    this.stepExternalSubscriber(this.getCurrentState());
  }

  private leftHandleSubscriber() {
    this.leftHandleExternalSubscriber(this.getCurrentState());
  }

  private rightHandleSubscriber() {
    this.rightHandleExternalSubscriber(this.getCurrentState());
  }
}

export { ModelGUI };
