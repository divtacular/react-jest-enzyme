import React, {Component} from 'react';

class App extends Component {
    state = {
        counter: 0
    }

    render() {
        return (<div data-test={"component-app"}>
            <h1 data-test={"counter-display"}>The counter is currently: 0</h1>
            <button data-test={"increment-button"}>Increment Counter</button>
        </div>);
    }
}

export default App;