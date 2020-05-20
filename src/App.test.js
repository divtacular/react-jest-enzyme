import React from 'react';
import {shallow} from 'enzyme';
// import {render} from "@testing-library/react";

import {findByTestAttr, checkProps} from "../test/testUtils";
import App from './App';
import Congrats from "./Congrats";

const defaultProps = {};

/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props for this setup
 * @param {object} state - Initial state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props};
  const wrapper = shallow(<App {...setupProps} />);

  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');

  expect(component.length).toBe(1);
});
