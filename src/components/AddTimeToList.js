import React, { Component } from 'react'

class AddTimeToList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 1,
            li: [],
        };

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e) {
        e.preventDefault();

        const newListItem = [this.props.time];

        this.setState({
            li: [...this.state.li, newListItem],
        });
    }

    render() {
        const { li } = this.state;

        return (
            <div>
                <button onClick={this.handleOnClick}>Save</button>

                <ul>
                    {
                        li.map(function (data, index) {
                            return (
                                <li key={index}>{data}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default AddTimeToList;
