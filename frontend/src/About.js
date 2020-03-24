import React, { Component } from "react";
import "./About.css";
import Modal from "react-bootstrap/Modal";


class About extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
        <div className="About">
            <Modal
          size="lg"
          show={this.props.show}
          dialogClassName="right-fade"
          onHide={this.props.onClick}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              About
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal>
        </div>
        )
        }

}

export default About
