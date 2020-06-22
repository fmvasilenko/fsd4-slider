import "./slider/slider.scss"
import "./slider/slider"
import "./main.scss"

class DemoSlider {
  private ROOT: HTMLElement
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
  private config: ImportedSliderConfig

  constructor(container: HTMLElement, config: ImportedSliderConfig) {
    this.config = config
    this.ROOT = this.generateDemoSlider()
    container.appendChild(this.ROOT)
    this.$SLIDER = $(this.ROOT).find(".demo-slider__scale").slider(config, this.sliderHandler.bind(this))
    this.$MIN_VALUE = $(this.ROOT).find(".js-demo-slider__min-value")
    this.$MAX_VALUE = $(this.ROOT).find(".js-demo-slider__max-value")
    this.$STEP = $(this.ROOT).find(".js-demo-slider__step-value")
    this.$DEFAULT_VALUES = $(this.ROOT).find(".demo-slider__default-values")
    this.$LEFT_HANDLE_INPUT = $(this.ROOT).find(".js-demo-slider__left-handle-value")
    this.$RIGHT_HANDLE_INPUT = $(this.ROOT).find(".js-demo-slider__right-handle-value")
    this.$VALUE_LABEL_SWITCHER = $(this.ROOT).find(".demo-slider__value-label-switcher-input")
    this.$LIMITS_SWITCHER = $(this.ROOT).find(".demo-slider__limits-switcher-input")
    this.$VERTICAL_SWITCHER = $(this.ROOT).find(".demo-slider__vertical-switcher-input")
    this.$RANGE_SWITCHER = $(this.ROOT).find(".demo-slider__range-switcher-input")
    this.$DEFAULT_VALUES_SWITCHER = $(this.ROOT).find(".demo-slider__default-values-switcher-input")
    this.setInitialState()
    this.bindEventListeners()
  }

  private generateDemoSlider(): HTMLElement {
    let root = this.createElement("div", "demo-slider")
    let scaleWrapper = this.createElement("div", "demo-slider__scale-wrapper")
    let scale = this.createElement("div", "demo-slider__scale")
    let minValue = this.createValueElement("Min value", "js-demo-slider__min-value")
    let maxValue = this.createValueElement("Max value", "js-demo-slider__max-value")
    let step = this.createValueElement("Step", "js-demo-slider__step-value")
    let defaultValues = this.createValueElement("Default values", "demo-slider__default-values")
    let leftHandleValue = this.createValueElement("Left handle value", "js-demo-slider__left-handle-value")
    let rightHandleValue = this.createValueElement("Right handle value", "js-demo-slider__right-handle-value")
    let labelSwitcher = this.createValueLabelSwitcher()
    let limitsSwitcher = this.createLimitsSwitcher()
    let verticalSwitcher = this.createVerticalSwitcher()
    let rangeSwitcher = this.createRangeSwitcher()
    let defaultValuesSwitcher = this.createDefaultValuesSwitcher()
    if (this.config.isVertical !== undefined && this.config.isVertical == true) {
      root.classList.add("demo-slider_vertical")
      scale.classList.add("demo-slider__scale_vertical")
      leftHandleValue.classList.add("demo-slider__min-value_vertical")
      rightHandleValue.classList.add("demo-slider__max-value_vertical")
      labelSwitcher.classList.add("demo-slider__value-label-switcher_vertical")
    }
    scaleWrapper.appendChild(scale)
    root.appendChild(scaleWrapper)
    root.appendChild(minValue)
    root.appendChild(maxValue)
    root.appendChild(step)
    root.appendChild(defaultValues)
    root.appendChild(leftHandleValue)
    root.appendChild(rightHandleValue)
    root.appendChild(labelSwitcher)
    root.appendChild(limitsSwitcher)
    root.appendChild(verticalSwitcher)
    root.appendChild(rangeSwitcher)
    root.appendChild(defaultValuesSwitcher)
    return root
  }

  private createValueElement(text: string, className: string) {
    let valueElement = this.createElement("div", "demo-slider__value")
    let label = this.createElement("p", "", text)
    let input = this.createElement("input", "demo-slider__value-input")
    input.classList.add(className)
    valueElement.appendChild(label)
    valueElement.appendChild(input)
    return valueElement
  }

  /*private createLeftHandleElement(): HTMLElement {
    let minValue = this.createElement("div", "demo-slider__value")
    let text = this.createElement("p", "", "min")
    let input = this.createElement("input", "demo-slider__min-value-input")
    minValue.appendChild(text)
    minValue.appendChild(input)
    return minValue
  }*/

  /*private createRightHandleElement(): HTMLElement {
    let maxValue = this.createElement("div", "demo-slider__value")
    let text = this.createElement("p", "", "max")
    let input = this.createElement("input", "demo-slider__max-value-input")
    maxValue.appendChild(text)
    maxValue.appendChild(input)
    return maxValue
  }*/

  private createValueLabelSwitcher(): HTMLElement {
    let switcher = this.createElement("label", "demo-slider__value-label-switcher")
    let input = this.createElement("input", "demo-slider__value-label-switcher-input")
    input.setAttribute("type", "checkbox")
    let text = this.createElement("p", "", "Show value label")
    switcher.appendChild(input)
    switcher.appendChild(text)
    return switcher
  }

