import { expect } from 'chai';
import { SliderConfigItem } from '../../../src/slider/sliderConfig/sliderConfigItem';

class Subscriber {
  public value: number;

  constructor(value: number) {
    this.value = value;
  }

  public update(value: number) {
    this.value = value;
  }
}

describe('SliderConfigItem', () => {
  describe('getValue', () => {
    it('should return value', () => {
      const configItem = new SliderConfigItem(20);
      expect(configItem.get()).to.equal(20);
    });
  });

  describe('setValue', () => {
    it('should set value', () => {
      const configItem = new SliderConfigItem(20);
      configItem.set(40);
      expect(configItem.get()).to.equal(40);
    });

    it('should check value with checkValue function', () => {
      const configItem = new SliderConfigItem(20, (value: number) => (value < 50 ? value : 50));
      configItem.set(100);

      expect(configItem.get()).to.equal(50);
    });

    it('should transmit the value to the subscribers', () => {
      const configItem = new SliderConfigItem(20);
      const subscriber = new Subscriber(100);

      configItem.addSubscriber(subscriber.update.bind(subscriber));

      configItem.set(50);
      expect(subscriber.value).to.equal(50);
    });
  });

  describe('addSubscriber', () => {
    it('should add new subscriber to the subscribers list', () => {
      const configItem = new SliderConfigItem(20);
      const subscriber = new Subscriber(100);

      configItem.addSubscriber(subscriber.update.bind(subscriber));

      configItem.set(50);
      expect(subscriber.value).to.equal(50);
    });
  });

  describe('removeSubscriber', () => {
    it('should remove a subscriber from the subscribers list', () => {
      const configItem = new SliderConfigItem(20);
      const subscriber = new Subscriber(100);
      const func = subscriber.update.bind(subscriber);
      configItem.addSubscriber(func);

      configItem.removeSubscriber(func);

      configItem.set(50);
      expect(subscriber.value).to.equal(100);
    });
  });
});
