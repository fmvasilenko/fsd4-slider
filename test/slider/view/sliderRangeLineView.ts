import { expect } from "chai"
import { SliderRangeLineView } from "../../../src/slider/view/sliderRangeLineView"
import { SliderConfig } from "../../../src/slider/sliderConfig/sliderConfig";

enum Side{Left, Right}
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>");
(global as any).window = dom.window;
(global as any).document = window.document;

const CLASSES: SliderClasses = require("../../../src/slider/sliderClasses.json")
/*const defaultConfig = {
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
}*/

describe("sliderRangeLineView", () => {
  describe("default mode", () => {
    it("should create root element with rangeLine class and append it to the container", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true
      })
      let rangeLine = new SliderRangeLineView(container, config)

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE}`).length).to.equal(1)
    })

    it("should not append root to container if config.isRange == false", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: false
      })
      let rangeLine = new SliderRangeLineView(container, config)

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE}`).length).to.equal(0)
    })

    it("should set left shift to 20% if leftHandleValue == 20 and range == 100", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        leftHandleValue: 20,
        minValue: 0,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(container, config)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.left).to.equal("20%")
    })

    it("should set right shift to 20% if rightHandleValue == 80 and range == 100", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        rightHandleValue: 80,
        minValue: 0,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(container, config)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.right).to.equal("20%")
    })
  })

  describe("defaultValues mode", () => {
    it("should set left shift to 50% if leftHandleValue == 1 and defaultValues.length == 3", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        leftHandleValue: 1
      })
      let rangeLine = new SliderRangeLineView(container, config)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.left).to.equal("50%")
    })

    it("should set right shift to 50% if rightHandleValue == 1 and defaultValues.length == 3", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        leftHandleValue: 0,
        rightHandleValue: 1
      })
      let rangeLine = new SliderRangeLineView(container, config)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.right).to.equal("50%")
    })
  })
  
  describe("vertical mode", () => {
    it("should add rangeLineVertical class to the root if isVertical == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        isVertical: true
      })
      let rangeLine = new SliderRangeLineView(container, config)

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE_VERTICAL}`).length).to.equal(1)
    })

    it("should set bottom shift to 20% if leftHandleValue == 20, range == 100 and isVertical == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        isVertical: true,
        leftHandleValue: 20,
        minValue: 0,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(container, config)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.bottom).to.equal("20%")
    })

    it("should set top shift to 20% if rightHandleValue == 80, range == 100 and isVertical == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        isVertical: true,
        rightHandleValue: 80,
        minValue: 0,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(container, config)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.top).to.equal("20%")
    })
  })

  describe("config.leftHandleValue.set()", () => {
    it("should change left shift according with the given value if isVertical == false", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        leftHandleValue: 20,
        minValue: 0,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.leftHandleValue.set(40)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.left).to.equal("40%")
    })

    it("should change bottom shift according with the given value if isVertical == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        isVertical: true,
        leftHandleValue: 20,
        minValue: 0,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.leftHandleValue.set(40)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.bottom).to.equal("40%")
    })
  })

  describe("config.rightHandleValue.set()", () => {
    it("should change right shift according with the given value if isVertical == false", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        rightHandleValue: 80,
        minValue: 0,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.rightHandleValue.set(60)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.right).to.equal("40%")
    })

    it("should change top shift according with the given value if isVertical == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        isVertical: true,
        rightHandleValue: 80,
        minValue: 0,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.rightHandleValue.set(60)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.top).to.equal("40%")
    })
  })

  describe("config.isVertical.set()", () => {
    it("should change left shift to bottom shift", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        leftHandleValue: 20,
        minValue: 0,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.isVertical.set(true)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.left).to.equal("")
      expect(foundRangeLine.style.bottom).to.equal("20%")
    })
    
    it("should change right shift to top shift", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        rightHandleValue: 80,
        minValue: 0,
        maxValue: 100
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.isVertical.set(true)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.right).to.equal("")
      expect(foundRangeLine.style.top).to.equal("20%")
    })
    
    it("should add rangeLineVertical class if given true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        isVertical: false
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.isVertical.set(true)

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE_VERTICAL}`).length).to.equal(1)
    })

    it("should remove rangeLineVertical class if given false", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        isVertical: true
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.isVertical.set(false)

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE_VERTICAL}`).length).to.equal(0)
    })
  })

  describe("config.hasDefaultValues.set()", () => {
    describe("default mode", () => {
      it("should change left shift to 50% if given true, leftHandleValue == 1 and defaultValues.length == 3", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true,
          hasDefaultValues: false,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 1,
          rightHandleValue: 2
        })
        let rangeLine = new SliderRangeLineView(container, config)

        config.hasDefaultValues.set(true)

        let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
        expect(foundRangeLine.style.left).to.equal("50%")
      })

      it("should change right shift to 50% if given true, rightHandleValue == 1 and defaultValues.length == 3", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true,
          hasDefaultValues: false,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 1
        })
        let rangeLine = new SliderRangeLineView(container, config)

        config.hasDefaultValues.set(true)

        let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
        expect(foundRangeLine.style.right).to.equal("50%")
      })

      it("should change left shift to 1% if given false, leftHandleValue == 1 and range = 100", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true,
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 1,
          rightHandleValue: 2
        })
        let rangeLine = new SliderRangeLineView(container, config)

        config.hasDefaultValues.set(false)

        let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
        expect(foundRangeLine.style.left).to.equal("1%")
      })

      it("should change right shift to 99% if given false, rightHandleValue == 1 and range = 100", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true,
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 1
        })
        let rangeLine = new SliderRangeLineView(container, config)

        config.hasDefaultValues.set(false)

        let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
        expect(foundRangeLine.style.right).to.equal("99%")
      })
    })

    describe("vertical mode", () => {
      it("should change bottom shift to 50% if given true, leftHandleValue == 1 and defaultValues.length == 3", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true,
          isVertical: true,
          hasDefaultValues: false,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 1,
          rightHandleValue: 2
        })
        let rangeLine = new SliderRangeLineView(container, config)

        config.hasDefaultValues.set(true)

        let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
        expect(foundRangeLine.style.bottom).to.equal("50%")
      })

      it("should change top shift to 50% if given true, rightHandleValue == 1 and defaultValues.length == 3", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true,
          isVertical: true,
          hasDefaultValues: false,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 1
        })
        let rangeLine = new SliderRangeLineView(container, config)

        config.hasDefaultValues.set(true)

        let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
        expect(foundRangeLine.style.top).to.equal("50%")
      })

      it("should change bottom shift to 1% if given false, leftHandleValue == 1 and range = 100", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true,
          isVertical: true,
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 1,
          rightHandleValue: 2
        })
        let rangeLine = new SliderRangeLineView(container, config)

        config.hasDefaultValues.set(false)

        let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
        expect(foundRangeLine.style.bottom).to.equal("1%")
      })

      it("should change top shift to 99% if given false, rightHandleValue == 1 and range = 100", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true,
          isVertical: true,
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 1
        })
        let rangeLine = new SliderRangeLineView(container, config)

        config.hasDefaultValues.set(false)

        let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
        expect(foundRangeLine.style.top).to.equal("99%")
      })
    })
  })

  describe("isRange.set()", () => {
    it("should append root to the container if isRange == true", () => {
      let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: false
        })
        let rangeLine = new SliderRangeLineView(container, config)

        config.isRange.set(true)

        expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE}`).length).to.equal(1)
    })

    it("should remove root from container if isRange == false", () => {
      let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true
        })
        let rangeLine = new SliderRangeLineView(container, config)

        config.isRange.set(false)

        expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE}`).length).to.equal(0)
    })
  })

  describe("config.minValue.set()", () => {
    it("should change left shift according with the new range", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        minValue: 0,
        maxValue: 100,
        leftHandleValue: 50
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.minValue.set(50)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.left).to.equal("0%")
    })

    it("should change right shift according with the new range", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        minValue: 0,
        maxValue: 100,
        rightHandleValue: 80
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.minValue.set(50)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.right).to.equal("40%")
    })
  })

  describe("config.maxValue.set()", () => {
    it("should change left shift according with the new range", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        minValue: 0,
        maxValue: 100,
        leftHandleValue: 20
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.maxValue.set(50)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.left).to.equal("40%")
    })

    it("should change right shift according with the new range", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        minValue: 0,
        maxValue: 100,
        rightHandleValue: 50
      })
      let rangeLine = new SliderRangeLineView(container, config)

      config.maxValue.set(50)

      let foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement
      expect(foundRangeLine.style.right).to.equal("0%")
    })
  })
})