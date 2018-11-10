import RangeSlider from "./index";

describe("range slider:", () => {
  describe("create", () => {
    const slider = new RangeSlider(document.body);
    test("the create should work", () => {
      expect(document.body.children.length).toBe(1);
    });

    test("the parent of the slider should be the document body", () => {
      expect(slider.parent).toBe(document.body);
    });

    test("the slider should has class name `range-slider`", () => {
      expect(slider.container.classList.contains("range-slider") > -1).toBe(
        true
      );
    });

    test("the default options should work as expected", () => {
      expect(slider.options.value).toBe(0);
      expect(slider.options.draggerSize).toBe(12);
      expect(slider.options.barHeight).toBe(2);
      expect(slider.options.min).toBe(0);
      expect(slider.options.max).toBe(100);
      expect(slider.options.precision).toBe(0);
    });

    test("my slider should has class name `my-slider`", () => {
      const mySlider = new RangeSlider(document.body, {
        className: "my-slider"
      });
      expect(slider.container.classList.contains("my-slider") > -1).toBe(true);
    });

    test("the current value of the slider should be 1", () => {
      const mySlider = new RangeSlider(document.body, { value: 1 });
      expect(mySlider.getValue()).toBe(1);
    });

    test("the min should be -100 and the max is 100", () => {
      const mySlider = new RangeSlider(document.body, { min: -100, max: 100 });
      expect(mySlider.options.min).toBe(-100);
      expect(mySlider.options.max).toBe(100);
    });
  });

  describe("methods", () => {
    const slider = new RangeSlider(document.body);

    test("should return the current value of the slider", () => {
      expect(slider.getValue()).toBe(0);
    });

    test("should set the current value to 100", () => {
      slider.setValue(100);
      expect(slider.getValue()).toBe(100);
    });
  });
});
