import React, {Component} from "react";
import "./App.css";

import Audio from './Audio';
import TextInput from './TextInput';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filePath: ""
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
    const response = await fetch('/alda', 
                                    {
                                        method: 'post',
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

  handleClick = async (input) => {
    try {
      const data = await this.postAudio(input);
      this.setState = {
        filePath: data['data']
      };

    } catch(error) {
        console.log("Error processing request: " + error.toString());
    }
  }

  render() {
    return (
      <div className="App">
        <TextInput handleClick={this.handleClick}/>
        <Audio filePath={this.state.filePath}/>
      </div>
    );
  }
}

export default App;
