import "./slider/slider.scss"
import "./slider/slider"
import "./main.scss"

class DemoSlider {
  private ROOT: HTMLElement
  private PANEL_WRAPPER: HTMLElement
  private $SLIDER: JQuery
  private $MIN_VALUE: JQuery
  private $MAX_VALUE: JQuery
  private $STEP: JQuery
  private $DEFAULT_VALUES: JQuery
  private $LEFT_HANDLE_INPUT: JQuery
  private $RIGHT_HANDLE_INPUT: JQuery
  private $VALUE_LABEL_SWITCHER: JQuery
  private $LIMITS_SWITCHER: JQuery
  private $VERTICAL_SWITCHER: JQuery
  private $RANGE_SWITCHER: JQuery
  private $DEFAULT_VALUES_SWITCHER: JQuery

  constructor(container: HTMLElement, config: ImportedSliderConfig) {
    this.ROOT = this.createElement("div", "demo-slider")
    container.appendChild(this.ROOT)

    this.$SLIDER = $(this.createScale()).slider(config, this.sliderHandler.bind(this))

    this.PANEL_WRAPPER = this.createElement("div", "demo-slider__panel-wrapper")
    this.ROOT.appendChild(this.PANEL_WRAPPER)

    this.$MIN_VALUE = $(this.createValueElement("Min value"))
    this.$MAX_VALUE = $(this.createValueElement("Max value"))
    this.$STEP = $(this.createValueElement("Step"))
    this.$DEFAULT_VALUES = $(this.createValueElement("Default values", "demo-slider__default-values"))
    this.$LEFT_HANDLE_INPUT = $(this.createValueElement("Left handle value"))
    this.$RIGHT_HANDLE_INPUT = $(this.createValueElement("Right handle value"))
    this.$VALUE_LABEL_SWITCHER = $(this.createSwitcher("Show value label", "js-demo-slider__value-label-switcher"))
    this.$LIMITS_SWITCHER = $(this.createSwitcher("Show limits", "js-demo-slider__limits-switcher"))
    this.$VERTICAL_SWITCHER = $(this.createSwitcher("Is vertical", "js-demo-slider__vertical-switcher"))
    this.$RANGE_SWITCHER = $(this.createSwitcher("Is range", "js-demo-slider__range-switcher"))
    this.$DEFAULT_VALUES_SWITCHER = $(this.createSwitcher("Has default values", "js-demo-slider__default-values-switcher"))

    this.setInitialState()
    this.bindEventListeners()
  }

  private createScale(): HTMLElement {
    let scaleWrapper = this.createElement("div", "demo-slider__scale-wrapper")
    let scale = this.createElement("div", "demo-slider__scale")
    scaleWrapper.appendChild(scale)
    this.ROOT.appendChild(scaleWrapper)
    return scale
  }

  private createValueElement(text: string, className?: string) {
    let valueElement = this.createElement("div", "demo-slider__value")
    let label = this.createElement("p", "", text)
    let input = this.createElement("input", "demo-slider__value-input")
    if (className) input.classList.add(className)
    valueElement.appendChild(label)
    valueElement.appendChild(input)
    this.PANEL_WRAPPER.appendChild(valueElement)
    return input
  }

  private createSwitcher(label: string, className: string): HTMLElement {
    let switcher = this.createElement("label", "demo-slider__switcher")
    let input = this.createElement("input", className)
    input.setAttribute("type", "checkbox")
    let text = this.createElement("p", "", label)
    switcher.appendChild(input)
    switcher.appendChild(text)
    this.PANEL_WRAPPER.appendChild(switcher)
    return input
  }

  private createElement(tag: string, className: string | string[], value?: string): HTMLElement {
    let element = document.createElement(tag)
    if (Array.isArray(className)) {
      className.forEach((cssClass) => {
        element.classList.add(cssClass)
      })
    }
    else if (className != "") element.classList.add(className)
    if (value) element.innerHTML = value
    return element
  }

  private setInitialState() {
    this.$MIN_VALUE.attr("value", this.$SLIDER.config.minValue())
    this.$MAX_VALUE.attr("value", this.$SLIDER.config.maxValue())
    this.$STEP.attr("value", this.$SLIDER.config.step())
    this.$DEFAULT_VALUES.attr("value", this.$SLIDER.config.defaultValues())
    this.$LEFT_HANDLE_INPUT.val(this.$SLIDER.config.leftHandleValue())
    this.$RIGHT_HANDLE_INPUT.val(this.$SLIDER.config.rightHandleValue())

    this.$VALUE_LABEL_SWITCHER.attr("checked", this.$SLIDER.config.valueLabelDisplayed())
    this.$LIMITS_SWITCHER.attr("checked", this.$SLIDER.config.limitsDisplayed())
    this.$VERTICAL_SWITCHER.attr("checked", this.$SLIDER.config.isVertical())
    this.$RANGE_SWITCHER.attr("checked", this.$SLIDER.config.isRange())
    this.$DEFAULT_VALUES_SWITCHER.attr("checked", this.$SLIDER.config.hasDefaultValues())
  }

  private sliderHandler(firstValue: number, secondValue: number) {
    $(this.$LEFT_HANDLE_INPUT).val(firstValue)
    this.$RIGHT_HANDLE_INPUT.val(secondValue)
  }

