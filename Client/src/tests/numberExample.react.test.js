import React from "react";
import jestRenderer from "react-test-renderer";
import { numberExample } from "../components/numberExample";
import { shallow } from "enzyme";

test("The component should render an div that says 1 as myNumber is 1", () => {
  const component = jestRenderer.create(<numberExample renderNumber={true} myNumber={1} />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("shallow render works ", () => {
  const component = shallow(<numberExample renderNumber={false} myNumber={1} />);
  expect(component.contains("Random Text"));
});
