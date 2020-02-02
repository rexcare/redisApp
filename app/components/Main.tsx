import React from 'react';
import SplitPane from 'react-split-pane';
import Sidebar from './sidebar/Sidebar';
import styles from './Main.css';
import Editor from './editor/Editor';
import ResultViewer from './result-viewer/ResultViewer';

const { hello } = require('../../native/index.node');

const Main: React.FC = () => {
  console.log(hello());

  return (
    <SplitPane split="vertical" minSize={250} maxSize={300} defaultSize={300}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <SplitPane
        split="horizontal"
        pane1Style={styles.editorHeader.valueOf}
        allowResize={false}
      >
        <div>horizontal</div>
        <SplitPane split="horizontal">
          <Editor />

          <div className={styles.resultViewer}>
            <ResultViewer />
          </div>
        </SplitPane>
      </SplitPane>
    </SplitPane>
  );
};

export default Main;
