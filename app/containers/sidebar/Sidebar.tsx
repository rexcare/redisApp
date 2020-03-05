import React, { useState } from 'react';
import { Alert, Button, Intent } from '@blueprintjs/core';
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

const util = require('util');
const nativeModule = require('../../../native/index.node');

const openConnection = util.promisify(nativeModule.openConnection);
const { closeConnection } = nativeModule;

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
  getConnectionsAction,
  addConnectionAction,
  removeConnectionAction,
  updateConnectionAction,
  isConnectingToServerAction,
  setActiveConnectionAction,
  isConnectingToServer,
  getAllKeyValuesAction
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [connectionForUpdate, setConnectionForUpdate] = useState<
    RedisConnection
  >(null);

  const [activeDialog, setActiveDialog] = useState<DialogTypes>(null);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState<boolean>(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState<string>('');

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
      addConnectionAction({ ...connection, id: uuidv4() });
    } else {
      updateConnectionAction(connection);
    }

    getConnectionsAction();
  };

  const onDeleteConnection = () => {
    removeConnectionAction(connectionForUpdate.id);
    onDismissDialogs();
    getConnectionsAction();
  };

  const handleErrorAlertClose = () => {
    setErrorAlertMessage('');
    setErrorAlertVisible(false);
  };

  const onConnect = async (connection: RedisConnection) => {
    if (activeConnection) {
      setActiveDialog(DialogTypes.CONNECTION_CLOSE_DIALOG);
      return;
    }

    isConnectingToServerAction(true);

    try {
      await openConnection(connection);
      setActiveConnectionAction(connection);
      getAllKeyValuesAction();
    } catch (err) {
      setErrorAlertVisible(true);
      setErrorAlertMessage(err.toString());
    } finally {
      isConnectingToServerAction(false);
    }
  };

  const onDisconnect = (connection: RedisConnection) => {
    closeConnection();
    setActiveConnectionAction(null);
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
            isConnectingToServer={isConnectingToServer}
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
      <Alert
        isOpen={isErrorAlertVisible}
        confirmButtonText="Okay"
        onClose={() => handleErrorAlertClose()}
        intent={Intent.DANGER}
      >
        <p>{errorAlertMessage}</p>
      </Alert>
    </>
  );
};

export default Sidebar;
