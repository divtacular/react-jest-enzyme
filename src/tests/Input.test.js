import React from 'react';
import {shallow} from 'enzyme';

import {findByTestAttr, checkProps} from "../../test/testUtils";
import InputComponent from "../components/Input";

const defaultProps = {
    secretWord: 'party'
};

/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props for this setup
 * @param {object} state - Initial state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
    const setupProps = {...defaultProps, ...props};
    const wrapper = shallow(<InputComponent {...setupProps} />);

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

test('does not throw warning with expected props', () => {
    checkProps(InputComponent, defaultProps);
});
describe("state controlled input field", () => {
    test('state updates with value of input box upon change', () => {
        const mockSetCurrentGuess = jest.fn();

        const mockEvent = {
            target: {
                value: 'train'
            }
        };

        //Replace React useState with a mock jest function
        React.useState = jest.fn(() => {
            return ['', mockSetCurrentGuess]
        });

        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper, 'input-box');

        //Simulate input into box
        inputBox.simulate("change", mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });
});