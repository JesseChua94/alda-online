import React from "react";

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

  render() {
    return (
      <div>
        <form>
          <div class="form-group">
            <label for="alda-input">Alda Input</label>
            <textarea class="form-control" id="alda-input" onChange={this.handleChange} rows="3"></textarea>
          </div>
          <button id="alda-input-button" type="button" onClick={this.props.handleClick(this.state.input)} class="btn btn-primary">
            Run Code
          </button>
        </form>
      </div>
    );
  }
}

export default TextInput;

