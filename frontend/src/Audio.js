import React from "react";
import './Audio.css'

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
      <div id="audio">
        <audio crossOrigin="anonymous" controls ref={this.audioRef}>
          <source src={this.props.fileLocation} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default Audio;