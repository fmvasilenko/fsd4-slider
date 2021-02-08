import autobind from 'autobind-decorator';

enum HandleSide {Left, Right}

class HandleView {
  private container: HTMLElement;

  private handleSide: HandleSide;

  private classes: Classes;

  private root: HTMLElement;

  private label: HTMLElement;

  private isDragged: boolean;

  private isVertical: boolean;

  private positionSubscriber: Function;

  constructor(container: HTMLElement, handleSide: HandleSide) {
    this.container = container;
    this.handleSide = handleSide;
    this.classes = require('../slider.classes.json');
    this.root = this.createRoot();
    this.label = this.createLabel();
    this.isDragged = false;
    this.isVertical = false;
    this.positionSubscriber = () => {};

    if (this.handleSide === HandleSide.Left) this.container.appendChild(this.root);

    this.bindEventListeners();
  }

  public switchHandle(state: State) {
    if (this.handleSide === HandleSide.Right) {
      const { isRange } = state;

      if (isRange) {
        this.container.appendChild(this.root);
        this.render(state);
      } else this.root.remove();
    }
  }

  public switchLabel(state: State) {
    const { valueLabelDisplayed } = state;

    if (valueLabelDisplayed) this.root.appendChild(this.label);
    else this.label.remove();
  }

  public switchVertical(state: State) {
    const { isVertical } = state;

    this.isVertical = isVertical;

    if (isVertical) {
      this.root.classList.add(this.classes.handleVertical);
      if (this.handleSide === HandleSide.Left) this.label.classList.add(this.classes.leftHandleLabelVertical);
      else this.label.classList.add(this.classes.rightHandleLabelVertical);
    } else {
      this.root.classList.remove(this.classes.handleVertical);
      if (this.handleSide === HandleSide.Left) this.label.classList.remove(this.classes.leftHandleLabelVertical);
      else this.label.classList.remove(this.classes.rightHandleLabelVertical);
    }

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

  private createLabel() {
    const label = document.createElement('div');
    label.classList.add(this.classes.valueLabel);

    if (this.handleSide === HandleSide.Left) label.classList.add(this.classes.leftHandleLabel);
    else label.classList.add(this.classes.rightHandleLabel);

    return label;
  }

  private render(state: State) {
    const { isVertical, firstValue, secondValue } = state;
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

    if (this.handleSide === HandleSide.Left) this.label.innerHTML = `${firstValue}`;
    else this.label.innerHTML = `${secondValue}`;
  }

  private calculateShift(state: State): number {
    const {
      min, max, firstValue, secondValue,
    } = state;
    const value = this.handleSide === HandleSide.Left ? firstValue : secondValue;
    const range = max - min;
    const position = (value - min) / range;
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
      isVertical, min, max, firstValue, secondValue,
    } = state;
    const scaleLength = isVertical ? this.container.offsetHeight : this.container.offsetWidth;
    const stepLength = scaleLength / (max - min);

    return (secondValue - firstValue) * stepLength;
  }

  private bindEventListeners() {
    this.root.addEventListener('mousedown', this.drag);
    document.addEventListener('mouseup', this.drop);
    document.addEventListener('mousemove', this.watchMouse);
  }

  @autobind
  private drag() {
    this.isDragged = true;
  }

  @autobind
  private drop() {
    this.isDragged = false;
  }

  @autobind
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

export { HandleView };
