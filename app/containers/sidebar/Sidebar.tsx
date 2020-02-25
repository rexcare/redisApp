import React, { useState } from 'react';
import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { ConnectionDialog, ConnectionList } from '../../components';
import styles from './Sidebar.css';
import { RedisConnection } from '../../types';

interface Props {
  searchTerm: string;
  onChangeSearch: (searchTerm: string) => null;
  showConnectionDialog: () => null;
}

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isConnectionDialogVisible, setConnectionDialogVisibility] = useState<
    boolean
  >(false);

  const onChangeSearch = (val: string) => setSearchTerm(val);

  const items: Array<RedisConnection> = [
    {
      db: '127.0.0.1',
      host: 'Local',
      name: 'Local',
      password: 'pwd',
      port: '1234'
    }
  ];

  const getConnectionList = () => {
    if (!searchTerm) {
      return items;
    }
    return items.filter(
      con => con.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={`bp3-input-group .modifier ${styles.searchbar}`}>
            <input
              className="bp3-input"
              type="search"
              placeholder="Search connection"
              dir="auto"
              value={searchTerm}
              onChange={({ target: { value } }) => onChangeSearch(value)}
            />
          </div>
          <Button
            icon={IconNames.PLUS}
            onClick={() => setConnectionDialogVisibility(true)}
          />
        </div>
        <div className={styles.content}>
          <ConnectionList
            dataSource={getConnectionList()}
            activeConnection={items[0]}
          />
        </div>
        <div className={styles.footer}>footer</div>
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
