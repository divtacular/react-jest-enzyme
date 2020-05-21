import React from 'react';

import languageContext from "./contexts/languageContext";
import hookActions from "./actions/hookActions";

import GuessedWords from "./components/GuessedWords";
import Congrats from "./components/Congrats";
import Input from "./components/Input";
import LanguagePicker from "./components/LanguagePicker";

/**
 * Reducer to update state. Called by dispatch
 * @param state {object} - existing state
 * @param action {object} - type and payload properties for state update
 * @return {object} - the new state
 */
function reducer(state, action) {
    switch (action.type) {
        case "setSecretWord":
            return {
                ...state, secretWord: action.payload
            }
        case "setLanguage":
            return {
                ...state, language: action.payload
            }
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
}

const App = () => {

    const [state, dispatch] = React.useReducer(reducer, {
        secretWord: null,
        language: 'en'
    });

    const setSecretWord = (secretWord) => {
        dispatch({
            type: "setSecretWord",
            payload: secretWord
        });
    };

    const setLanguage = (language) => {
        dispatch({
            type: "setLanguage",
            payload: language
        });
    };

    React.useEffect(() => {
        hookActions.getSecretWord(setSecretWord)
    }, []);

    if (!state.secretWord) {
        return (<div className={"container"} data-test={"spinner"}>
            <div className={"spinner-border"} role={"status"}><span className={"sr-only"}>Loading...</span></div>
        </div>);
    }

    return (
        <div className={"container"} data-test={"component-app"}>
            <h1>Jotto</h1>
            <languageContext.Provider value={state.language}>
                <LanguagePicker setLanguage={setLanguage}/>
                <Input secretWord={state.secretWord}/>
                <Congrats success={false}/>
                <GuessedWords guessedWords={[]}/>
            </languageContext.Provider>
        </div>
    );
}

export default App;