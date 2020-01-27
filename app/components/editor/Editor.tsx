import React, { useState } from 'react';
import MonacoEditorReact from 'react-monaco-editor';
import { editor as MonacoEditor } from 'monaco-editor';
import styles from './Editor.css';

const Editor: React.FC = () => {
  const [code, setCode] = useState('');

  const options: MonacoEditor.IEditorConstructionOptions = {};

  return <div>editor</div>;
};

export default Editor;
