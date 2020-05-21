import React from 'react';
import {shallow} from 'enzyme';
// import {render} from "@testing-library/react";

import {findByTestAttr, checkProps} from "../../test/testUtils";
import LanguagePicker from "../components/LanguagePicker";

const mockSetLanguage = jest.fn();
const defaultProps = {setLanguage: mockSetLanguage}
/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props for this setup
 * @param {object} state - Initial state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
    const setupProps = { ...defaultProps, ...props};
    const wrapper = shallow(<LanguagePicker {...setupProps} />);

    if (state) {
        wrapper.setState(state);
    }
    return wrapper;
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-language-picker');
    expect(component.exists()).toBe(true);
});

test('does not throw warning with expected props', () => {
    checkProps(LanguagePicker, {
        setLanguage: jest.fn()
    });
});

test('calls setLanguage prop upon click', () => {
    const wrapper = setup();
    const languagePick = findByTestAttr(wrapper, 'language-icon');

    //assume all work if first works
    const firstIcon = languagePick.first();
    firstIcon.simulate('click');
    expect(mockSetLanguage).toHaveBeenCalled();
});

test('renders non-zero language icons', () => {
    const wrapper = setup();
    const languagePick = findByTestAttr(wrapper, 'language-icon');
    expect(languagePick.length).toBeGreaterThan(0);
});
