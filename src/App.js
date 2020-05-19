import React, {Component} from 'react';

class App extends Component {
    state = {
        counter: 0
    }

    handleClick = () => {

        const counter = this.state.counter + 1;

        this.setState(
            {counter}
        );
    }

    render() {
        return (<div data-test={"component-app"}>
            <h1 data-test={"counter-display"}>The counter is currently: {this.state.counter}</h1>
            <button data-test={"increment-button"} onClick={this.handleClick}>Increment Counter</button>
        </div>);
    }
}

export default App;