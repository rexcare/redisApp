import React from 'react';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { RedisConnection } from '../../types';
import styles from './ConnectionList.css';

interface Props {
  connection: RedisConnection;
  isActive: boolean;
  onClick: () => void;
  onEdit: () => void;
}

const ConnectionListItem: React.FC<Props> = ({
  connection,
  isActive,
  onClick,
  onEdit
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={isActive ? `${styles.listItem}  ${styles.listItemActive}` : ''}
    >
      <Icon icon={IconNames.DATABASE} iconSize={Icon.SIZE_STANDARD} />
      <div className={styles.connectionName}>{connection.name}</div>
      {isActive && (
        <Icon
          icon={IconNames.EDIT}
          iconSize={Icon.SIZE_STANDARD}
          className={styles.editIcon}
          onClick={onEdit}
        />
      )}
    </div>
  );
};

export default ConnectionListItem;
