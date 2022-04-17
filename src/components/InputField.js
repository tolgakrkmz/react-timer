import React, { Component } from 'react'

class InputField extends Component {
  state = {
    title: '',
  }

  handleInputValue = (e) => {
    this.setState({
      title: e.target.value,
    })
  }


  render() {
    return (
      <div>

        <div>
          <label htmlFor='input-for-title'>Title</label>
          <input type={'text'} onChange={this.handleInputValue}></input>
        </div>

      </div>
    )
  }
}

export default InputField;
