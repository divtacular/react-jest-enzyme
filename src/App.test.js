import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({
    adapter: new EnzymeAdapter()
});

/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props for this setup
 * @param {object} state - Initial state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
    const wrapper = shallow(<App {...props} />);

    if (state) {
        wrapper.setState(state);
    }
    return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the specified data-test val
 * @function findByTestAttr
 * @param {ShallowWrapper}  wrapper - Enzyme shallow wrapper, context to search in
 * @param {string} val - Value of data-test to search for
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test='${val}']`);
}

test('it renders without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
});

test('it renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
});

test('it renders counter display', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);
});

test('clicking button increments counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter  });
    const button = findByTestAttr(wrapper, 'increment-button');

    //Click button
    button.simulate('click');

    //Find display of counter value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);

});

test('clicking button decrements counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter  });
    const button = findByTestAttr(wrapper, 'decrement-button');

    //Click button
    button.simulate('click');

    //Find display of counter value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);

});

test('counter can\'t go below zero', () => {
    const counter = 0;
    const wrapper = setup(null, {counter});

    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    const button = findByTestAttr(wrapper, 'decrement-button');

    button.simulate('click');

    expect(counterDisplay.text()).toContain(counter);

    const counterError = findByTestAttr(wrapper, 'counter-error');
    expect(counterError.hasClass('hidden')).toBe(false);
});

test('Error message should self clear on increment', () => {
    let counter = 0;
    const wrapper = setup(null, {counter});

    const decButton = findByTestAttr(wrapper, 'decrement-button');
    const incButton = findByTestAttr(wrapper, 'increment-button');

    decButton.simulate('click');
    incButton.simulate('click');

    const counterError = findByTestAttr(wrapper, 'counter-error');
    expect(counterError.hasClass('hidden')).toBe(true);
});