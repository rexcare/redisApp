import React, { useEffect } from 'react';
import Sidebar from '../sidebar';
import VizPane from '../viz-pane';
// eslint-disable-next-line import/no-cycle
import { mapStateToProps, mapDispatchToProps } from './index';
import styles from './MainScreen.css';

type StoreProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type Props = StoreProps;

const MainScreen: React.FC<Props> = ({
  localDBInitStatus,
  initLocalDB,
  getConnections
}) => {
  useEffect(() => {
    initLocalDB();
  }, []);

  useEffect(() => {
    getConnections();
  }, [localDBInitStatus]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.vizPane}>
        <VizPane />
      </div>
    </div>
  );
};

export default MainScreen;
