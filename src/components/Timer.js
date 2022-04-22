import React, { Component } from 'react'
import { formatHours } from '../utils/format';

class Timer extends Component {
    state = {
        seconds: 1,
        intervalId: 0,
        listId: 0,
        list: [],
        title: '',
        description : ''
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

    saveButton = (e) => {
        e.preventDefault();

        const listItem = {
            id: this.state.listId,
            title: this.state.title,
            time: this.state.seconds,
            isEditMode: false,
            isDetailsShown: false,
            description: this.state.description,
        }

        this.setState({
            list: [...this.state.list, listItem],
            title: '',
            description: '',
            listId: this.state.listId + 1,
        });
    };

    removeItemFromList = (id) => {
        return () => {
            const newList = this.state.list.filter((listItem) => listItem.id !== id);

            this.setState({
                list: newList,
            })
        };
    }

    editButton = (id) => {
        return () => {
            const currentItem = this.state.list.find(listItem => listItem.id === id);
            const currentItemIdx = this.state.list.findIndex(listItem => listItem.id === id);
            let list = [...this.state.list];
            currentItem.isEditMode = true;
            let newItem = {
                ...currentItem
            }
            list[currentItemIdx] = newItem;

            this.setState({
                list: list,
            })
        }
    }

    changeTitleInEditState = (id) => {
        return (e) => {
            const currentItem = this.state.list.find(listItem => listItem.id === id);
            const currentItemIdx = this.state.list.findIndex(listItem => listItem.id === id);
            let list = [...this.state.list];
            currentItem.title = e.target.value;
            let newItem = {
                ...currentItem
            }
            list[currentItemIdx] = newItem;

            this.setState({
                list: list,
            })

        }
    }

    titleSaveButton = (id) => {
        return () => {
            const currentItem = this.state.list.find(listItem => listItem.id === id);
            const currentItemIdx = this.state.list.findIndex(listItem => listItem.id === id);
            let list = [...this.state.list];
            currentItem.isEditMode = false;
            let newItem = {
                ...currentItem
            }
            list[currentItemIdx] = newItem;

            this.setState({
                list: list,
            })
        }
    }

    handleOnChangeDescription = ({ target: { value } }) => this.setState({
        description: value,
    })

    detailsButton = (id) => {
        return () => {
            const currentItem = this.state.list.find(listItem => listItem.id === id);
            const currentItemIdx = this.state.list.findIndex(listItem => listItem.id === id);
            const shownItem = this.state.list.find(listItem => listItem.isDetailsShown);

            if (shownItem !== undefined && shownItem !== currentItem) {
                shownItem.isDetailsShown = false;
            }

            if (!currentItem.isDetailsShown) {
                let list = [...this.state.list];
                currentItem.isDetailsShown = true;
                let newItem = {
                    ...currentItem
                }
                list[currentItemIdx] = newItem;
                this.setState({
                    list: list,
                })
            } else {
                let list = [...this.state.list];
                currentItem.isDetailsShown = false;
                let newItem = {
                    ...currentItem
                }
                list[currentItemIdx] = newItem;
                this.setState({
                    list: list,
                })
            }
        }
    }

    render() {
        const list = this.state.list;
        return (
            <>
                <div>{formatHours(this.state.seconds)}</div>

                <div id='formsContainer'>
                    <form>
                        <label>Title</label>
                        <input type={'text'} value={this.state.title} onChange={this.inputChangeHandler}></input>
                    </form>
                    <form>
                        <label>Description</label>
                        <textarea value={this.state.description} onChange={this.handleOnChangeDescription}></textarea>
                    </form>
                </div>

                <div id='buttonsContainer'>
                    <button onClick={this.startAction}>Start</button>
                    <button onClick={this.stopAction}>Stop</button>
                    <button onClick={this.pauseAction}>Pause</button>
                    <button onClick={this.saveButton}>Save</button>
                </div>

                <ul>
                    {
                        list.map((listItem, index) =>
                            <li key={index}>
                                {
                                    listItem.isEditMode ? (
                                        <input
                                            type='text'
                                            defaultValue={listItem.title}
                                            onChange={this.changeTitleInEditState(listItem.id)}
                                        />
                                    )
                                        : listItem.title}
                                {
                                    listItem.title.length > 0 && ' - '
                                }
                                {formatHours(listItem.time)}
                                {
                                    listItem.isEditMode ? <button type='submit' onClick={this.titleSaveButton(listItem.id)}>Save</button>
                                        : <button type="button" onClick={this.editButton(listItem.id)}>Edit</button>
                                }
                                {
                                    <button onClick={this.detailsButton(listItem.id)}>Details</button>
                                }
                                <button type="button" onClick={this.removeItemFromList(listItem.id)}>Remove</button>

                            </li>)
                    }
                </ul>

                {
                    list.map((listItem, index) =>
                        listItem.isDetailsShown ?
                            <div key={index} id='detailsContainer'>
                                <hr />
                                <p>{'Title: '}{listItem.title}</p>
                                <p>{'Description: '}{listItem.description}</p>
                                <p>{'Time: '}{formatHours(listItem.time)}</p>
                            </div>
                            : null)
                }
            </>
        );
    }
}

export default Timer;