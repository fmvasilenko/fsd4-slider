/// <reference path='../../../src/slider/slider.d.ts' />
import { expect } from 'chai';
import Facade from '../../../src/slider/Facade';
import { defaultConfig } from '../../utils/sliderDefaultConfig';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).window = dom.window;
(global as any).document = window.document;

describe('Facade', () => {
  describe('subscribe', () => {
    it('should add model option subscriber', () => {
      const container = document.createElement('div');
      const facade = new Facade(container);
      const subscriber = () => {};

      facade.subscribe('firstValue', subscriber);
      // @ts-ignore
      expect(facade.model.firstValue.subscribers.subscribers.includes(subscriber)).to.equal(true);
    });
  });

  describe('unsubscribe', () => {
    it('should remove model option subscriber', () => {
      const container = document.createElement('div');
      const facade = new Facade(container);
      const subscriber = () => {};

      facade.subscribe('firstValue', subscriber);
      facade.unsubscribe('firstValue', subscriber);
      // @ts-ignore
      expect(facade.model.firstValue.subscribers.subscribers.includes(subscriber)).to.equal(false);
    });
  });

  describe('set/get', () => {
    it('should set and return the slider state', () => {
      const container = document.createElement('div');
      const facade = new Facade(container, defaultConfig);

      facade.set('firstValue', 10);
      expect(facade.get('firstValue')).to.equal(10);
    });
  });
});
