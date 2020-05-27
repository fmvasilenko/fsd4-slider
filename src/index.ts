import "./slider/slider.scss"
import { Slider } from "./slider/slider"

$.fn.slider = function (this: JQuery, options?: ImportedSliderConfig) {
  
  let slider = new Slider(this[0], options)
  console.log(slider)

  return this
}

$(".block").slider({
  value: 20,
  minValue: 20,
  maxValue: 180,
  step: 50
})

console.log("ts works")