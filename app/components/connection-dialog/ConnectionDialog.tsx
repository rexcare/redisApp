import React, { useState } from 'react';
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
  addConnection: () => null;
  connection?: RedisConnection;
}

const ConnectionDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  addConnection,
  connection: connectionProp
}) => {
  const [connection, setConnection] = useState<RedisConnection>(
    connectionProp || {}
  );

  return (
    <Dialog
      icon="info-sign"
      isOpen={isOpen}
      isCloseButtonShown
      onClose={onClose}
      canEscapeKeyClose
      canOutsideClickClose
      title="Add new connection"
    >
      <div className={Classes.DIALOG_BODY}>
        <FormGroup
          label="Connection name"
          labelFor="name-input"
          labelInfo="(required)"
          inline
        >
          <InputGroup
            id="name-input"
            value={connection.name}
            onChange={({ target: { value } }) =>
              setConnection(prevState => ({ ...prevState, name: value }))
            }
          />
        </FormGroup>

        <FormGroup
          label="Host"
          labelFor="host-input"
          labelInfo="(required)"
          inline
        >
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
          inline
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
          inline
        >
          <InputGroup
            id="password-input"
            value={connection.password}
            onChange={({ target: { value } }) =>
              setConnection(prevState => ({ ...prevState, password: value }))
            }
          />
        </FormGroup>

        <FormGroup label="DB" labelFor="db-input" labelInfo="(optional)" inline>
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
          <Button onClick={onClose}>Close</Button>

          <Button
            intent={Intent.PRIMARY}
            onClick={() => addConnection(connection)}
          >
            Add connection
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConnectionDialog;
