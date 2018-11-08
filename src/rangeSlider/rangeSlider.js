// reference: https://stackoverflow.com/a/33006528/1553656

import "./rangeSlider.css";

const defaultOptions = {
  className: "",

  value: 0,
  draggerSize: 12,
  barHeight: 2,
  onChange: null,

  min: 0,
  max: 100,
  precision: 0
};

export default class RangeSlider {
  constructor(parent, options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.parent = parent || document.body;
    this.isMoving = false;
    this.container = null;
    this.dragger = null;
    this.bar = null;

    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._handleResize = this._handleResize.bind(this);

    this._init();
  }

  _init() {
    this._render();
    const position = this._calculatePosition(this.options.value);
    this._updateUI(position);
  }

  _createContainer() {
    const container = document.createElement("div");
    container.className = `range-slider ${this.options.className}`;
    container.style.height = `${this.options.barHeight}px`;
    this.container = container;
    return container;
  }

  _createBar() {
    const bar = document.createElement("span");
    bar.style.height = `${this.options.barHeight}px`;
    bar.style.paddingLeft = `${this.options.draggerSize / 2}px`;
    bar.style.paddingRight = `${this.options.draggerSize / 2}px`;
    bar.className = "progress-bar";
    this.bar = bar;
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
    this.dragger = dragger;
    return dragger;
  }

  _calculateValue(position, positionMax) {
    const value =
      (position * (this.options.max - this.options.min)) / positionMax +
      this.options.min;
    return +value.toFixed(this.options.precision);
  }

  _calculatePosition(value) {
    const positionMax = this._getPositionMax();
    return (
      ((value - this.options.min) * positionMax) /
      (this.options.max - this.options.min)
    );
  }

  _createSlider() {
    const container = this._createContainer();
    const bar = this._createBar();
    const dragger = this._createDragger();
    bar.appendChild(dragger);
    container.appendChild(bar);

    this._bindEvent(container);

    return container;
  }

  _move(event) {
    if (!this.isMoving) return;
    let min = 0,
      max = this._getPositionMax();

    // Instead of using `offsetLeft`, we need to using
    // `getBoundingClientRect().left. Because the offsetLeft is relative to none
    // static parent.
    let elementLeft = this.container.getBoundingClientRect().left;

    // fix for scroll
    elementLeft += document.documentElement.scrollLeft;

    if (elementLeft < 0) elementLeft = Math.abs(elementLeft) / 2;
    let mousePos = event.pageX - elementLeft - this.dragger.offsetWidth / 2,
      position = mousePos > max ? max : mousePos < min ? min : mousePos;

    const value = this._calculateValue(position, max);
    this.setValue(value);
    if (this.options.onChange) {
      this.options.onChange(value);
    }
  }

  _getPositionMax() {
    return this.container.offsetWidth - this.dragger.offsetWidth;
  }

  _updateUI(position) {
    const positionMax = this._getPositionMax();
    this.dragger.style.left = `${position}px`;
    let width = (position / positionMax) * 100;
    this.bar.style.width = `${width}%`;
  }

  _handleMouseDown(event) {
    this.isMoving = true;
    this._move(event);
  }

  _handleMouseUp(event) {
    this.isMoving = false;
  }

  _handleMouseMove(event) {
    this._move(event);
  }

  _handleResize(event) {
    this._init();
  }

  _bindEvent(container) {
    container.addEventListener("mousedown", this._handleMouseDown);
    document.addEventListener("mouseup", this._handleMouseUp);
    document.addEventListener("mousemove", this._handleMouseMove);
    window.addEventListener("resize", this._handleResize, true);
  }

  _removeEvent() {
    if (!this.container) return;
    this.container.removeEventListener("mousedown", this._handleMouseDown);
    document.removeEventListener("mouseup", this._handleMouseUp);
    document.removeEventListener("mousemove", this._handleMouseMove);
  }

  _render() {
    const slider = this._createSlider();
    this.parent.innerHTML = "";
    this.parent.appendChild(slider);
  }

  destroy() {
    this._removeEvent();
  }

  getValue() {
    return this.options.value;
  }

  setValue(value) {
    this.options.value = value;
    const position = this._calculatePosition(value);
    this._updateUI(position);
  }
}
