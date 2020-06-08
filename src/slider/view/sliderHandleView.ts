enum Side{Left, Right}

class SliderHandle {
  private CONTAINER: HTMLElement
  private CLASSES: SliderClasses
  public ROOT: HTMLElement
  private LABEL: HTMLElement
  private SIDE: Side
  private state: HandleState
  private config: SliderConfig

  constructor(container: HTMLElement, config: SliderConfig, side: Side) {
    this.CONTAINER = container
    this.SIDE = side
    this.config = config
    this.CLASSES = require("../sliderClasses.json")
    this.ROOT = this.createRootElement()
    this.LABEL = this.createLabel()
    this.state = this.getDefaultState()
    this.render()
  }

  private createRootElement() {
    let handle = document.createElement("div")
    handle.classList.add(this.CLASSES.HANDLE)

    if(this.SIDE == Side.Right) handle.classList.add(this.CLASSES.RIGHT_HANDLE)
    else handle.classList.add(this.CLASSES.LEFT_HANDLE) 

    if (this.config.isVertical) handle.classList.add(this.CLASSES.HANDLE_VERTICAL)

    return handle
  }

  private createLabel(): HTMLElement {
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
  }

  private getDefaultState() {
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

  private render(extraShift?: number) {
    let shift: number

    if (this.config.hasDefaultValues == true) {
      shift = this.calculateDefaultValuesShift()
      this.LABEL.innerHTML = `${this.config.defaultValues ? this.config.defaultValues[this.state.value] : 0}`
    }
    else {
      shift = this.calculateShift()
      this.LABEL.innerHTML = `${this.state.value}`
    }

    shift += extraShift ? extraShift : 0

    if (this.config.isVertical) this.ROOT.style.bottom = `${shift}%`
    else this.ROOT.style.left = `${shift}%`
  }

  private calculateDefaultValuesShift(): number {
    if (this.config.hasDefaultValues) return 100* this.state.value / (this.config.defaultValues.length - 1)
    else return 0
  }

  private calculateShift(): number {
    let range = this.config.maxValue - this.config.minValue
    let position = (this.state.value - this.config.minValue) / range
    return position * 100
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
  }
}

export { SliderHandle }