import React from 'react';
import {mount, shallow} from 'enzyme';

import {findByTestAttr, checkProps} from "../../test/testUtils";
import InputComponent from "../components/Input";
import languageContext from "../contexts/languageContext";
import Congrats from "../components/Congrats";
import successContext from "../contexts/successContext";

const defaultProps = {secretWord: 'party'};

/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props for this setup
 * @returns {ReactWrapper}
 */
const setup = ({secretWord, language, success}) => {
    language = language || 'en';
    secretWord = secretWord || 'party';
    success = success || false;

    return mount(
        <languageContext.Provider value={language}>
            <successContext.SuccessProvider value={[success, jest.fn()]}>
                <InputComponent secretWord={secretWord}/>
            </successContext.SuccessProvider>
        </languageContext.Provider>
    );
}


test('renders without error', () => {
    const wrapper = setup({});
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
        wrapper = setup({});
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
        submitBtn.simulate("click", {
            preventDefault: () => {
            }
        });

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
        expect(inputBox.text().length).toBe(0);
    })
});


describe('languagePicker', () => {
    test('correctly renders congrats string in English', () => {
        const wrapper = setup({});
        const submitBtn = findByTestAttr(wrapper, 'submit-button');

        expect(submitBtn.text()).toBe('Submit');
    });

    test('correctly renders congrats string in emoji', () => {

        const wrapper = setup({
            language: 'emoji'
        });
        const submitBtn = findByTestAttr(wrapper, 'submit-button');

        expect(submitBtn.text()).toBe('🚀');
    });
});

test('input component does not show when success is true', () => {
    const wrapper = setup({
        secretWord: 'party',
        success: true
    });

    expect(wrapper.isEmptyRender(  )).toBe(true)
})