import { expect } from "chai"
import { SliderView } from "../../../src/slider/view/sliderView"
import { SliderConfig } from "../../../src/slider/sliderConfig/sliderConfig"
import { SliderState } from "../../../src/slider/sliderState/sliderState"
import { contains } from "jquery"

const jsdom = require("jsdom")
const { JSDOM } = jsdom
const html = "<!doctype html><html><head></head><body><div class='slider'></div></body></html>"
const dom = new JSDOM(html, {resources: "usable", pretendToBeVisual: true});
(global as any).window = dom.window;
(global as any).document = window.document;

const CLASSES: SliderClasses = require("../../../src/slider/sliderClasses.json")

describe("sliderView", () => {
  describe("constructor", () => {
    it("should add slider class to the root", () => {
      let root = document.createElement("div")
      let config = new SliderConfig()
      let state = new SliderState()
      let sliderView = new SliderView(root, config, state)

      expect(root.classList.contains(CLASSES.SLIDER)).to.equal(true)
    })

    it("should add slider vertical class to the root if isVertical == true", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig({
        isVertical: true
      })
      let sliderView = new SliderView(root, config, state)

      expect(root.classList.contains(CLASSES.SLIDER_VERTICAL)).to.equal(true)
    })

    it("should add leftHandleView", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig()
      let sliderView = new SliderView(root, config, state)

      expect(root.querySelectorAll(`.${CLASSES.LEFT_HANDLE}`).length).to.equal(1)
    })

    it("should add rightHandleView", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig({
        isRange: true
      })
      let sliderView = new SliderView(root, config, state)

      expect(root.querySelectorAll(`.${CLASSES.RIGHT_HANDLE}`).length).to.equal(1)
    })

    it("should add rangeLineView", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig({
        isRange: true
      })
      let sliderView = new SliderView(root, config, state)

      expect(root.querySelectorAll(`.${CLASSES.RANGE_LINE}`).length).to.equal(1)
    })

    it("should add minValue limitView", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig()
      let sliderView = new SliderView(root, config, state)

      expect(root.querySelectorAll(`.${CLASSES.MIN_VALUE}`).length).to.equal(1)
    })

    it("should add maxValue limitView", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig()
      let sliderView = new SliderView(root, config, state)

      expect(root.querySelectorAll(`.${CLASSES.MAX_VALUE}`).length).to.equal(1)
    })

    it("should add defaultValueLabelView for each defaultValue", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"]
      })
      let sliderView = new SliderView(root, config, state)

      expect(root.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(3)
    })
  })

  describe("defaultValue.set()", () => {
    it("should create new defaultValueLabelViews if needed", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"]
      })
      let sliderView = new SliderView(root, config, state)

      config.defaultValues.set(["first", "second", "third", "fourth"])

      expect(root.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(4)
    })

    it("should remove non used defaultValueLabelViews", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"]
      })
      let sliderView = new SliderView(root, config, state)

      config.defaultValues.set(["first", "second"])

      expect(root.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(2)
    })
  })

  describe("isVertical.set()", () => {
    it("should add sliderVertical class if given true", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig({
        isVertical: false
      })
      let sliderView = new SliderView(root, config, state)

      config.isVertical.set(true)

      expect(root.classList.contains(CLASSES.SLIDER_VERTICAL)).to.equal(true)
    })

    it("should remove sliderVertical class if given false", () => {
      let root = document.createElement("div")
      let state = new SliderState()
      let config = new SliderConfig({
        isVertical: true
      })
      let sliderView = new SliderView(root, config, state)

      config.isVertical.set(false)

      expect(root.classList.contains(CLASSES.SLIDER_VERTICAL)).to.equal(false)
    })
  })
})