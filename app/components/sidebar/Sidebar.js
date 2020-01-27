import React, { useState } from 'react';
import styles from './Sidebar.css';
import Header from './Header';

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('asdad');

  return (
    <div className={styles.container}>
      <Header onChangeSearch={setSearchTerm} searchTerm={searchTerm} />
      <div className={styles.connectionlist}>connectionlist</div>
    </div>
  );
};

export default Sidebar;
