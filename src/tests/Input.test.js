import React from 'react';
import {shallow} from 'enzyme';

import {findByTestAttr, checkProps} from "../../test/testUtils";
import Input from "../components/Input";

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
    const wrapper = shallow(<Input {...setupProps} />);

    if (state) {
        wrapper.setState(state);
    }
    return wrapper;
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-input');

    expect(component.length).toBe(1);
});
