import React, {Component} from 'react';
import GuessedWords from "./components/GuessedWords";
import Congrats from "./components/Congrats";
import Input from "./components/Input";

class App extends Component {
    render() {
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
}

export default App;