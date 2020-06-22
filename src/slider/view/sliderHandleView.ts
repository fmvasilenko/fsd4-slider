import { SliderConfig } from "../sliderConfig/sliderConfig"
import { SliderState } from "../sliderState/sliderState"
import { SliderValueLabelView } from "./sliderValueLabelView"
enum Side{Left, Right}

class SliderHandle {
  private CONTAINER: HTMLElement
  private config: SliderConfig
  private state: SliderState
  private SIDE: Side
  private CLASSES: SliderClasses
  private ROOT: HTMLElement
  private LABEL: SliderValueLabelView
  private isDragged: boolean

  constructor(container: HTMLElement, config: SliderConfig, state: SliderState, side: Side) {
    this.CONTAINER = container
    this.config = config
    this.state = state
    this.SIDE = side
    this.CLASSES = require("../sliderClasses.json")
    this.ROOT = this.createRootElement()
    this.LABEL = new SliderValueLabelView(this.ROOT, this.config, this.SIDE)
    this.isDragged = false
    
    if (this.SIDE == Side.Left || this.config.isRange.get() === true) this.CONTAINER.appendChild(this.ROOT)

    this.render()

    this.config.isRange.addSubscriber(this.switchRightHandle.bind(this))
    this.config.hasDefaultValues.addSubscriber(this.render.bind(this))
    this.config.isVertical.addSubscriber(this.switchVertical.bind(this))
    this.config.isVertical.addSubscriber(this.render.bind(this))
    this.config.leftHandleValue.addSubscriber(this.render.bind(this))
    this.config.rightHandleValue.addSubscriber(this.render.bind(this))

    this.bindEventListeners()
  }

  private createRootElement() {
    let handle = document.createElement("div")
    handle.classList.add(this.CLASSES.HANDLE)

    if(this.SIDE == Side.Right) handle.classList.add(this.CLASSES.RIGHT_HANDLE)
    else handle.classList.add(this.CLASSES.LEFT_HANDLE) 

    if (this.config.isVertical.get() === true) handle.classList.add(this.CLASSES.HANDLE_VERTICAL)

    return handle
  }

  private switchRightHandle() {
    if (this.config.isRange.get() === true) this.CONTAINER.appendChild(this.ROOT)
    else this.ROOT.remove()
  }

  private switchVertical() {
    if (this.config.isVertical.get() === true) this.ROOT.classList.add(this.CLASSES.HANDLE_VERTICAL)
    else this.ROOT.classList.remove(this.CLASSES.HANDLE_VERTICAL)
  }

  private render() {
    let shift: number
  
    if (this.config.hasDefaultValues.get() === true) shift = this.calculateDefaultValuesShift()
    else shift = this.calculateShift()

    if (this.SIDE === Side.Left) shift -= this.calculateExtraShift()
    else shift += this.calculateExtraShift()

    if (this.config.isVertical.get() === true) {
      this.ROOT.style.left = ""
      this.ROOT.style.bottom = `${shift}%`
    }
    else {
      this.ROOT.style.bottom = ""
      this.ROOT.style.left = `${shift}%`
    }
  }

  private calculateDefaultValuesShift(): number {
    let handleValue = this.SIDE == Side.Left ? this.config.leftHandleValue.get() as number : this.config.rightHandleValue.get() as number
    let defaultValues = this.config.defaultValues.get() as number[] | string[]

    if (this.config.hasDefaultValues.get() === true) return 100 * handleValue / (defaultValues.length - 1)
    else return 0
  }

  private calculateShift(): number {
    let minValue = this.config.minValue.get() as number
    let maxValue = this.config.maxValue.get() as number
    let value = this.SIDE == Side.Left ? this.config.leftHandleValue.get() as number : this.config.rightHandleValue.get() as number
    
    let range = maxValue - minValue
    let position = (value - minValue) / range
    return position * 100
  }

  private bindEventListeners() {
    this.ROOT.addEventListener("mousedown", this.drag.bind(this))
    document.addEventListener("mouseup", this.drop.bind(this))
    document.addEventListener("mousemove", this.watchMouse.bind(this))
  }

  private drag() {
    this.isDragged = true
  }

  private drop() {
    this.isDragged = false
  }

  private watchMouse(event: MouseEvent) {
    if (this.isDragged === true) {
      let position = this.calculatePosition(event)
      if (this.SIDE === Side.Left) this.state.leftHandlePosition.set(position)
      else this.state.rightHandlePosition.set(position)
    }
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
    let scaleBeginning = this.CONTAINER.getBoundingClientRect().left
    let length = this.CONTAINER.offsetWidth

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
    let length = this.CONTAINER.offsetHeight
    let scaleBeginning = this.CONTAINER.getBoundingClientRect().top + length

    if (y < scaleBeginning - length) return 1
    else if (y > scaleBeginning) return 0
    else return (scaleBeginning - y) / length
  }

  private calculateExtraShift(): number {
    if (this.config.isRange.get() === false) return 0

    let leftHandleValue = this.config.leftHandleValue.get() as number
    let rightHandleValue = this.config.rightHandleValue.get() as number
    let handleSize = this.config.isVertical.get() === true ? this.ROOT.offsetHeight : this.ROOT.offsetWidth
    let distanceBetweenHandles = this.calculateDistanceBetweenHandles(leftHandleValue, rightHandleValue)
    let scaleSize = this.config.isVertical.get() === true ? this.CONTAINER.offsetHeight : this.CONTAINER.offsetWidth

    if (handleSize > distanceBetweenHandles) return 100 * ((handleSize - distanceBetweenHandles) / 2) / scaleSize
    else return 0
  }

  private calculateDistanceBetweenHandles(leftHandleValue: number, rightHandleValue: number): number {
    let stepLength = 0
    let scaleLength = this.config.isVertical.get() === true ? this.CONTAINER.offsetHeight : this.CONTAINER.offsetWidth

    if (this.config.hasDefaultValues.get() === true) {
      let defaultValues = this.config.defaultValues.get() as number[] | string[]
      stepLength = scaleLength / defaultValues.length
    }
    else {
      let minValue = this.config.minValue.get() as number
      let maxValue = this.config.maxValue.get() as number
      let valuesRange = maxValue - minValue
      stepLength = scaleLength / valuesRange
    }

    return (rightHandleValue - leftHandleValue) * stepLength
  }

  /*private getDefaultState() {
    return {
      isDragged: false,
      value: this.SIDE == Side.Left ? this.config.leftHandleValue : this.config.rightHandleValue
    }
  }

  public setValue(value: number, extraShift?: number) {
    this.state.value = value
    this.render(extraShift)
  }

  public getValue(): number {
    return this.state.value
  }  

  public drag() {
    this.state.isDragged = true
  }

  public drop() {
    this.state.isDragged = false
  }

  public isDragged(): boolean {
    return this.state.isDragged
  }

  public switchValueLabel(switcher: boolean) {
    if (switcher == true && this.config.valueLabelDisplayed == false) {
      this.ROOT.appendChild(this.LABEL)
      this.config.valueLabelDisplayed = true
    }
    else if (switcher == false && this.config.valueLabelDisplayed == true){
      this.LABEL.remove()
      this.config.valueLabelDisplayed = false
    }
  }*/
}

export { SliderHandle }