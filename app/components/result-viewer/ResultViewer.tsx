import React from 'react';
import { Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import ResultTable from './ResultTable';
import styles from './ResultViewer.css';

interface Props {
  resultData: any;
  getValueForKey: (key: string, type: string) => void;
}

const ComplexCell = ({ cell: { value } }) => {
  // eslint-disable-next-line react/no-array-index-key
  return value.map((item, idx) => <div key={idx}>{`${idx + 1}. ${item}`}</div>);
};

const GetValueBtn = cell => {
  return <Button icon={IconNames.REFRESH}>Get Value</Button>;
};

const columns = [
  {
    Header: 'Key',
    accessor: 'key',
    className: styles.columnLg
  },
  { Header: 'Type', accessor: 'type', className: styles.columnSm },
  {
    Header: 'Value',
    accessor: 'value',
    className: styles.columnLg,
    ComplexCell,
    GetValueBtn
  }
];

const ResultViewer: React.FC<Props> = ({ resultData, getValueForKey }) => {
  const handleCellClick = cellInfo => {
    const header = cellInfo && cellInfo.column ? cellInfo.column.Header : '';

    if (!header || header !== 'Value') {
      return;
    }

    const key = cellInfo.row.cells[0].value;
    const type = cellInfo.row.cells[1].value;

    getValueForKey(key, type);
  };

  return (
    <ResultTable
      handleCellClick={handleCellClick}
      data={resultData}
      columns={columns}
      getCellProps={cellInfo => ({
        onClick: () => {
          handleCellClick(cellInfo);
        }
      })}
    />
  );
};

export default ResultViewer;
