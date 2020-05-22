export default class SliderModel {
  $ROOT: JQuery
  sliderStartPosition: number
  sliderLength: number
  state: {
    firstHandlePosition: number,
    secondHandlePosition: number
  }

  constructor(root: JQuery, config?: SliderConfig) {
    this.$ROOT = root
    this.sliderStartPosition = this.$ROOT.position().left
    this.sliderLength = (this.$ROOT.width() !== undefined) ? this.$ROOT.width() as number : 1
    this.state = {
      firstHandlePosition: 20,
      secondHandlePosition: 80
    }
  }

  getPosition(event: JQuery.MouseMoveEvent): number {
    let startCursorX = event.clientX

    if (startCursorX < this.sliderStartPosition) return 0
    else if (startCursorX > this.sliderStartPosition + this.sliderLength) return 100
    else {
      return 100 * (startCursorX - this.sliderStartPosition) / this.sliderLength
    }
  }

  getFirstHandlePosition(event: JQuery.MouseMoveEvent): number {
    let startCursorX = event.clientX

    if (startCursorX < this.sliderStartPosition) return 0
    else if (startCursorX >  this.calculateSecondHandlePosition()) return this.calculateSecondHandlePosition()
    else {
      return 100 * (startCursorX - this.sliderStartPosition) / this.sliderLength
    }
  }

  calculateSecondHandlePosition(): number {
    return this.sliderStartPosition + this.state.secondHandlePosition * this.sliderLength /100
  }
}