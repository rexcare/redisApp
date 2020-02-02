import React from 'react';
import { Icon } from '@blueprintjs/core';
import styles from './ConnectionList.css';
import { RedisConnection } from '../../types';

interface ListItemProps {
  connection: RedisConnection;
}

const ListItem: React.FC<ListItemProps> = ({ connection }) => {
  return (
    <div className={styles.listItemContainer}>
      <Icon icon="chevron-down" iconSize={20} />
      <div className={styles.connectionName}>{connection.name}</div>
    </div>
  );
};

interface Props {
  dataSource: Array<RedisConnection>;
}

const ConnectionList: React.FC<Props> = ({ dataSource }) => {
  const renderList = () =>
    dataSource.map((item, index) => <ListItem connection={item} key={index} />);

  return <div>{renderList()}</div>;
};

export default ConnectionList;
