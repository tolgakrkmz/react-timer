import React, { Component } from 'react'
import List from './components/List';
import Timer from './components/Timer'

class App extends Component {
  state = {
    seconds: 1,
  };

  handleSecondsChange = (seconds) => {
    this.setState({ seconds });
  }

  render() {
    return (
      <>
        <Timer seconds={this.state.seconds} onSecondsChange={this.handleSecondsChange} />
        <List seconds={this.state.seconds} />
      </>
    )
  }
}

export default App