  private createLimitsSwitcher(): HTMLElement {
    let switcher = this.createElement("label", "demo-slider__limits-switcher")
    let input = this.createElement("input", "demo-slider__limits-switcher-input")
    input.setAttribute("type", "checkbox")
    let text = this.createElement("p", "", "Show limits")
    switcher.appendChild(input)
    switcher.appendChild(text)
    return switcher
  }

  private createVerticalSwitcher(): HTMLElement {
    let switcher = this.createElement("label", "demo-slider__vertical-switcher")
    let input = this.createElement("input", "demo-slider__vertical-switcher-input")
    input.setAttribute("type", "checkbox")
    let text = this.createElement("p", "", "Is vertical")
    switcher.appendChild(input)
    switcher.appendChild(text)
    return switcher
  }

  private createRangeSwitcher(): HTMLElement {
    let switcher = this.createElement("label", "demo-slider__range-switcher")
    let input = this.createElement("input", "demo-slider__range-switcher-input")
    input.setAttribute("type", "checkbox")
    let text = this.createElement("p", "", "Is range")
    switcher.appendChild(input)
    switcher.appendChild(text)
    return switcher
  }

  private createDefaultValuesSwitcher(): HTMLElement {
    let switcher = this.createElement("label", "demo-slider__default-values-switcher")
    let input = this.createElement("input", "demo-slider__default-values-switcher-input")
    input.setAttribute("type", "checkbox")
    let text = this.createElement("p", "", "Has default values")
    switcher.appendChild(input)
    switcher.appendChild(text)
    return switcher
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
    this.$LEFT_HANDLE_INPUT.val(this.$SLIDER.config.leftHandleValue())
    this.$RIGHT_HANDLE_INPUT.val(this.$SLIDER.config.rightHandleValue())

    if (this.$SLIDER.config.valueLabelDisplayed()) {
      let checked = this.$SLIDER.config.valueLabelDisplayed()
      this.$VALUE_LABEL_SWITCHER.attr("checked", `${checked}`)
    }

    if (this.$SLIDER.config.limitsDisplayed()) {
      let checked = this.$SLIDER.config.limitsDisplayed()
      this.$LIMITS_SWITCHER.attr("checked", `${checked}`)
    }

    if (this.$SLIDER.config.isVertical()) {
      let checked = this.$SLIDER.config.isVertical()
      this.$VERTICAL_SWITCHER.attr("checked", `${checked}`)
    }

    if (this.$SLIDER.config.isRange()) {
      let checked = this.$SLIDER.config.isRange()
      this.$RANGE_SWITCHER.attr("checked", `${checked}`)
    }

    if (this.$SLIDER.config.hasDefaultValues()) {
      let checked = this.$SLIDER.config.hasDefaultValues()
      this.$DEFAULT_VALUES_SWITCHER.attr("checked", `${checked}`)
    }

    this.$MIN_VALUE.attr("value", this.$SLIDER.config.minValue())
    this.$MAX_VALUE.attr("value", this.$SLIDER.config.maxValue())
    this.$STEP.attr("value", this.$SLIDER.config.step())
    this.$DEFAULT_VALUES.attr("value", this.$SLIDER.config.defaultValues())
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
    
    if (this.$VALUE_LABEL_SWITCHER[0] !== undefined)
      this.$VALUE_LABEL_SWITCHER[0].addEventListener("change", this.valueLabelSwitchHandler.bind(this))
    
    if (this.$LIMITS_SWITCHER[0] !== undefined)
      this.$LIMITS_SWITCHER[0].addEventListener("change", this.limitsSwitchHandler.bind(this))

    if (this.$VERTICAL_SWITCHER[0] !== undefined)
      this.$VERTICAL_SWITCHER[0].addEventListener("change", this.verticalSwitchHandler.bind(this))

    if (this.$RANGE_SWITCHER[0] !== undefined)
      this.$RANGE_SWITCHER[0].addEventListener("change", this.rangeSwitchHandler.bind(this))

    if (this.$DEFAULT_VALUES_SWITCHER[0] !== undefined)
      this.$DEFAULT_VALUES_SWITCHER[0].addEventListener("change", this.defaultValuesSwitchHandler.bind(this))
  }

  private minValueChangeHandler() {
    let value = parseInt((this.$MIN_VALUE.val() as string).replace(/-\D/g, ""))
    this.$MIN_VALUE.val(this.$SLIDER.config.minValue(value))
  }

  private maxValueChangeHandler() {
    let value = parseInt((this.$MAX_VALUE.val() as string).replace(/-\D/g, ""))
    this.$MAX_VALUE.val(this.$SLIDER.config.maxValue(value))
  }

  private stepChangeHandler() {
    let value = parseInt((this.$STEP.val() as string).replace(/-\D/g, ""))
    this.$STEP.val(this.$SLIDER.config.step(value))
  }

  private defaultValuesChangeHandler() {
    let defaultValues = (this.$DEFAULT_VALUES.val() as string).split(",")
    this.$DEFAULT_VALUES.val(this.$SLIDER.config.defaultValues(defaultValues))
  }

  private leftHandleValueChangeHandler() {
    let value = parseInt((this.$LEFT_HANDLE_INPUT.val() as string).replace(/\D/g, ""))
    this.$LEFT_HANDLE_INPUT.val(this.$SLIDER.config.leftHandleValue(value))
  }

  private rightHandleChangeHandler() {
    let value = parseInt((this.$RIGHT_HANDLE_INPUT.val() as string).replace(/\D/g, ""))
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

let config = [
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
})