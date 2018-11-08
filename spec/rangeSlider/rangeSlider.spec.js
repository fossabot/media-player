const RangeSlider = require("../../dist/rangeSider").default;

describe("RangeSlider:", function() {
  it("slider should be created", function() {
    const slider = new RangeSlider();
    expect(slider).toHaveBeenCalled();
  });
});
