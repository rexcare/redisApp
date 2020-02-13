import React, { useState } from 'react';
import { Button } from '@blueprintjs/core';
import { ConnectionDialog } from '../../components';
import styles from './Sidebar.css';

interface Props {
  searchTerm: string;
  onChangeSearch: (searchTerm: string) => null;
  showConnectionDialog: () => null;
}

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isConnectionDialogVisible, setConnectionDialogVisibility] = useState<
    boolean
  >(false);

  const onChangeSearch = (val: string) => setSearchTerm(val);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={`bp3-input-group .modifier ${styles.searchbar}`}>
            <input
              className="bp3-input"
              type="search"
              placeholder="Search connection"
              dir="auto"
              value={searchTerm}
              onChange={({ target: { value } }) => onChangeSearch(value)}
            />
          </div>
          <Button
            icon="plus"
            onClick={() => setConnectionDialogVisibility(true)}
          />
        </div>
        <div className={styles.content}>content</div>
        <div className={styles.footer}>footer</div>
      </div>
      <ConnectionDialog
        isOpen={isConnectionDialogVisible}
        onClose={() => setConnectionDialogVisibility(false)}
        addConnection={connection => console.log(connection)}
      />
    </>
  );
};

export default Sidebar;
