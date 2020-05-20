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
    let mockSetCurrentGuess = jest.fn();
    let wrapper;

    beforeEach(() => {
        mockSetCurrentGuess.mockClear();

        //Replace React useState with a mock jest function
        React.useState = jest.fn(() => {
            return ['', mockSetCurrentGuess]
        });
        wrapper = setup();
    })

    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');
        const mockEvent = {
            target: {
                value: 'train'
            }
        };

        //Simulate input into box
        inputBox.simulate("change", mockEvent);
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });

    //Test setCurrentGuess was called with a value of "". We infer that the input would be emptied. I will add a check too
    test("clear guess on submit", () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');
        const submitBtn = findByTestAttr(wrapper, 'submit-button');

        //Simulate input into box
        submitBtn.simulate("click", { preventDefault: () => {} });

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
        expect(inputBox.text().length).toBe(0);
    })
});