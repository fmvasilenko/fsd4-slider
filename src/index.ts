import "./slider/slider.scss"
import { Slider } from "./slider/slider"

$.fn.slider = function (this: JQuery, options?: ImportedSliderConfig) {
  
  let slider = new Slider(this[0], options)
  console.log(slider)

  return this
}

$(".block").slider({
  minValue: 20,
  maxValue: 100,
  value: 30,
  defaultValues: ["first", "second", "third"]
})

console.log("ts works")