import { expect } from "chai"
import { SliderDefaultValueLabel } from "../../../src/slider/view/sliderDefaultValueLabelView"
import { SliderConfig } from "../../../src/slider/sliderConfig/sliderConfig";
import { SliderState } from "../../../src/slider/sliderState/sliderState";

const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>");
(global as any).window = dom.window;
(global as any).document = window.document;

const CLASSES: SliderClasses = require("../../../src/slider/sliderClasses.json")

describe("sliderDefaultValueLabelView", () => {
  it("should create root element with defaulValue class and add it to the container", () => {
    let container = document.createElement("div")
    let config = new SliderConfig({
      hasDefaultValues: true,
      defaultValues: ["first", "second", "third"]
    })
    let state = new SliderState()
    let defaultValue = new SliderDefaultValueLabel(container, config, state, 0)

    expect(container.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(1)
  })

  it("should create label element and add it to the root", () => {
    let container = document.createElement("div")
    let config = new SliderConfig({
      hasDefaultValues: true,
      defaultValues: ["first", "second", "third"]
    })
    let state = new SliderState()
    let defaultValue = new SliderDefaultValueLabel(container, config, state, 0)

    expect(container.querySelectorAll(`.${CLASSES.DEFAULT_VALUE_LABEL}`).length).to.equal(1)
  })

  it("should add vertical class if config.isVertical == true", () => {
    let container = document.createElement("div")
    let config = new SliderConfig({
      isVertical: true,
      hasDefaultValues: true,
      defaultValues: ["first", "second", "third"]
    })
    let state = new SliderState()
    let defaultValue = new SliderDefaultValueLabel(container, config, state, 0)

    expect(container.querySelectorAll(`.${CLASSES.DEFAULT_VALUE_VERTICAL}`).length).to.equal(1)
  })

  it("should display value from defaultValues list according with the index", () => {
    let container = document.createElement("div")
    let config = new SliderConfig({
      hasDefaultValues: true,
      defaultValues: ["first", "second", "third"]
    })
    let state = new SliderState()
    let defaultValue = new SliderDefaultValueLabel(container, config, state, 1)

    expect(container.querySelector(`.${CLASSES.DEFAULT_VALUE_LABEL}`)?.innerHTML).to.equal("second")
  })

  it("should set shift according with the index", () => {
    let container = document.createElement("div")
    let config = new SliderConfig({
      hasDefaultValues: true,
      defaultValues: ["first", "second", "third"]
    })
    let state = new SliderState()
    let defaultValue = new SliderDefaultValueLabel(container, config, state, 1)

    let foundDefaultValue = container.querySelector(`.${CLASSES.DEFAULT_VALUE}`)
    expect((foundDefaultValue as HTMLElement).style.left).to.equal("50%")
  })

  it("should not append root to container if hasDefaultValues == false", () => {
    let container = document.createElement("div")
    let config = new SliderConfig({
      hasDefaultValues: false,
      defaultValues: ["first", "second", "third"]
    })
    let state = new SliderState()
    let defaultValue = new SliderDefaultValueLabel(container, config, state, 0)

    expect(container.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(0)
  })

  describe("defaultValues.set()", () => {
    it("should display a new value if defaultValues[index] changed", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"]
      })
      let state = new SliderState()
      let defaultValue = new SliderDefaultValueLabel(container, config, state, 1)

      config.defaultValues.set(["first", "newValue", "third"])

      let label = container.querySelector(`.${CLASSES.DEFAULT_VALUE_LABEL}`) as HTMLElement
      expect(label.innerHTML).to.equal("newValue")
    })

    it("should change the shift if defaultValues.length changed", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"]
      })
      let state = new SliderState()
      let defaultValue = new SliderDefaultValueLabel(container, config, state, 1)

      config.defaultValues.set(["first", "second", "third", "fourth", "fifth"])

      let foundDefaultValue = container.querySelector(`.${CLASSES.DEFAULT_VALUE}`) as HTMLElement
      expect(foundDefaultValue.style.left).to.equal("25%")
    })
  })

  describe("hasDefaultValues.set()", () => {
    it("should append root to container if given true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        hasDefaultValues: false,
        defaultValues: ["first", "second", "third"]
      })
      let state = new SliderState()
      let defaultValue = new SliderDefaultValueLabel(container, config, state, 1)

      config.hasDefaultValues.set(true)

      expect(container.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(1)
    })

    it("should remove root from container if given false", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"]
      })
      let state = new SliderState()
      let defaultValue = new SliderDefaultValueLabel(container, config, state, 1)

      config.hasDefaultValues.set(false)

      expect(container.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(0)
    })

    it("should not create an extra copy of root in container if config.hasDefaultValues == true and given true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"]
      })
      let state = new SliderState()
      let defaultValue = new SliderDefaultValueLabel(container, config, state, 1)

      config.hasDefaultValues.set(true)

      expect(container.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(1)
    })
  })
})