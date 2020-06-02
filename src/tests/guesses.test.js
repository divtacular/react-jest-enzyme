import React from "react";
import {mount} from 'enzyme';
import {findByTestAttr} from "../../test/testUtils";

import Input from "../components/Input";
import successContext from "../contexts/successContext";

import GuessedWords from "../components/GuessedWords";
import guessedWordsContext from "../contexts/guessedWordsContext";

const setup = (guessedWordsStrings = [], secretWord = "party") => {
    const wrapper = mount(
        <guessedWordsContext.GuessedWordsProvider>
            <successContext.SuccessProvider>
                <Input secretWord={secretWord}/>
                <GuessedWords/>
            </successContext.SuccessProvider>
        </guessedWordsContext.GuessedWordsProvider>
    );

    const inputBox = findByTestAttr(wrapper, 'input-box');
    const submitButton = findByTestAttr(wrapper, 'submit-button');


    // prepopulate guessedWords by simulating word guesses
    guessedWordsStrings.forEach((word) => {
        const mockEvent = {target: {value: word}}
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
    });

    return [wrapper, inputBox, submitButton];
}

describe('test word guesses', () => {
    let wrapper;
    let inputBox;
    let submitButton;

    beforeEach(() => {
        [wrapper, inputBox, submitButton] = setup(['agile']);
    });

    describe('non-empty guessedWords', () => {
        describe('correct guess', () => {
            beforeEach(() => {
                const mockEvent = {target: {value: "party"}};

                inputBox.simulate("change", mockEvent);
                submitButton.simulate("click");
            });

            test('Input component contains no child', () => {
                const inputComponent = findByTestAttr(wrapper, "component-input");

                expect(inputComponent.children().length).toBe(0);
            });

            test('GuessedWords table rows equals number of guessed words', () => {
                const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-words');
                expect(guessedWordsTableRows.length).toBe(1);
            });

            test('Input box remains', () => {
                expect(inputBox.exists()).toBe(true);
            });
        });

        describe('incorrect guess', () => {
            beforeEach(() => {
                const mockEvent = {target: {value: "train"}};

                inputBox.simulate("change", mockEvent);
                submitButton.simulate("click");
            });

            test('GuessedWords table rows equals number of guessed words', () => {
                const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-words');
                expect(guessedWordsTableRows.length).toBe(1);
            });
        });
    });

    describe('empty guessedWords', () => {
        beforeEach(() => {
            [wrapper, inputBox, submitButton] = setup([]);
        });

        test('guessedWords shows correct guesses after incorrect guess', () => {
            const mockEvent = {target: {value: 'train'}};

            inputBox.simulate('change', mockEvent);
            submitButton.simulate('click');

            const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
            expect(guessedWordsTableRows.length).toBe(1);
        });
    });
})