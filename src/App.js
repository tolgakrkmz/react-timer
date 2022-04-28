import React, { useState } from 'react'
import List from './components/List';
import Timer from './components/Timer';

function App() {
  const [seconds, setSeconds] = useState(1);

  function handleIncrementSeconds() {
    setSeconds((prevSeconds) => prevSeconds + 1);
  }

  function handleResetSeconds() {
    setSeconds(1);
  }

  return (
    <>
      <Timer seconds={seconds} incrementSeconds={handleIncrementSeconds} resetSeconds={handleResetSeconds} />
      <List seconds={seconds} />
    </>
  );
}

export default App;