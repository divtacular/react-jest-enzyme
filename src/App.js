import React from 'react';
import hookActions from "./actions/hookActions";
import GuessedWords from "./components/GuessedWords";
import Congrats from "./components/Congrats";
import Input from "./components/Input";

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
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
}

const App = () => {

    const {state, dispatch} = React.useReducer(reducer, {secretWord: null});

    const setSecretWord = (secretWord) => {
        dispatch({
            type: "setSecretWord",
            payload: secretWord
        });
    }

    React.useEffect(() => {
        hookActions.getSecretWord(setSecretWord)
    }, []);

    return (
        <div className={"container"} data-test={"component-app"}>
            <h1>Jotto</h1>
            <Input secretWord={"party"}></Input>
            <Congrats success={true}/>
            <GuessedWords guessedWords={[
                {guessedWord: 'train', letterMatchCount: 3}
            ]}/>
        </div>
    );
}

export default App;