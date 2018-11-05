import "./rangeSlider.css";

const defaultOptions = {
  /**
   * the render host
   */
  host: document.body,

  className: "",

  total: 100,
  current: 0
};

export default class RangeSlider {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.current = this.options.current;
    this.init();
  }

  init() {
    this.render();
  }

  createContainer() {
    const container = document.createElement("div");
    container.className = "range-slider";
    container.onclick = event => {
      console.log("progress bar clicked", event.pageX);
    };
    return container;
  }

  createBar() {
    const bar = document.createElement("span");
    bar.className = "progress-bar";
    return bar;
  }

  createDragger() {
    const dragger = document.createElement("span");
    dragger.className = "progress-dragger";
    // dragger.onmousemove = event => {
    //   console.warn(`dragger move`, event.pageX);
    // };

    return dragger;
  }

  createSlider() {
    const container = this.createContainer();
    const bar = this.createBar();
    const dragger = this.createDragger();
    bar.appendChild(dragger);
    container.appendChild(bar);

    // ===
    let isMoving = false;

    var move = e => {
      if (isMoving) {
        var min = 0,
          max = container.offsetWidth - dragger.offsetWidth,
          mousePos = e.pageX - container.offsetLeft - dragger.offsetWidth / 2,
          position = mousePos > max ? max : mousePos < min ? min : mousePos,
          value = Math.floor((position / max) * 100);

        bar.style.width = `${value}%`;
        console.warn(value);
        this.setCurrent(value);
      }
    };

    container.addEventListener("mousedown", function(e) {
      isMoving = true;
      move(e);
    });

    document.addEventListener("mouseup", function(e) {
      isMoving = false;
    });

    document.addEventListener("mousemove", function(e) {
      move(e);
    });
    // ===

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
    return this.current;
  }

  setCurrent(value) {
    this.current = value;
  }
}
