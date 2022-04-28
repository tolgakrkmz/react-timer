import React, { useState } from 'react'
import List from './components/List';
import Timer from './components/Timer'


function App() {
  const [seconds, setSeconds] = useState(1);

  function handleIncrementSeconds() {
    setSeconds((prevSeconds) => prevSeconds + 1);
  }

  function handleStopTimer() {
    setSeconds(1);
  }

  return (
    <>
      <Timer seconds={seconds} incrementSeconds={handleIncrementSeconds} stopSeconds={handleStopTimer} />
      <List seconds={seconds} />
    </>
  )
}

export default App