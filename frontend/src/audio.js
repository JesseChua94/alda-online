import React from "react";

class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  }

  render() {
    if (this.props.fileLocation) {
        this.audioRef.current.load();
    }
    return (
      <div>
        <audio crossorigin="anonymous" controls id="audio-controls" ref={this.audioRef}>
          <source id="alda-audio" src={this.props.fileLocation} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default Audio;