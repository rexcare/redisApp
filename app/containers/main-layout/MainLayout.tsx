import React from 'react';
import style from './MainLayout.css';
import { CodeEditor, ResultView } from '../../components';

const MainLayout: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.codeEditor}>
        <CodeEditor />
      </div>
      <div className={style.resultView}>
        <ResultView />
      </div>
    </div>
  );
};

export default MainLayout;
