import { expect } from "chai"
import { SliderValueLabelView } from "../../../src/slider/view/sliderValueLabelView"
import { SliderConfig } from "../../../src/slider/sliderConfig/sliderConfig"

const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>");
(global as any).window = dom.window;
(global as any).document = window.document;

enum Side{Left, Right}
const CLASSES: SliderClasses = require("../../../src/slider/sliderClasses.json")

describe("sliderValuLabelView", () => {
  describe("default mode", () => {
    it("should create root element in container with valueLabel class", () => {
      let container = document.createElement("div")
      let config = new SliderConfig()
      let valueLabel = new SliderValueLabelView(container, config, Side.Left)

      expect(container.querySelectorAll(`.${CLASSES.VALUE_LABEL}`).length).to.equal(1)
    })

    it("should not append root to container if valueLabelDisplayed == false", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        valueLabelDisplayed: false
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Left)

      expect(container.querySelectorAll(`.${CLASSES.VALUE_LABEL}`).length).to.equal(0)
    })

    it("should display handleValue", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        leftHandleValue: 50
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Left)

      let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
      expect(foundValueLabel.innerHTML).to.equal("50")
    })
  })

  describe("defaultValuesMode", () => {
    it("should display defaultValue[index]", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        leftHandleValue: 1
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Left)

      let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
      expect(foundValueLabel.innerHTML).to.equal("second")
    })
  })
  
  describe("vertical mode", () => {
    it("should add valueLabelVertical class if isVertical == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        valueLabelDisplayed: true,
        isVertical: true
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Left)

      expect(container.querySelectorAll(`.${CLASSES.LEFT_HANDLE_LABEL_VERTICAL}`).length).to.equal(1)
    })
  })

  describe("valueLabelDisplyed.set()", () => {
    it("should append root to container if given true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        valueLabelDisplayed: false
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Left)

      config.valueLabelDisplayed.set(true)

      expect(container.querySelectorAll(`.${CLASSES.VALUE_LABEL}`).length).to.equal(1)
    })

    it("should remove root from container if given false", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        valueLabelDisplayed: true
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Left)

      config.valueLabelDisplayed.set(false)

      expect(container.querySelectorAll(`.${CLASSES.VALUE_LABEL}`).length).to.equal(0)
    })
  })

  describe("leftHandleValue.set()", () => {
    it("should display leftHandleValue if it`s leftHandle", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        leftHandleValue: 20
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Left)

      config.leftHandleValue.set(50)

      let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
      expect(foundValueLabel.innerHTML).to.equal("50")
    })

    it("should display defaultValues[leftHandleValue] if it`s leftHandle and hasDefaultValues == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        leftHandleValue: 1
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Left)

      config.leftHandleValue.set(0)

      let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
      expect(foundValueLabel.innerHTML).to.equal("first")
    })
  })

  describe("rightHandleValue.set()", () => {
    it("should display rightHandleValue if it`s rightHandle", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        rightHandleValue: 80
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Right)

      config.rightHandleValue.set(50)

      let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
      expect(foundValueLabel.innerHTML).to.equal("50")
    })

    it("should display defaultValues[rightHandleValue] if it`s rightHandle and hasDefaultValues == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        leftHandleValue: 0,
        rightHandleValue: 1
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Right)

      config.rightHandleValue.set(2)

      let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
      expect(foundValueLabel.innerHTML).to.equal("third")
    })
  })

  describe("hasDefaultValues.set()", () => {
    describe("given false", () => {
      it("should display leftHandleValue if it`s leftHandle", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 1
        })
        let valueLabel = new SliderValueLabelView(container, config, Side.Left)

        config.hasDefaultValues.set(false)

        let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
        expect(foundValueLabel.innerHTML).to.equal("1")
      })

      it("should display rightHandleValue if it`s rightHandle", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true,
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 2
        })
        let valueLabel = new SliderValueLabelView(container, config, Side.Right)

        config.hasDefaultValues.set(false)

        let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
        expect(foundValueLabel.innerHTML).to.equal("2")
      })
    })

    describe("given true", () => {
      it("should display defaultValues[leftHandleValue] if it`s leftHandle and hasDefaultValues == true", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          hasDefaultValues: false,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 1
        })
        let valueLabel = new SliderValueLabelView(container, config, Side.Left)

        config.hasDefaultValues.set(true)

        let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
        expect(foundValueLabel.innerHTML).to.equal("second")
      })

      it("should display defaultValues[rightHandleValue] if it`s rightHandle and hasDefaultValues == true", () => {
        let container = document.createElement("div")
        let config = new SliderConfig({
          isRange: true,
          hasDefaultValues: false,
          defaultValues: ["first", "second", "third"],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 2
        })
        let valueLabel = new SliderValueLabelView(container, config, Side.Right)

        config.hasDefaultValues.set(true)

        let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
        expect(foundValueLabel.innerHTML).to.equal("third")
      })
    })
  })

  describe("defaultValues.set()", () => {
    it("should display new defaultValues[leftHandleValue] if it`s leftHandle and hasDefaultValues == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        minValue: 0,
        leftHandleValue: 1
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Left)

      config.defaultValues.set(["frist", "newValue", "third"])

      let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
      expect(foundValueLabel.innerHTML).to.equal("newValue")
    })

    it("should display new defaultValues[rightHandleValue] if it`s rightHandle and hasDefaultValues == true", () => {
      let container = document.createElement("div")
      let config = new SliderConfig({
        isRange: true,
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        minValue: 0,
        leftHandleValue: 0,
        rightHandleValue: 1
      })
      let valueLabel = new SliderValueLabelView(container, config, Side.Right)

      config.defaultValues.set(["frist", "newValue", "third"])

      let foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement
      expect(foundValueLabel.innerHTML).to.equal("newValue")
    })
  })
})