import React, { Component } from 'react'
import { formatHours } from '../utils/format';
import AddTimeToList from './AddTimeToList';

class Timer extends Component {
    state = {
        count: 1,
        intervalId: 0,
    };

    startAction = () => {
        const newIntervalId = setInterval(() => {
            // Make Counter
            this.setState({
                count: this.state.count + 1,
            });
        }, 1000);

        // Replace old IntervalID with new.
        this.setState({
            intervalId: newIntervalId,
        });
    }

    stopAction = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.setState({
                intervalId: 0,
                count: 1,
            });
        }

    }

    render() {
        return (
            <>
                <div>{formatHours(this.state.count)}</div>
                <button onClick={this.startAction}>Start</button>
                <button onClick={this.stopAction}>Stop</button>
                <AddTimeToList time={formatHours(this.state.count)} />
            </>
        );
    }
}

export default Timer;