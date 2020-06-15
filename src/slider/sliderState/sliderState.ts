import { SliderStateItem } from "./sliderStateItem"

class SliderState {
  public leftHandlePosition: SliderStateItem
  public rightHandlePosition: SliderStateItem

  constructor(leftHandlePosition: number, rightHandlePosition: number) {
    this.leftHandlePosition = new SliderStateItem(leftHandlePosition, this.checkPosition)
    this.rightHandlePosition = new SliderStateItem(rightHandlePosition, this.checkPosition)
  }

  private checkPosition(position: number): number {
    if (position < 0) position = 0
    if (position > 1) position = 1
    return position
  }
}

export { SliderState }