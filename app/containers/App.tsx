import * as React from 'react';

type Props = {
  children: React.Node;
};

const App: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default App;
