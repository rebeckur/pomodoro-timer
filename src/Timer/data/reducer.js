import { CountdownAction } from './actions';

export const CountdownType = {
    WORK: "WORK",
    SHORT_BREAK: "SHORT_BREAK",
    LONG_BREAK: "LONG_BREAK",
}

export const CountdownStatus = {
    ON_HOLD: "ON_HOLD",
    PAUSED: "PAUSED",
    RUNNING: "RUNNING",
}

export const initialState = {
    status: CountdownStatus.ON_HOLD,
    type: CountdownType.WORK,
    progress: 100,
    timeLeft: null,
    currentRound: 1,
    interval: null,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CountdownAction.SET_STATUS:
            return {
                ...state,
                status: action.status,
            }
        
        case CountdownAction.SET_PROGRESS:
            return {
                ...state,
                progress: action.progress,
            }
        
        case CountdownAction.SET_TIME_LEFT:
            const { minutes, seconds } = action.timeLeft

            return {
                ...state,
                timeLeft: {
                    minutes: minutes,
                    seconds: isNaN(seconds) ? 0 : seconds,
                },
            }
        
        case CountdownAction.PAUSE_TIMER:
            clearInterval(state.interval)

            return {
                ...state,
                status: CountdownStatus.PAUSED,
                interval: null,
            }

        case CountdownAction.RESET_TIMER:
            clearInterval(state.interval)
            const timeLeft = { minutes: action.duration, seconds: 0 }

            return {
                ...state,
                status: CountdownStatus.ON_HOLD,
                interval: null,
                timeLeft,
                progress: 100,
            }
        
        case CountdownAction.SET_NEXT_TIMER:
            clearInterval(state.interval)

            const {
                workDuration,
                shortBreakDuration,
                longBreakDuration,
                rounds,
            } = action.settings

            let newType
            let newTimeLeft
            let newCurrentRound = state.currentRound

            if (state.currentRound < rounds) {
                if (state.type === CountdownType.WORK) {
                    newType = CountdownType.SHORT_BREAK
                    newTimeLeft = { minutes: shortBreakDuration, seconds: 0 }
                } else {
                    newType = CountdownType.WORK
                    newTimeLeft = { minutes: workDuration, seconds: 0 }
                    newCurrentRound = state.currentRound + 1
                }
            } else {
                if (state.type === CountdownType.WORK) {
                    newType = CountdownType.LONG_BREAK
                    newTimeLeft = { minutes: longBreakDuration, seconds: 0 }
                } else {
                    newType = CountdownType.WORK
                    newTimeLeft = { minute: workDuration, seconds: 0 }
                    newCurrentRound = 1
                }
            }

            return {
                ...state,
                status: CountdownStatus.ON_HOLD,
                progress: 100,
                interval: null,
                type: newType,
                timeLeft: newTimeLeft,
                currentRound: newCurrentRound,
            }

        default:
            return state

    }
}