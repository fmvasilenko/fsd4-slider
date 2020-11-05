import { SliderHandleView } from './SliderHandleView';
import { SliderRangeLineView } from './SliderRangeLineView';

enum HandleSide {Left, Right}

class SliderView {
  private classes: Classes;

  private root: HTMLElement;

  private leftHandle: SliderHandleView;

  private rightHandle: SliderHandleView;

  private rangeLine: SliderRangeLineView;

  constructor(container: HTMLElement) {
    this.classes = require('../slider.classes.json');
    this.root = this.createRoot(container);
    this.leftHandle = new SliderHandleView(this.root, HandleSide.Left);
    this.rightHandle = new SliderHandleView(this.root, HandleSide.Right);
    this.rangeLine = new SliderRangeLineView(this.root);
  }

  public updateIsRange(state: State) {
    this.rightHandle.switch(state);
    this.rangeLine.render(state);
  }

  public updateIsVertical(state: State) {
    this.switchVertical(state);
    this.leftHandle.switchVertical(state);
    this.rightHandle.switchVertical(state);
    this.rangeLine.switchVertical(state);
  }

  public updateLeftHandleValue(state: State) {
    this.leftHandle.updateValue(state);
    this.rightHandle.updateValue(state);
    this.rangeLine.render(state);
  }

  public updateRightHandleValue(state: State) {
    this.leftHandle.updateValue(state);
    this.rightHandle.updateValue(state);
    this.rangeLine.render(state);
  }

  public setLeftHandlePositionSubscriber(subscriber: Function) {
    this.leftHandle.setPositionSubscriber(subscriber);
  }

  public setRightHandlePositionSubscriber(subscriber: Function) {
    this.rightHandle.setPositionSubscriber(subscriber);
  }

  private createRoot(container: HTMLElement): HTMLElement {
    const root = document.createElement('div');
    root.classList.add(this.classes.root);
    container.appendChild(root);
    return root;
  }

  private switchVertical(state: State) {
    const { isVertical } = state;

    if (isVertical) this.root.classList.add(this.classes.rootVertical);
    else this.root.classList.remove(this.classes.rootVertical);
  }
}

export { SliderView };
