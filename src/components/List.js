import React, { useEffect, useState } from 'react'
import { formatHours } from '../utils/format';

function List(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [listId, setListId] = useState(0);
    const [list, setList] = useState([]);
    const selectedItem = list.find(listItem => listItem.isDetailsShown);

    useEffect(function componentDidMount() {
        const list = localStorage.getItem('list');

        if (list) {
            setList(JSON.parse(list));
        }

        const listId = localStorage.getItem('listId');

        if (listId !== null) {
            setListId(Number(listId));
        }
    }, [])

    useEffect(function handleLocalStorageSync() {
        localStorage.setItem('list', JSON.stringify(list));
        localStorage.setItem('listId', JSON.stringify(listId));
    }, [list, listId]);

    function handleTitleInputChange({ target: { value } }) {
        setTitle(value);
    }

    function handleDescriptionInputChange({ target: { value } }) {
        setDescription(value);
    }

    function handleSaveButtonClick() {
        const listItem = {
            id: listId,
            title: title,
            time: props.seconds,
            isEditMode: false,
            isDetailsShown: false,
            description: description,
        };

        setList(previousList => [...previousList, listItem]);
        setTitle('');
        setDescription('');
        setListId(listId + 1);
    };

    function handleEditItemButtonClick(id) {
        return () => {
            const currentItemIdx = list.findIndex(listItem => listItem.id === id);
            const newList = [...list];
            newList[currentItemIdx] = { ...newList[currentItemIdx] };
            newList[currentItemIdx].isEditMode = true;

            setList(newList);
        };
    }

    function handleEditItemTitleInputChange(id) {
        return ({ target: { value } }) => {
            const currentItemIdx = list.findIndex(listItem => listItem.id === id);
            const newList = [...list]
            newList[currentItemIdx] = { ...newList[currentItemIdx] };
            newList[currentItemIdx].title = value;

            setList(newList);
        };
    }

    function handleSaveItemButtonClick(id) {
        return () => {
            const currentItemIdx = list.findIndex(listItem => listItem.id === id);
            const newList = [...list];
            newList[currentItemIdx] = { ...newList[currentItemIdx] };
            newList[currentItemIdx].isEditMode = false;

            setList(newList);
        };
    }

    function handleRemoveItemButtonClick(id) {
        return () => {
            const newList = list.filter((listItem) => listItem.id !== id);

            setList(newList);
        };
    }

    function handleItemDetailsButtonClick(id) {
        return () => {
            const currentItemIdx = list.findIndex(listItem => listItem.id === id);
            const currentItemIsDetailsShown = list[currentItemIdx].isDetailsShown;
            const newList = list.map(listItem => ({
                ...listItem,
                isDetailsShown: false,
            }));
            newList[currentItemIdx].isDetailsShown = !currentItemIsDetailsShown;

            setList(newList);
        };
    }

    return (
        <>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={handleTitleInputChange} />
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={handleDescriptionInputChange} />
            </div>

            <button onClick={handleSaveButtonClick}>Save</button>

            <ul>
                {list.map((listItem, index) =>
                    <li key={index}>
                        {listItem.isEditMode && (
                            <input
                                type="text"
                                value={listItem.title}
                                onChange={handleEditItemTitleInputChange(listItem.id)}
                            />
                        )}

                        {!listItem.isEditMode && listItem.title}

                        {(listItem.title.length > 0 || listItem.isEditMode) && ' - '}

                        {formatHours(listItem.time)}

                        {listItem.isEditMode && (
                            <button type="button" onClick={handleSaveItemButtonClick(listItem.id)}>Save</button>
                        )}

                        {!listItem.isEditMode && (
                            <button type="button" onClick={handleEditItemButtonClick(listItem.id)}>Edit</button>
                        )}

                        <button type="button" onClick={handleItemDetailsButtonClick(listItem.id)}>Details</button>
                        <button type="button" onClick={handleRemoveItemButtonClick(listItem.id)}>Remove</button>
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

export default List;
