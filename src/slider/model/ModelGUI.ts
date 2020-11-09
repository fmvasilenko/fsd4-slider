import { Model } from './Model';

class ModelGUI {
  private model: Model;

  private isRangeExternalSubscriber: Function;

  private isVerticalExternalSubscriber: Function;

  private valueLabelDisplayedExternalSubscriber: Function;

  private scaleDisplayedExternalSubscriber: Function;

  private minValueExternalSubscriber: Function;

  private maxValueExternalSubscriber: Function;

  private stepExternalSubscriber: Function;

  private pointsNumberExternalSubscriber: Function;

  private leftHandleExternalSubscriber: Function;

  private rightHandleExternalSubscriber: Function;

  constructor(model: Model) {
    this.model = model;
    this.isRangeExternalSubscriber = () => {};
    this.isVerticalExternalSubscriber = () => {};
    this.valueLabelDisplayedExternalSubscriber = () => {};
    this.scaleDisplayedExternalSubscriber = () => {};
    this.minValueExternalSubscriber = () => {};
    this.maxValueExternalSubscriber = () => {};
    this.stepExternalSubscriber = () => {};
    this.pointsNumberExternalSubscriber = () => {};
    this.leftHandleExternalSubscriber = () => {};
    this.rightHandleExternalSubscriber = () => {};

    this.setSubscriptions();
  }

  public calculateLeftHandleValue(position: number) {
    this.model.leftHandleValue.set(this.calculateValue(position));
  }

  public calculateRightHandleValue(position: number) {
    this.model.rightHandleValue.set(this.calculateValue(position));
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

  public setPointsNumberSubscriber(subscriber: Function) {
    this.pointsNumberExternalSubscriber = subscriber;
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
    this.model.isRange.addSubscriber(this.isRangeSubscriber.bind(this));
    this.model.isVertical.addSubscriber(this.isVerticalSubscriber.bind(this));
    this.model.valueLabelDisplayed.addSubscriber(this.valueLabelDisplayedSubscriber.bind(this));
    this.model.scaleDisplayed.addSubscriber(this.scaleDisplayedSubscriber.bind(this));
    this.model.minValue.addSubscriber(this.minValueSubscriber.bind(this));
    this.model.maxValue.addSubscriber(this.maxValueSubscriber.bind(this));
    this.model.step.addSubscriber(this.stepSubscriber.bind(this));
    this.model.pointsNumber.addSubscriber(this.pointsNumberSubscriber.bind(this));
    this.model.leftHandleValue.addSubscriber(this.leftHandleSubscriber.bind(this));
    this.model.rightHandleValue.addSubscriber(this.rightHandleSubscriber.bind(this));
  }

  private calculateValue(position: number): number {
    const range = this.model.maxValue.get() - this.model.minValue.get();
    return Math.floor(position * range) + this.model.minValue.get();
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

  private pointsNumberSubscriber() {
    this.pointsNumberExternalSubscriber(this.getCurrentState());
  }

  private leftHandleSubscriber() {
    this.leftHandleExternalSubscriber(this.getCurrentState());
  }

  private rightHandleSubscriber() {
    this.rightHandleExternalSubscriber(this.getCurrentState());
  }
}

export { ModelGUI };
