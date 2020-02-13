import React from 'react';
import styles from './Main.css';
import Sidebar from '../containers/sidebar/Sidebar';
import MainLayout from '../containers/main-layout/MainLayout';

const { hello } = require('../../native/index.node');

const Main: React.FC = () => {
  console.log(hello());

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.mainLayout}>
          <MainLayout />
        </div>
      </div>
    </div>
  );
};

export default Main;
