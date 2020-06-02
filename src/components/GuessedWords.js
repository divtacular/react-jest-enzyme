import React from 'react';

import guessedWordsContext from "../contexts/guessedWordsContext";
import languageContext from "../contexts/languageContext";
import stringsModule from "../helpers/strings";

const GuessedWords = () => {
    let contents;

    const [guessedWords] = guessedWordsContext.useGuessedWords();
    const language = React.useContext(languageContext);

    if (guessedWords.length === 0) {
        contents = <p data-test={"guess-instructions"}>{stringsModule.getStringByLanguage(language, 'guessPrompt')}</p>;
    } else {

        console.log(guessedWords);

        const guessedWordsRows = guessedWords.map(({guessWord, letterMatchCount}, i) => {
            return <tr key={i} data-test={"guessed-word"}>
                <td>{guessWord}</td>
                <td>{letterMatchCount}</td>
            </tr>
        });

        contents = <div data-test={"guessed-words"}>
            <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
            <table className={"table table-sm"}>
                <thead className={"thead-light"}>
                    <tr>
                        <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
                        <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
                    </tr>
                </thead>
                <tbody>
                    {guessedWordsRows}
                </tbody>
            </table>
        </div>;
    }

    return (
        <div data-test={"component-guessed-words"}>
            {contents}
        </div>
    );
};

export default GuessedWords;