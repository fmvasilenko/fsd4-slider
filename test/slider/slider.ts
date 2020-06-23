import {expect} from "chai"
(global as any).$ = require('jquery')
import "../../src/slider/slider"

const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>");
(global as any).window = dom.window;
(global as any).document = window.document;


describe("slider", () => {
  /*describe("config.isRange()", () => {
    it("should return isRange value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider()
    })

    it("should change isRange value")
  })*/

  describe("config.hasDefaultValues()", () => {
    it("should return hasDefaultValues value")

    it("should change hasDefaultValues value")
  })

  describe("config.isVertical()", () => {
    it("should return isVertical value")

    it("should change isVertical value")
  })

  describe("config.valueLabelDisplayed()", () => {
    it("should return valueLabelDisplayed value")

    it("should change valueLabelDisplayed value")
  })

  describe("config.limitsDisplayed()", () => {
    it("should return limitsDisplayed value")

    it("should change limitsDisplayed value")
  })

  describe("config.minValue()", () => {
    it("should return minValue value")

    it("should change minValue value")
  })

  describe("config.maxValue()", () => {
    it("should return maxValue value")

    it("should change maxValue value")
  })

  describe("config.step()", () => {
    it("should return step value")

    it("should change step value")
  })

  describe("config.leftHandleValue()", () => {
    it("should return leftHandleValue value")

    it("should change leftHandleValue value")
  })

  describe("config.rightHandleValue()", () => {
    it("should return rightHandleValue value")

    it("should change rightHandleValue value")
  })

  describe("config.defaultValues()", () => {
    it("should return defaultValues value")

    it("should change defaultValues value")
  })
})