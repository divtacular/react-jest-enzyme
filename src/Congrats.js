import React from 'react';


/**
 * @desc Functional react component for success message
 * @returns {JSX.Element} - Rendered component or null is props.success is false
 * @constructor
 */

const Congrats = ({success}) => {
    if (success) {
        return (<div data-test={"component-congrats"}>
            <p data-test={"congrats-message"}>You guessed it!</p>
        </div>);
    } else {
        return (
            <div data-test={"component-congrats"}></div>
        );
    }
};

export default Congrats;