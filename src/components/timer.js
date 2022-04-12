import React, { Component } from 'react'
import AddTimeToList from './AddTimeToList';

class Timer extends Component {
    state = {
        count: 1,
        intervalId: 0,
    };

    startAction = () => {
        const newIntervalId = setInterval(() => {
            // Make Counter
            this.setState(prevState => {
                return {
                    ...prevState,
                    count: prevState.count + 1,
                };
            });
        }, 1000);
        // Replace old IntervalID with new.
        this.setState(prevState => {
            return {
                ...prevState,
                intervalId: newIntervalId,
            };
        });
    }

    stopAction = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.setState(prevState => {
                return {
                    ...prevState,
                    intervalId: 0,
                    count: 1,
                };
            });
        }

    }

    render() {
        var convertedTime = new Date(this.state.count * 1000).toISOString().slice(11, 19);

        return (
            <div>
                <div>{convertedTime}</div>
                <button onClick={this.startAction}>Start</button>
                <button onClick={this.stopAction}>Stop</button>
                <AddTimeToList time={convertedTime} />

            </div>
        );
    }
}

export default Timer