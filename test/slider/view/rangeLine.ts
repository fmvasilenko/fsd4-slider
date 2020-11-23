import { expect } from 'chai';
import { RangeLineView } from '../../../src/slider/view/RangeLineView';

const jsdom = require('jsdom');
const classes = require('../../../src/slider/slider.classes.json');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).window = dom.window;
(global as any).document = window.document;

const defaultConfig = {
  isRange: true,
  isVertical: false,
  scaleDisplayed: true,
  valueLabelDisplayed: true,
  minValue: 0,
  maxValue: 100,
  step: 1,
  leftHandleValue: 20,
  rightHandleValue: 80,
};

describe('rangeLineView', () => {
  describe('constructor', () => {
    it('should create range line', () => {
      const container = document.createElement('div');
      const rangeLineView = new RangeLineView(container);
      rangeLineView.render(defaultConfig);

      expect(container.querySelectorAll(`.${classes.rangeLine}`).length).to.equal(1);
    });
  });

  describe('render', () => {
    it('should set range line from 0 to leftHandle if isRange = false', () => {
      const container = document.createElement('div');
      const rangeLineView = new RangeLineView(container);
      rangeLineView.render({ ...defaultConfig, ...{ isRange: false } });

      const rangeLine = container.querySelector(`.${classes.rangeLine}`) as HTMLElement;
      expect(rangeLine.style.left).to.equal('0%');
      expect(rangeLine.style.right).to.equal('80%');
    });

    it('should set range line from leftHandle to rightHandle if isRange = true', () => {
      const container = document.createElement('div');
      const rangeLineView = new RangeLineView(container);
      rangeLineView.render({ ...defaultConfig, ...{ isRange: true } });

      const rangeLine = container.querySelector(`.${classes.rangeLine}`) as HTMLElement;
      expect(rangeLine.style.left).to.equal('20%');
      expect(rangeLine.style.right).to.equal('20%');
    });

    it('should render vertical line if isVertical == true', () => {
      const container = document.createElement('div');
      const rangeLineView = new RangeLineView(container);
      rangeLineView.render({ ...defaultConfig, ...{ isRange: true, isVertical: true } });

      const rangeLine = container.querySelector(`.${classes.rangeLine}`) as HTMLElement;
      expect(rangeLine.style.top).to.equal('20%');
      expect(rangeLine.style.bottom).to.equal('20%');

      rangeLineView.render({ ...defaultConfig, ...{ isRange: false, isVertical: true } });

      expect(rangeLine.style.top).to.equal('80%');
      expect(rangeLine.style.bottom).to.equal('0%');
    });
  });

  describe('switchVertical', () => {
    it('should add vertical class to root if isVertical == true', () => {
      const container = document.createElement('div');
      const rangeLineView = new RangeLineView(container);
      rangeLineView.render(defaultConfig);

      rangeLineView.switchVertical({ ...defaultConfig, ...{ isVertical: true } });

      expect(container.querySelectorAll(`.${classes.rangeLineVertical}`).length).to.equal(1);
    });

    it('should remove vertical class to root if isVertical == false', () => {
      const container = document.createElement('div');
      const rangeLineView = new RangeLineView(container);
      rangeLineView.render({ ...defaultConfig, ...{ isVertical: true } });

      rangeLineView.switchVertical({ ...defaultConfig, ...{ isVertical: false } });

      expect(container.querySelectorAll(`.${classes.rangeLineVertical}`).length).to.equal(0);
    });
  });
});
