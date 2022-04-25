import React, { Component } from 'react'
import { formatHours } from '../utils/format';

class Timer extends Component {
    state = {
        intervalId: 0,
    };

    handleStartButtonClick = () => {
        const intervalId = setInterval(() => {
            this.props.onSecondsChange(this.props.seconds + 1);
        }, 1000);

        this.setState({ intervalId });
    }

    handleStopButtonClick = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.setState({ intervalId: 0 });
            this.props.onSecondsChange(1);
        }
    }

    handlePauseButtonClick = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
    }

    render() {
        return (
            <>
                <span>{formatHours(this.props.seconds)}</span>
                <button type="button" onClick={this.handleStartButtonClick}>Start</button>
                <button type="button" onClick={this.handleStopButtonClick}>Stop</button>
                <button type="button" onClick={this.handlePauseButtonClick}>Pause</button>
            </>
        );
    }
}

export default Timer;