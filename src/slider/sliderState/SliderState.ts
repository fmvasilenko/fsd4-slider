import { SliderStateItem } from './SliderStateItem';

class SliderState {
  public leftHandlePosition: SliderStateItem;

  public rightHandlePosition: SliderStateItem;

  constructor(leftHandlePosition?: number, rightHandlePosition?: number) {
    this.leftHandlePosition = new SliderStateItem(leftHandlePosition || 0, this.checkPosition);
    this.rightHandlePosition = new SliderStateItem(rightHandlePosition || 0, this.checkPosition);
  }

  // eslint-disable-next-line class-methods-use-this
  private checkPosition(givenPosition: number): number {
    let position = givenPosition;

    if (position < 0) position = 0;
    if (position > 1) position = 1;

    return position;
  }
}

export { SliderState };
