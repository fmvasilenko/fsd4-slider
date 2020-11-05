/* eslint-disable class-methods-use-this */
class SliderRangeLineView {
  private classes: Classes;

  private root: HTMLElement;

  constructor(container: HTMLElement) {
    this.classes = require('../slider.classes.json');
    this.root = this.createRoot(container);
  }

  public switchVertical(state: State) {
    const { isVertical } = state;

    if (isVertical) this.root.classList.add(this.classes.rangeLineVertical);
    else this.root.classList.remove(this.classes.rangeLineVertical);

    this.render(state);
  }

  public render(state: State) {
    const { isVertical } = state;
    if (isVertical) this.renderVertical(state);
    else this.renderHorizontal(state);
  }

  private createRoot(container: HTMLElement) {
    const root = document.createElement('div');
    root.classList.add(this.classes.rangeLine);
    container.appendChild(root);
    return root;
  }

  private renderVertical(state: State) {
    const { isRange, leftHandleValue, rightHandleValue } = state;
    this.root.style.left = '';
    this.root.style.right = '';

    if (isRange) {
      this.root.style.top = `${100 - this.calculateShift(rightHandleValue, state)}%`;
      this.root.style.bottom = `${this.calculateShift(leftHandleValue, state)}%`;
    } else {
      this.root.style.top = `${100 - this.calculateShift(leftHandleValue, state)}%`;
      this.root.style.bottom = '0%';
    }
  }

  private renderHorizontal(state: State) {
    const { isRange, leftHandleValue, rightHandleValue } = state;
    this.root.style.top = '';
    this.root.style.bottom = '';

    if (isRange) {
      this.root.style.left = `${this.calculateShift(leftHandleValue, state)}%`;
      this.root.style.right = `${100 - this.calculateShift(rightHandleValue, state)}%`;
    } else {
      this.root.style.left = '0%';
      this.root.style.right = `${100 - this.calculateShift(leftHandleValue, state)}%`;
    }
  }

  private calculateShift(value: number, state: State) {
    const { minValue, maxValue } = state;
    return 100 * ((value - minValue) / (maxValue - minValue));
  }
}

export { SliderRangeLineView };
