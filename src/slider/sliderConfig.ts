import { Observable } from "../observable"

class ConfigItem {
  private value: number | string | boolean

  constructor(value: number | string | boolean) {
    this.value = value
  }

  public set() {
    
  }
}

class SliderConfig {
  public isRange: ConfigItem

  constructor() {
    this.isRange = new ConfigItem(false)
  }
}