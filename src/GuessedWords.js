import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = (props) => {
    let contents;

    if (props.guessedWords.length === 0) {
        contents = <p data-test={"guess-instructions"}>Guess the secret word!</p>;
    } else {

        const guessedWordsRows = props.guessedWords.map(({guessedWord, letterMatchCount}, i) => {
            return <tr key={i} data-test={"guessed-word"}>
                <td>guessedWord</td>
                <td>letterMatchCount</td>
            </tr>
        });

        contents = <div data-test={"guessed-words"}>
            <h3>Guessed Words</h3>
            <table>
                <thead>
                <tr>
                    <th>Guess</th>
                    <th>Matching Letters</th>
                </tr>
                <tbody>
                {guessedWordsRows}
                </tbody>
                </thead>
            </table>
        </div>;
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