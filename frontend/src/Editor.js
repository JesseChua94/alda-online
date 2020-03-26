import React from "react";
import "./Editor.css";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-alda";
import "ace-builds/src-noconflict/theme-monokai";

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // This is a workaround to fix the react-ace component from rerendering
    // everytime onChange is called and clearing the editor.
    return false;
  };

  render() { 
    return (
      <AceEditor
        ref="aceEditor"
        mode="alda"
        theme="monokai"
        onChange={this.props.onChange}
        name="editor"
        width="100%"
        height="100%"
        showPrintMargin={false}
        useSoftTabs={true}
      />
    )
  }
}

export default Editor;