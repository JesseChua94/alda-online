import React from "react";
import Button from './Button';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  };

  handleClick = () => {
      //fetch(with this.state.input) 
  };

  render() {
    return (
      <form>
        <div class="form-group">
          <label for="alda-input">Alda Input</label>
          <textarea class="form-control" id="alda-input" onChange={this.handleChange} rows="3"></textarea>
        </div>
        <button id="alda-input-button" type="button" onClick={this.handleClick} class="btn btn-primary">
          Run Code
        </button>
      </form>
    );
  }
}
