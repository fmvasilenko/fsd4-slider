import { SliderConfig } from "../sliderConfig/sliderConfig"
enum Side{Left, Right}

class SliderHandle {
  private CONTAINER: HTMLElement
  private config: SliderConfig
  private SIDE: Side
  private CLASSES: SliderClasses
  private ROOT: HTMLElement
  //private LABEL: HTMLElement
  //private state: HandleState

  constructor(container: HTMLElement, config: SliderConfig, side: Side) {
    this.CONTAINER = container
    this.config = config
    this.SIDE = side
    this.CLASSES = require("../sliderClasses.json")
    this.ROOT = this.createRootElement()
    //this.LABEL = this.createLabel()
    
    if (this.SIDE == Side.Left || this.config.isRange.get() === true) this.CONTAINER.appendChild(this.ROOT)

    this.render()

    this.config.isRange.addSubscriber(this.switchRightHandle.bind(this))
    this.config.hasDefaultValues.addSubscriber(this.render.bind(this))
    this.config.isVertical.addSubscriber(this.switchVertical.bind(this))
    this.config.isVertical.addSubscriber(this.render.bind(this))
    this.config.leftHandleValue.addSubscriber(this.render.bind(this))
    this.config.rightHandleValue.addSubscriber(this.render.bind(this))
  }

  private createRootElement() {
    let handle = document.createElement("div")
    handle.classList.add(this.CLASSES.HANDLE)

    if(this.SIDE == Side.Right) handle.classList.add(this.CLASSES.RIGHT_HANDLE)
    else handle.classList.add(this.CLASSES.LEFT_HANDLE) 

    if (this.config.isVertical.get() === true) handle.classList.add(this.CLASSES.HANDLE_VERTICAL)

    return handle
  }

  /*private createLabel(): HTMLElement {
    let label = document.createElement("div")
    label.classList.add(this.CLASSES.VALUE_LABEL)

    if (this.SIDE == Side.Right) {
      label.classList.add(this.CLASSES.RIGHT_HANDLE_LABEL)
      if (this.config.isVertical) label.classList.add(this.CLASSES.RIGHT_HANDLE_LABEL_VERTICAL)
    }
    else {
      label.classList.add(this.CLASSES.LEFT_HANDLE_LABEL)
      if (this.config.isVertical) label.classList.add(this.CLASSES.LEFT_HANDLE_LABEL_VERTICAL)
    }

    if (this.config.valueLabelDisplayed) this.ROOT.appendChild(label)

    return label
  }*/

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

    //shift += extraShift ? extraShift : 0

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