class SliderDefaultValue {
  ROOT: HTMLElement
  value: number | string

  constructor(value: number | string, className: string, position: number) {
    this.value = value
    this.ROOT = this.createRootElement(className)
    this.ROOT.appendChild(this.createLabel(className))
    this.setPosition(position)
  }

  createRootElement(className: string): HTMLElement {
    let root = document.createElement("div")
    root.classList.add(className)
    return root
  }

  createLabel(className: string): HTMLElement {
    let label = document.createElement("div")
    label.classList.add(`${className}-label`)
    label.innerHTML = `${this.value}`
    return label
  }

  setPosition(position: number) {
    this.ROOT.style.left = `${position}%`
  }
}

export { SliderDefaultValue }