import RangeSlider from "../src/rangeSlider";

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

let value5_1Holder = document.querySelector("#slider5_1Value");
let slider5_1 = new RangeSlider(document.querySelector("#slider5_1"), {
  min: -100,
  max: 100,
  value:0,
  onChange: value => {
    value5_1Holder.innerText = value;
  }
});
value5_1Holder.innerText = slider5_1.getValue();

const slider6 = new RangeSlider(document.querySelector("#slider6"));
document.querySelector("#getValue").onclick = () => {
  document.querySelector("#result").innerText = slider6.getValue();
};
document.querySelector("#setValue").onclick = () => {
  slider6.setValue(50);
};

const slider7 = new RangeSlider(document.querySelector("#slider7"));
document.querySelector("#destroy").onclick = () => {
  console.warn("cleared");
  slider7.destroy();
};
