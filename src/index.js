import RangeSlider from "./rangeSlider";

new RangeSlider({
  host: document.querySelector("#slider1")
});

new RangeSlider({
  host: document.querySelector("#slider2"),
  className: "my-slider"
});

new RangeSlider({
  host: document.querySelector("#slider3"),
  barHeight: 6,
  draggerWidth: 10
});
