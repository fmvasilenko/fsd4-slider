import { SliderHandle } from "./sliderHandleView"
import { SliderLimitView } from "./sliderLimitView"
import { SliderDefaultValueLabel } from "./sliderDefaultValueLabelView"
import { SliderRangeLineView } from "./sliderRangeLineView"
import { SliderConfig } from "../sliderConfig/sliderConfig"
import { SliderState } from "../sliderState/sliderState"

class SliderView {
  private config: SliderConfig
  private state: SliderState
  private ROOT: HTMLElement
  private CLASSES: SliderClasses
  private LEFT_HANDLE: SliderHandle
  private RIGHT_HANDLE: SliderHandle
  private RANGE_LINE: SliderRangeLineView
  private MIN_VALUE_LABEL: SliderLimitView
  private MAX_VALUE_LABEL: SliderLimitView
  private DEFAULT_VALUES: SliderDefaultValueLabel[] = new Array()

  constructor(root: HTMLElement, config: SliderConfig, state: SliderState) {
    this.config = config
    this.state = state
    this.CLASSES = require("../sliderClasses.json")

    this.ROOT = root
    this.ROOT.classList.add(this.CLASSES.SLIDER)
    this.switchVertical()

    enum Side{Left, Right}
    this.LEFT_HANDLE = new SliderHandle(this.ROOT, this.config, this.state, Side.Left)
    this.RIGHT_HANDLE = new SliderHandle(this.ROOT, this.config, this.state, Side.Right)

    this.RANGE_LINE = new SliderRangeLineView(this.ROOT, this.config)

    enum Type{MinVal, MaxVal}
    this.MIN_VALUE_LABEL = new SliderLimitView(this.ROOT, this.config, this.state, Type.MinVal)
    this.MAX_VALUE_LABEL = new SliderLimitView(this.ROOT, this.config, this.state, Type.MaxVal)

    let defaultValues = this.config.defaultValues.get() as number[] | string[]
    defaultValues.forEach((value: string | number, index: number, array: string[] | number[]) => {
      this.DEFAULT_VALUES[index] = new SliderDefaultValueLabel(this.ROOT, this.config, this.state, index)
    })

    this.config.defaultValues.addSubscriber(this.checkDefaultValues.bind(this))
    this.config.isVertical.addSubscriber(this.switchVertical.bind(this))

    this.bindEventListeners()
  }

  private checkDefaultValues() {
    console.log(`1. Default values: ${this.DEFAULT_VALUES}`)

    this.DEFAULT_VALUES.forEach((value: SliderDefaultValueLabel) => {
      value.remove()
      console.log(value)
    })
    this.DEFAULT_VALUES.length = 0

    console.log(`2. Default values: ${this.DEFAULT_VALUES}`)

    let defaultValues = this.config.defaultValues.get() as number[] | string[]
    defaultValues.forEach((value: string | number, index: number, array: string[] | number[]) => {
      this.DEFAULT_VALUES[index] = new SliderDefaultValueLabel(this.ROOT, this.config, this.state, index)
    })

    console.log(`3. Default values: ${this.DEFAULT_VALUES}`)
  }

  private switchVertical() {
    if (this.config.isVertical.get() === true) this.ROOT.classList.add(this.CLASSES.SLIDER_VERTICAL)
    else this.ROOT.classList.remove(this.CLASSES.SLIDER_VERTICAL)
  }

  private bindEventListeners() {
    this.ROOT.addEventListener("click", this.clickHandler.bind(this))
  }

  private clickHandler(event: MouseEvent) {
    if (this.config.isRange.get() === false &&
        event.target === this.ROOT) 
        this.state.leftHandlePosition.set(this.calculatePosition(event))
  }

  private calculatePosition(event: MouseEvent): number {
    if (this.config.isVertical.get() === true) return this.calculateVerticalPosition(event.clientY)
    else return this.calculateHorizontalPosition(event.clientX)
  }

  private calculateHorizontalPosition(x: number): number {
    /**
     * function receives x mouse coordinate
     * and returns handle position on the scale, normalized from 0 to 1
     */
    //let  scaleBeginning = this.ROOT.getBoundingClientRect().left
    let scaleBeginning = this.ROOT.getBoundingClientRect().left
    let length = this.ROOT.offsetWidth

    if (x < scaleBeginning) return 0
    else if (x > scaleBeginning + length) return 1
    else return (x - scaleBeginning) / length
  }

  private calculateVerticalPosition(y: number): number {
    /**
     * function receives y mouse coordinate
     * and returns handle position on the scale, normalized from 0 to 1
     */
    //let scaleBeginning = this.ROOT.getBoundingClientRect().bottom
    let length = this.ROOT.offsetHeight
    let scaleBeginning = this.ROOT.getBoundingClientRect().top + length

    if (y < scaleBeginning - length) return 1
    else if (y > scaleBeginning) return 0
    else return (scaleBeginning - y) / length
  }
}

export { SliderView }