import { expect } from "chai"
import { SliderLimitView } from "../../../src/slider/view/sliderLimitView"

enum Type{MinVal, MaxVal}
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>");
(global as any).window = dom.window;
(global as any).document = window.document;

const CLASSES: SliderClasses = require("../../../src/slider/sliderClasses.json")
const defaultConfig = {
  isRange: false,
  hasDefaultValues: false,
  isVertical: false,
  valueLabelDisplayed: true,
  limitsDisplayed: true,
  minValue: 0,
  maxValue: 100,
  step: 1,
  leftHandleValue: 0,
  rightHandleValue: 100,
  defaultValues: ["first", "second", "third"]
}

describe("sliderLimitView", () => {
  describe("defaultMode", () => {
    it("should create rootElement with MIN_VALUE class if Type is MinVal", () => {
      let limitLabel = new SliderLimitView(defaultConfig, Type.MinVal)

      expect(limitLabel.ROOT).to.exist
      expect(limitLabel.ROOT.classList.item(0)).to.equal(CLASSES.MIN_VALUE)
    })

    it("should create rootElement with MAX_VALUE class if Type is MaxVal", () => {
      let limitLabel = new SliderLimitView(defaultConfig, Type.MaxVal)

      expect(limitLabel.ROOT).to.exist
      expect(limitLabel.ROOT.classList.item(0)).to.equal(CLASSES.MAX_VALUE)
    })
  })

  describe("verticalMode", () => {
    it("should create rootElement with MIN_VALUE_VERTICAL class if Type is MinVal", () => {
      let config = Object.assign({}, defaultConfig, {
        isVertical: true
      })
      let limitLabel = new SliderLimitView(config, Type.MinVal)

      expect(limitLabel.ROOT).to.exist
      expect(limitLabel.ROOT.classList.item(1)).to.equal(CLASSES.MIN_VALUE_VERTICAL)
    })

    it("should create rootElement with MAX_VALUE_VERTICAL class if Type is MaxVal", () => {
      let config = Object.assign({}, defaultConfig, {
        isVertical: true
      })
      let limitLabel = new SliderLimitView(config, Type.MaxVal)

      expect(limitLabel.ROOT).to.exist
      expect(limitLabel.ROOT.classList.item(1)).to.equal(CLASSES.MAX_VALUE_VERTICAL)
    })
  })

  describe("setValue", () => {
    let limitLabel = new SliderLimitView(defaultConfig, Type.MinVal)

    it("should change innerHTML of the label to the given one", () => {
      limitLabel.setValue(100)
      expect(limitLabel.ROOT.innerHTML).to.equal("100")
    })
  })
})