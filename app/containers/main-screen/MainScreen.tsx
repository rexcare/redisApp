import React, { useEffect } from 'react';
import Sidebar from '../sidebar';
import VizPane from '../viz-pane';
// eslint-disable-next-line import/no-cycle
import { mapStateToProps, mapDispatchToProps } from './index';
import styles from './MainScreen.css';

const { openConnection } = require('../../../native/index.node');

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const MainScreen: React.FC<Props> = ({
  localDBInitStatus,
  initLocalDB,
  getConnections
}) => {
  // openConnection('127.0.0.1', '', '', '');

  useEffect(() => {
    initLocalDB();
  }, []);

  useEffect(() => {
    getConnections();
  }, [localDBInitStatus]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.vizPane}>
          <VizPane />
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
