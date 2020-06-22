import { SliderHandle } from "./sliderHandleView"
import { SliderLimitView } from "./sliderLimitView"
import { SliderDefaultValueLabel } from "./sliderDefaultValueLabelView"
import { SliderRangeLineView } from "./sliderRangeLineView"
import { SliderConfig } from "../sliderConfig/sliderConfig"
import { SliderState } from "../sliderState/sliderState"

class SliderView {
  private config: SliderConfig
  private state: SliderState
  public ROOT: HTMLElement
  public CLASSES: SliderClasses
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
    this.MIN_VALUE_LABEL = new SliderLimitView(this.ROOT, this.config, Type.MinVal)
    this.MAX_VALUE_LABEL = new SliderLimitView(this.ROOT, this.config, Type.MaxVal)

    let defaultValues = this.config.defaultValues.get() as number[] | string[]
    defaultValues.forEach((value: string | number, index: number, array: string[] | number[]) => {
      this.DEFAULT_VALUES[index] = new SliderDefaultValueLabel(this.ROOT, this.config, index)
    })

    this.config.defaultValues.addSubscriber(this.checkDefaultValues.bind(this))
    this.config.isVertical.addSubscriber(this.switchVertical.bind(this))
  }

  private checkDefaultValues() {
    this.DEFAULT_VALUES.forEach((value: SliderDefaultValueLabel) => {
      value.remove()
    })
    this.DEFAULT_VALUES = []

    let defaultValues = this.config.defaultValues.get() as number[] | string[]
    defaultValues.forEach((value: string | number, index: number, array: string[] | number[]) => {
      this.DEFAULT_VALUES[index] = new SliderDefaultValueLabel(this.ROOT, this.config, index)
    })
  }

  private switchVertical() {
    if (this.config.isVertical.get() === true) this.ROOT.classList.add(this.CLASSES.SLIDER_VERTICAL)
    else this.ROOT.classList.remove(this.CLASSES.SLIDER_VERTICAL)
  }
}

export { SliderView }