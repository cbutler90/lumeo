// @TODO: move to lib

export interface Runtime {
    hours: number
    minutes: number
    seconds: number
}

export function formatRuntime(runtime: Runtime): string {
    const { hours, minutes, seconds } = runtime
    const formattedHours = String(hours).padStart(2, "0")
    const formattedMinutes = String(minutes).padStart(2, "0")
    const formattedSeconds = String(seconds).padStart(2, "0")
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

export function incrementRuntime(runtime: Runtime): Runtime {
    let { hours, minutes, seconds } = runtime

    seconds++
    if (seconds >= 60) {
        seconds = 0
        minutes++

        if (minutes >= 60) {
            minutes = 0
            hours++
        }
    }

    return { hours, minutes, seconds }
}  