import "./rangeSlider.css";

const defaultOptions = {
  /**
   * the render host
   */
  host: document.body,

  className: "",

  total: 100,
  current: 0,
  draggerWidth: 12,
  barHeight: 4
};

export default class RangeSlider {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.init();
  }

  init() {
    this.render();
  }

  createContainer() {
    const container = document.createElement("div");
    container.className = "range-slider";
    container.style.height = `${this.options.barHeight}px`;
    container.onclick = event => {
      console.log("progress bar clicked", event.pageX);
    };
    return container;
  }

  createBar() {
    const bar = document.createElement("span");
    bar.style.height = `${this.options.barHeight}px`;
    bar.style.paddingLeft = `${this.options.draggerWidth / 2}px`;
    bar.style.paddingRight = `${this.options.draggerWidth / 2}px`;
    bar.className = "progress-bar";
    return bar;
  }

  createDragger() {
    const dragger = document.createElement("span");
    dragger.style.width = `${this.options.draggerWidth}px`;
    dragger.style.top = `-${(this.options.draggerWidth -
      this.options.barHeight) /
      2}px`;
    // dragger.style.right = `-${DRAGGER_WITH / 2}px`;
    dragger.className = "progress-dragger";
    return dragger;
  }

  createSlider() {
    const container = this.createContainer();
    const bar = this.createBar();
    const dragger = this.createDragger();
    bar.appendChild(dragger);
    container.appendChild(bar);

    let isMoving = false;

    var move = event => {
      if (isMoving) {
        let min = 0,
          max = container.offsetWidth - dragger.offsetWidth,
          mousePos =
            event.pageX - container.offsetLeft - dragger.offsetWidth / 2,
          position = mousePos > max ? max : mousePos < min ? min : mousePos;
        let value = (position / max) * 100;
        dragger.style.left = `${position}px`;
        bar.style.width = `${value}%`;
        console.warn(value);
        this.setCurrent(value);
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

  render() {
    const { host } = this.options;
    const slider = this.createSlider();
    host.innerHTML = "";
    host.appendChild(slider);
  }

  destroy() {
    //
  }

  getCurrent() {
    return this.options.current;
  }

  setCurrent(value) {
    this.options.current = value;
  }
}
