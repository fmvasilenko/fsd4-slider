import { expect } from "chai"
import { SliderRangeLineView } from "../../../src/slider/view/sliderRangeLineView"

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

describe("sliderRangeLineView", () => {
  describe("defaultMode", () => {
    it("should create element with RANGE_LINE class", () => {
      let slider = document.createElement("div")
      let rangeLine = new SliderRangeLineView(slider, defaultConfig)

      expect(rangeLine.ROOT).to.exist
      expect(rangeLine.ROOT.classList.contains(CLASSES.RANGE_LINE)).to.equal(true)
    })
  })

  describe("verticalMode", () => {
    it("should add RANGE_LINE_VERTICAL class to the root", () => {
      let slider = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        isVertical: true
      })
      let rangeLine = new SliderRangeLineView(slider, config)

      expect(rangeLine.ROOT.classList.contains(CLASSES.RANGE_LINE_VERTICAL)).to.equal(true)
    })
  })

  describe("setRange", () => {
    describe("defaultMode", () => {
      let slider = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        minValue: -10,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(slider, config)

      it("should change 'left' position to 0% if leftHandleValue == minValue", () => {
        rangeLine.setRange(-10, 80)
        expect(rangeLine.ROOT.style.left).to.equal("0%")
      })

      it("should change 'left' position to 0% if leftHandleValue < minValue", () => {
        rangeLine.setRange(-50, 80)
        expect(rangeLine.ROOT.style.left).to.equal("0%")
      })

      it("should change 'left' position to 100% if leftHandleValue > maxValue", () => {
        rangeLine.setRange(120, 80)
        expect(rangeLine.ROOT.style.left).to.equal("100%")
      })

      it("should change 'right' position to 0% if rightHandleValue == maxValue", () => {
        rangeLine.setRange(0, 100)
        expect(rangeLine.ROOT.style.right).to.equal("0%")
      })

      it("should change 'right' position to 0% if rightHandleValue > maxValue", () => {
        rangeLine.setRange(0, 120)
        expect(rangeLine.ROOT.style.right).to.equal("0%")
      })

      it("should change 'right' position to (100% - 'left' position) if rightHandleValue < leftHandleValue", () => {
        rangeLine.setRange(45, 20)
        expect(rangeLine.ROOT.style.right).to.equal("50%")
      })
    })

    describe("verticalMode", () => {
      let slider = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        isVertical: true,
        minValue: -10,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(slider, config)

      it("should change 'bottom' position to 0% if leftHandleValue == minValue", () => {
        rangeLine.setRange(-10, 80)
        expect(rangeLine.ROOT.style.bottom).to.equal("0%")
      })

      it("should change 'bottom' position to 0% if leftHandleValue < minValue", () => {
        rangeLine.setRange(-50, 80)
        expect(rangeLine.ROOT.style.bottom).to.equal("0%")
      })

      it("should change 'bottom' position to 100% if leftHandleValue > maxValue", () => {
        rangeLine.setRange(120, 80)
        expect(rangeLine.ROOT.style.bottom).to.equal("100%")
      })

      it("should change 'top' position to 0% if rightHandleValue == maxValue", () => {
        rangeLine.setRange(0, 100)
        expect(rangeLine.ROOT.style.top).to.equal("0%")
      })

      it("should change 'top' position to 0% if rightHandleValue > maxValue", () => {
        rangeLine.setRange(0, 120)
        expect(rangeLine.ROOT.style.top).to.equal("0%")
      })

      it("should change 'top' position to (100% - 'left' position) if rightHandleValue < leftHandleValue", () => {
        rangeLine.setRange(45, 20)
        expect(rangeLine.ROOT.style.top).to.equal("50%")
      })
    })
  })
})