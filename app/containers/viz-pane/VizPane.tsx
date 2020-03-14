import React from 'react';
import { Button, Intent, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { CodeEditor, ResultView } from '../../components';
import styles from './VizPane.css';
// eslint-disable-next-line import/no-cycle
import { mapStateToProps, mapDispatchToProps } from './index';
import { REDIS_DATATYPE } from '../../types';

const nativeModule = require('../../../native/index.node');

type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface OwnProps {}

type Props = StoreProps & OwnProps;

const VizPane: React.FC<Props> = ({ activeConnection, resultData }) => {
  const runScript = () => {
    const res = nativeModule.getValForKey('myhash', 'hash');
    const result = JSON.parse(res);
    const keys = Object.keys(result);
    if (
      keys.length &&
      result[keys[0]].value &&
      typeof result[keys[0]].value === REDIS_DATATYPE.STRING
    ) {
      try {
        result[keys[0]].value = JSON.parse(result[keys[0]].value);
      } catch (err) {
        console.error(err);
      }
      console.log(result);
    }
  };

  const clearScript = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.codeEditor}>
        <div className={styles.editorHeader}>
          <div className={styles.editorHeaderConnection}>
            {activeConnection && (
              <>
                <Icon
                  icon={IconNames.DATABASE}
                  iconSize={Icon.SIZE_STANDARD}
                  style={{ marginRight: '8px' }}
                />
                {`${activeConnection.name} [${activeConnection.host} :${activeConnection.port}]`}
              </>
            )}
          </div>
          <div className={styles.editorHeaderButtonWrapper}>
            <Button
              text="Run"
              icon={IconNames.REFRESH}
              intent={Intent.SUCCESS}
              onClick={runScript}
              disabled={!activeConnection}
              className={styles.editorHeaderButtons}
            />
            <Button
              text="Clear"
              icon={IconNames.ERASER}
              intent={Intent.WARNING}
              onClick={clearScript}
              disabled={!activeConnection}
              className={styles.editorHeaderButtons}
            />
          </div>
        </div>
        {activeConnection && <CodeEditor />}
      </div>
      <div className={styles.resultView}>
        {activeConnection ? (
          <ResultView resultData={resultData} />
        ) : (
          <div className={styles.notConnectedWrapper}>
            <Icon
              icon={IconNames.INBOX}
              iconSize={64}
              className={styles.notConnectedIcon}
            />
            <p className={styles.notConnectedText}>Not connected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VizPane;
