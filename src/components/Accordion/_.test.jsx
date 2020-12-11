import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";

import Accordion from "./index";

const CELLS = [
  { id: 1, header: "Header 1", body: "This is a cell body - 1" },
  { id: 2, header: "Header 2", body: "This is a cell body - 2" },
];

describe("<Accordion />", () => {
  it("renders successfully", () => {
    const component = renderer.create(<Accordion cells={CELLS} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    const { container } = render(<Accordion cells={CELLS} />);

    expect(container.firstChild.className).toBe("accordion");
  });
});
