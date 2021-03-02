import autobind from 'autobind-decorator';
import { Model } from './model/Model';
import { ModelAPI } from './model/ModelAPI';
import { ModelMemoryCell } from './model/ModelMemoryCell';
import { Presenter } from './presenter/Presenter';
import { View } from './view/View';

class Facade {
  private model: Model;

  private modelAPI: ModelAPI;

  private view: View;

  private presenter: Presenter;

  constructor(container: HTMLElement, config?: Config) {
    this.model = new Model(config);
    this.modelAPI = new ModelAPI(this.model);
    this.view = new View(container);
    this.presenter = new Presenter(this.modelAPI, this.view);
  }

  @autobind
  public subscribe(option: ModelOption, subscriber: (value: number | boolean) => void) {
    this.model[option].addSubscriber(subscriber);
  }

  @autobind
  public unsubscribe(option: ModelOption, subscriber: (value: number | boolean) => void) {
    this.model[option].removeSubscriber(subscriber);
  }

  @autobind
  public set(option: ModelOption, value: State[typeof option]) {
    (this.model[option] as ModelMemoryCell<typeof value>).set(value);
  }

  @autobind
  public get(option: ModelOption): State[typeof option] {
    return this.model[option].get();
  }
}

export default Facade;
