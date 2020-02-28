import React, { useState } from 'react';
import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { v4 as uuidv4 } from 'uuid';
import {
  ConnectionDialog,
  ConnectionList,
  ConnectionRemoveDialog,
  ConnectionCloseDialog
} from '../../components';
// eslint-disable-next-line import/no-cycle
import { mapDispatchToProps, mapStateToProps } from './index';
import styles from './Sidebar.css';
import { RedisConnection } from '../../types';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

enum DialogTypes {
  CONNECTION_DIALOG,
  CONNECTION_CLOSE_DIALOG,
  CONNECTION_REMOVE_DIALOG
}

const Sidebar: React.FC<Props> = ({
  connections,
  activeConnection,
  getConnections,
  addConnection,
  removeConnection,
  updateConnection,
  openConnection
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [connectionForUpdate, setConnectionForUpdate] = useState<
    RedisConnection
  >(null);

  const [activeDialog, setActiveDialog] = useState<DialogTypes>(null);

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
    setActiveDialog(DialogTypes.CONNECTION_REMOVE_DIALOG);
  };

  const handleEditConnection = (connection: RedisConnection) => {
    setConnectionForUpdate(connection);
    setActiveDialog(DialogTypes.CONNECTION_DIALOG);
  };

  const onDismissDialogs = () => {
    setActiveDialog(null);
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

  const onConnect = (connection: RedisConnection) => {
    if (activeConnection) {
      setActiveDialog(DialogTypes.CONNECTION_CLOSE_DIALOG);
      return;
    }
    openConnection(connection);
  };

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
            onClick={() => setActiveDialog(DialogTypes.CONNECTION_DIALOG)}
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
        <div className={styles.footer}>Redis GUI</div>
      </div>
      <ConnectionDialog
        isOpen={activeDialog === DialogTypes.CONNECTION_DIALOG}
        onClose={onDismissDialogs}
        addEditConnection={onAddEditConnection}
        connection={connectionForUpdate}
      />
      <ConnectionRemoveDialog
        isOpen={activeDialog === DialogTypes.CONNECTION_REMOVE_DIALOG}
        onClose={onDismissDialogs}
        connection={connectionForUpdate}
        deleteConnection={onDeleteConnection}
      />
      <ConnectionCloseDialog
        isOpen={activeDialog === DialogTypes.CONNECTION_CLOSE_DIALOG}
        connection={activeConnection}
        onClose={onDismissDialogs}
      />
    </>
  );
};

export default Sidebar;
