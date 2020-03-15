import React from 'react';
import ResultTable from './ResultTable';

interface Props {
  resultData: any;
}

const columns = [
  { Header: 'Key', accessor: 'key' },
  { Header: 'Value', accessor: 'value' },
  { Header: 'Type', accessor: 'type' }
];

const ResultViewer: React.FC<Props> = ({ resultData }) => {
  return <ResultTable data={resultData} columns={columns} />;
};

export default ResultViewer;
