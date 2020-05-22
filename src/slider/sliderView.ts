export default class SliderView {
  $ROOT: JQuery
  CLASSES: {
    HANDLE: string
  }
  DOM: {
    $FIRST_HANDLE: JQuery,
    $SECOND_HANDLE: JQuery
  }
  state: {
    firstHandlePosition: number,
    secondHandlePosition: number
  }
  config: SliderConfig

  constructor(root: JQuery, config: SliderConfig) {
    this.$ROOT = root
    this.config = config
    this.CLASSES = {
      HANDLE: "slider__handle"
    }
    this.DOM = {
      $FIRST_HANDLE: $("<div>", {class: this.CLASSES.HANDLE}),
      $SECOND_HANDLE: $("<div>", {class: this.CLASSES.HANDLE})
    }
    this.state = {
      firstHandlePosition: 20,
      secondHandlePosition: 80
    }
    this.initialRender()
  }

  initialRender() {
    this.$ROOT.append(this.DOM.$FIRST_HANDLE)
    if (this.config.twoHandles) this.$ROOT.append(this.DOM.$SECOND_HANDLE)
    this.render()
 }

  render() {
    this.DOM.$FIRST_HANDLE.css({"left": `${this.state.firstHandlePosition}%`})
    if (this.config.twoHandles) this.DOM.$SECOND_HANDLE.css({"left": `${this.state.secondHandlePosition}%`})
  }
}