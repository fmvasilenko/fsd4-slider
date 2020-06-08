import { expect } from "chai"
import { SliderHandle } from "../../../src/slider/view/sliderHandleView"

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

describe("SliderHandleView", () => {
  it("should create element with sliderHandle class", () => {
    let slider = document.createElement("div")
    let handle = new SliderHandle(slider, defaultConfig, Side.Left)

    expect(handle.ROOT).to.exist
    expect(handle.ROOT.classList.item(0)).to.equal(CLASSES.HANDLE)
  })

  it("should create label inside of handle root element", () => {
    let slider = document.createElement("div")
    let handle = new SliderHandle(slider, defaultConfig, Side.Left)

    let valueLabel = handle.ROOT.querySelectorAll(`.${CLASSES.VALUE_LABEL}`)
    expect(valueLabel).to.have.lengthOf(1)
  })

  describe("setValue", () => {
    describe("defaultState", () => {
      let slider = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        minValue: 0,
        maxValue: 100
      })
      let handle = new SliderHandle(slider, config, Side.Left)

      it("should change 'left' position to 0% when value == minValue", () => {
        handle.setValue(0)
        expect(handle.ROOT.style.left).to.equal("0%")
      })

      it("should change 'left' position to maximum when value == maxValue", () => {
        handle.setValue(100)
        expect(handle.ROOT.style.left).to.equal("100%")
      })

      it("should change 'left' position to 50% when value == maxValue - minValue", () => {
        handle.setValue(50)
        expect(handle.ROOT.style.left).to.equal("50%")
      })

      it("should change `left` position to 45% when value = maxValue - minValue and extraShift = -5", () => {
        handle.setValue(50, -5)
        expect(handle.ROOT.style.left).to.equal("45%")
      })
    })

    describe("verticalState", () => {
      let slider = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        isVertical: true,
        minValue: 0,
        maxValue: 100
      })
      let handle = new SliderHandle(slider, config, Side.Left)

      it("should change 'bottom' position to 0% when value == minValue", () => {
        handle.setValue(0)
        expect(handle.ROOT.style.bottom).to.equal("0%")
      })

      it("should change 'bottom' position to maximum when value == maxValue", () => {
        handle.setValue(100)
        expect(handle.ROOT.style.bottom).to.equal("100%")
      })

      it("should change 'bottom' to 50% when value == maxValue - minValue", () => {
        handle.setValue(50)
        expect(handle.ROOT.style.bottom).to.equal("50%")
      })
    })

    describe("defaultValuesState", () => {
      let slider = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        hasDefaultValues: true,
        minValue: 0,
        maxValue: 100
      })
      let handle = new SliderHandle(slider, config, Side.Left)

      it("should change 'left' position to 0% when value == 0", () => {
        handle.setValue(0)
        expect(handle.ROOT.style.left).to.equal("0%")
      })

      it("should change 'left' position to 100% when value == defaultValues.length - 1", () => {
        handle.setValue(config.defaultValues.length - 1)
        expect(handle.ROOT.style.left).to.equal("100%")
      })

      it("should change 'left' position to 50% when value == 1 and length is 3", () => {
        handle.setValue(1)
        expect(handle.ROOT.style.left).to.equal("50%")
      })
    })

    describe("defaultValuesState vertical", () => {
      let slider = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        isVertical: true,
        hasDefaultValues: true,
        minValue: 0,
        maxValue: 100
      })
      let handle = new SliderHandle(slider, config, Side.Left)

      it("should change 'bottom' position to 0% when value == 0", () => {
        handle.setValue(0)
        expect(handle.ROOT.style.bottom).to.equal("0%")
      })

      it("should change 'bottom' position to 100% when value == defaultValues.length - 1", () => {
        handle.setValue(config.defaultValues.length - 1)
        expect(handle.ROOT.style.bottom).to.equal("100%")
      })

      it("should change 'bottom' position to 50% when value == 1 and length is 3", () => {
        handle.setValue(1)
        expect(handle.ROOT.style.bottom).to.equal("50%")
      })
    })
  })

  describe("isDragged", () => {
    it("should return state.isDragged = false after initialized", () => {
      let slider = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {})
      let handle = new SliderHandle(slider, config, Side.Left)

      expect(handle.isDragged()).to.equal(false)
    })
  })

  describe("drag", () => {
    it("should change state.isDragged to true", () => {
      let slider = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {})
      let handle = new SliderHandle(slider, config, Side.Left)

      handle.drag()

      expect(handle.isDragged()).to.equal(true)
    })
  })

  describe("drop", () => {
    it("should change state.isDragged to false", () => {
      let slider = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {})
      let handle = new SliderHandle(slider, config, Side.Left)

      handle.drag()
      handle.drop()

      expect(handle.isDragged()).to.equal(false)
    })
  })

  describe("switchValueLabel", () => {
    let slider = document.createElement("div")
    let config = Object.assign({}, defaultConfig, {
      valueLabelDisplayed: true
    })
    let handle = new SliderHandle(slider, config, Side.Left)

    it("should remove value label if given false", () => {
      handle.switchValueLabel(false)

      let valueLabel = handle.ROOT.querySelectorAll(`.${CLASSES.VALUE_LABEL}`)
      expect(valueLabel).to.have.lengthOf(0)
    })

    it("should add value label if given true", () => {
      handle.switchValueLabel(true)

      let valueLabel = handle.ROOT.querySelectorAll(`.${CLASSES.VALUE_LABEL}`)
      expect(valueLabel).to.have.lengthOf(1)
    })
  })
})