import React from 'react';
import PropTypes from "prop-types";
import GuessedWords from "./GuessedWords";

const Input = ({secretWord}) => {

    const [currentGuess, setCurrentGuess] = React.useState('');

    const handleClick = (e) => {
        e.preventDefault();
        setCurrentGuess('');
    }

    return (
        <div data-test={"component-input"}>
            <form className={"form-inline"} data-test="form-guess">
                <input
                    data-test={"input-box"}
                    className={"mb-2 mx-sm-3"}
                    type={"text"}
                    placeholder={"Enter guess"}
                    value={currentGuess}
                    onChange={({target}) => {
                        setCurrentGuess(target.value);
                    }}
                />
                <button
                    type={"submit"}
                    data-test={"submit-button"}
                    className={"btn btn-primary mb-2"}
                    onClick={handleClick}
                >Submit
                </button>
            </form>
        </div>
    );
};

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
}

export default Input;