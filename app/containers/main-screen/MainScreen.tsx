import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import VizPane from '../viz-pane';
import styles from './MainScreen.css';

const { openConnection } = require('../../../native/index.node');

type Props = {};

const MainScreen: React.FC<Props> = props => {
  openConnection('127.0.0', '', '', '');

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
