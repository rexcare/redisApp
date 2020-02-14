import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import VizPane from '../viz-pane';
import styles from './MainScreen.css';

const { hello } = require('../../../native/index.node');

type Props = {};

const MainScreen: React.FC<Props> = props => {
  console.log(hello());

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
