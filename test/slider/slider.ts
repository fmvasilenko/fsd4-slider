import {expect} from "chai"

const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>");
(global as any).window = dom.window;
(global as any).document = window.document;
(global as any).$ = require('jquery')

import "../../src/slider/slider"

const CLASSES: SliderClasses = require("../../src/slider/sliderClasses.json")

describe("slider", () => {
  it("should create slider", () => {
    let root = document.createElement("div")
    let slider = $(root).slider()

    expect(root.classList.contains(CLASSES.SLIDER)).to.equal(true)
  })

  describe("config.isRange()", () => {
    it("should return isRange value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        isRange: true
      })

      expect(slider.config.isRange()).to.equal(true)
    })

    it("should change isRange value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        isRange: false
      })

      expect(slider.config.isRange(true)).to.equal(true)
    })
  })

  describe("config.hasDefaultValues()", () => {
    it("should return hasDefaultValues value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        hasDefaultValues: true
      })

      expect(slider.config.hasDefaultValues()).to.equal(true)
    })

    it("should change hasDefaultValues value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        hasDefaultValues: false
      })

      expect(slider.config.hasDefaultValues(true)).to.equal(true)
    })
  })

  describe("config.isVertical()", () => {
    it("should return isVertical value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        isVertical: true
      })

      expect(slider.config.isVertical()).to.equal(true)
    })

    it("should change isVertical value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        isVertical: false
      })

      expect(slider.config.isVertical(true)).to.equal(true)
    })
  })

  describe("config.valueLabelDisplayed()", () => {
    it("should return valueLabelDisplayed value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        valueLabelDisplayed: true
      })

      expect(slider.config.valueLabelDisplayed()).to.equal(true)
    })

    it("should change valueLabelDisplayed value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        valueLabelDisplayed: false
      })

      expect(slider.config.valueLabelDisplayed(true)).to.equal(true)
    })
  })

  describe("config.limitsDisplayed()", () => {
    it("should return limitsDisplayed value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        limitsDisplayed: true
      })

      expect(slider.config.limitsDisplayed()).to.equal(true)
    })

    it("should change limitsDisplayed value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        limitsDisplayed: false
      })

      expect(slider.config.limitsDisplayed(true)).to.equal(true)
    })
  })

  describe("config.minValue()", () => {
    it("should return minValue value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        minValue: 0
      })

      expect(slider.config.minValue()).to.equal(0)
    })

    it("should change minValue value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        minValue: 0
      })

      expect(slider.config.minValue(10)).to.equal(10)
    })
  })

  describe("config.maxValue()", () => {
    it("should return maxValue value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        maxValue: 100
      })

      expect(slider.config.maxValue()).to.equal(100)
    })

    it("should change maxValue value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        maxValue: 100
      })

      expect(slider.config.maxValue(120)).to.equal(120)
    })
  })

  describe("config.step()", () => {
    it("should return step value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        step: 1
      })

      expect(slider.config.step()).to.equal(1)
    })

    it("should change step value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        step: 1
      })

      expect(slider.config.step(10)).to.equal(10)
    })
  })

  describe("config.leftHandleValue()", () => {
    it("should return leftHandleValue value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        leftHandleValue: 50
      })

      expect(slider.config.leftHandleValue()).to.equal(50)
    })

    it("should change leftHandleValue value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        leftHandleValue: 50
      })

      expect(slider.config.leftHandleValue(40)).to.equal(40)
    })
  })

  describe("config.rightHandleValue()", () => {
    it("should return rightHandleValue value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        isRange: true,
        rightHandleValue: 50
      })

      expect(slider.config.rightHandleValue()).to.equal(50)
    })

    it("should change rightHandleValue value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        isRange: true,
        rightHandleValue: 50
      })

      expect(slider.config.rightHandleValue(60)).to.equal(60)
    })
  })

  describe("config.defaultValues()", () => {
    it("should return defaultValues value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        defaultValues: ["first", "second", "third"]
      })

      expect(slider.config.defaultValues()[0]).to.equal("first")
      expect(slider.config.defaultValues()[1]).to.equal("second")
      expect(slider.config.defaultValues()[2]).to.equal("third")
      expect(slider.config.defaultValues().length).to.equal(3)
    })

    it("should change defaultValues value", () => {
      let root = document.createElement("div")
      let slider = $(root).slider({
        defaultValues: ["first", "second", "third"]
      })

      slider.config.defaultValues(["first", "second", "third", "fourth"])

      expect(slider.config.defaultValues()[0]).to.equal("first")
      expect(slider.config.defaultValues()[1]).to.equal("second")
      expect(slider.config.defaultValues()[2]).to.equal("third")
      expect(slider.config.defaultValues()[3]).to.equal("fourth")
      expect(slider.config.defaultValues().length).to.equal(4)
    })
  })
})