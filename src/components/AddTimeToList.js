import React, { Component } from 'react'
import { formatHours } from '../utils/format'

export default class AddTimeToList extends Component {
    state = {
        list: [],
        listId: 0,
        title: '',
        description: ''
    }

    saveButton = () => {
        const listItem = {
            id: this.state.listId,
            title: this.state.title,
            time: this.props.time,
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
    }

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

    removeItemFromList = (id) => {
        return () => {
            const newList = this.state.list.filter((listItem) => listItem.id !== id);
            localStorage.setItem('list', JSON.stringify(newList));
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
            });

            localStorage.setItem('list', JSON.stringify(newItem))
        }
    }

    render() {
        const list = this.state.list;
        return (
            <>
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
                                {formatHours(this.props.time)}
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
                        listItem.isDetailsShown &&
                        <div key={index} id='detailsContainer'>
                            <hr />
                            <p>{'Title: '}{listItem.title}</p>
                            <p>{'Description: '}{listItem.description}</p>
                            <p>{'Time: '}{formatHours(listItem.time)}</p>
                        </div>
                    )
                }

            </>
        )
    }
}
