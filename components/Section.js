export class Section {
    constructor({data, renderer}, containerSelector) {
      this._itemsList = data
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }

    renderSection() {
      this._itemsList.forEach(item => 
        this._renderer(item))
    }
  
    addItem(item) {
      this._container.prepend(item);
    }
}
  