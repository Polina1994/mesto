export class Section {
    constructor(renderer , containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    renderSection = (items) => {
      items.renderSection = items
      items.forEach(item => 
        this._renderer(item))
    }
  
    addItem = (element) => {
      this._container.prepend(element);
    }
  
  }