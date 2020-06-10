///<reference path="./slider.d.ts" />

import { Observable } from "../observable"
import { SliderView } from "./view/sliderView"
import { SliderModel } from "./sliderModel"

class SliderController {
  ROOT: HTMLElement
  private MODEL: SliderModel
  private VIEW: SliderView
  private config: SliderConfig
  private slideFunction: SliderCallBackFunction | undefined
  private leftHandleValueObserver: Observable
  private leftHandlePositionObserver: Observable
  private rightHandleValueObserver: Observable
  private rightHandlePositionObserver: Observable

  constructor(root: HTMLElement, config?: ImportedSliderConfig, slide?: SliderCallBackFunction) {
    this.ROOT = root
    this.leftHandleValueObserver = new Observable()
    this.leftHandlePositionObserver = new Observable()
    this.rightHandleValueObserver = new Observable()
    this.rightHandlePositionObserver = new Observable()
    this.MODEL = new SliderModel(config)
    this.config = this.MODEL.getConfig()
    this.VIEW = new SliderView(this.leftHandlePositionObserver, this.rightHandlePositionObserver, this.config, this.ROOT)
    this.slideFunction = slide

    this.leftHandlePositionObserver.addSubscriber(this.calculateLeftHandleValue.bind(this))
    this.rightHandlePositionObserver.addSubscriber(this.calculateRightHandleValue.bind(this))
  }

  public getConfig(): SliderConfig {
    return this.config
  }

  public calculateLeftHandleValue(position: number) {
    let value = this.MODEL.calculateLeftHandleValue(position)
    this.VIEW.changeLeftHandleValue(value)
    if (this.slideFunction !== undefined) 
      this.slideFunction(this.MODEL.getLeftHandleValue(), this.MODEL.getRightHandleValue())
  }

  public calculateRightHandleValue(position: number) {
    let value = this.MODEL.calculateRightHandleValue(position)
    this.VIEW.changeRightHandleValue(value)
    if (this.slideFunction !== undefined) 
      this.slideFunction(this.MODEL.getLeftHandleValue(), this.MODEL.getRightHandleValue())
  }

  public setLeftHandleValue(value: number) {
    value = this.MODEL.setLeftHandleValue(value)
    this.VIEW.changeLeftHandleValue(value)
  }

  public setRightHandleValue(value: number) {
    value = this.MODEL.setRightHandleValue(value)
    this.VIEW.changeRightHandleValue(value)
  }

  public getLeftHandleValue(): number {
    return this.MODEL.getLeftHandleValue()
  }

  public getRightHandleValue(): number {
    return this.MODEL.getRightHandleValue()
  }

  public switchValueLabel(switcher: boolean) {
    this.VIEW.switchValueLabel(switcher)
  }

  public getValueLabelDisplayed(): boolean {
    return this.config.valueLabelDisplayed
  }
}

export { SliderController }