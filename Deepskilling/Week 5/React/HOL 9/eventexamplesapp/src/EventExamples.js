import React, { Component } from 'react';
import CurrencyConvertor from './CurrencyConvertor';

class EventExamples extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  increment = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  decrement = () => {
    this.setState({
      counter: this.state.counter - 1
    });
  };

  sayHello = () => {
    alert("Hello Member");
  };

  increase = () => {
    this.increment();
    this.sayHello();
  };

  sayWelcome = (message) => {
    alert(message);
  };

  onPress = (event) => {
    alert("I was clicked");
  };

  render() {
    return (
      <div>
        <h3>{this.state.counter}</h3>

        <button onClick={this.increase}>Increment</button>

        <br />

        <button onClick={this.decrement}>Decrement</button>

        <br />

        <button onClick={() => this.sayWelcome("welcome")}>
          Say welcome
        </button>

        <br />

        <button onClick={this.onPress}>Click on me</button>

        <CurrencyConvertor />
      </div>
    );
  }
}

export default EventExamples;