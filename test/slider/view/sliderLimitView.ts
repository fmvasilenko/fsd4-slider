import { expect } from "chai"
import { SliderLimitView } from "../../../src/slider/view/sliderLimitView"
import { SliderConfig } from "../../../src/slider/sliderConfig/sliderConfig";

enum Type{MinVal, MaxVal}
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>");
(global as any).window = dom.window;
(global as any).document = window.document;

const CLASSES: SliderClasses = require("../../../src/slider/sliderClasses.json")

describe("sliderLimitView", () => {
  describe("defaultMode", () => {
    it("should create minValue root elemment and add to container if config.limitsDisplayed == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        limitsDisplayed: true
      })
      let limit = new SliderLimitView(container, config, Type.MinVal)

      expect(container.querySelectorAll(`.${CLASSES.MIN_VALUE}`).length).to.equal(1)
    })

    it("should create maxValue root element and add to container if config.limitsDisplayed == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        limitsDisplayed: true
      })
      let limit = new SliderLimitView(container, config, Type.MaxVal)

      expect(container.querySelectorAll(`.${CLASSES.MAX_VALUE}`).length).to.equal(1)
    })

    it("should not add root elemment to container if config.limitsDisplayed == false", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        limitsDisplayed: false
      })
      let limit = new SliderLimitView(container, config, Type.MinVal)

      expect(container.querySelectorAll(`.${CLASSES.MIN_VALUE}`).length).to.equal(0)
    })

    it("should add vertical class if config.isVertical == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        limitsDisplayed: true,
        isVertical: true
      })
      let limit = new SliderLimitView(container, config, Type.MinVal)

      let foundLimit = container.querySelector(`.${CLASSES.MIN_VALUE}`)
      expect(foundLimit?.classList.contains(`${CLASSES.MIN_VALUE_VERTICAL}`)).to.equal(true)
    })

    it("should put minValue inside of the root if Type == minValue", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        minValue: 10,
        limitsDisplayed: true
      })
      let limit = new SliderLimitView(container, config, Type.MinVal)

      let foundLimit = container.querySelector(`.${CLASSES.MIN_VALUE}`)
      expect(foundLimit?.innerHTML).to.equal("10")
    })

    it("should put maxValue inside of the root if Type == maxValue", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        maxValue: 120,
        limitsDisplayed: true
      })
      let limit = new SliderLimitView(container, config, Type.MaxVal)

      let foundLimit = container.querySelector(`.${CLASSES.MAX_VALUE}`)
      expect(foundLimit?.innerHTML).to.equal("120")
    })
  })

  describe("defaultValues mode", () => {
    it("should not add limits", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        hasDefaultValues: true,
        limitsDisplayed: true
      })
      let limit = new SliderLimitView(container, config, Type.MinVal)

      expect(container.querySelectorAll(`.${CLASSES.MIN_VALUE}`).length).to.equal(0)
    })
  })

  describe("config.minValue.set()", () => {
    it("should change innerHTML if Type == minValue", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        limitsDisplayed: true,
        minValue: 10
      })
      let limit = new SliderLimitView(container, config, Type.MinVal)

      config.minValue.set(20)

      let foundLimit = container.querySelector(`.${CLASSES.MIN_VALUE}`)
      expect(foundLimit?.innerHTML).to.equal("20")
    })
  })

  describe("config.maxValue.set()", () => {
    it("should change innerHTML if Type == maxValue", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        limitsDisplayed: true,
        maxValue: 100
      })
      let limit = new SliderLimitView(container, config, Type.MaxVal)

      config.maxValue.set(200)

      let foundLimit = container.querySelector(`.${CLASSES.MAX_VALUE}`)
      expect(foundLimit?.innerHTML).to.equal("200")
    })
  })

  describe("config.limitsDisplayed.set()", () => {
    it("should display the limit if given true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        limitsDisplayed: false
      })
      let limit = new SliderLimitView(container, config, Type.MinVal)

      config.limitsDisplayed.set(true)

      expect(container.querySelectorAll(`.${CLASSES.MIN_VALUE}`).length).to.equal(1)
    })

    it("should hide limit if given false", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        limitsDisplayed: true
      })
      let limit = new SliderLimitView(container, config, Type.MinVal)

      config.limitsDisplayed.set(false)

      expect(container.querySelectorAll(`.${CLASSES.MIN_VALUE}`).length).to.equal(0)
    })

    it("should not create an extra limit if config.limitsDisplayed == true and given true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        limitsDisplayed: true
      })
      let limit = new SliderLimitView(container, config, Type.MinVal)

      config.limitsDisplayed.set(true)

      expect(container.querySelectorAll(`.${CLASSES.MIN_VALUE}`).length).to.equal(1)
    })
  })
})