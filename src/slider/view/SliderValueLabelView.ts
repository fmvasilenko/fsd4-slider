import { SliderConfig } from '../sliderConfig/SliderConfig';

enum Side { Left, Right }

class SliderValueLabelView {
  private CLASSES: SliderClasses;

  private CONTAINER: HTMLElement;

  private config: SliderConfig;

  private SIDE: Side;

  private ROOT: HTMLElement;

  constructor(container: HTMLElement, config: SliderConfig, side: Side) {
    this.CLASSES = require('../sliderClasses.json');
    this.CONTAINER = container;
    this.config = config;
    this.SIDE = side;
    this.ROOT = this.createRoot();

    this.switchVertical();
    this.switch();

    this.config.isVertical.addSubscriber(this.switchVertical.bind(this));
    this.config.valueLabelDisplayed.addSubscriber(this.switch.bind(this));

    if (this.SIDE === Side.Left) {
      this.updateValue(this.config.leftHandleValue.get() as number);
      this.config.leftHandleValue.addSubscriber(this.updateValue.bind(this));
    } else {
      this.updateValue(this.config.rightHandleValue.get() as number);
      this.config.rightHandleValue.addSubscriber(this.updateValue.bind(this));
    }
  }

  private createRoot(): HTMLElement {
    const root = document.createElement('div');
    root.classList.add(this.CLASSES.VALUE_LABEL);

    if (this.SIDE === Side.Right) root.classList.add(this.CLASSES.RIGHT_HANDLE_LABEL);
    else root.classList.add(this.CLASSES.LEFT_HANDLE_LABEL);

    return root;
  }

  private updateValue(value: number) {
    if (this.config.hasDefaultValues.get() === true) {
      const defaultValues = this.config.defaultValues.get() as number[] | string[];
      this.ROOT.innerHTML = `${defaultValues[value]}`;
    } else this.ROOT.innerHTML = `${value}`;
  }

  private switchVertical() {
    if (this.config.isVertical.get() === true) {
      if (this.SIDE === Side.Left) this.ROOT.classList.add(this.CLASSES.LEFT_HANDLE_LABEL_VERTICAL);
      else this.ROOT.classList.add(this.CLASSES.RIGHT_HANDLE_LABEL_VERTICAL);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (this.SIDE === Side.Left) this.ROOT.classList.remove(this.CLASSES.LEFT_HANDLE_LABEL_VERTICAL);
      else this.ROOT.classList.remove(this.CLASSES.RIGHT_HANDLE_LABEL_VERTICAL);
    }
  }

  private switch() {
    if (this.config.valueLabelDisplayed.get() === true) this.CONTAINER.appendChild(this.ROOT);
    else this.ROOT.remove();
  }
}

export { SliderValueLabelView };
