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
    if (this.config.isVertical) this.ROOT.classList.add(this.CLASSES.SLIDER_VERTICAL)

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
    enum Type{MinVal, MaxVal}
    let label = new SliderLimitView(this, Type.MinVal)
    label.setValue(this.config.minValue)
    this.ROOT.appendChild(label.ROOT)
    return label
  }

  private createMaxValueLabel(): SliderLimitView {
    enum Type{MinVal, MaxVal}
    let label = new SliderLimitView(this, Type.MaxVal)
    label.setValue(this.config.maxValue)
    this.ROOT.appendChild(label.ROOT)
    return label
  }

  private createDefaultValuesLabels(): SliderDefaultValueLabel[] {
    let labels: SliderDefaultValueLabel[] = []
    let defaultValues = this.config.defaultValues

    if (defaultValues !== undefined) {
      let length: number
      if (this.config.isVertical)
        length = 100 * (this.ROOT.clientHeight / (defaultValues.length - 1)) / this.ROOT.clientHeight
      else length = 100 * (this.ROOT.clientWidth / (defaultValues.length - 1)) / this.ROOT.clientWidth

      this.config.defaultValues?.forEach((element: number | string, index: number) => {
        let shift = this.config.isVertical ? (defaultValues.length - index - 1) * length : index * length
        labels[index] = new SliderDefaultValueLabel(this)
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

  private drop(event: MouseEvent) {
    this.LEFT_HANDLE.drop()
    this.RIGHT_HANDLE.drop()

    if (this.config.isRange == false) {
      if (event.target == this.MIN_VALUE_LABEL?.ROOT) this.minValueClickHandler()
      else if (event.target == this.MAX_VALUE_LABEL?.ROOT) this.maxValueClickHandler()
      else if (event.target == this.ROOT ||
              (event.target as HTMLElement).closest(`.${this.CLASSES.DEFAULT_VALUE}`)) {
        this.moveLeftHandle(event)
      }
    }
  }

  private minValueClickHandler() {
    if (this.config.isRange == false) {
      let value = this.CONTROLLER.calculateLeftHandleValue(0)
      this.setLeftHandleValue(value)
    }
  }

  private maxValueClickHandler() {
    if (this.config.isRange == false) {
      let value = this.CONTROLLER.calculateLeftHandleValue(1)
      this.setLeftHandleValue(value)
    }
  }

  private watchMouse(event: MouseEvent) {
    if (this.LEFT_HANDLE.isDragged()) this.moveLeftHandle(event)
    else if (this.RIGHT_HANDLE.isDragged()) this.moveRightHandle(event)
  }

  private moveLeftHandle(event: MouseEvent) {
    let position = this.calculatePosition(event)
    let value = this.CONTROLLER.calculateLeftHandleValue(position)
    this.setLeftHandleValue(value)
  }

  private moveRightHandle(event: MouseEvent) {
    let position = this.calculatePosition(event)
    let value = this.CONTROLLER.calculateRightHandleValue(position)
    this.setRightHandleValue(value)
  }

  private setLeftHandleValue(value: number) {
    let extraShift = this.calculateExtraShift(value, this.RIGHT_HANDLE.getValue())  
    this.LEFT_HANDLE.setValue(value, -extraShift)
    this.RIGHT_HANDLE.setValue(this.RIGHT_HANDLE.getValue(), extraShift)
  }

  private setRightHandleValue(value: number) {
    let extraShift = this.calculateExtraShift(this.LEFT_HANDLE.getValue(), value)
    this.LEFT_HANDLE.setValue(this.LEFT_HANDLE.getValue(), -extraShift)
    this.RIGHT_HANDLE.setValue(value, extraShift)
  }

  private calculateExtraShift(leftHandleValue: number, rightHandleValue: number): number {
    let handleSize = this.LEFT_HANDLE.ROOT.offsetWidth
    let distanceBetweenHandles = this.calculateDistanceBetweenHandles(leftHandleValue, rightHandleValue)

    if (handleSize > distanceBetweenHandles) return (handleSize - distanceBetweenHandles) / 2
    else return 0
  }

  private calculateDistanceBetweenHandles(leftHandleValue: number, rightHandleValue: number): number {
    let stepLength = 0
    let scaleLength = this.config.isVertical ? this.ROOT.clientHeight : this.ROOT.clientWidth

    if (this.config.hasDefaultValues) {
      let defaultValuesLength = this.config.defaultValues.length
      stepLength = scaleLength / defaultValuesLength
    }
    else {
      let valuesRange = this.config.maxValue - this.config.minValue
      stepLength = scaleLength / valuesRange
    }

    return (rightHandleValue - leftHandleValue) * stepLength
  }

  private calculatePosition(event: MouseEvent): number {
    if (this.config.isVertical) return this.calculateVerticalPosition(event.pageY)
    else return this.calculateHorizontalPosition(event.pageX)
  }

  private calculateHorizontalPosition(x: number): number {
    /**
     * function receives x mouse coordinate
     * and returns handle position on the scale, normalized form 0 to 1
     */
    let  scaleBeginning = this.ROOT.getBoundingClientRect().left
    let length = this.ROOT.clientWidth

    if (x < scaleBeginning) return 0
    else if (x > scaleBeginning + length) return 1
    else return (x - scaleBeginning) / length
  }

  private calculateVerticalPosition(y: number): number {
    /**
     * function receives y mouse coordinate
     * and returns handle position on the scale, normalized form 0 to 1
     */
    let scaleBeginning = this.ROOT.getBoundingClientRect().bottom
    let length = this.ROOT.clientHeight

    if (y < scaleBeginning - length) return 1
    else if (y > scaleBeginning) return 0
    else return (scaleBeginning - y) / length
  }
}

export { SliderView }