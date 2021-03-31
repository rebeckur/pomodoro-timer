export const CountdownAction = {
    SET_STATUS: "SET_STATUS",
    SET_PROGRESS: "SET_PROGRESS",
    SET_TIME_LEFT: "SET_TIME_LEFT",
    PAUSE_TIMER: "PAUSE_TIMER",
    RESET_TIMER: "RESET_TIMER",
    SET_NEXT_TIMER: "SET_NEXT_TIMER",
}

export const setStatus = (status) => ({
    type: CountdownAction.SET_STATUS,
    status,
})

export const setProgress = (progress) => ({
    type: CountdownAction.SET_PROGRESS,
    progress,
})

export const setTimerTimeLeft = (timeLeft) => ({
    type: CountdownAction.SET_TIME_LEFT,
    timeLeft,
})

export const pauseTimer = () => ({
    type: CountdownAction.PAUSE_TIMER,
})

export const resetTimer = (duration) => ({
    type: CountdownAction.RESET_TIMER,
    duration,
})

export const setNextTimer = (settings) => ({
    type: CountdownAction.SET_NEXT_TIMER,
    settings,
})
