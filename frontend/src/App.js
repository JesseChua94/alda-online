import React, { Component } from "react";
import "./App.css";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-alda";
import "ace-builds/src-noconflict/theme-monokai";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import About from "./About";
import Audio from "./Audio";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileLocation: "",
      editorValue: "",
      showAboutModal: false
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // This is a workaround to fix react-ace component from rerendering
    // everytime onChange is called and clearing the editor.
    if (this.state.editorValue !== nextState.editorValue) {
      return false;
    } else {
      return true;
    }
  };

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

  aldaHandleClick = async () => {
    try {
      const data = await this.postAudio(this.state.editorValue);
      this.setState({
        fileLocation: process.env.REACT_APP_SERVER_URL + data["data"]
      });
    } catch (error) {
      console.log("Error processing request: " + error.toString());
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Alda Online</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={this.openAboutModal}>About</Nav.Link>
            </Nav>
            <Audio fileLocation={this.state.fileLocation} />
            <Button onClick={this.aldaHandleClick} variant="outline-success">Run Code</Button>
          </Navbar.Collapse>
          
        </Navbar>
        <AceEditor
          ref="aceEditor"
          mode="alda"
          theme="monokai"
          onChange={this.aceEditorOnChange}
          name="editor"
          width="100%"
          height="100%"
          showPrintMargin={false}
          useSoftTabs={true}
        />
        <About show={this.state.showAboutModal} onClick={this.closeAboutModal} />
      </div>
    );
  }
}

export default App;
