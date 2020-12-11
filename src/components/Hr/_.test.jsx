import React from "react";
import renderer from "react-test-renderer";

import Hr from "./index";

describe("<Hr />", () => {
  it("renders successfully", () => {
    const component = renderer.create(<Hr />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
