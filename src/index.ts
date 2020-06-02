import "./slider/slider.scss"
import "./slider/slider"
import "./main.scss"

console.log("ts works")

class DemoSlider {
  private ROOT: HTMLElement
  private $SLIDER: JQuery
  private $MIN_VALUE_INPUT: JQuery
  private $MAX_VALUE_INPUT: JQuery
  private $VALUE_LABEL_SWITCHER: JQuery
  private config: ImportedSliderConfig

  constructor(root: HTMLElement, config: ImportedSliderConfig) {
    this.ROOT = root
    this.$SLIDER = $(this.ROOT).find(".demo-slider__scale").slider(config, this.sliderHandler.bind(this))
    this.$MIN_VALUE_INPUT = $(this.ROOT).find(".demo-slider__min-value-input")
    this.$MAX_VALUE_INPUT = $(this.ROOT).find(".demo-slider__max-value-input")
    this.$VALUE_LABEL_SWITCHER = $(this.ROOT).find(".demo-slider__value-label-switcher-input")
    this.config = config
    this.setInitialState()
    this.bindEventListeners()
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
    this.$MIN_VALUE_INPUT.val(firstValue)
    this.$MAX_VALUE_INPUT.val(secondValue)
  }

  private bindEventListeners() {
    this.$MIN_VALUE_INPUT[0].addEventListener("change", this.minValueChangeHandler.bind(this))
    this.$MAX_VALUE_INPUT[0].addEventListener("change", this.maxValueChangeHandler.bind(this))
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
    leftHandleValue: 80
  },
  {
    hasDefaultValues: true,
    defaultValues: ["Первое", "Второе", "Третье"]
  },
  {
    isRange: true,
    minValue: -10,
    maxValue: 60,
    leftHandleValue: -5
  },
  {
    hasDefaultValues: true,
    isRange: true,
    defaultValues: [2, 5, 7, 9]
  },
  {
    isVertical: true
  },
  {
    isVertical: true,
    hasDefaultValues: true
  },
  {
    isVertical: true,
    isRange: true
  },
  {
    isVertical: true,
    isRange: true,
    hasDefaultValues: true
  }
]

$(".demo-slider").each((index, item) => {
  console.log(new DemoSlider(item, config[index]))
})