interface SliderFunction {
  (config?: Config): JQuery;
}

interface JQuerySliderConfig {
  isRange(value?: boolean): boolean
  isVertical(value?: boolean): boolean
  valueLabelDisplayed(value?: boolean): boolean
  scaleDisplayed(value?: boolean): boolean
  minValue(value?: number): number
  maxValue(value?: number): number
  step(value?: number): number
  leftHandleValue(value?: number): number
  rightHandleValue(value?: number): number
  setLeftHandleSubscriber(subscriber: Subscriber): void
  setRightHandleSubscriber(subscriber: Subscriber): void
}

interface JQuerySliderConfigBooleans {
  isVertical(value?: boolean): boolean
  valueLabelDisplayed(value?: boolean): boolean
  scaleDisplayed(value?: boolean): boolean
}

interface JQuerySliderConfigNumbers {
  minValue(value?: number): number
  maxValue(value?: number): number
  step(value?: number): number
  leftHandleValue(value?: number): number
  rightHandleValue(value?: number): number
}

interface Subscriber {
  (value: number): void
}

interface ISlider extends SliderFunction {}

interface JQuery {
  config: JQuerySliderConfig
  slider: ISlider
}

interface State {
  isRange: boolean
  isVertical: boolean
  valueLabelDisplayed: boolean
  scaleDisplayed: boolean
  minValue: number
  maxValue: number
  step: number
  leftHandleValue: number
  rightHandleValue: number
}

interface Config {
  isRange?: boolean
  isVertical?: boolean
  valueLabelDisplayed?: boolean
  scaleDisplayed?: boolean
  minValue?: number
  maxValue?: number
  step?: number
  leftHandleValue?: number
  rightHandleValue?: number
}

interface Classes {
  root: string
  rootVertical: string
  handle: string
  handleVertical: string
  leftHandle: string
  rightHandle: string
  valueLabel: string
  leftHandleLabel: string
  leftHandleLabelVertical: string
  rightHandleLabel: string
  rightHandleLabelVertical: string
  rangeLine: string
  rangeLineVertical: string
  scaleValue: string
  scaleValueVertical: string
  scaleValueLabel: string
  scaleValueLabelVertical: string
}
