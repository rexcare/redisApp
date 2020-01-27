import React from 'react';
import { Button } from '@blueprintjs/core';
import Sidebar from './sidebar/Sidebar';
import styles from './Main.css';
import Editor from './editor/Editor';
import ResultViewer from './result-viewer/ResultViewer';

const { hello } = require('../../native/index.node');

const Main: React.FC = () => {
  console.log(hello());

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className={styles.editor}>
          <Editor />
        </div>
        <div className={styles.resultViewer}>
          <ResultViewer />
        </div>
      </div>
    </div>
  );
};

export default Main;
