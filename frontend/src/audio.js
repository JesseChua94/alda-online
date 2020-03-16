import React from "react";

class Audio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <audio controls id="audio-controls">
          <source id="alda-audio" src={this.props.filePath} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default Audio;