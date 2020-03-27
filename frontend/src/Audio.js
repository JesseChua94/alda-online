import React from "react";
import './Audio.css'

class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
  };

  render() {
    //Only reload audio HTML element for new audio files.
    if (this.props.reloadAudio) {
      this.audioRef.current.load();
      this.props.onAudioLoad();
    }
    
    return (
      <div id="audio">
        <audio crossOrigin="anonymous" controls ref={this.audioRef}>
          <source src={this.props.filePath} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  };
};

export default Audio;