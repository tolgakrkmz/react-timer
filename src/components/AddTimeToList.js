import React, { Component } from 'react'

class AddTimeToList extends Component {
    state = {
        list: [],
    };

    handleSaveClick = (e) => {
        e.preventDefault();

        this.setState({
            list: [...this.state.list, this.props.time],
        });
    };

    render() {
        const { list } = this.state;

        return (
            <>
                <button onClick={this.handleSaveClick}>Save</button>

                <ul>
                    {list.map(function (data, index) {
                        return (
                            <li key={index}>{data}</li>
                        )
                    })}
                </ul>
            </>
        )
    }
}

export default AddTimeToList;
