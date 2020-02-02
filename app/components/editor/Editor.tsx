import React, { useState } from 'react';
import MonacoEditorReact from 'react-monaco-editor';
import { editor as MonacoEditor } from 'monaco-editor';
import styles from './Editor.css';

const Editor: React.FC = () => {
  const [code, setCode] = useState('');

  const options: MonacoEditor.IEditorConstructionOptions = {
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    cursorBlinking: 'smooth'
  };

  return (
    <div>
      <MonacoEditorReact
        language="redis"
        value={code}
        width="1000"
        height="600"
        options={options}
      />
    </div>
  );
};

export default Editor;
