import React from "react";
import "./App.css";

import TextInput from './TextInput'

function App() {
  return (
    <div className="App">
      <TextInput />
      <audio controls id="audio-controls">
        <source id="alda-audio" src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
