///<reference path="./slider.d.ts" />
///<reference path="./view/sliderView.d.ts" />
import { SliderHandleView } from "./sliderHandleView"
import { SliderLimitsView } from "./view/sliderLimitsView"
import { SliderValueLabel } from "./view/sliderValueLabel"

class SliderView implements ISliderView {
  ROOT: HTMLElement
  private controller: Slider
  private LEFT_HANDLE: SliderHandleView
  private RIGHT_HANDLE: SliderHandleView | undefined
  private MIN_VALUE: SliderLimitsView
  private MAX_VALUE: SliderLimitsView
  private VALUE_LABEL: SliderValueLabel
  private CLASSES = require("./sliderClasses.json")
  private config: SliderConfig
  private state: SliderViewState

  constructor(controller: Slider, root: HTMLElement, config: SliderConfig) {
    this.config = config
    this.state = this.getDefaultState()
    this.controller = controller

    this.ROOT = root
    this.ROOT.classList.add(this.CLASSES.SLIDER)

    this.LEFT_HANDLE = this.createHandle()
    this.ROOT.appendChild(this.LEFT_HANDLE.ROOT)

    if (this.config.isRange === true) {
      this.RIGHT_HANDLE = this.createHandle("right")
      this.ROOT.appendChild(this.RIGHT_HANDLE.ROOT)
    }

    this.MIN_VALUE = new SliderLimitsView(this.CLASSES.MIN_VALUE)
    this.ROOT.appendChild(this.MIN_VALUE.ROOT)
    this.MIN_VALUE.updateValue(this.config.minValue)

    this.MAX_VALUE = new SliderLimitsView(this.CLASSES.MAX_VALUE)
    this.ROOT.appendChild(this.MAX_VALUE.ROOT)
    this.MAX_VALUE.updateValue(this.config.maxValue)

    this.VALUE_LABEL = new SliderValueLabel(this.CLASSES.VALUE_LABEL)
    this.LEFT_HANDLE.ROOT.appendChild(this.VALUE_LABEL.ROOT)
    this.VALUE_LABEL.updateValue(this.config.value)

    this.bindEventListeners()
  }

  public setState(config: ImportedSliderConfig) {
    this.config = Object.assign(this.config, config)
    this.VALUE_LABEL.value = this.config.value
    this.LEFT_HANDLE.setValue(this.config.value)
  }

  private getDefaultState(): SliderViewState {
    return {
      dragLeftHandle: true,
      dragRightHandle: false
    }
  }

  private createHandle(position?: string): SliderHandleView{
    if (position == "right")
      return new SliderHandleView(this, this.CLASSES.HANDLE, this.config)
    else
      return new SliderHandleView(this, this.CLASSES.HANDLE, this.config)
  }

  private bindEventListeners() {
    this.ROOT.addEventListener("mousedown", this.drag.bind(this))
    document.addEventListener("mouseup", this.drop.bind(this))
    document.addEventListener("mousemove", this.watchMouse.bind(this))
  }

  private drag(event: MouseEvent) {
    if (event.target == this.LEFT_HANDLE.ROOT)
      this.LEFT_HANDLE.drag()
    else if (this.RIGHT_HANDLE !== undefined && event.target == this.RIGHT_HANDLE.ROOT)
      this.RIGHT_HANDLE.drag()
  }

  private drop() {
    this.LEFT_HANDLE.drop()
    if (this.RIGHT_HANDLE !== undefined)
      this.RIGHT_HANDLE.drop()
  }

  private watchMouse(event: MouseEvent) {
    if (this.LEFT_HANDLE.isDragged()) {
      this.controller.changeModel({
        leftPosition: this.calculateHandlePosition(event),
        length: this.ROOT.offsetWidth
      })
    }
  }

  private calculateHandlePosition(event: MouseEvent): number {
    let x = event.pageX
    let scaleBeginning = this.ROOT.getBoundingClientRect().left
    let length = this.ROOT.offsetWidth

    if (x < scaleBeginning) return 0
    else if (x > scaleBeginning + length) return length
    else return x - scaleBeginning
  }
}

export { SliderView }