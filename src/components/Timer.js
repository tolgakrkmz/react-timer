import React, { Component } from 'react'
import { formatHours } from '../utils/format';

class Timer extends Component {
    state = {
        seconds: 1,
        intervalId: 0,
        listId: 0,
        list: [],
        title: ''
    };

    startAction = () => {
        const newIntervalId = setInterval(() => {
            this.setState({
                seconds: this.state.seconds + 1,
            });
        }, 1000);

        this.setState({
            intervalId: newIntervalId,
        });
    }

    stopAction = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.setState({
                intervalId: 0,
                seconds: 1,
            });
        }

    }

    pauseAction = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.setState({
                seconds: this.state.seconds,
            })
        }
    }

    inputChangeHandler = ({ target: { value } }) => this.setState({
        title: value,
    })

    handleSaveClick = (e) => {
        e.preventDefault();

        const listItem = {
            id: this.state.listId,
            title: this.state.title,
            time: this.state.seconds,
        }

        this.setState({
            list: [...this.state.list, listItem],
            title: '',
            listId: this.state.listId + 1,
        });
    };

    removeList = (id) => {
        const newList = this.state.list.filter((listItem) => listItem.id !== id);

        this.setState({
            list: newList,
        })
    }

    render() {
        const list = this.state.list;
        return (
            <>
                <div>{formatHours(this.state.seconds)}</div>

                <div>
                    <form>
                        <label htmlFor='input-for-title'>Title</label>
                        <input type={'text'} value={this.state.title} onChange={this.inputChangeHandler}></input>
                    </form>
                </div>

                <button onClick={this.startAction}>Start</button>
                <button onClick={this.stopAction}>Stop</button>
                <button onClick={this.pauseAction}>Pause</button>
                <button onClick={this.handleSaveClick}>Save</button>

                <ul>
                    {
                        list.map((listItem, index) =>
                            <li key={index}>
                                {listItem.title} - {formatHours(listItem.time)}
                                <button type="button" onClick={() => this.removeList(listItem.id)}>Remove</button>
                            </li>)
                    }
                </ul>
            </>
        );
    }
}

export default Timer;