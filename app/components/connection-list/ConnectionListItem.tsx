import React from 'react';
import { Icon, Popover, Position } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { RedisConnection } from '../../types';
import styles from './ConnectionList.css';
import ConnectionListPopover from './ConnectionListPopover';

interface Props {
  connection: RedisConnection;
  isActive: boolean;
  onClick: () => void;
  onEdit: () => void;
  onRightClick: () => void;
}

const ConnectionListItem: React.FC<Props> = ({
  connection,
  isActive,
  onClick,
  onEdit,
  onRightClick
}) => {
  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 1) {
      onRightClick();
    }
  };

  return (
    <div
      role="button"
      onClick={onClick}
      onMouseUp={handleMouseUp}
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
