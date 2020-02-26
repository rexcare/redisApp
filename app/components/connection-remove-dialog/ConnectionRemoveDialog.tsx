import React from 'react';
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { RedisConnection } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => null;
  deleteConnection: () => null;
  connection: RedisConnection;
}

const ConnectionDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  deleteConnection,
  connection
}) => {
  return (
    <Dialog
      icon={IconNames.DELETE}
      isOpen={isOpen}
      isCloseButtonShown
      onClose={onClose}
      canEscapeKeyClose
      canOutsideClickClose
      title="Delete connection to server"
    >
      <div className={Classes.DIALOG_BODY}>
        <p>
          Are you sure you want to delete connection
          <strong>{connection ? ` ${connection.name}` : ''}</strong> ?
        </p>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Close</Button>

          <Button intent={Intent.DANGER} onClick={deleteConnection}>
            Delete connection
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConnectionDialog;
