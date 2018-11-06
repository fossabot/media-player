import RangeSlider from "../src/rangeSlider/rangeSlider";

new RangeSlider(document.querySelector("#slider1"));

new RangeSlider(document.querySelector("#slider2"), {
  className: "my-slider"
});

new RangeSlider(document.querySelector("#slider3"), {
  barHeight: 6,
  draggerSize: 16
});

let value4Holder = document.querySelector("#slider4Value");
let slider4 = new RangeSlider(document.querySelector("#slider4"), {
  onChange: value => {
    value4Holder.innerText = value;
  }
});
value4Holder.innerText = slider4.getValue();

let value5Holder = document.querySelector("#slider5Value");
let slider5 = new RangeSlider(document.querySelector("#slider5"), {
  min: 0,
  max: 200,
  onChange: value => {
    value5Holder.innerText = value;
  }
});
value5Holder.innerText = slider5.getValue();
