import React from 'react';
import PropTypes from "prop-types";
import GuessedWords from "./GuessedWords";

const Input = ({secretWord}) => {

    const [currentGuess, setCurrentGuess] = React.useState('');

    return (
        <div data-test={"component-input"}>
            <form className={"form-inline"} onSubmit={(e) => e.preventDefault()}>
                <input
                    data-test={"input-box"}
                    className={"mb-2 mx-sm-3"}
                    type={"text"} p
                    placeholder={"Enter guess"}
                    value={currentGuess}
                    onChange={({target}) => {
                        setCurrentGuess(target.value);
                    }}
                />
                <button
                    data-test={"submit-button"}
                    type={"submit"}
                    className={"btn btn-primary mb-2"}
                >Submit</button>
            </form>
        </div>
    );
};

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
}

export default Input;