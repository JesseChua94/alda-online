import React, { Component } from "react";
import "./App.css";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";

import About from "./About";
import Audio from "./Audio";
import Editor from "./Editor";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filePath: "",
      editorValue: "",
      showAboutModal: false,
      running: false,
      reloadAudio: false
    };
  }

  /**
   * Takes an Alda formatted string and sends it to server to be
   * converted into a mp3 file for playback.
   * @param {string} aldaCode - An Alda formatted string.
   * @returns {object} response - A response object from the server with
   * either the error that occurred or a string representing the file path for the mp3 file.
   */
  postAudio = async aldaCode => {
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/alda", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: aldaCode })
    });
    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    const data = await response.json();
    if (data["status"] !== 200) {
      throw Error(data["data"]);
    }

    return data;
  };

  aceEditorOnChange = (value) => {
    this.setState({
      editorValue: value
    });
  };

  closeAboutModal = (show) => {
    this.setState({
      showAboutModal: false
    });
  };

  openAboutModal = () => {
    this.setState({
      showAboutModal: true
    });
  };

  onAudioLoad = () => {
    this.setState({
      reloadAudio: false
    });
  }

  aldaHandleClick = async () => {
    try {
      this.setState({
        running: true
      });
      const data = await this.postAudio(this.state.editorValue);
      this.setState({
        filePath: process.env.REACT_APP_SERVER_URL + data["data"],
        reloadAudio: true
      });
    } catch (error) {
      console.log("Error processing request: " + error.toString());
    } finally {
      this.setState({
        running: false
      });
    }
  };

  render() {
    let button;
    if (this.state.running) {
      button = (<Button variant="success" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Running...
      </Button>);
    } else {
      button = <Button onClick={this.aldaHandleClick} variant="outline-success">Run Code</Button>;  
    }

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Alda Online</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={this.openAboutModal}>About</Nav.Link>
            </Nav>
            <Audio filePath={this.state.filePath} onAudioLoad={this.onAudioLoad} reloadAudio={this.state.reloadAudio}/>
            {button}
          </Navbar.Collapse>
        </Navbar>
        <Editor onChange={this.aceEditorOnChange}/>
        <About show={this.state.showAboutModal} onClick={this.closeAboutModal} />
      </div>
    );
  }
}

export default App;
