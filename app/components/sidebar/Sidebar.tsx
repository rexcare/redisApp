import React, { useState } from 'react';
import styles from './Sidebar.css';
import Header from './Header';
import ConnectionDialog from '../connection-dialog/ConnectionDialog';
import ConenctionList from './ConnectionList';
import { RedisConnection } from '../../types';

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isConnectionDialogVisible, setConnectionDialogVisibility] = useState<
    boolean
  >(false);

  const connectionList: Partial<RedisConnection>[] = [
    {
      name: 'Local',
      host: '127.0.0.1',
      port: '6379'
    }
  ];

  const connectionListToRender = () => {
    if (!searchTerm) {
      return connectionList;
    }

    return connectionList.filter(
      item => item.host?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header
            onChangeSearch={setSearchTerm}
            searchTerm={searchTerm}
            showConnectionDialog={() => setConnectionDialogVisibility(true)}
          />
        </div>
        <div className={styles.connectionlist}>
          <ConenctionList dataSource={connectionListToRender()} />
        </div>
      </div>
      <ConnectionDialog
        isOpen={isConnectionDialogVisible}
        onClose={() => setConnectionDialogVisibility(false)}
        addConnection={connection => console.log(connection)}
      />
    </>
  );
};

export default Sidebar;
