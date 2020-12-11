import React from "react";
import _noop from "lodash/noop";
import renderer from "react-test-renderer";

import AddressCard from "./index";

describe("<AddressCard />", () => {
  it("renders successfully", () => {
    const component = renderer.create(
      <AddressCard
        address={{}}
        onEdit={_noop}
        onDelete={_noop}
        onSelect={_noop}
      />
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
