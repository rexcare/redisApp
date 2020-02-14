import React from 'react';
import ConnectionListItem from './ConnectionListItem';
import { RedisConnection } from '../../types';
import styles from './ConnectionList.css';

interface Props {
  dataSource: Array<RedisConnection>;
  onClick: (connection: RedisConnection) => void;
  onEdit: (connection: RedisConnection) => void;
  activeConnection: RedisConnection | undefined;
}

const ConnectionList: React.FC<Props> = ({
  dataSource,
  activeConnection,
  onClick,
  onEdit
}) => {
  return (
    <div className={styles.listWrapper}>
      {Array.isArray(dataSource) &&
        dataSource.map((connection, index) => (
          <ConnectionListItem
            key={index}
            connection={connection}
            isActive={
              activeConnection &&
              connection.host.toLowerCase() ===
                activeConnection.host.toLowerCase()
            }
            onClick={() => onClick(connection)}
            onEdit={() => onEdit(connection)}
          />
        ))}
    </div>
  );
};

export default ConnectionList;
