/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import { SliderView } from '../../../src/slider/view/sliderView';
import { SliderConfig } from '../../../src/slider/sliderConfig/sliderConfig';
import { SliderState } from '../../../src/slider/sliderState/sliderState';

const jsdom = require('jsdom');
const CLASSES: SliderClasses = require('../../../src/slider/sliderClasses.json');

const { JSDOM } = jsdom;
const html = "<!doctype html><html><head></head><body><div class='slider'></div></body></html>";
const dom = new JSDOM(html, { resources: 'usable', pretendToBeVisual: true });
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

describe('sliderView', () => {
  describe('constructor', () => {
    it('should add slider class to the root', () => {
      const root = document.createElement('div');
      const config = new SliderConfig();
      const state = new SliderState();
      const sliderView = new SliderView(root, config, state);

      expect(root.classList.contains(CLASSES.SLIDER)).to.equal(true);
    });

    it('should add slider vertical class to the root if isVertical == true', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig({
        isVertical: true,
      });
      const sliderView = new SliderView(root, config, state);

      expect(root.classList.contains(CLASSES.SLIDER_VERTICAL)).to.equal(true);
    });

    it('should add leftHandleView', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig();
      const sliderView = new SliderView(root, config, state);

      expect(root.querySelectorAll(`.${CLASSES.LEFT_HANDLE}`).length).to.equal(1);
    });

    it('should add rightHandleView', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig({
        isRange: true,
      });
      const sliderView = new SliderView(root, config, state);

      expect(root.querySelectorAll(`.${CLASSES.RIGHT_HANDLE}`).length).to.equal(1);
    });

    it('should add rangeLineView', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig({
        isRange: true,
      });
      const sliderView = new SliderView(root, config, state);

      expect(root.querySelectorAll(`.${CLASSES.RANGE_LINE}`).length).to.equal(1);
    });

    it('should add minValue limitView', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig();
      const sliderView = new SliderView(root, config, state);

      expect(root.querySelectorAll(`.${CLASSES.MIN_VALUE}`).length).to.equal(1);
    });

    it('should add maxValue limitView', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig();
      const sliderView = new SliderView(root, config, state);

      expect(root.querySelectorAll(`.${CLASSES.MAX_VALUE}`).length).to.equal(1);
    });

    it('should add defaultValueLabelView for each defaultValue', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ['first', 'second', 'third'],
      });
      const sliderView = new SliderView(root, config, state);

      expect(root.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(3);
    });
  });

  describe('defaultValue.set()', () => {
    it('should create new defaultValueLabelViews if needed', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ['first', 'second', 'third'],
      });
      const sliderView = new SliderView(root, config, state);

      config.defaultValues.set(['first', 'second', 'third', 'fourth']);

      expect(root.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(4);
    });

    it('should remove non used defaultValueLabelViews', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ['first', 'second', 'third'],
      });
      const sliderView = new SliderView(root, config, state);

      config.defaultValues.set(['first', 'second']);

      expect(root.querySelectorAll(`.${CLASSES.DEFAULT_VALUE}`).length).to.equal(2);
    });
  });

  describe('isVertical.set()', () => {
    it('should add sliderVertical class if given true', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig({
        isVertical: false,
      });
      const sliderView = new SliderView(root, config, state);

      config.isVertical.set(true);

      expect(root.classList.contains(CLASSES.SLIDER_VERTICAL)).to.equal(true);
    });

    it('should remove sliderVertical class if given false', () => {
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig({
        isVertical: true,
      });
      const sliderView = new SliderView(root, config, state);

      config.isVertical.set(false);

      expect(root.classList.contains(CLASSES.SLIDER_VERTICAL)).to.equal(false);
    });
  });

  describe('click', () => {
    it('should change leftHandlePosition to 0.5 if click is in the middle and isRange === false', () => {
      defineHTMLElementParameters();
      defineDOMRect();
      const root = document.createElement('div');
      const state = new SliderState();
      const config = new SliderConfig();
      const sliderView = new SliderView(root, config, state);

      // setting up DOM properties
      root.style.marginLeft = '100px';
      root.style.width = '100px';
      root.style.height = '100px';

      // setting up the event
      const mouseClick = createMouseEvent('click', 150, 50);

      root.dispatchEvent(mouseClick);

      expect(state.leftHandlePosition.get()).to.equal(0.5);
    });
  });
});
