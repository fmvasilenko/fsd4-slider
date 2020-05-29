import { SliderHandle } from "./sliderHandleView"
import { SliderLimitView } from "./sliderLimitView"
import { SliderDefaultValueLabel } from "./sliderDefaultValueLabelView"

class SliderView {
  private CONTROLLER: Slider
  private config: SliderConfig
  public ROOT: HTMLElement
  public CLASSES: SliderClasses
  private LEFT_HANDLE: SliderHandle
  private RIGHT_HANDLE: SliderHandle
  private MIN_VALUE_LABEL: SliderLimitView | undefined
  private MAX_VALUE_LABEL: SliderLimitView | undefined
  private DEFAULT_VALUES: SliderDefaultValueLabel[] | undefined

  constructor(controller: Slider) {
    this.CONTROLLER = controller
    this.config = this.CONTROLLER.getConfig()
    this.CLASSES = require("../sliderClasses.json")

    this.ROOT = this.CONTROLLER.ROOT
    this.ROOT.classList.add(this.CLASSES.SLIDER)

    this.LEFT_HANDLE = this.createLeftHandle()
    this.RIGHT_HANDLE = this.createRightHandle()

    if (this.config.isRange) this.ROOT.appendChild(this.RIGHT_HANDLE.ROOT)

    if (this.config.hasDefaultValues) {
      this.DEFAULT_VALUES = this.createDefaultValuesLabels()
    }
    else {
      this.MIN_VALUE_LABEL = this.createMinValueLabel()
      this.MAX_VALUE_LABEL = this.createMaxValueLabel()
    }

    this.setLeftHandleValue(this.LEFT_HANDLE.getValue())
    this.setRightHandleValue(this.RIGHT_HANDLE.getValue())
    this.bindEventListeners()
  }

  public getConfig() {
    return this.config
  }

  private createLeftHandle(): SliderHandle {
    enum Side{Left, Right}
    let handle = new SliderHandle(this, Side.Left)
    this.ROOT.appendChild(handle.ROOT)
    return handle
  }

  private createRightHandle(): SliderHandle {
    enum Side{Left, Right}
    let handle = new SliderHandle(this, Side.Right)
    return handle
  }

  private createMinValueLabel(): SliderLimitView {
    let label = new SliderLimitView(this, this.CLASSES.MIN_VALUE)
    label.setValue(this.config.minValue)
    this.ROOT.appendChild(label.ROOT)
    return label
  }

  private createMaxValueLabel(): SliderLimitView {
    let label = new SliderLimitView(this, this.CLASSES.MAX_VALUE)
    label.setValue(this.config.maxValue)
    this.ROOT.appendChild(label.ROOT)
    return label
  }

  private createDefaultValuesLabels(): SliderDefaultValueLabel[] {
    let labels: SliderDefaultValueLabel[] = []
    let defaultValues = this.config.defaultValues

    if (defaultValues !== undefined) {
      let length = 100 * (this.ROOT.clientWidth / (defaultValues.length - 1)) / this.ROOT.clientWidth

      this.config.defaultValues?.forEach((element: number | string, index: number) => {
        let shift = index * length
        labels[index] = new SliderDefaultValueLabel(this, this.CLASSES.DEFAULT_VALUE)
        labels[index].setValue(defaultValues ? defaultValues[index] : 0)
        labels[index].setShift(shift)
        this.ROOT.appendChild(labels[index].ROOT)
      })
    }

    return labels
  }

  private bindEventListeners() {
    this.ROOT.addEventListener("mousedown", this.drag.bind(this))
    document.addEventListener("mouseup", this.drop.bind(this))
    document.addEventListener("mousemove", this.watchMouse.bind(this))
  }

  private drag(event: MouseEvent) {
    if (event.target == this.LEFT_HANDLE.ROOT) this.LEFT_HANDLE.drag()
    else if (event.target == this.RIGHT_HANDLE.ROOT) this.RIGHT_HANDLE.drag()
  }

  private drop() {
    this.LEFT_HANDLE.drop()
    this.RIGHT_HANDLE.drop()
  }

  private watchMouse(event: MouseEvent) {
    if (this.LEFT_HANDLE.isDragged()) {
      this.moveLeftHandle(event)
    }
    else if (this.RIGHT_HANDLE.isDragged()) {
      this.moveRightHandle(event)
    }
  }

  private moveLeftHandle(event: MouseEvent) {
    let position = this.calculatePosition(event)
    let value = this.CONTROLLER.calculateLeftHandleValue(position)
    this.setLeftHandleValue(value)
  }

  private setLeftHandleValue(value: number) {
    let extraShift = 0

    if (this.config.isRange == true) {
      let stepLength = 0
      if (this.config.hasDefaultValues == true) 
        stepLength = this.ROOT.clientWidth / this.config.defaultValues.length
      else
        stepLength = this.ROOT.clientWidth / (this.config.maxValue - this.config.minValue)
      let handleSize = this.LEFT_HANDLE.ROOT.offsetWidth
      let distanceBetweenHandles = (this.RIGHT_HANDLE.getValue() - value) * stepLength

      if (handleSize > distanceBetweenHandles) extraShift = (handleSize - distanceBetweenHandles) / 2
    }
    
    this.LEFT_HANDLE.setValue(value, -extraShift)
    this.RIGHT_HANDLE.setValue(this.RIGHT_HANDLE.getValue(), extraShift)
  }

  private moveRightHandle(event: MouseEvent) {
    let position = this.calculatePosition(event)
    let value = this.CONTROLLER.calculateRightHandleValue(position)
    this.setRightHandleValue(value)
  }

  private setRightHandleValue(value: number) {
    let extraShift = 0

    if (this.config.isRange == true) {
      let stepLength = 0
      if (this.config.hasDefaultValues == true) 
        stepLength = this.ROOT.clientWidth / this.config.defaultValues.length
      else
        stepLength = this.ROOT.clientWidth / (this.config.maxValue - this.config.minValue)
      let handleSize = this.RIGHT_HANDLE.ROOT.offsetWidth
      let distanceBetweenHandles = (value - this.LEFT_HANDLE.getValue()) * stepLength

      if (handleSize > distanceBetweenHandles) extraShift = (handleSize - distanceBetweenHandles) / 2
    }
    
    this.LEFT_HANDLE.setValue(this.LEFT_HANDLE.getValue(), -extraShift)
    this.RIGHT_HANDLE.setValue(value, extraShift)
  }

  private calculatePosition(event: MouseEvent): number {
    let x = event.pageX
    let scaleBeginning = this.ROOT.getBoundingClientRect().left
    let length = this.ROOT.clientWidth

    if (x < scaleBeginning) return 0
    else if (x > scaleBeginning + length) return 1
    else return (x - scaleBeginning) / length
  }
}

export { SliderView }