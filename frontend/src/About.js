import React, { Component } from "react";
import "./About.css";
import Modal from "react-bootstrap/Modal";

class About extends Component {
  render() {
    return (
      <div className="About">
        <Modal
          size="lg"
          show={true}
          dialogClassName="right-fade"
          onHide={(this.props.onClick)}
          scrollable={true}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">About</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>What is Alda Online?</h4>
            <p>
              Alda Online is a web application that allows users to play around
              with the Alda music programming language on their web browser
              without having to set up anything locally.
            </p>

            <h4>What is Alda?</h4>
            <p>
              Alda is a "text-based programming language for music composition".
              It's a simple way for anyone to start composing their own music
              without having to learn a scorewriting program like Sibelius. More
              info can be found here: {" "}
              <a href="https://alda.io/" target="_blank" rel="noopener noreferrer">
                link
              </a>
              .
            </p>

            <h4>How do I use Alda?</h4>
            <p>
              The full Alda tutorial can be found here: {" "}
              <a href="https://alda.io/tutorial/" target="_blank" rel="noopener noreferrer">
                here
              </a>
              .
            </p>

            <h4>Disclaimer</h4>
            <p>
              This project is in no way directly associated with the official
              Alda project. The original project by Dave Yarwood can be found
              here!:{" "}
              <a href="https://alda.io/" target="_blank" rel="noopener noreferrer">
                https://alda.io/
              </a>
              .
            </p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default About;
