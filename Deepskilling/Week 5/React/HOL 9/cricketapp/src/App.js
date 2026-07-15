import React from 'react';
import ListofPlayers from './ListofPlayers';
import IndianPlayers from './IndianPlayers';

function App() {
  const flag = true;

  if (flag === true) {
    return <ListofPlayers />;
  } else {
    return <IndianPlayers />;
  }
}

export default App;
