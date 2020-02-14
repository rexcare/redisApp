import React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { CodeEditor, ResultView } from '../../components';
import { RedisConnection } from '../../types';
import styles from './VizPane.css';

interface Props {
  connectionList: Array<RedisConnection>;
}

const VizPane: React.FC<Props> = () => {
  const runScript = () => {};

  const clearScript = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.codeEditor}>
        <div className={styles.editorHeader}>
          <Button
            text="Run"
            icon={IconNames.REFRESH}
            intent={Intent.SUCCESS}
            className={styles.editorHeaderButtons}
          />
          <Button
            text="Clear"
            icon={IconNames.ERASER}
            intent={Intent.WARNING}
            className={styles.editorHeaderButtons}
          />
        </div>
        <CodeEditor />
      </div>
      <div className={styles.resultView}>
        <ResultView />
      </div>
    </div>
  );
};

export default VizPane;
