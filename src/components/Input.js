import React, {useContext} from 'react';
import PropTypes from "prop-types";
import GuessedWords from "./GuessedWords";

import languageContext from "../contexts/languageContext";
import stringsModule from "../helpers/strings";

const Input = ({secretWord}) => {

    const language = useContext(languageContext);
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
                    placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
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
                >{stringsModule.getStringByLanguage(language, 'submit')}
                </button>
            </form>
        </div>
    );
};

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
}

export default Input;