import React, {Component} from 'react';

class App extends Component {
    state = {
        counter: 0
    }

    handleClick = (decrement = false) => {
        let counter = decrement ? this.state.counter - 1 : this.state.counter + 1;
        let error = false;

        if(counter < 0) {
            error = true;
            counter = 0;
        }

        this.setState(
            {counter, error}
        );
    }

    render() {
        return (<div data-test={"component-app"}>
            <h1 data-test={"counter-display"}>The counter is currently: {this.state.counter}</h1>
            <p data-test={"counter-error"} className={this.state.error ? '' : 'hidden'}>Can't go below zero</p>
            <button data-test={"increment-button"} onClick={() => { this.handleClick() }}>Increment Counter</button>
            <button data-test={"decrement-button"} onClick={() => { this.handleClick(true) }}>Decrement Counter</button>
        </div>);
    }
}

export default App;