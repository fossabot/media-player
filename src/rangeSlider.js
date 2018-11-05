// reference: https://stackoverflow.com/a/33006528/1553656

import "./rangeSlider.css";

const defaultOptions = {
  /**
   * the render host
   */
  host: document.body,

  className: "",

  total: 100,
  value: 0,
  draggerSize: 12,
  barHeight: 4,
  onChange: null,

  // todo
  min: 0,
  max: 100
};

export default class RangeSlider {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
    this._init();
  }

  _init() {
    this._render();
  }

  _createContainer() {
    const container = document.createElement("div");
    container.className = `range-slider ${this.options.className}`;
    container.style.height = `${this.options.barHeight}px`;
    return container;
  }

  _createBar() {
    const bar = document.createElement("span");
    bar.style.height = `${this.options.barHeight}px`;
    bar.style.paddingLeft = `${this.options.draggerSize / 2}px`;
    bar.style.paddingRight = `${this.options.draggerSize / 2}px`;
    bar.className = "progress-bar";
    return bar;
  }

  _createDragger() {
    const dragger = document.createElement("span");
    dragger.style.width = `${this.options.draggerSize}px`;
    dragger.style.height = `${this.options.draggerSize}px`;
    dragger.style.top = `-${(this.options.draggerSize -
      this.options.barHeight) /
      2}px`;
    dragger.className = "progress-dragger";
    return dragger;
  }

  calculateValue(percentage) {
    return Math.round(
      (this.options.max - this.options.min) * (percentage / 100)
    );
  }

  _createSlider() {
    const container = this._createContainer();
    const bar = this._createBar();
    const dragger = this._createDragger();
    bar.appendChild(dragger);
    container.appendChild(bar);

    let isMoving = false;

    const move = event => {
      if (isMoving) {
        let min = 0,
          max = container.offsetWidth - dragger.offsetWidth,
          mousePos =
            event.pageX - container.offsetLeft - dragger.offsetWidth / 2,
          position = mousePos > max ? max : mousePos < min ? min : mousePos;
        dragger.style.left = `${position}px`;
        let value = (position / max) * 100;
        bar.style.width = `${value}%`;

        value = this.calculateValue(value);
        console.warn(value);
        this.setValue(value);
      }
    };

    container.addEventListener("mousedown", function(event) {
      isMoving = true;
      move(event);
    });

    document.addEventListener("mouseup", function(event) {
      isMoving = false;
    });

    document.addEventListener("mousemove", function(event) {
      move(event);
    });

    return container;
  }

  _render() {
    const { host } = this.options;
    const slider = this._createSlider();
    host.innerHTML = "";
    host.appendChild(slider);
  }

  destroy() {
    //
  }

  getValue() {
    return this.options.value;
  }

  setValue(value) {
    this.options.value = value;
    if (this.options.onChange) {
      this.options.onChange(value);
    }
  }
}
