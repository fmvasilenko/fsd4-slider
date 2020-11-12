/* eslint-disable no-new */
import { expect } from 'chai';
import { ScaleValueView } from '../../../src/slider/view/ScaleValueView';

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
  pointsNumber: 5,
  leftHandleValue: 20,
  rightHandleValue: 80,
};

describe('scaleValue', () => {
  describe('constructor', () => {
    it('should create a scale value label', () => {
      const container = document.createElement('div');
      new ScaleValueView(container, defaultConfig, 3, 5);

      expect(container.querySelectorAll(`.${classes.scaleValue}`).length).to.equal(1);
      expect(container.querySelectorAll(`.${classes.scaleValueLabel}`).length).to.equal(1);
    });

    it('should set shift and shown value accroding with given state', () => {
      const container = document.createElement('div');
      new ScaleValueView(container, defaultConfig, 2, 5);

      const scaleValue = container.querySelector(`.${classes.scaleValue}`) as HTMLElement;
      const scaleValueLabel = container.querySelector(`.${classes.scaleValueLabel}`) as HTMLElement;
      expect(scaleValue.style.left).to.equal('50%');
      expect(scaleValueLabel.innerHTML).to.equal('50');
    });
  });

  describe('switch', () => {
    it('should add and remove scale value label', () => {
      const container = document.createElement('div');
      const scaleValueView = new ScaleValueView(container, defaultConfig, 3, 5);

      scaleValueView.switch({ ...defaultConfig, ...{ scaleDisplayed: false } });
      expect(container.querySelectorAll(`.${classes.scaleValue}`).length).to.equal(0);

      scaleValueView.switch({ ...defaultConfig, ...{ scaleDisplayed: true } });
      expect(container.querySelectorAll(`.${classes.scaleValue}`).length).to.equal(1);
    });
  });

  describe('switchVertical', () => {
    it('should switch vertical class', () => {
      const container = document.createElement('div');
      const scaleValueView = new ScaleValueView(container, defaultConfig, 3, 5);

      scaleValueView.switchVertical({ ...defaultConfig, ...{ isVertical: true } });
      expect(container.querySelectorAll(`.${classes.scaleValueVertical}`).length).to.equal(1);
      expect(container.querySelectorAll(`.${classes.scaleValueLabelVertical}`).length).to.equal(1);

      scaleValueView.switchVertical({ ...defaultConfig, ...{ isVertical: false } });
      expect(container.querySelectorAll(`.${classes.scaleValueVertical}`).length).to.equal(0);
      expect(container.querySelectorAll(`.${classes.scaleValueLabelVertical}`).length).to.equal(0);
    });
  });
});
