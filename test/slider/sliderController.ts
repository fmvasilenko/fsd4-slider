/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import { SliderController } from '../../src/slider/sliderController';
import { SliderConfig } from '../../src/slider/sliderConfig/sliderConfig';

const jsdom = require('jsdom');
const CLASSES: SliderClasses = require('../../src/slider/sliderClasses.json');

const { JSDOM } = jsdom;
const dom = new JSDOM("<!doctype html><html><body><div class='slider'></div></body></html>", { pretendToBeVisual: true });
(global as any).window = dom.window;
(global as any).document = window.document;

function defineHTMLElementParameters() {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetLeft: {
      get() {
        return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
      },
    },
    offsetTop: {
      get() {
        return parseFloat(window.getComputedStyle(this).marginTop) || 0;
      },
    },
    offsetHeight: {
      get() {
        return parseFloat(window.getComputedStyle(this).height) || 0;
      },
    },
    offsetWidth: {
      get() {
        return parseFloat(window.getComputedStyle(this).width) || 0;
      },
    },
  });
}

function defineDOMRect() {
  // eslint-disable-next-line func-names
  window.HTMLElement.prototype.getBoundingClientRect = function () {
    const rect: DOMRect = {
      width: parseFloat(window.getComputedStyle(this).width),
      height: parseFloat(window.getComputedStyle(this).height),
      x: 0,
      y: 0,
      top: parseFloat(window.getComputedStyle(this).marginTop),
      bottom: 0,
      left: parseFloat(window.getComputedStyle(this).marginLeft),
      right: 0,
      toJSON: () => {},
    };

    return rect;
  };
}

function createMouseEvent(type: string, x: number, y: number): MouseEvent {
  const mouseEvent = document.createEvent('MouseEvents');
  mouseEvent.initMouseEvent(type, true, true, window, 1, 0, 0, x, y, false, false, false, false, 0, null);
  return mouseEvent;
}

class Tester {
  public leftHandleValue: number;

  public rightHandleValue: number;

  constructor() {
    this.leftHandleValue = 0;
    this.rightHandleValue = 0;
  }

  public changeValues(leftHandleValue: number, rightHandleValue: number) {
    this.leftHandleValue = leftHandleValue;
    this.rightHandleValue = rightHandleValue;
  }
}

describe('sliderController', () => {
  it('should create sliderModel', () => {
    defineHTMLElementParameters();
    defineDOMRect();
    const root = document.createElement('div');
    const config = new SliderConfig({
      minValue: 0,
      maxValue: 100,
      leftHandleValue: 0,
    });
    const sliderController = new SliderController(root, config);

    // setting up DOM properties
    const foundHandle = root.querySelector(`.${CLASSES.HANDLE}`) as HTMLElement;
    foundHandle.style.width = '16px';
    foundHandle.style.height = '16px';
    root.style.width = '100px';
    root.style.height = '6px';
    root.style.marginLeft = '100px';

    // setting up the event
    const mouseDown = createMouseEvent('mousedown', 100, 100);
    const mouseUp = createMouseEvent('mouseup', 150, 50);
    const mouseMove = createMouseEvent('mousemove', 150, 50);

    // testing
    foundHandle.dispatchEvent(mouseDown);
    document.dispatchEvent(mouseMove);
    document.dispatchEvent(mouseUp);

    expect(foundHandle.style.left).to.equal('50%');
  });

  it('should create SliderView', () => {
    const root = document.createElement('div');
    const config = new SliderConfig();
    const sliderController = new SliderController(root, config);

    expect(root.querySelectorAll(`.${CLASSES.HANDLE}`).length).to.equal(1);
  });

  it('should add slide function to leftHandle and rightHandle subscribers', () => {
    const root = document.createElement('div');
    const config = new SliderConfig({
      isRange: true,
      minValue: 0,
      maxValue: 100,
      leftHandleValue: 0,
    });
    const tester = new Tester();
    const sliderController = new SliderController(root, config, tester.changeValues.bind(tester));

    config.leftHandleValue.set(40);
    config.rightHandleValue.set(60);

    expect(tester.leftHandleValue).to.equal(40);
    expect(tester.rightHandleValue).to.equal(60);
  });
});
