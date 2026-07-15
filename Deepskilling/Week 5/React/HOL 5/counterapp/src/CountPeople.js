import React, { Component } from 'react';

class CountPeople extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entrycount: 0,
      exitcount: 0
    };
  }

  UpdateEntry = () => {
    this.setState({
      entrycount: this.state.entrycount + 1
    });
  };

  UpdateExit = () => {
    this.setState({
      exitcount: this.state.exitcount + 1
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.UpdateEntry}>Login</button>
        <span> {this.state.entrycount} People Entered!!!</span>

        <br />
        <br />

        <button onClick={this.UpdateExit}>Exit</button>
        <span> {this.state.exitcount} People Left!!!</span>
      </div>
    );
  }
}

export default CountPeople;