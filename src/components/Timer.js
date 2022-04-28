import React, { useRef } from 'react'
import { formatHours } from '../utils/format';

const Timer = (props) => {
    const intervalId = useRef(0)

    function handleStartButtonClick() {
        clearInterval(intervalId.current);
        intervalId.current = setInterval(() => {
            props.incrementSeconds();
        }, 1000);
    }

    function handleStopButtonClick() {
        props.stopSeconds();
        clearInterval(intervalId.current);
    }

    function handlePauseButtonClick() {
        clearInterval(intervalId.current)
    }
    return (
        <>
            <span>{formatHours(props.seconds)}</span>
            <button type="button" onClick={handleStartButtonClick}>Start</button>
            <button type="button" onClick={handleStopButtonClick}>Stop</button>
            <button type="button" onClick={handlePauseButtonClick}>Pause</button>
        </>
    )
}

export default Timer;