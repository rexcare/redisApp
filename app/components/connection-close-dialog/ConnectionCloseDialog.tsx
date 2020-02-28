import React from 'react';
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { RedisConnection } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => null;
  connection: RedisConnection;
}

const ConnectionCloseDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  connection
}) => {
  return (
    <Dialog
      icon={IconNames.SMALL_CROSS}
      isOpen={isOpen}
      isCloseButtonShown
      onClose={onClose}
      canEscapeKeyClose
      canOutsideClickClose
      title="Please close the existing connection"
    >
      <div className={Classes.DIALOG_BODY}>
        <p>
          {`You are connected to the server ${
            connection ? connection.name : ''
          } . Please close it to open a new connection !`}
        </p>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose} intent={Intent.PRIMARY}>
            Ok
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConnectionCloseDialog;
