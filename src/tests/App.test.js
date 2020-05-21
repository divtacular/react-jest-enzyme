import React from 'react';
import {mount} from 'enzyme';

import {findByTestAttr, checkProps} from "../../test/testUtils";

import hookActions from "../actions/hookActions";
import App from '../App';

const defaultProps = {};
const mockGetSecretWord = jest.fn();

/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {string} secretWord - secret word for test
 * @param {object} props - Component props for this setup
 * @param {object} state - Initial state
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = 'party', props = {}, state = null) => {

    mockGetSecretWord.mockClear();
    hookActions.getSecretWord = mockGetSecretWord;

    const setupProps = {...defaultProps, ...props};

    //Mock useReducer
    const mockUseReducer = jest.fn().mockReturnValue([
        {secretWord, language: 'en'},
        jest.fn()
    ]);
    React.useReducer = mockUseReducer;

    if (state) {
        wrapper.setState(state);
    }

    return mount(<App {...setupProps} />);
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-app');

    expect(component.length).toBe(1);
});

describe('secret word is not null', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = setup('party');
    });

    test('render app when secret word is not null', () => {
        const appComponent = findByTestAttr(wrapper, "component-app");
        expect(appComponent.exists()).toBe(true);
    });

    test('does not render spinner when secret word is not null', () => {
        const spinner = findByTestAttr(wrapper, "spinner");
        expect(spinner.exists()).toBe(false);
    });
});

describe('secret word is null', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = setup('');
    });

    test('does not render app when secret word is null', () => {
        const appComponent = findByTestAttr(wrapper, "component-app");
        expect(appComponent.exists()).toBe(false);
    });

    test('render spinner when secret word is null', () => {
        const spinner = findByTestAttr(wrapper, "spinner");
        expect(spinner.exists()).toBe(true);
    });
});

describe('getSecretWord calls', () => {
    test('getSecretWord gets called on App mount', () => {
        setup();
        //expect mock secret wor was called
        expect(mockGetSecretWord).toHaveBeenCalled();
    });

    test('secretWord does not update on App update', () => {
        const wrapper = setup();

        //called once on mount, clear it.
        mockGetSecretWord.mockClear();
        wrapper.setProps(); //update not working
        expect(mockGetSecretWord).not.toHaveBeenCalled();
    });
});