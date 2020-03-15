import React from 'react';
import { useTable } from 'react-table';
import styles from './ResultViewer.css';

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

interface Props {
  data: any;
  columns: Array<any>;
  getHeaderProps: any;
  getColumnProps: any;
  getRowProps: any;
  getCellProps: any;
}

const defaultPropGetter = () => ({});

const ResultTable: React.FC<Props> = ({
  data,
  columns,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: getFormattedData(data)
  });

  const renderResultTable = () => {
    const renderRows = () => {
      return rows.map(row => {
        prepareRow(row);
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <tr {...row.getRowProps(getRowProps(row))} key={row.id}>
            {row.cells.map(cell => {
              return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <td
                  key={cell.row.id}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...cell.getCellProps([
                    {
                      className: cell.column.className,
                      style: cell.column.style
                    },
                    getColumnProps(cell.column),
                    getCellProps(cell)
                  ])}
                >
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
            <th
              key={column.id}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...column.getHeaderProps([
                {
                  className: column.className,
                  style: column.style
                },
                getColumnProps(column),
                getHeaderProps(column)
              ])}
            >
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

export default ResultTable;
