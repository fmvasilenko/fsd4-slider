import { expect } from "chai"
import { SliderView } from "../../../src/slider/view/sliderView"

const jsdom = require("jsdom")
const { JSDOM } = jsdom
const html = "<!doctype html><html><head><link href='/assets/css/app.css' rel='stylesheet'></head><body><div class='slider'></div></body></html>"
const dom = new JSDOM(html, {resources: "usable", pretendToBeVisual: true});
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

class SliderController {
  ROOT = document.createElement("div")

  getConfig = function() {
    return defaultConfig
  }

  calculateLeftHandleValue = function(position: number) {

  }

  calculateRightHandleValue = function(position: number) {
    
  }
}

describe("sliderView", () => {
  describe("constructor", () => {
    describe("defaultMode", () => {
      let root = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        minValue: 0,
        maxValue: 100,
        leftHandleValue: 20
      })
      let sliderController = new SliderController()
      let sliderView = new SliderView(sliderController, config, root)

      it("should add SLIDER class to the given ROOT", () => {
        expect(sliderView.ROOT.classList.contains(CLASSES.SLIDER)).to.equal(true)
      })

      it("should create leftHandle", () => {
        expect(sliderView.ROOT.querySelectorAll(`.${CLASSES.LEFT_HANDLE}`)).to.have.lengthOf(1)
      })

      it("should create minValue label", () => {
        expect(sliderView.ROOT.querySelectorAll(`.${CLASSES.MIN_VALUE}`)).to.have.lengthOf(1)
      })

      it("should create maxValue label", () => {
        expect(sliderView.ROOT.querySelectorAll(`.${CLASSES.MAX_VALUE}`)).to.have.lengthOf(1)
      })

      it("should not create rangeLine", () => {
        expect(sliderView.ROOT.querySelectorAll(`.${CLASSES.RANGE_LINE}`)).to.have.lengthOf(0)
      })

      it("should move leftHandle to the position, according with leftHandleValue", () => {
        let leftHandle: HTMLElement = sliderView.ROOT.querySelectorAll(`.${CLASSES.LEFT_HANDLE}`)[0] as HTMLElement
        expect(leftHandle.style.left).to.equal("20%")
      })
    })

    describe("defaultValuesMode", () => {
      let root = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        hasDefaultValues: true,
        defaultValue: ["first", "second", "third"],
        leftHandleValue: 1
      })
      let sliderController = new SliderController()
      let sliderView = new SliderView(sliderController, config, root)

      it("should create defaultValueLabels", () => {
        expect(sliderView.ROOT.querySelectorAll(`.${CLASSES.DEFAULT_VALUE_LABEL}`)).to.have.lengthOf(3)
      })

      it("should not create minValue label", () => {
        expect(sliderView.ROOT.querySelectorAll(`.${CLASSES.MIN_VALUE}`)).to.have.lengthOf(0)
      })

      it("should not create maxValue label", () => {
        expect(sliderView.ROOT.querySelectorAll(`.${CLASSES.MAX_VALUE}`)).to.have.lengthOf(0)
      })

      it("should move leftHandle to the position, according with leftHandleValue", () => {
        let leftHandle: HTMLElement = sliderView.ROOT.querySelectorAll(`.${CLASSES.LEFT_HANDLE}`)[0] as HTMLElement
        expect(leftHandle.style.left).to.equal("50%")
      })
    })

    describe("rangeMode", () => {
      let root = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        isRange: true,
        minValue: 0,
        maxValue: 100,
        rightHandleValue: 80
      })
      let sliderController = new SliderController()
      let sliderView = new SliderView(sliderController, config, root)

      it("should create rightHandle", () => {
        expect(sliderView.ROOT.querySelectorAll(`.${CLASSES.RIGHT_HANDLE}`)).to.have.lengthOf(1)
      })

      it("should create rangeLine", () => {
        expect(sliderView.ROOT.querySelectorAll(`.${CLASSES.RANGE_LINE}`)).to.have.lengthOf(1)
      })

      it("should move rightHandle to the position, according with rightHandleValue", () => {
        let rightHandle: HTMLElement = sliderView.ROOT.querySelectorAll(`.${CLASSES.RIGHT_HANDLE}`)[0] as HTMLElement
        expect(rightHandle.style.left).to.equal("80%")
      })
    })

    describe("rangeMode with defaultValues", () => {
      let root = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        isRange: true,
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        leftHandleValue: 0,
        rightHandleValue: 1
      })
      let sliderController = new SliderController()
      let sliderView = new SliderView(sliderController, config, root)

      it("should move rightHandle to the position, according with rightHandleValue", () => {
        let rightHandle: HTMLElement = sliderView.ROOT.querySelectorAll(`.${CLASSES.RIGHT_HANDLE}`)[0] as HTMLElement
        expect(rightHandle.style.left).to.equal("50%")
      })
    })

    describe("verticalMode", () => {
      let root = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        isVertical: true
      })
      let sliderController = new SliderController()
      let sliderView = new SliderView(sliderController, config, root)

      it("should add SLIDER_VERTICAL class to the given ROOT", () => {
        expect(sliderView.ROOT.classList.contains(CLASSES.SLIDER_VERTICAL)).to.equal(true)
      })
    })
  })

  describe("changeLeftHandleValue", () => {
    describe("defaultMode", () => {
      let root = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        minValue: 0,
        maxValue: 100,
        rightHandleValue: 40
      })
      let sliderController = new SliderController()
      let sliderView = new SliderView(sliderController, config, root)

      it("should change leftHandle position according with given value", () => {
        sliderView.changeLeftHandleValue(60)

        let leftHandle: HTMLElement = sliderView.ROOT.querySelectorAll(`.${CLASSES.LEFT_HANDLE}`)[0] as HTMLElement
        expect(leftHandle.style.left).to.equal("60%")
      })
    })

    describe("defaultValuesMode", () => {
      let root = document.createElement("div")
      let config = Object.assign({}, defaultConfig, {
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        leftHandleValue: 0
      })
      let sliderController = new SliderController()
      let sliderView = new SliderView(sliderController, config, root)

      it("should change leftHandle position according with given value", () => {
        sliderView.changeLeftHandleValue(1)

        let leftHandle: HTMLElement = sliderView.ROOT.querySelectorAll(`.${CLASSES.LEFT_HANDLE}`)[0] as HTMLElement
        expect(leftHandle.style.left).to.equal("50%")
      })
    })

    describe("rangeMode", () => {
      //let root = document.createElement("div")
      let root = document.querySelector(`.slider`) as HTMLElement
      let config = Object.assign({}, defaultConfig, {
        isRange: true,
        minValue: 0,
        maxValue: 100,
        rightHandleValue: 50
      })
      let sliderController = new SliderController()
      let sliderView = new SliderView(sliderController, config, root)

      it("should add shift to leftHandlePosition if leftHandle = rightHandle", () => {
        sliderView.ROOT.style.width = "100px"
        sliderView.changeLeftHandleValue(50)

        let leftHandle: HTMLElement = sliderView.ROOT.querySelectorAll(`.${CLASSES.LEFT_HANDLE}`)[0] as HTMLElement

        console.log("Parameters:")
        console.log(`Slider: ${sliderView.ROOT}`)
        console.log(`Slider width: ${sliderView.ROOT.clientWidth}`)
        console.log(`Left handle width: ${leftHandle.offsetWidth}`)

        expect(leftHandle.style.left).to.equal("42%")
      })
    })
  })
})