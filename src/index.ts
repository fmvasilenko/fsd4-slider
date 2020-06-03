import "./slider/slider.scss"
import "./slider/slider"
import "./main.scss"

class DemoSlider {
  private ROOT: HTMLElement
  private $SLIDER: JQuery
  private $MIN_VALUE_INPUT: JQuery
  private $MAX_VALUE_INPUT: JQuery
  private $VALUE_LABEL_SWITCHER: JQuery
  private config: ImportedSliderConfig

  constructor(container: HTMLElement, config: ImportedSliderConfig) {
    this.config = config
    this.ROOT = this.generateDemoSlider()
    container.appendChild(this.ROOT)
    this.$SLIDER = $(this.ROOT).find(".demo-slider__scale").slider(config, this.sliderHandler.bind(this))
    this.$MIN_VALUE_INPUT = $(this.ROOT).find(".demo-slider__min-value-input")
    this.$MAX_VALUE_INPUT = $(this.ROOT).find(".demo-slider__max-value-input")
    this.$VALUE_LABEL_SWITCHER = $(this.ROOT).find(".demo-slider__value-label-switcher-input")
    this.setInitialState()
    this.bindEventListeners()
  }

  private generateDemoSlider(): HTMLElement {
    let root = this.createElement("div", "demo-slider")
    let scale = this.createElement("div", "demo-slider__scale")
    let minValue = this.createMinValueElement()
    let maxValue = this.createMaxValueElement()
    let labelSwitcher = this.createValueLabelSwitcher()
    if (this.config.isVertical !== undefined && this.config.isVertical == true) {
      root.classList.add("demo-slider_vertical")
      scale.classList.add("demo-slider__scale_vertical")
      minValue.classList.add("demo-slider__min-value_vertical")
      maxValue.classList.add("demo-slider__max-value_vertical")
      labelSwitcher.classList.add("demo-slider__value-label-switcher_vertical")
    }
    root.appendChild(scale)
    root.appendChild(minValue)
    if (this.config.isRange === true) root.appendChild(maxValue)
    root.appendChild(labelSwitcher)
    return root
  }

  private createMinValueElement(): HTMLElement {
    let minValue = this.createElement("div", "demo-slider__min-value")
    let text: HTMLElement
    if (this.config.isRange == true) text = this.createElement("p", "", "min")
    else text = this.createElement("p", "", "value")
    let input = this.createElement("input", "demo-slider__min-value-input")
    minValue.appendChild(text)
    minValue.appendChild(input)
    return minValue
  }

  private createMaxValueElement(): HTMLElement {
    let maxValue = this.createElement("div", "demo-slider__max-value")
    let text = this.createElement("p", "", "max")
    let input = this.createElement("input", "demo-slider__max-value-input")
    maxValue.appendChild(text)
    maxValue.appendChild(input)
    return maxValue
  }

  private createValueLabelSwitcher(): HTMLElement {
    let switcher = this.createElement("label", "demo-slider__value-label-switcher")
    let input = this.createElement("input", "demo-slider__value-label-switcher-input")
    input.setAttribute("type", "checkbox")
    let text = this.createElement("p", "", "Show value label")
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
    this.$MIN_VALUE_INPUT.val(this.$SLIDER.getFirstValue())
    this.$MAX_VALUE_INPUT.val(this.$SLIDER.getSecondValue())

    if (this.$SLIDER.getValueLabelDisplayed()) {
      let checked = this.$SLIDER.getValueLabelDisplayed()
      this.$VALUE_LABEL_SWITCHER.attr("checked", `${checked}`)
    }
  }

  private sliderHandler(firstValue: number, secondValue: number) {
    $(this.$MIN_VALUE_INPUT).val(firstValue)
    this.$MAX_VALUE_INPUT.val(secondValue)
  }

  private bindEventListeners() {
    this.$MIN_VALUE_INPUT[0].addEventListener("change", this.minValueChangeHandler.bind(this))
    if (this.config == true) this.$MAX_VALUE_INPUT[0].addEventListener("change", this.maxValueChangeHandler.bind(this))
    if (this.$VALUE_LABEL_SWITCHER[0] !== undefined)
      this.$VALUE_LABEL_SWITCHER[0].addEventListener("change", this.valueLabelSwitchHandler.bind(this))
  }

  private minValueChangeHandler() {
    let value = parseInt((this.$MIN_VALUE_INPUT.val() as string).replace(/\D/g, ""))
    this.$SLIDER.setFirstValue(value)
  }

  private maxValueChangeHandler() {
    let value = parseInt((this.$MAX_VALUE_INPUT.val() as string).replace(/\D/g, ""))
    this.$SLIDER.setSecondValue(value)
  }

  private valueLabelSwitchHandler() {
    this.$SLIDER.switchValueLabel(this.$VALUE_LABEL_SWITCHER.prop("checked"))
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

/*$(".demo-slider").each((index, item) => {
  console.log(new DemoSlider(item, config[index]))
})*/

let pageWrapper = $(".page-wrapper")
config.forEach((item) => {
  let demoSlider = new DemoSlider(pageWrapper[0], item)
  console.log(demoSlider)
})