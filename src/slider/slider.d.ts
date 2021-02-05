interface SliderFunction {
  (config?: Config): JQuery;
}

interface JQuerySliderConfig {
  isRange(value?: boolean): boolean
  isVertical(value?: boolean): boolean
  valueLabelDisplayed(value?: boolean): boolean
  scaleDisplayed(value?: boolean): boolean
  min(value?: number): number
  max(value?: number): number
  step(value?: number): number
  firstValue(value?: number): number
  secondValue(value?: number): number
  setFirstValueSubscriber(subscriber: Subscriber): void
  setSecondValueSubscriber(subscriber: Subscriber): void
}

interface JQuerySliderConfigBooleans {
  isVertical(value?: boolean): boolean
  valueLabelDisplayed(value?: boolean): boolean
  scaleDisplayed(value?: boolean): boolean
}

interface JQuerySliderConfigNumbers {
  min(value?: number): number
  max(value?: number): number
  step(value?: number): number
  firstValue(value?: number): number
  secondValue(value?: number): number
}

interface Subscriber {
  (state: State): void
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
  min: number
  max: number
  step: number
  firstValue: number
  secondValue: number
}

interface Config {
  isRange?: boolean
  isVertical?: boolean
  valueLabelDisplayed?: boolean
  scaleDisplayed?: boolean
  min?: number
  max?: number
  step?: number
  firstValue?: number
  secondValue?: number
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

type ModelOption = keyof Config;
