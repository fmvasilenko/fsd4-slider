import { SliderConfig } from '../sliderConfig/sliderConfig';
import { SliderState } from '../sliderState/sliderState';
import { SliderValueLabelView } from './sliderValueLabelView';

enum Side { Left, Right }

class SliderHandle {
  private CONTAINER: HTMLElement;

  private config: SliderConfig;

  private state: SliderState;

  private SIDE: Side;

  private CLASSES: SliderClasses;

  private ROOT: HTMLElement;

  private LABEL: SliderValueLabelView;

  private isDragged: boolean;

  constructor(
    container: HTMLElement,
    config: SliderConfig,
    state: SliderState,
    side: Side,
  ) {
    this.CONTAINER = container;
    this.config = config;
    this.state = state;
    this.SIDE = side;
    this.CLASSES = require('../sliderClasses.json');
    this.ROOT = this.createRootElement();
    this.LABEL = new SliderValueLabelView(this.ROOT, this.config, this.SIDE);
    this.isDragged = false;

    if (this.SIDE === Side.Left || this.config.isRange.get() === true) this.CONTAINER.appendChild(this.ROOT);

    this.render();

    this.config.isRange.addSubscriber(this.switchRightHandle.bind(this));
    this.config.hasDefaultValues.addSubscriber(this.render.bind(this));
    this.config.isVertical.addSubscriber(this.switchVertical.bind(this));
    this.config.leftHandleValue.addSubscriber(this.render.bind(this));
    this.config.rightHandleValue.addSubscriber(this.render.bind(this));

    this.bindEventListeners();
  }

  private createRootElement() {
    const handle = document.createElement('div');
    handle.classList.add(this.CLASSES.HANDLE);

    if (this.SIDE === Side.Right) handle.classList.add(this.CLASSES.RIGHT_HANDLE);
    else handle.classList.add(this.CLASSES.LEFT_HANDLE);

    if (this.config.isVertical.get() === true) handle.classList.add(this.CLASSES.HANDLE_VERTICAL);

    return handle;
  }

  private switchRightHandle() {
    if (this.SIDE === Side.Right) {
      if (this.config.isRange.get() === true) this.CONTAINER.appendChild(this.ROOT);
      else this.ROOT.remove();
    }
  }

  private switchVertical() {
    const changeVertical = new Promise((resolve) => {
      this.changeVerticalClass();
      resolve();
    });

    changeVertical.then(() => {
      this.render();
    });
  }

  private changeVerticalClass() {
    if (this.config.isVertical.get() === true) this.ROOT.classList.add(this.CLASSES.HANDLE_VERTICAL);
    else this.ROOT.classList.remove(this.CLASSES.HANDLE_VERTICAL);
  }

  private render() {
    let shift: number;

    if (this.config.hasDefaultValues.get() === true) shift = this.calculateDefaultValuesShift();
    else shift = this.calculateShift();

    if (this.SIDE === Side.Left) shift -= this.calculateExtraShift();
    else shift += this.calculateExtraShift();

    if (this.config.isVertical.get() === true) {
      this.ROOT.style.left = '';
      this.ROOT.style.bottom = `${shift}%`;
    } else {
      this.ROOT.style.bottom = '';
      this.ROOT.style.left = `${shift}%`;
    }
  }

  private calculateDefaultValuesShift(): number {
    const handleValue = this.SIDE === Side.Left
      ? (this.config.leftHandleValue.get() as number)
      : (this.config.rightHandleValue.get() as number);
    const defaultValues = this.config.defaultValues.get() as number[] | string[];

    if (this.config.hasDefaultValues.get() === true) return (100 * handleValue) / (defaultValues.length - 1);
    return 0;
  }

  private calculateShift(): number {
    const minValue = this.config.minValue.get() as number;
    const maxValue = this.config.maxValue.get() as number;
    const value = this.SIDE === Side.Left
      ? (this.config.leftHandleValue.get() as number)
      : (this.config.rightHandleValue.get() as number);

    const range = maxValue - minValue;
    const position = (value - minValue) / range;
    return position * 100;
  }

  private bindEventListeners() {
    this.ROOT.addEventListener('mousedown', this.drag.bind(this));
    document.addEventListener('mouseup', this.drop.bind(this));
    document.addEventListener('mousemove', this.watchMouse.bind(this));
  }

  private drag() {
    this.isDragged = true;
  }

  private drop() {
    this.isDragged = false;
  }

  private watchMouse(event: MouseEvent) {
    if (this.isDragged === true) {
      const position = this.calculatePosition(event);
      if (this.SIDE === Side.Left) this.state.leftHandlePosition.set(position);
      else this.state.rightHandlePosition.set(position);
    }
  }

  private calculatePosition(event: MouseEvent): number {
    return this.config.isVertical.get() === true
      ? this.calculateVerticalPosition(event.clientY)
      : this.calculateHorizontalPosition(event.clientX);
  }

  private calculateHorizontalPosition(x: number): number {
    /**
     * function receives x mouse coordinate
     * and returns handle position on the scale, normalized from 0 to 1
     */

    const scaleBeginning = this.CONTAINER.getBoundingClientRect().left;
    const length = this.CONTAINER.offsetWidth;

    if (x < scaleBeginning) return 0;
    if (x > scaleBeginning + length) return 1;
    return (x - scaleBeginning) / length;
  }

  private calculateVerticalPosition(y: number): number {
    /**
     * function receives y mouse coordinate
     * and returns handle position on the scale, normalized from 0 to 1
     */

    const length = this.CONTAINER.offsetHeight;
    const scaleBeginning = this.CONTAINER.getBoundingClientRect().top + length;

    if (y < scaleBeginning - length) return 1;
    if (y > scaleBeginning) return 0;
    return (scaleBeginning - y) / length;
  }

  private calculateExtraShift(): number {
    if (this.config.isRange.get() === false) return 0;

    const leftHandleValue = this.config.leftHandleValue.get() as number;
    const rightHandleValue = this.config.rightHandleValue.get() as number;
    const distanceBetweenHandles = this.calculateDistanceBetweenHandles(leftHandleValue, rightHandleValue);

    const handleSize = this.config.isVertical.get() === true
      ? this.ROOT.offsetHeight
      : this.ROOT.offsetWidth;

    const scaleSize = this.config.isVertical.get() === true
      ? this.CONTAINER.offsetHeight
      : this.CONTAINER.offsetWidth;

    const handleOverlay = ((handleSize - distanceBetweenHandles) / 2) / scaleSize; // from 0 to 1

    return handleSize > distanceBetweenHandles
      ? 100 * handleOverlay
      : 0;
  }

  private calculateDistanceBetweenHandles(leftHandleValue: number, rightHandleValue: number): number {
    let stepLength = 0;
    const scaleLength = this.config.isVertical.get() === true
      ? this.CONTAINER.offsetHeight
      : this.CONTAINER.offsetWidth;

    if (this.config.hasDefaultValues.get() === true) {
      const defaultValues = this.config.defaultValues.get() as number[]| string[];
      stepLength = scaleLength / defaultValues.length;
    } else {
      const minValue = this.config.minValue.get() as number;
      const maxValue = this.config.maxValue.get() as number;
      const valuesRange = maxValue - minValue;
      stepLength = scaleLength / valuesRange;
    }

    return (rightHandleValue - leftHandleValue) * stepLength;
  }
}

export { SliderHandle };
