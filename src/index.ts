import "./slider/slider.scss"
import { Slider } from "./slider/slider"

$.fn.slider = Object.assign<SliderFunction, SliderGlobalOptions>(
  function (this: JQuery, options: SliderOptions = {}): JQuery {

    options = $.extend({}, $.fn.slider.options, options)

    /*if (!options.outputSelector) {
      console.error('Slider options are missing required parameter "outputSelector": ', JSON.stringify(options));
      return this;
    }*/

    console.log(this)
    return this
  },
  {
    options: {
      outputSelector: null
    }
  }
)

$(".slider").slider({})

console.log("ts works")