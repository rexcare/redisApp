import React, { useState } from 'react';
import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { v4 as uuidv4 } from 'uuid';
import {
  ConnectionDialog,
  ConnectionList,
  ConnectionRemoveDialog
} from '../../components';
// eslint-disable-next-line import/no-cycle
import { mapDispatchToProps, mapStateToProps } from './index';
import styles from './Sidebar.css';
import { RedisConnection } from '../../types';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Sidebar: React.FC<Props> = ({
  connections,
  activeConnection,
  getConnections,
  addConnection,
  removeConnection,
  updateConnection
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isConnectionDialogVisible, setConnectionDialogVisibile] = useState<
    boolean
  >(false);

  const [connectionForUpdate, setConnectionForUpdate] = useState<
    RedisConnection
  >(null);

  const [
    isConnectionDeleteDialogVisible,
    setConnectionDeleteDialogVisible
  ] = useState<boolean>(false);

  const onChangeSearch = (val: string) => setSearchTerm(val);

  const getConnectionList = () => {
    if (!connections || !Array.isArray(connections) || !connections.length) {
      return [];
    }

    if (!searchTerm) {
      return connections;
    }

    return connections.filter(
      con => con.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  };

  const confirmConnectionDelete = (connection: RedisConnection) => {
    setConnectionForUpdate(connection);
    setConnectionDeleteDialogVisible(true);
  };

  const handleEditConnection = (connection: RedisConnection) => {
    setConnectionForUpdate(connection);
    setConnectionDialogVisibile(true);
  };

  const onDismissDialogs = () => {
    setConnectionDeleteDialogVisible(false);
    setConnectionDialogVisibile(false);
    setConnectionForUpdate(null);
  };

  const onAddEditConnection = (connection: RedisConnection) => {
    onDismissDialogs();

    if (!connection.id) {
      addConnection({ ...connection, id: uuidv4() });
    } else {
      updateConnection(connection);
    }

    getConnections();
  };

  const onDeleteConnection = () => {
    removeConnection(connectionForUpdate.id);
    onDismissDialogs();
    getConnections();
  };

  const onConnect = (connection: RedisConnection) => {};

  const onDisconnect = (connection: RedisConnection) => {};

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
            onClick={() => setConnectionDialogVisibile(true)}
          />
        </div>
        <div className={styles.content}>
          <ConnectionList
            dataSource={getConnectionList()}
            activeConnection={activeConnection}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            onEditConnection={handleEditConnection}
            onDeleteConnection={confirmConnectionDelete}
          />
        </div>
        <div className={styles.footer}>footer</div>
      </div>
      <ConnectionDialog
        isOpen={isConnectionDialogVisible}
        onClose={onDismissDialogs}
        addEditConnection={onAddEditConnection}
        connection={connectionForUpdate}
      />
      <ConnectionRemoveDialog
        isOpen={isConnectionDeleteDialogVisible}
        onClose={onDismissDialogs}
        connection={connectionForUpdate}
        deleteConnection={onDeleteConnection}
      />
    </>
  );
};

export default Sidebar;
