import React, { useState, useEffect } from 'react';
import {
  Dialog,
  FormGroup,
  InputGroup,
  Classes,
  Button,
  Intent
} from '@blueprintjs/core';
import { RedisConnection } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => null;
  addEditConnection: () => null;
  connection?: RedisConnection;
}

const MAX_PORT = 65535;
const MIN_PORT = 1024;

const INITIAL_FORM_STATE = {
  db: '',
  host: '',
  port: '6379',
  password: '',
  name: ''
};

const ConnectionDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  addEditConnection,
  connection: connectionProp
}) => {
  const [connection, setConnection] = useState<RedisConnection>(
    connectionProp || INITIAL_FORM_STATE
  );

  useEffect(() => {
    setConnection({ ...INITIAL_FORM_STATE, ...connectionProp });
  }, [connectionProp]);

  const isConnectionValid = (): boolean => {
    const port = parseInt(connection.port, 10);
    return !!(
      connection.name &&
      connection.host &&
      port &&
      port > MIN_PORT &&
      port <= MAX_PORT
    );
  };

  const resetFormState = () => {
    setConnection(INITIAL_FORM_STATE);
  };

  const handleAddConnection = () => {
    addEditConnection(connection);
    resetFormState();
  };

  const handleClose = () => {
    onClose();
    resetFormState();
  };

  return (
    <Dialog
      icon="info-sign"
      isOpen={isOpen}
      isCloseButtonShown
      onClose={handleClose}
      canEscapeKeyClose
      canOutsideClickClose
      title={connectionProp?.id ? 'Edit connection' : 'Add new connection'}
    >
      <div className={Classes.DIALOG_BODY}>
        <FormGroup
          label="Connection name"
          labelFor="name-input"
          labelInfo="(required)"
        >
          <InputGroup
            id="name-input"
            value={connection.name}
            onChange={({ target: { value } }) =>
              setConnection(prevState => ({ ...prevState, name: value }))
            }
          />
        </FormGroup>

        <FormGroup label="Host" labelFor="host-input" labelInfo="(required)">
          <InputGroup
            id="host-input"
            value={connection.host}
            onChange={({ target: { value } }) =>
              setConnection(prevState => ({ ...prevState, host: value }))
            }
          />
        </FormGroup>

        <FormGroup
          helperText="default 6379"
          label="Port"
          labelFor="port-input"
          labelInfo="(required)"
        >
          <InputGroup
            id="port-input"
            value={connection.port}
            type="number"
            onChange={({ target: { value } }) =>
              setConnection(prevState => ({ ...prevState, port: value }))
            }
          />
        </FormGroup>

        <FormGroup
          label="Password"
          labelFor="password-input"
          labelInfo="(optional)"
        >
          <InputGroup
            id="password-input"
            value={connection.password}
            onChange={({ target: { value } }) =>
              setConnection(prevState => ({ ...prevState, password: value }))
            }
          />
        </FormGroup>

        <FormGroup label="DB" labelFor="db-input" labelInfo="(optional)">
          <InputGroup
            id="db-input"
            value={connection.db}
            onChange={({ target: { value } }) =>
              setConnection(prevState => ({ ...prevState, db: value }))
            }
          />
        </FormGroup>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleClose}>Close</Button>

          <Button
            disabled={!isConnectionValid()}
            intent={Intent.PRIMARY}
            onClick={handleAddConnection}
          >
            {connectionProp?.id ? 'Edit connection' : 'Add connection'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConnectionDialog;
