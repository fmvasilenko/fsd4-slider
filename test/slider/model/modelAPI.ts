/// <reference path='../../../src/slider/slider.d.ts' />
import { expect } from 'chai';
import { Model } from '../../../src/slider/model/Model';
import { ModelAPI } from '../../../src/slider/model/ModelAPI';
import { defaultConfig } from '../../utils/sliderDefaultConfig';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).window = dom.window;
(global as any).document = window.document;

describe('ModelAPI', () => {
  describe('calculateFirstValue', () => {
    it('should calculate first handle value depending on it`s position', () => {
      const model = new Model(defaultConfig);
      const modelAPI = new ModelAPI(model);

      modelAPI.calculateFirstValue(0);
      expect(model.getCurrentState().firstValue).to.equal(0);
    });
  });

  describe('calculateSecondValue', () => {
    it('should calculate second handle value depending on it`s position', () => {
      const model = new Model({ ...defaultConfig, isRange: true, max: 100 });
      const modelAPI = new ModelAPI(model);

      modelAPI.calculateSecondValue(1);
      expect(model.getCurrentState().secondValue).to.equal(100);
    });
  });

  describe('calculateAndChooseHandle', () => {
    it('should change first handle value if it`s closer to given position', () => {
      const model = new Model({ ...defaultConfig, isRange: true });
      const modelAPI = new ModelAPI(model);

      modelAPI.calculateAndChooseHandle(0.3);
      expect(model.getCurrentState().firstValue).to.equal(30);
    });

    it('should change second handle value if it`s closer to given position', () => {
      const model = new Model({ ...defaultConfig, isRange: true });
      const modelAPI = new ModelAPI(model);

      modelAPI.calculateAndChooseHandle(0.7);
      expect(model.getCurrentState().secondValue).to.equal(70);
    });
  });

  describe('subscribe', () => {
    it('should add subscriber to model option subscribers list', () => {
      const model = new Model();
      const modelAPI = new ModelAPI(model);
      const subscriber = () => {};

      modelAPI.subscribe('firstValue', subscriber);
      // @ts-ignore
      expect(model.firstValue.subscribers.subscribers.includes(subscriber)).to.equal(true);
    });
  });

  describe('unsubscribe', () => {
    it('should remove subscriber from model option subscribers list', () => {
      const model = new Model();
      const modelAPI = new ModelAPI(model);
      const subscriber = () => {};

      modelAPI.subscribe('firstValue', subscriber);
      modelAPI.unsubscribe('firstValue', subscriber);
      // @ts-ignore
      expect(model.firstValue.subscribers.subscribers.includes(subscriber)).to.equal(false);
    });
  });
});
