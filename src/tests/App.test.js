import React from 'react';
import {shallow} from 'enzyme';

import {findByTestAttr, checkProps} from "../../test/testUtils";

import hookActions from "../actions/hookActions";
import App from '../App';

const defaultProps = {};
const mockGetSecretWord = jest.fn();

/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props for this setup
 * @param {object} state - Initial state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {

    mockGetSecretWord.mockClear();
    hookActions.getSecretWord = mockGetSecretWord;

    const setupProps = {...defaultProps, ...props};
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
        wrapper.update();
        expect(mockGetSecretWord).not.toHaveBeenCalled();
    });
});