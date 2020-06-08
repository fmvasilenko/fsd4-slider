import { expect } from "chai"
import { SliderDefaultValueLabel } from "../../../src/slider/view/sliderDefaultValueLabelView"

enum Side{Left, Right}
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

describe("sliderDefaultValueLabelView", () => {
  it("should create rootElement with DEFAULT_VALUE class", () => {
    let defaultValue = new SliderDefaultValueLabel(defaultConfig)

    expect(defaultValue.ROOT).to.exist
    expect(defaultValue.ROOT.classList.item(0)).to.equal(CLASSES.DEFAULT_VALUE)
  })

  it("should create LABEL inside of ROOT with DEFAULT_VALUE_LABEL class", () => {
    let defaultValue = new SliderDefaultValueLabel(defaultConfig)

    expect(defaultValue.ROOT.querySelectorAll(`.${CLASSES.DEFAULT_VALUE_LABEL}`)).to.have.lengthOf(1)
  })

  describe("setShift", () => {
    describe("defaultMode", () => {
      let config = Object.assign({}, defaultConfig, {
        isVertical: false
      })
      let defaultValue = new SliderDefaultValueLabel(config)

      it("should set `left` position to 0% when given 0", () => {
        defaultValue.setShift(0)
        expect(defaultValue.ROOT.style.left).to.equal("0%")
      })

      it("should set `left` position to 100% when given 100", () => {
        defaultValue.setShift(100)
        expect(defaultValue.ROOT.style.left).to.equal("100%")
      })

      it("should set `left` position to 0% when given less then 0", () => {
        defaultValue.setShift(-100)
        expect(defaultValue.ROOT.style.left).to.equal("0%")
      })

      it("should set `left` position to 100% when given more then 100", () => {
        defaultValue.setShift(200)
        expect(defaultValue.ROOT.style.left).to.equal("100%")
      })
    })

    describe("verticalMode", () => {
      let config = Object.assign({}, defaultConfig, {
        isVertical: true
      })
      let defaultValue = new SliderDefaultValueLabel(config)

      it("should set `top` position to 0% when given 0", () => {
        defaultValue.setShift(0)
        expect(defaultValue.ROOT.style.top).to.equal("0%")
      })

      it("should set `top` position to 100% when given 100", () => {
        defaultValue.setShift(100)
        expect(defaultValue.ROOT.style.top).to.equal("100%")
      })

      it("should set `top` position to 0% when given less then 0", () => {
        defaultValue.setShift(-100)
        expect(defaultValue.ROOT.style.top).to.equal("0%")
      })

      it("should set `top` position to 100% when given more then 100", () => {
        defaultValue.setShift(200)
        expect(defaultValue.ROOT.style.top).to.equal("100%")
      })
    })
  })

  describe("setValue", () => {
    let defaultValue = new SliderDefaultValueLabel(defaultConfig)

    it("should change innerHTML of the label to the given one", () => {
      defaultValue.setValue(100)
      expect(defaultValue.LABEL.innerHTML).to.equal("100")
    })
  })
})