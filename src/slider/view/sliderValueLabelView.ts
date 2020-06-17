import { SliderConfig } from "../sliderConfig/sliderConfig"

class SliderValueLabelView {
  private CONTAINER: HTMLElement
  private config: SliderConfig

  constructor(container: HTMLElement, config: SliderConfig) {
    this.CONTAINER = container
    this.config = config
  }
}