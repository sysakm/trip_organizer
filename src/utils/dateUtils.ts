export function createDateIntervalUtil(startDate: string, endDate: string): Array<string> {
    const curDate = new Date(startDate)
    const end = new Date(endDate)

    const dates: Array<string> = []
    while (curDate <= end) {
        dates.push((new Date(curDate)).toISOString().slice(0, 10))
        curDate.setDate(curDate.getDate() + 1)
    }
    return dates
}

export function formatDateUtil(date: string) {
    const dateObj = new Date(date)
    return `${dateObj.toDateString()}`
}