  private bindEventListeners() {
    this.$MIN_VALUE[0].addEventListener("change", this.minValueChangeHandler.bind(this))
    this.$MAX_VALUE[0].addEventListener("change", this.maxValueChangeHandler.bind(this))
    this.$STEP[0].addEventListener("change", this.stepChangeHandler.bind(this))
    this.$DEFAULT_VALUES[0].addEventListener("change", this.defaultValuesChangeHandler.bind(this))
    this.$LEFT_HANDLE_INPUT[0].addEventListener("change", this.leftHandleValueChangeHandler.bind(this))
    this.$RIGHT_HANDLE_INPUT[0].addEventListener("change", this.rightHandleChangeHandler.bind(this))
    this.$VALUE_LABEL_SWITCHER[0].addEventListener("change", this.valueLabelSwitchHandler.bind(this))
    this.$LIMITS_SWITCHER[0].addEventListener("change", this.limitsSwitchHandler.bind(this))
    this.$VERTICAL_SWITCHER[0].addEventListener("change", this.verticalSwitchHandler.bind(this))
    this.$RANGE_SWITCHER[0].addEventListener("change", this.rangeSwitchHandler.bind(this))
    this.$DEFAULT_VALUES_SWITCHER[0].addEventListener("change", this.defaultValuesSwitchHandler.bind(this))
  }

  private minValueChangeHandler() {
    let value = parseInt((this.$MIN_VALUE.val() as string).replace(/-\D/g, ""))
    if (isNaN(value)) value = this.$SLIDER.config.minValue()
    this.$MIN_VALUE.val(this.$SLIDER.config.minValue(value))
  }

  private maxValueChangeHandler() {
    let value = parseInt((this.$MAX_VALUE.val() as string).replace(/-\D/g, ""))
    if (isNaN(value)) value = this.$SLIDER.config.maxValue()
    this.$MAX_VALUE.val(this.$SLIDER.config.maxValue(value))
  }

  private stepChangeHandler() {
    let value = parseInt((this.$STEP.val() as string).replace(/-\D/g, ""))
    if (isNaN(value)) value = this.$SLIDER.config.step()
    this.$STEP.val(this.$SLIDER.config.step(value))
  }

  private defaultValuesChangeHandler() {
    let defaultValues: number[] | string[]
    let str = this.$DEFAULT_VALUES.val() as string

    if (str == "") defaultValues = this.$SLIDER.config.defaultValues()
    else defaultValues = str.split(",")

    console.log(defaultValues)

    this.$DEFAULT_VALUES.val(this.$SLIDER.config.defaultValues(defaultValues))
  }

  private leftHandleValueChangeHandler() {
    let value = parseInt((this.$LEFT_HANDLE_INPUT.val() as string).replace(/-\D/g, ""))
    if (isNaN(value)) value = this.$SLIDER.config.leftHandleValue()
    this.$LEFT_HANDLE_INPUT.val(this.$SLIDER.config.leftHandleValue(value))
  }

  private rightHandleChangeHandler() {
    let value = parseInt((this.$RIGHT_HANDLE_INPUT.val() as string).replace(/-\D/g, ""))
    if (isNaN(value)) value = this.$SLIDER.config.rightHandleValue()
    this.$RIGHT_HANDLE_INPUT.val(this.$SLIDER.config.rightHandleValue(value))
  }

  private valueLabelSwitchHandler() {
    this.$SLIDER.config.valueLabelDisplayed(this.$VALUE_LABEL_SWITCHER.prop("checked"))
  }

  private limitsSwitchHandler() {
    this.$SLIDER.config.limitsDisplayed(this.$LIMITS_SWITCHER.prop("checked"))
    this.$DEFAULT_VALUES_SWITCHER.prop("checked", this.$SLIDER.config.hasDefaultValues())
  }

  private verticalSwitchHandler() {
    this.$SLIDER.config.isVertical(this.$VERTICAL_SWITCHER.prop("checked"))
  }

  private rangeSwitchHandler() {
    this.$SLIDER.config.isRange(this.$RANGE_SWITCHER.prop("checked"))
  }

  private defaultValuesSwitchHandler() {
    this.$SLIDER.config.hasDefaultValues(this.$DEFAULT_VALUES_SWITCHER.prop("checked"))
    this.$LIMITS_SWITCHER.prop("checked", this.$SLIDER.config.limitsDisplayed())
  }
}

/*let config = [
  {
    minValue: 20,
    maxValue: 150,
    step: 4,
    leftHandleValue: 50
  },
  {
    hasDefaultValues: true,
    defaultValues: ["Первое", "Второе", "Третье"],
    leftHandleValue: 1
  },
  {
    isRange: true,
    minValue: -10,
    maxValue: 60,
    leftHandleValue: -5,
    rightHandleValue: 40
  },
  {
    hasDefaultValues: true,
    isRange: true,
    defaultValues: [2, 5, 7, 9],
    leftHandleValue: 1,
    rightHandleValue: 2
  },
  {
    isVertical: true,
    leftHandleValue: 30
  },
  {
    isVertical: true,
    hasDefaultValues: true,
    leftHandleValue: 1
  },
  {
    isVertical: true,
    isRange: true,
    leftHandleValue: 20,
    rightHandleValue: 80
  },
  {
    isVertical: true,
    isRange: true,
    hasDefaultValues: true,
    rightHandleValue: 1
  }
]

let pageWrapper = $(".page-wrapper")
config.forEach((item) => {
  let demoSlider = new DemoSlider(pageWrapper[0], item)
  console.log(demoSlider)
})*/

let pageWrapper = $(".page-wrapper")
for (let i = 0; i < 4; i++) {
  let demoSlider = new DemoSlider(pageWrapper[0], {})
  console.log(demoSlider)
}