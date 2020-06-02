import React from "react";
import {shallow} from 'enzyme';

import {findByTestAttr} from "../../test/testUtils";
import GuessedWords from "../components/GuessedWords";

import guessedWordsContext from "../contexts/guessedWordsContext";
/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {array} guessedWords - The words guessed, guessedWords value
 * @param {object} state - Initial state
 * @returns {ShallowWrapper}
 */
const setup = (guessedWords = [], state = null) => {
    const mockUseGuessedWords = jest.fn().mockReturnValue([
        guessedWords,
        jest.fn()
    ]);

    guessedWordsContext.useGuessedWords = mockUseGuessedWords;

    return shallow(<GuessedWords />);
}

describe('if there are no words guessed', () => {
    let wrapper;

    beforeEach(()=>{
        wrapper = setup([]);
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
    let wrapper;

    const guessedWords = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 },
    ];

    beforeEach(()=>{
        wrapper = setup(guessedWords);
    });

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders guess words section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });

    test('renders correct number of guessed words', () => {
        const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsNodes.length).toBe(guessedWords.length);
    });
});

describe("languagePicker", () => {

    test('correctly renders instructions in English by default', () => {
        const wrapper = setup([]);
        const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(guessInstructions.text()).toBe('Try to guess the secret word!');
    });

    test('correctly renders instructions in emoji when specified', () => {
        //Mock useContext here
        const mockUseContext = jest.fn().mockReturnValue('emoji');
        React.useContext = mockUseContext;

        const wrapper = setup([]);
        const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(guessInstructions.text()).toBe('🤔🤫🔤');
    });
});