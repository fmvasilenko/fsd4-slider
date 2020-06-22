import { expect } from "chai"
import { SliderController } from "../../src/slider/sliderController"
import { SliderConfig } from "../../src/slider/sliderConfig/sliderConfig";

const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>", { pretendToBeVisual: true });
(global as any).window = dom.window;
(global as any).document = window.document;

const CLASSES: SliderClasses = require("../../src/slider/sliderClasses.json")

function defineHTMLElementParameters() {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetLeft: {
      get: function() { return parseFloat(window.getComputedStyle(this).marginLeft) || 0; }
    },
    offsetTop: {
      get: function() { return parseFloat(window.getComputedStyle(this).marginTop) || 0; }
    },
    offsetHeight: {
      get: function() { return parseFloat(window.getComputedStyle(this).height) || 0; }
    },
    offsetWidth: {
      get: function() { return parseFloat(window.getComputedStyle(this).width) || 0; }
    }
  })
}

function createMouseEvent(type: string, x: number, y: number): MouseEvent {
  let mouseEvent = document.createEvent("MouseEvents")
  mouseEvent.initMouseEvent(type, true, true, window, 1, 0, 0, x, y, false, false, false, false, 0, null)
  return mouseEvent
}

class Tester {
  public leftHandleValue: number
  public rightHandleValue: number

  constructor() {
    this.leftHandleValue = 0
    this.rightHandleValue = 0
  }

  public changeValues(leftHandleValue: number, rightHandleValue: number) {
    this.leftHandleValue = leftHandleValue
    this.rightHandleValue = rightHandleValue
  }
}

describe("sliderController", () => {
  it("should create sliderModel", () => {
    defineHTMLElementParameters()
    let root = document.createElement("div")
    let config = new SliderConfig({
      minValue: 0,
      maxValue: 100,
      leftHandleValue: 0
    })
    let sliderController = new SliderController(root, config)

    //setting up DOM properties
    let foundHandle = root.querySelector(`.${CLASSES.HANDLE}`) as HTMLElement
    foundHandle.style.width = "16px"
    foundHandle.style.height = "16px"
    root.style.width = "100px"
    root.style.height = "6px"
    root.style.marginLeft = "100px"

    //setting up the event
    let mouseDown = createMouseEvent("mousedown", 100, 100)
    let mouseUp = createMouseEvent("mouseup", 150, 50)
    let mouseMove = createMouseEvent("mousemove", 150, 50)

    //testing
    foundHandle.dispatchEvent(mouseDown)
    document.dispatchEvent(mouseMove)
    document.dispatchEvent(mouseUp)

    expect(foundHandle.style.left).to.equal("50%")
  })

  it("should create SliderView", () => {
    let root = document.createElement("div")
    let config = new SliderConfig()
    let sliderController = new SliderController(root, config)

    expect(root.querySelectorAll(`.${CLASSES.HANDLE}`).length).to.equal(1)
  })

  it("should add slide function to leftHandle and rightHandle subscribers", () => {
    let root = document.createElement("div")
    let config = new SliderConfig({
      isRange: true,
      minValue: 0,
      maxValue: 100,
      leftHandleValue: 0
    })
    let tester = new Tester()
    let sliderController = new SliderController(root, config, tester.changeValues.bind(tester))

    config.leftHandleValue.set(40)
    config.rightHandleValue.set(60)

    expect(tester.leftHandleValue).to.equal(40)
    expect(tester.rightHandleValue).to.equal(60)
  })
})