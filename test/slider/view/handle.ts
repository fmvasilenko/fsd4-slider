/* eslint-disable no-new */
import { expect } from 'chai';
import { HandleView } from '../../../src/slider/view/HandleView';

const jsdom = require('jsdom');
const classes = require('../../../src/slider/slider.classes.json');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).window = dom.window;
(global as any).document = window.document;

enum HandleSide {Left, Right}

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

describe('handle', () => {
  describe('constructor', () => {
    it('should create a handle in the container', () => {
      const container = document.createElement('div');
      new HandleView(container, HandleSide.Left);

      expect(container.querySelectorAll(`.${classes.handle}`).length).to.equal(1);
    });
  });

  describe('switch', () => {
    it('should add and remove right handle', () => {
      const container = document.createElement('div');
      const handleView = new HandleView(container, HandleSide.Right);

      handleView.switch({ ...defaultConfig, ...{ isRange: true } });
      expect(container.querySelectorAll(`.${classes.rightHandle}`).length).to.equal(1);

      handleView.switch({ ...defaultConfig, ...{ isRange: false } });
      expect(container.querySelectorAll(`.${classes.rightHandle}`).length).to.equal(0);
    });
  });

  describe('switchLabel', () => {
    it('should add and remove value label', () => {
      const container = document.createElement('div');
      const handleView = new HandleView(container, HandleSide.Left);

      handleView.switchLabel({ ...defaultConfig, ...{ valueLabelDisplayed: false } });
      expect(container.querySelectorAll(`.${classes.valueLabel}`).length).to.equal(0);

      handleView.switchLabel({ ...defaultConfig, ...{ valueLabelDisplayed: true } });
      expect(container.querySelectorAll(`.${classes.valueLabel}`).length).to.equal(1);
    });
  });

  describe('switchVertical', () => {
    it('should add and remove vertical classes', () => {
      const container = document.createElement('div');
      const handleView = new HandleView(container, HandleSide.Left);

      (async () => {
        await handleView.switchVertical({ ...defaultConfig, ...{ isVertical: true } });

        expect(container.querySelectorAll(`.${classes.handleVertical}`).length).to.equal(1);
        expect(container.querySelectorAll(`.${classes.leftHandleLabelVertical}`).length).to.equal(1);
      })();

      handleView.switchVertical({ ...defaultConfig, ...{ isVertical: false } });
      expect(container.querySelectorAll(`.${classes.handleVertical}`).length).to.equal(0);
      expect(container.querySelectorAll(`.${classes.leftHandleLabelVertical}`).length).to.equal(0);
    });
  });

  describe('updateValue', () => {
    it('should change handlePosition accroding with handle value', () => {
      const container = document.createElement('div');
      const handleView = new HandleView(container, HandleSide.Left);

      handleView.updateValue({ ...defaultConfig, ...{ leftHandleValue: 30 } });

      const handle = container.querySelector(`.${classes.handle}`) as HTMLElement;
      expect(handle.style.left).to.equal('30%');
    });
  });
});
