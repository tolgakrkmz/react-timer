import React, { useEffect, useState } from 'react'
import { formatHours } from '../utils/format';


function List(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [listId, setListId] = useState(0);
    const [list, setList] = useState([]);

    useEffect(() => {
        const list = localStorage.getItem('list')
        if (list) {
            setList(JSON.parse(list));
        }

        const listId = localStorage.getItem('listId');
        if (listId !== null) {
            setListId(Number(listId));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
        localStorage.setItem('listId', JSON.stringify(listId));
    }, [list, listId]);

    const handleTitleInputChange = ({ target: { value } }) => {
        setTitle(value);
    }
    const handleDescriptionInputChange = ({ target: { value } }) => {
        setDescription(value);
    }

    const handleSaveButtonClick = () => {
        const listItem = {
            id: listId,
            title: title,
            time: props.seconds,
            isEditMode: false,
            isDetailsShown: false,
            description: description,
        };

        setList(array => [...array, listItem]);
        setTitle('');
        setDescription('');
        setListId(listId + 1);
    };

    function handleEditItemButtonClick(id) {
        return () => {
            const currentItemIdx = list.findIndex(listItem => listItem.id === id);
            list[currentItemIdx] = { ...list[currentItemIdx] };
            list[currentItemIdx].isEditMode = true;
            setList(list)
        };
    }

    function handleEditItemTitleInputChange(id) {
        return ({ target: { value } }) => {
            const currentItemIdx = list.findIndex(listItem => listItem.id === id);
            list[currentItemIdx] = { ...list[currentItemIdx] };
            list[currentItemIdx].title = value;

            setList(list)
        };
    }

    function handleSaveItemButtonClick(id) {
        return () => {
            const currentItemIdx = list.findIndex(listItem => listItem.id === id);
            list[currentItemIdx] = { ...list[currentItemIdx] };
            list[currentItemIdx].isEditMode = false;

            setList(list);
        };
    }

    function handleRemoveItemButtonClick(id) {
        return () => {
            const item = list.filter((listItem) => listItem.id !== id);

            setList(item);
        };
    }

    function handleItemDetailsButtonClick(id) {
        return () => {
            const currentItemIdx = list.findIndex(listItem => listItem.id === id);
            const currentItemIsDetailsShown = list[currentItemIdx].isDetailsShown;
            const item = list.map(listItem => ({
                ...listItem,
                isDetailsShown: false,
            }));
            item[currentItemIdx].isDetailsShown = !currentItemIsDetailsShown;

            setList(item)
        };
    }

    const selectedItem = list.find(listItem => listItem.isDetailsShown);

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
    )
}
export default List;
