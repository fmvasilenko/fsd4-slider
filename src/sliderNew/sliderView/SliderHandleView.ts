enum HandleSide {Left, Right}

class SliderHandleView {
  private container: HTMLElement;

  private handleSide: HandleSide;

  private classes: Classes;

  private root: HTMLElement;

  private isDragged: boolean;

  private isVertical: boolean;

  private positionSubscriber: Function;

  constructor(container: HTMLElement, handleSide: HandleSide) {
    this.container = container;
    this.handleSide = handleSide;
    this.classes = require('../slider.classes.json');
    this.root = this.createRoot();
    this.isDragged = false;
    this.isVertical = false;
    this.positionSubscriber = () => {};

    if (this.handleSide === HandleSide.Left) this.container.appendChild(this.root);

    this.bindEventListeners();
  }

  public switch(state: State) {
    if (this.handleSide === HandleSide.Right) {
      const { isRange } = state;

      if (isRange) {
        this.container.appendChild(this.root);
        this.render(state);
      } else this.root.remove();
    }
  }

  public switchVertical(state: State) {
    const { isVertical } = state;

    this.isVertical = isVertical;

    if (isVertical) this.root.classList.add(this.classes.handleVertical);
    else this.root.classList.remove(this.classes.handleVertical);

    this.render(state);
  }

  public updateValue(state: State) {
    this.render(state);
  }

  public setPositionSubscriber(subscriber: Function) {
    this.positionSubscriber = subscriber;
  }

  private createRoot(): HTMLElement {
    const root = document.createElement('div');
    root.classList.add(this.classes.handle);

    if (this.handleSide === HandleSide.Left) root.classList.add(this.classes.leftHandle);
    else root.classList.add(this.classes.rightHandle);

    return root;
  }

  private render(state: State) {
    const { isVertical } = state;
    let shift = this.calculateShift(state);

    if (this.handleSide === HandleSide.Left) shift -= this.calculateExtraShift(state);
    else shift += this.calculateExtraShift(state);

    if (isVertical) {
      this.root.style.left = '';
      this.root.style.bottom = `${shift}%`;
    } else {
      this.root.style.bottom = '';
      this.root.style.left = `${shift}%`;
    }
  }

  private calculateShift(state: State): number {
    const {
      minValue, maxValue, leftHandleValue, rightHandleValue,
    } = state;
    const value = this.handleSide === HandleSide.Left ? leftHandleValue : rightHandleValue;
    const range = maxValue - minValue;
    const position = (value - minValue) / range;
    return position * 100;
  }

  private calculateExtraShift(state: State): number {
    // calculates extra shift when handles are close to each other to avoid overlaying

    const { isVertical, isRange } = state;

    if (!isRange) return 0;

    const distanceBetweenHandles = this.calculateDistanceBetweenHandles(state);
    const handleSize = isVertical ? this.root.offsetHeight : this.root.offsetWidth;
    const scaleSize = isVertical ? this.container.offsetHeight : this.container.offsetWidth;
    const handleOverlay = ((handleSize - distanceBetweenHandles) / 2) / scaleSize; // from 0 to 1

    return handleSize > distanceBetweenHandles ? 100 * handleOverlay : 0;
  }

  private calculateDistanceBetweenHandles(state: State): number {
    const {
      isVertical, minValue, maxValue, leftHandleValue, rightHandleValue,
    } = state;
    const scaleLength = isVertical ? this.container.offsetHeight : this.container.offsetWidth;
    const stepLength = scaleLength / (maxValue - minValue);

    return (rightHandleValue - leftHandleValue) * stepLength;
  }

  private bindEventListeners() {
    this.root.addEventListener('mousedown', this.drag.bind(this));
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
    if (this.isDragged === true) this.positionSubscriber(this.calculatePosition(event));
  }

  private calculatePosition(event: MouseEvent): number {
    let position = this.isVertical === true
      ? this.calculateVerticalPosition(event.clientY)
      : this.calculateHorizontalPosition(event.clientX);

    if (position > 1) position = 1;
    if (position < 0) position = 0;

    return position;
  }

  private calculateHorizontalPosition(x: number): number {
    const scaleBeginning = this.container.getBoundingClientRect().left;
    const length = this.container.offsetWidth;
    return (x - scaleBeginning) / length;
  }

  private calculateVerticalPosition(y: number): number {
    const length = this.container.offsetHeight;
    const scaleBeginning = this.container.getBoundingClientRect().top + length;
    return (scaleBeginning - y) / length;
  }
}

export { SliderHandleView };
