import React, { useState } from 'react';
import MonacoEditor, { monaco } from '@monaco-editor/react';
import Editor from 'monaco-editor';

const path = require('path');

const uriFromPath = _path => {
  let pathName = path.resolve(_path).replace(/\\/g, '/');

  if (pathName.length > 0 && pathName.charAt(0) !== '/') {
    pathName = `/${pathName}`;
  }
  return encodeURI(`file://${pathName}`);
};

monaco.config({
  urls: {
    monacoLoader: uriFromPath(
      path.join(__dirname, '../node_modules/monaco-editor/min/vs/loader.js')
    ),
    monacoBase: uriFromPath(
      path.join(__dirname, '../node_modules/monaco-editor/min/vs')
    )
  }
});

interface OwnProps {
  disabled: boolean;
}

type Props = OwnProps;

const CodeEditor: React.FC<Props> = ({ disabled }) => {
  const [code, setCode] = useState<string>('');

  const options: Editor.editor.IEditorConstructionOptions = {
    automaticLayout: true,
    scrollBeyondLastLine: false,
    cursorBlinking: 'smooth',
    minimap: { enabled: false },
    lineNumbers: 'off'
  };

  const onChangeCode = (_, val) => setCode(val);

  return (
    <MonacoEditor
      theme="dark"
      language="redis"
      value={code}
      options={{ ...options, readOnly: disabled }}
      onChange={onChangeCode}
    />
  );
};

export default CodeEditor;
