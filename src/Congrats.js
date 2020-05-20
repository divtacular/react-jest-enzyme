import React from 'react';
import PropTypes from 'prop-types';

/**
 * @desc Functional react component for success message
 * @returns {JSX.Element} - Rendered component or null is props.success is false
 * @constructor
 */
const Congrats = ({success}) => {
    if (success) {
        return (<div data-test={"component-congrats"} class={"alert alert-success"}>
            <span data-test={"congrats-message"}>You guessed it!</span>
        </div>);
    } else {
        return (
            <div data-test={"component-congrats"}></div>
        );
    }
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
};

export default Congrats;