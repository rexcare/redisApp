import React from 'react';
import ConnectionListItem from './ConnectionListItem';
import { RedisConnection } from '../../types';
import styles from './ConnectionList.css';

interface Props {
  dataSource: Array<RedisConnection>;
  activeConnection: RedisConnection | undefined;
  onConnect: (connection: RedisConnection) => void;
  onDisconnect: (connection: RedisConnection) => void;
  onDeleteConnection: (connection: RedisConnection) => void;
  onEditConnection: (connection: RedisConnection) => void;
}

const ConnectionList: React.FC<Props> = ({
  dataSource,
  activeConnection,
  onDeleteConnection,
  onEditConnection,
  onConnect,
  onDisconnect
}) => {
  return (
    <div className={styles.listWrapper}>
      {Array.isArray(dataSource) &&
        dataSource.map(connection => (
          <ConnectionListItem
            key={connection.id}
            connection={connection}
            isActive={
              activeConnection &&
              connection.id.toLowerCase() === activeConnection.id.toLowerCase()
            }
            onConnect={() => onConnect(connection)}
            onDisconnect={() => onDisconnect(connection)}
            onDelete={() => onDeleteConnection(connection)}
            onEdit={() => onEditConnection(connection)}
          />
        ))}
    </div>
  );
};

export default ConnectionList;
