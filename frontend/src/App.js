import React, {Component} from "react";
import "./App.css";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-alda";
import "ace-builds/src-noconflict/theme-monokai";


import Audio from './Audio';
import TextInput from './TextInput';




class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fileLocation: "",
      editorValue: ""
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // This is a workaround to fix react-ace component from rerendering 
    // everytime onChange is called and clearing the editor.
    if (this.state.editorValue !== nextState.editorValue) {
      return false
    } else {
      return true;
    }
  }

  /**
  * Takes an Alda formatted string and sends it to server to be 
  * converted into a mp3 file for playback.
  * @param {string} aldaCode - An Alda formatted string.
  * @returns {object} response - A response object from the server with
  * either the error that occurred or a string representing the file path for the mp3 file.
  */
  postAudio = async (aldaCode) => {
    const response = await fetch(process.env.REACT_APP_SERVER_URL + '/alda', 
                              {
                                method: 'POST',
                                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({'data': aldaCode})
                            });
    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    const data = await response.json();
    if (data['status'] !== 200) {
      throw Error(data['data']);
    }

    return data;
  }

  AceEditorOnChange = (value) => {
    this.setState({
      editorValue: value
    });
  }

  TextInputHandleClick = async (input) => {
    // try {
    //   const data = await this.postAudio(input);
    //   this.setState({
    //     fileLocation: process.env.REACT_APP_SERVER_URL + data['data']
    //   });

    // } catch(error) {
    //     console.log("Error processing request: " + error.toString());
    // }
  }

  render() {
    return (
      <div className="App">
        <TextInput handleClick={this.TextInputHandleClick}/>
        <Audio fileLocation={this.state.fileLocation}/>

        <AceEditor
          ref="aceEditor"
          mode="alda"
          theme="monokai"
          onChange={this.AceEditorOnChange}
          name="editor"
          editorProps={{ $blockScrolling: true }}
        />
        
      </div>
    );
  }
}

export default App;
