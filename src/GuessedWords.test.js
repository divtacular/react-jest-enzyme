import React from "react";
import {shallow} from 'enzyme';

import {findByTestAttr, checkProps} from "../test/testUtils";
import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";


const defaultProps = {
    guessedWords: [{guessedWord: 'train', letterMatchCount: 3}]
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
    const wrapper = shallow(<GuessedWords {...setupProps} />);

    if (state) {
        wrapper.setState(state);
    }
    return wrapper;
}

test('does not throw warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
    let wrapper;

    beforeEach(()=>{
        wrapper = setup({
            guessedWords: []
        });
    });

    test('renders without error', () => {

        const component = findByTestAttr(wrapper, 'component-guessed-words');

        expect(component.length).toBe(1);
    });

    test('renders instructions to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions');

        expect(instructions.text().length).not.toBe(0);
    });
});

describe('if there are words guessed', () => {

});