/* eslint-disable */
import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/CountdownCircle.css';

import { CountdownType, CountdownStatus } from '../data/reducer';
import { setTimerTimeLeft } from '../data/actions';
import { Box, Typography } from '@material-ui/core';

const CountdownCircle = () => {
    const { workDuration, setWorkDuration } = useState(25*60);
    const { shortBreakDuration, setShortBreakDuration } = useState(5*60);
    const { longBreakDuration, setLongBreakDuration } = useState(15*60);
    
    const { timeLeft, setTimeLeft } = useState(workDuration);
    const { progress, setProgress } = useState(0); // percentage of time elapsed
    const { status, setStatus} = useState<CountdownStatus>(CountdownStatus.ON_HOLD);
    const { type, setType } = useState<CountdownType>(CountdownType.WORK);

    useEffect(() => {
        if (
            status === CountdownStatus.ON_HOLD &&
            type === CountdownType.WORK &&
            workDuration &&
            (!timeLeft || timeLeft.minutes !== workDuration)
        ) {
            let newTime = setTimerTimeLeft({ minutes: workDuration, seconds: 0 })
            setTimeLeft(newTime.timeLeft)
        }
    }, [workDuration])

    useEffect(() => {
        if (
            status === CountdownStatus.ON_HOLD &&
            type === CountdownType.SHORT_BREAK &&
            timeLeft &&
            timeLeft.minutes !== shortBreakDuration
        ) {
            let newTime = setTimerTimeLeft({ minutes: shortBreakDuration, seconds: 0 })
            setTimeLeft(newTime.timeLeft)
        }
    }, [shortBreakDuration])

    useEffect(() => {
        if (
            status === CountdownStatus.ON_HOLD &&
            type === CountdownType.LONG_BREAK &&
            timeLeft &&
            timeLeft.minutes !== longBreakDuration
        ) {
            let newTime = setTimerTimeLeft({ minutes: longBreakDuration, seconds: 0 })
            setTimeLeft(newTime.timeLeft)
        }
    }, [longBreakDuration])

    // to do: handle circle size
    return (
        <div className={`countdown-circle countdown-circle-${'md'}`}>
            <CircularProgress className="circle"
                variant="static"
                value={100}
                size="250px"
                color="secondary"
            />
            <CircularProgress className="circle"
                variant="static"
                value={progress}
                size="250px"
                color="primary"
            />
            {timeLeft && (
                <Time>
                    {timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}
                    {timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds}
                </Time>
            )}
            <Box className="timer-type-container timer-type-container-md">
                <TimerType variant="subtitle2" color="textSecondary">
                    {type === CountdownType.WORK ? 'FOCUS' : 'BREAK'}
                </TimerType>
            </Box>
        </div>
    )
}

const Time = () => {
    return (
        <span className={`time time-${'md'}`}></span>
    )
}

const TimerType = () => {
    // to do: size
    return (
        <Typography classname={`timer-type$`}/>
    )
}

export default { CountdownCircle, Time, TimerType };