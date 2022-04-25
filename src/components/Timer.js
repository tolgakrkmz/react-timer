import React, { Component } from 'react'
import { formatHours } from '../utils/format';

class Timer extends Component {
    state = {
        seconds: 1,
        intervalId: 0,
        title: '',
        description: '',
        listId: 0,
        list: [],
    };

    componentDidMount() {
        const list = JSON.parse(localStorage.getItem('list'));
        this.setState({ list })
    }

    componentDidUpdate() {
        const items = JSON.stringify(this.state.list)
        localStorage.setItem('list', items)
    }

    handleStartButtonClick = () => {
        const intervalId = setInterval(() => {
            this.setState({
                seconds: this.state.seconds + 1,
            });
        }, 1000);

        this.setState({ intervalId });
    }

    handleStopButtonClick = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.setState({
                intervalId: 0,
                seconds: 1,
            });
        }
    }

    handlePauseButtonClick = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
    }

    handleTitleInputChange = ({ target: { value } }) => {
        this.setState({ title: value })
    }

    handleDescriptionInputChange = ({ target: { value } }) => {
        this.setState({ description: value });
    }

    handleSaveButtonClick = () => {
        const listItem = {
            id: this.state.listId,
            title: this.state.title,
            time: this.state.seconds,
            isEditMode: false,
            isDetailsShown: false,
            description: this.state.description,
        };

        this.setState({
            list: [...this.state.list, listItem],
            title: '',
            description: '',
            listId: this.state.listId + 1,
        });
    };

    handleRemoveItemButtonClick = (id) => {
        return () => {
            const list = this.state.list.filter((listItem) => listItem.id !== id);

            this.setState({ list });
        };
    }

    handleEditItemButtonClick = (id) => {
        return () => {
            const currentItemIdx = this.state.list.findIndex(listItem => listItem.id === id);
            const list = [...this.state.list];
            list[currentItemIdx] = { ...list[currentItemIdx] };
            list[currentItemIdx].isEditMode = true;

            this.setState({ list });
        };
    }

    handleEditItemTitleInputChange = (id) => {
        return ({ target: { value } }) => {
            const currentItemIdx = this.state.list.findIndex(listItem => listItem.id === id);
            const list = [...this.state.list];
            list[currentItemIdx] = { ...list[currentItemIdx] };
            list[currentItemIdx].title = value;

            this.setState({ list });
        };
    }

    handleSaveItemButtonClick = (id) => {
        return () => {
            const currentItemIdx = this.state.list.findIndex(listItem => listItem.id === id);
            const list = [...this.state.list];
            list[currentItemIdx] = { ...list[currentItemIdx] };
            list[currentItemIdx].isEditMode = false;

            this.setState({ list });
        };
    }

    handleItemDetailsButtonClick = (id) => {
        return () => {
            const currentItemIdx = this.state.list.findIndex(listItem => listItem.id === id);
            const currentItemIsDetailsShown = this.state.list[currentItemIdx].isDetailsShown;
            const list = this.state.list.map(listItem => ({
                ...listItem,
                isDetailsShown: false,
            }));
            list[currentItemIdx].isDetailsShown = !currentItemIsDetailsShown;

            this.setState({ list });
        };
    }

    render() {
        const list = this.state.list;
        const selectedItem = this.state.list.find(listItem => listItem.isDetailsShown);

        return (
            <>
                <span>{formatHours(this.state.seconds)}</span>
                <button type="button" onClick={this.handleStartButtonClick}>Start</button>
                <button type="button" onClick={this.handleStopButtonClick}>Stop</button>
                <button type="button" onClick={this.handlePauseButtonClick}>Pause</button>

                <div>
                    <label>Title</label>
                    <input type="text" value={this.state.title} onChange={this.handleTitleInputChange} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={this.state.description} onChange={this.handleDescriptionInputChange} />
                </div>

                <button onClick={this.handleSaveButtonClick}>Save</button>

                <ul>
                    {list.map((listItem, index) =>
                        <li key={index}>
                            {listItem.isEditMode && (
                                <input
                                    type="text"
                                    value={listItem.title}
                                    onChange={this.handleEditItemTitleInputChange(listItem.id)}
                                />
                            )}

                            {!listItem.isEditMode && listItem.title}

                            {(listItem.title.length > 0 || listItem.isEditMode) && ' - '}

                            {formatHours(listItem.time)}

                            {listItem.isEditMode && (
                                <button type="button" onClick={this.handleSaveItemButtonClick(listItem.id)}>Save</button>
                            )}

                            {!listItem.isEditMode && (
                                <button type="button" onClick={this.handleEditItemButtonClick(listItem.id)}>Edit</button>
                            )}

                            <button type="button" onClick={this.handleItemDetailsButtonClick(listItem.id)}>Details</button>
                            <button type="button" onClick={this.handleRemoveItemButtonClick(listItem.id)}>Remove</button>
                        </li>
                    )}
                </ul>

                {selectedItem && (
                    <>
                        <hr />
                        <p>Title: {selectedItem.title}</p>
                        <p>Description: {selectedItem.description}</p>
                        <p>Time: {formatHours(selectedItem.time)}</p>
                    </>
                )}
            </>
        );
    }
}

export default Timer;