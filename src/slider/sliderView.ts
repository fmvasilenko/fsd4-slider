///<reference path="./slider.d.ts" />
///<reference path="./view/sliderView.d.ts" />
import { SliderHandleView } from "./sliderHandleView"
import { SliderLimitsView } from "./view/sliderLimitsView"
import { SliderValueLabel } from "./view/sliderValueLabel"
import { SliderDefaultValue } from "./view/sliderDefaultValue"

enum HandlePosition {Left, Right}

class SliderView implements ISliderView {
  ROOT: HTMLElement
  private controller: Slider
  private LEFT_HANDLE: SliderHandleView
  private RIGHT_HANDLE: SliderHandleView | undefined
  private MIN_VALUE: SliderLimitsView | undefined
  private MAX_VALUE: SliderLimitsView | undefined
  private VALUE_LABEL: SliderValueLabel
  private RIGHT_HANDLE_VALUE_LABEL: SliderValueLabel | undefined
  private DEFAULT_VALUES: SliderDefaultValue[]
  private CLASSES = require("./sliderClasses.json")
  private config: SliderConfig
  private state: SliderViewState

  constructor(controller: Slider, root: HTMLElement, config: SliderConfig) {
    this.config = config
    this.state = this.getDefaultState()
    this.controller = controller

    this.ROOT = root
    this.ROOT.classList.add(this.CLASSES.SLIDER)

    this.DEFAULT_VALUES = []

    this.LEFT_HANDLE = this.createHandle()
    this.VALUE_LABEL = new SliderValueLabel(this.CLASSES.VALUE_LABEL, this.config)
    this.LEFT_HANDLE.ROOT.appendChild(this.VALUE_LABEL.ROOT)

    if (this.config.isRange === true) {
      this.RIGHT_HANDLE = this.createHandle("right")
      this.RIGHT_HANDLE_VALUE_LABEL = new SliderValueLabel(this.CLASSES.VALUE_LABEL, this.config)
      this.RIGHT_HANDLE.ROOT.appendChild(this.RIGHT_HANDLE_VALUE_LABEL.ROOT)
    }

    if (this.config.defaultValues == undefined) {
      this.MIN_VALUE = new SliderLimitsView(this.CLASSES.MIN_VALUE)
      this.ROOT.appendChild(this.MIN_VALUE.ROOT)
      this.MIN_VALUE.updateValue(this.config.minValue)

      this.MAX_VALUE = new SliderLimitsView(this.CLASSES.MAX_VALUE)
      this.ROOT.appendChild(this.MAX_VALUE.ROOT)
      this.MAX_VALUE.updateValue(this.config.maxValue)
    }
    else {
      let length = 100 * (this.ROOT.offsetWidth / (this.config.defaultValues.length - 1)) / this.ROOT.offsetWidth
      this.config.defaultValues.forEach((element: number | string, index: number) => {
        let position = index * length
        this.DEFAULT_VALUES[index] = new SliderDefaultValue(element, this.CLASSES.DEFAULT_VALUE, position)
        this.ROOT.appendChild(this.DEFAULT_VALUES[index].ROOT)
      })
    }

    this.bindEventListeners()
  }

  public setState(config: SliderModelState) {
    this.VALUE_LABEL.setValue(config.leftValue)
    this.LEFT_HANDLE.setValue(config.leftValue)

    if (config.rightValue !== undefined) {
      this.RIGHT_HANDLE?.setValue(config.rightValue)
      this.RIGHT_HANDLE_VALUE_LABEL?.setValue(config.rightValue)
    }
  }

  private getDefaultState(): SliderViewState {
    return {
      dragLeftHandle: true,
      dragRightHandle: false,
      leftPosition: 0,
      rightPosition: 0
    }
  }

  private createHandle(position?: string): SliderHandleView{
    if (position == "right")
      return new SliderHandleView(this, this.CLASSES.HANDLE, this.config, HandlePosition.Right)
    else
      return new SliderHandleView(this, this.CLASSES.HANDLE, this.config, HandlePosition.Left)
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
      this.state.leftPosition = this.calculateHandlePosition(event)
      this.controller.changeModel({
        leftPosition: this.state.leftPosition,
        length: this.ROOT.offsetWidth
      })
    }
    else if (this.RIGHT_HANDLE !== undefined && this.RIGHT_HANDLE.isDragged()) {
      this.state.rightPosition = this.calculateHandlePosition(event)
      this.controller.changeModel({
        leftPosition: this.state.leftPosition,
        rightPosition: this.state.rightPosition,
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