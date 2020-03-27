import React, { Component } from "react";
import './Error.css'

import Alert from "react-bootstrap/Alert";

class Error extends Component {
  render() {
    return (
      <Alert id="error" variant="danger" onClose={this.props.onClose} dismissible>
        <p>
          {this.props.errorMsg}
        </p>
      </Alert>
    );
  };
};

export default Error;
