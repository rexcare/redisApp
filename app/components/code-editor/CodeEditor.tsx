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

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('keys');

  const options: Editor.editor.IEditorConstructionOptions = {
    automaticLayout: true,
    scrollBeyondLastLine: false,
    cursorBlinking: 'smooth',
    minimap: { enabled: false },
    lineNumbers: 'off'
  };

  const onChangeCode = (_, val) => setCode(val);

  return (
    <div>
      <MonacoEditor
        theme="dark"
        width="500px"
        language="redis"
        value={code}
        options={options}
        onChange={onChangeCode}
      />
    </div>
  );
};

export default CodeEditor;
