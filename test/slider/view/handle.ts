/* eslint-disable no-new */
import { expect } from 'chai';
import { HandleType, HandleView } from '../../../src/slider/view/HandleView';
import classes from '../../../src/slider/slider.classes';
import { defaultConfig } from '../../utils/sliderDefaultConfig';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).window = dom.window;
(global as any).document = window.document;

describe('handle', () => {
  describe('constructor', () => {
    it('should create a handle in the container', () => {
      const container = document.createElement('div');
      new HandleView(container, HandleType.First);

      expect(container.querySelectorAll(`.${classes.handle}`).length).to.equal(1);
    });
  });

  describe('switch', () => {
    it('should add and remove second handle', () => {
      const container = document.createElement('div');
      const handleView = new HandleView(container, HandleType.Second);

      handleView.switchHandle({ ...defaultConfig, ...{ isRange: true } });
      expect(container.querySelectorAll(`.${classes.secondHandle}`).length).to.equal(1);

      handleView.switchHandle({ ...defaultConfig, ...{ isRange: false } });
      expect(container.querySelectorAll(`.${classes.secondHandle}`).length).to.equal(0);
    });
  });

  describe('switchLabel', () => {
    it('should add and remove value label', () => {
      const container = document.createElement('div');
      const handleView = new HandleView(container, HandleType.First);

      handleView.switchLabel({ ...defaultConfig, ...{ valueLabelDisplayed: false } });
      expect(container.querySelectorAll(`.${classes.valueLabel}`).length).to.equal(0);

      handleView.switchLabel({ ...defaultConfig, ...{ valueLabelDisplayed: true } });
      expect(container.querySelectorAll(`.${classes.valueLabel}`).length).to.equal(1);
    });
  });

  describe('switchVertical', () => {
    it('should add and remove vertical classes', () => {
      const container = document.createElement('div');
      const handleView = new HandleView(container, HandleType.First);

      (async () => {
        await handleView.switchVertical({ ...defaultConfig, ...{ isVertical: true } });

        expect(container.querySelectorAll(`.${classes.handleVertical}`).length).to.equal(1);
        expect(container.querySelectorAll(`.${classes.firstHandleLabelVertical}`).length).to.equal(1);
      })();

      handleView.switchVertical({ ...defaultConfig, ...{ isVertical: false } });
      expect(container.querySelectorAll(`.${classes.handleVertical}`).length).to.equal(0);
      expect(container.querySelectorAll(`.${classes.firstHandleLabelVertical}`).length).to.equal(0);
    });
  });

  describe('updateValue', () => {
    it('should change handlePosition accroding with handle value', () => {
      const container = document.createElement('div');
      const handleView = new HandleView(container, HandleType.First);

      handleView.updateValue({ ...defaultConfig, ...{ firstValue: 30 } });

      const handle = container.querySelector(`.${classes.handle}`) as HTMLElement;
      expect(handle.style.left).to.equal('30%');
    });
  });

  describe('subscribe', () => {
    it('should add subscriber to the subscribers list', () => {
      const container = document.createElement('div');
      const handleView = new HandleView(container, HandleType.First);
      const subscriber = () => {};

      handleView.subscribe(subscriber);
      // @ts-ignore
      expect(handleView.subscribers.subscribers.includes(subscriber)).to.equal(true);
    });
  });
});
