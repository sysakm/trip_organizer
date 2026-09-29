export function createDateIntervalUtil(startDate: string, endDate: string): Array<string> {
    const curDate = new Date(startDate)
    const end = new Date(endDate)

    const dates: Array<string> = []
    while (curDate <= end) {
        dates.push((new Date(curDate)).toISOString().slice(0, 10))
        curDate.setUTCDate(curDate.getUTCDate() + 1)
    }
    return dates
}

export function adjustDateUtil(date: string, step: number) {
    const dateObj = new Date(date)
    dateObj.setUTCDate(dateObj.getUTCDate() + step)
    return (new Date(dateObj)).toISOString().slice(0, 10)
}

type OverwriteDateRangeResult =
    | {type: 'split', before: [string, string], after: [string, string]}
    | {type: 'adjust', updated: [string, string]}
    | {type: 'remove'}
    | {type: 'ok'}

export function overwriteDateRangeUtil(
    oldStartDate: string, oldEndDate: string, newStartDate: string, newEndDate: string
): OverwriteDateRangeResult {
    if (oldEndDate.localeCompare(newStartDate) < 0 || oldStartDate.localeCompare(newEndDate) > 0) {
        return {type: 'ok'}
    }
    if (oldStartDate.localeCompare(newStartDate) >= 0 && oldEndDate.localeCompare(newEndDate) <= 0) {
        return {type: 'remove'}
    }
    if (oldStartDate.localeCompare(newStartDate) < 0 && oldEndDate.localeCompare(newEndDate) > 0) {
        return {
            type: 'split',
            before: [oldStartDate, adjustDateUtil(newStartDate, -1)],
            after: [adjustDateUtil(newEndDate, 1), oldEndDate]
        }
    }
    if (oldStartDate.localeCompare(newStartDate) < 0) {
        return {
            type: 'adjust',
            updated: [oldStartDate, adjustDateUtil(newStartDate,-1)]
        }
    }
    return {type: 'adjust', updated: [adjustDateUtil(newEndDate, 1), oldEndDate]}
}

export function changeOuterDateRangeUtil(
    oldStartDate: string, oldEndDate: string, newStartDate: string, newEndDate: string
): OverwriteDateRangeResult {
    if (oldEndDate.localeCompare(newStartDate) < 0 || oldStartDate.localeCompare(newEndDate) > 0) {
        return {type: 'remove'}
    }
    if (oldStartDate.localeCompare(newStartDate) >= 0 && oldEndDate.localeCompare(newEndDate) <= 0) {
        return {type: 'ok'}
    }
    if (oldStartDate.localeCompare(newStartDate) < 0 && oldEndDate.localeCompare(newEndDate) > 0) {
        return {
            type: 'adjust',
            updated: [newStartDate, newEndDate],
        }
    }
    if (oldStartDate.localeCompare(newStartDate) < 0) {
        return {
            type: 'adjust',
            updated: [newStartDate, oldEndDate]
        }
    }
    return {type: 'adjust', updated: [oldStartDate, newEndDate]}
}

export function formatDateUtil(date: string) {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString(undefined, {
        timeZone: 'UTC',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}