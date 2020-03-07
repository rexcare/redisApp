import React from 'react';
import { useTable } from 'react-table';
import { ResultType } from '../../types';
import styles from './ResultViewer.css';

const columns = [
  { Header: 'Key', accessor: 'key' },
  { Header: 'Value', accessor: 'value' },
  { Header: 'Type', accessor: 'type' }
];

interface Props {
  resultData: any;
}

const getFormattedData = (data): ResultType => {
  if (!data || Object.keys(data).length === 0) {
    return [];
  }

  return Object.keys(data).map(key => ({
    key,
    value: data[key].value,
    type: data[key].type
  }));
};

const ResultViewer: React.FC<Props> = ({ resultData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: getFormattedData(resultData)
  });

  const renderResultTable = () => {
    const renderRows = () => {
      return rows.map(row => {
        prepareRow(row);
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <tr {...row.getRowProps()} key={row.id}>
            {row.cells.map(cell => {
              return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <td key={cell.row.id} {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              );
            })}
          </tr>
        );
      });
    };

    const renderHeader = () => {
      return headerGroups.map(headerGroup => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <th key={column.id} {...column.getHeaderProps()}>
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ));
    };

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <table {...getTableProps()}>
        <thead>{renderHeader()}</thead>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <tbody {...getTableBodyProps()}>{renderRows()}</tbody>
      </table>
    );
  };

  return <div className={styles.wrapper}>{renderResultTable()}</div>;
};

export default ResultViewer;
