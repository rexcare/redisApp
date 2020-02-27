import React, { useRef, useState, useEffect } from 'react';
import { Column, Table } from '@blueprintjs/table';
import styles from './ResultViewer.css';

const data = [
  {
    key: 'a',
    type: 'string',
    val: 'hello'
  }
];

const SIDEBAR_MAX_WIDTH = 400;

const ResultViewer = () => {
  const parentEl = useRef(null);

  const [parentElWidth, setParentElWidth] = useState<number>(200);

  const columnNameRenderer = (name: string) => {
    return <div>{name}</div>;
  };

  const handleResize = () => {
    if (parentEl && parentEl.current) {
      const maxAvailWidthForEl = window.screen.availWidth - SIDEBAR_MAX_WIDTH;
      const elCurrentWidth = parentEl.current.clientWidth;

      const width =
        elCurrentWidth > maxAvailWidthForEl
          ? maxAvailWidthForEl
          : elCurrentWidth;

      setParentElWidth(width / 3);
    }
  };

  useEffect(() => {
    window.onresize = handleResize;
  }, []);

  return (
    <div className={styles.wrapper} ref={parentEl}>
      <Table numRows={10} columnWidths={Array(3).fill(parentElWidth)}>
        <Column name="Key" nameRenderer={columnNameRenderer} />
        <Column name="Value" />
        <Column name="Type" />
      </Table>
    </div>
  );
};

export default ResultViewer;
