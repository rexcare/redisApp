import React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { CodeEditor, ResultView } from '../../components';
import styles from './VizPane.css';
// eslint-disable-next-line import/no-cycle
import { mapStateToProps } from '.';

type StoreProps = ReturnType<typeof mapStateToProps>;

interface OwnProps {}

type Props = StoreProps & OwnProps;

const VizPane: React.FC<Props> = ({ activeConnection }) => {
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
            disabled={!activeConnection}
            className={styles.editorHeaderButtons}
          />
          <Button
            text="Clear"
            icon={IconNames.ERASER}
            intent={Intent.WARNING}
            disabled={!activeConnection}
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
