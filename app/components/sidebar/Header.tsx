import React from 'react';
import { Button } from '@blueprintjs/core';
import styles from './Header.css';

type Props = {
  searchTerm: string;
  onChangeSearch: (searchTerm: string) => null;
  showConnectionDialog: () => null;
};

const Header: React.FC<Props> = ({
  searchTerm,
  onChangeSearch,
  showConnectionDialog
}) => {
  return (
    <div className={styles.container}>
      <div className="bp3-input-group .modifier">
        <input
          className="bp3-input"
          type="search"
          placeholder="Search connection"
          dir="auto"
          value={searchTerm}
          onChange={({ target: { value } }) => onChangeSearch(value)}
        />
      </div>
      <Button icon="plus" onClick={showConnectionDialog} />
    </div>
  );
};

export default Header;
