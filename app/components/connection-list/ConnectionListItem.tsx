import React from 'react';
import { Icon, Popover, Spinner } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { RedisConnection } from '../../types';
import ConnectionListPopover from './ConnectionListPopover';
import styles from './ConnectionList.css';

interface Props {
  connection: RedisConnection;
  isActive: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ConnectionListItem: React.FC<Props> = ({
  connection,
  isActive,
  onEdit,
  onConnect,
  onDisconnect,
  onDelete,
  isConnecting
}) => {
  return (
    <div
      role="button"
      className={
        isActive
          ? `${styles.listItem}  ${styles.listItemActive}`
          : styles.listItem
      }
    >
      <Icon icon={IconNames.DATABASE} iconSize={Icon.SIZE_STANDARD} />
      <div className={styles.connectionName}>{connection.name}</div>
      {isConnecting ? (
        <Spinner size={Spinner.SIZE_SMALL} />
      ) : (
        <Popover
          content={
            <ConnectionListPopover
              onDisconnect={onDisconnect}
              onConnect={onConnect}
              onEdit={onEdit}
              onDelete={onDelete}
              isOpen={isActive}
            />
          }
        >
          <Icon
            icon={IconNames.MORE}
            iconSize={Icon.SIZE_STANDARD}
            style={{ cursor: 'pointer' }}
          />
        </Popover>
      )}
    </div>
  );
};

export default ConnectionListItem;
