import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = (props) => {
    let contents;

    if (props.guessedWords.length === 0) {
        contents = <p data-test={"guess-instructions"}>Guess the secret word!</p>;
    }

    return (
        <div data-test={"component-guessed-words"}>
            {contents}
        </div>
    );
};

GuessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    ).isRequired
}

export default GuessedWords;