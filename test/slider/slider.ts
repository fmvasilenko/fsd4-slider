const jsdom = require("jsdom");
const { JSDOM } = jsdom;
//const dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>");
//(global as any).window = dom.window;
//(global as any).document = window.document;
//const $ = (global as any).$ = require("jquery");

import {Slider} from "../../src/slider/slider"
import {expect} from "chai"

describe("slider", () => {
  /*it("should have $root right after the initialisation", () => {
    //Arrange
    let rootComponent: JQuery = $("<div>")
    //Act
    let slider = new Slider(rootComponent)
    //Assert
    expect(slider.$ROOT.length).to.equal(1)
  })*/

  it("should create fisrt handle", () => {
    //Arrange
    let dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>");
    (global as any).window = dom.window;
    (global as any).document = window.document;
    let $ = (global as any).$ = require("jquery");
    let rootComponent: JQuery = $(document).find(".slider")
    //Act
    let slider = new Slider(rootComponent)
    //Assert
    expect($(".slider__handle").length).to.equal(1)
  })

  /*it("should create second handle if defined in config", () => {
    //Arrange
    let rootComponent: JQuery = $(".slider")
    //Act
    let slider = new Slider(rootComponent, {twoHandles: true})
    //Assert
    expect($(".slider__handle").length).to.equal(2)
  })*/

  it("should create one handle by default", () => {
    //Arrange
    let dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>");
    (global as any).window = dom.window;
    (global as any).document = window.document;
    let $ = (global as any).$ = require("jquery");
    let rootComponent: JQuery = $(document).find(".slider")
    //Act
    let slider = new Slider(rootComponent)
    //Assert
    expect($(".slider__handle").length).to.equal(1)
  })
})