import React, { Component } from 'react'
import { formatHours } from '../utils/format';

class Timer extends Component {
    state = {
        seconds: 1,
        intervalId: 0,
        listId: 0,
        list: [],
        title: '',
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
            isEditMode: false,
        }

        this.setState({
            list: [...this.state.list, listItem],
            title: '',
            listId: this.state.listId + 1,
        });
    };

    removeList = (id) => {
        return () => {
            const newList = this.state.list.filter((listItem) => listItem.id !== id);

            this.setState({
                list: newList,
            })
        };
    }

    handleToggleEdit = (id) => {
        return () => {
            const currentItem = this.state.list.find(listItem => listItem.id === id);
            let list = [...this.state.list];
            currentItem.isEditMode = true;
            list[currentItem] = currentItem;

            this.setState({
                list: list,
            })
        }
    }

    handleOnchage = (id) => {
        return (e) => {
            const currentItem = this.state.list.find(listItem => listItem.id === id);
            let list = [...this.state.list];
            currentItem.title = e.target.value;
            list[currentItem] = currentItem;

            this.setState({
                list: list,
            })

        }
    }

    handleTitleSaveButton = (id) => {
        return () => {
            const currentItem = this.state.list.find(listItem => listItem.id === id);
            let list = [...this.state.list];
            currentItem.isEditMode = false;
            list[currentItem] = currentItem;

            this.setState({
                list: list,
            })
        }
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
                                {
                                    listItem.isEditMode ? (
                                        <input
                                            type='text'
                                            defaultValue={listItem.title}
                                            onChange={this.handleOnchage(listItem.id)}
                                        />
                                    )
                                        : listItem.title}
                                        {
                                            listItem.title.length > 0 && ' - '
                                        }
                                    {formatHours(listItem.time)}
                                {
                                    listItem.isEditMode ? <button type='submit' onClick={this.handleTitleSaveButton(listItem.id)}>Save</button>
                                        : <button type="button" onClick={this.handleToggleEdit(listItem.id)}>Edit</button>
                                }
                                <button type="button" onClick={this.removeList(listItem.id)}>Remove</button>

                            </li>)
                    }
                </ul>
            </>
        );
    }
}

export default Timer;