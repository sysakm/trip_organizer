import {
    type Trip,
    type TripActivity,
    type TripExpense,
    type TripLocation,
    type TripTask,
    TripTaskCategories
} from "@/types/tripTypes.ts"
import type {RootState} from "@/app/store.ts"

function validateUniqueIds<T extends {id: number}>(entries: Array<T>) {
    const encountered = new Set<number>()
    for (const entry of entries) {
        if (typeof entry.id !== 'number' || entry.id <= 0 || !Number.isInteger(entry.id) || encountered.has(entry.id)) {
            return false
        } else {
            encountered.add(entry.id)
        }
    }
    return true
}

function validateTripIdsPresent<T extends {tripId: number}>(entries: Array<T>, trips: Array<Trip>) {
    const tripIds = trips.map(trip => trip.id)
    for (const entry of entries) {
        if (!tripIds.includes(entry.tripId)) {
            return false
        }
    }
    return true
}

function validateNonEmptyString(str: string) {
    return !!str.trim()
}

function validateISODateString(date: string) {
    if (date.length !== 10) return false
    const parts = date.split('-')
    if (parts.length !== 3) return false

    const [yearStr, monthStr, dayStr] = parts
    if (yearStr.length !== 4 || monthStr.length !== 2 || dayStr.length !== 2) return false

    const year = Number(yearStr)
    const month = Number(monthStr)
    const day = Number(dayStr)
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return false
    if (year <= 0 || month <= 0 || day <= 0) return false
    const parsedDate = new Date(year, month - 1, day)

    return (
        parsedDate.getFullYear() === year &&
        parsedDate.getMonth() === month - 1 &&
        parsedDate.getDate() === day
    )
}

function validateISOTimeString(time: string) {
    if (time.length !== 5) return false
    const parts = time.split(':')
    if (parts.length !== 2) return false

    const [hourStr, minStr] = parts
    if (hourStr.length !== 2 || minStr.length !== 2) return false

    const hour = Number(hourStr);
    const min = Number(minStr);
    if (Number.isNaN(hour) || Number.isNaN(min)) return false

    return (
        hour >= 0 && hour < 24 &&
        min >= 0 && min < 60
    )
}

function validateMoneyNumber(value: number, allowZero: boolean, allowNonInteger: boolean) {
    if (isNaN(value) || !isFinite(value)) return false
    if (value < 0) return false
    if (value === 0 && !allowZero) return false
    return allowNonInteger || Number.isInteger(value)
}

function validateTrip(trip: unknown): trip is Trip {
    if (typeof trip !== 'object' || trip === null) return false
    if (!('id' in trip)) return false
    if (!('startDate' in trip) || typeof trip.startDate !== 'string' || !validateISODateString(trip.startDate)) return false
    if (!('endDate' in trip) || typeof trip.endDate !== 'string' || !validateISODateString(trip.endDate)) return false
    if (trip.startDate.localeCompare(trip.endDate) > 0) return false
    if (!('name' in trip) || typeof trip.name !== 'string' || !validateNonEmptyString(trip.name)) return false
    if (!('budget' in trip) || typeof trip.budget !== 'number' || !validateMoneyNumber(trip.budget, false, false)) return false
    return true
}

function validateActivity(activity: unknown): activity is TripActivity {
    if (typeof activity !== 'object' || activity === null) return false
    if (!('id' in activity)) return false
    if (!('tripId' in activity)) return false
    if (!('date' in activity) || typeof activity.date !== 'string' ||
        (activity.date !== '' && !validateISODateString(activity.date))) return false
    if (('time' in activity) && (activity.time !== undefined) &&
        (typeof activity.time !== 'string' || !validateISOTimeString(activity.time))) return false
    if (!('name' in activity) || typeof activity.name !== 'string' || !validateNonEmptyString(activity.name)) return false
    return true
}

function validateLocation(location: unknown): location is TripLocation {
    if (typeof location !== 'object' || location === null) return false
    if (!('id' in location)) return false
    if (!('tripId' in location)) return false
    if (!('startDate' in location) || typeof location.startDate !== 'string' || !validateISODateString(location.startDate)) return false
    if (!('endDate' in location) || typeof location.endDate !== 'string' || !validateISODateString(location.endDate)) return false
    if (location.startDate.localeCompare(location.endDate) > 0) return false
    if (!('name' in location) || typeof location.name !== 'string' || !validateNonEmptyString(location.name)) return false
    return true
}

function validateExpense(expense: unknown): expense is TripExpense {
    if (typeof expense !== 'object' || expense === null) return false
    if (!('id' in expense)) return false
    if (!('tripId' in expense)) return false
    if (!('name' in expense) || typeof expense.name !== 'string' || !validateNonEmptyString(expense.name)) return false
    if (!('price' in expense) || typeof expense.price !== 'number' ||
        !validateMoneyNumber(expense.price, false, true)) return false
    if (!('paid' in expense) || !(
            expense.paid === null ||
            (
                typeof expense.paid === 'number' &&
                validateMoneyNumber(expense.paid, true, true)
            )
        )) return false
    return true
}

function validateTask(task: unknown): task is TripTask {
    if (typeof task !== 'object' || task === null) return false
    if (!('id' in task)) return false
    if (!('tripId' in task)) return false
    if (!('description' in task) || typeof task.description !== 'string' || !validateNonEmptyString(task.description)) return false
    if (!('category' in task) || typeof task.category !== 'string' ||
        !TripTaskCategories.includes(task.category as (typeof TripTaskCategories)[number])) return false
    if (!('done' in task) || typeof task.done !== 'boolean') return false
    return true
}

function validateArray(array: unknown): array is Array<unknown> {
    return Array.isArray(array)
}

export function validateRootState(state: unknown): state is RootState {
    if (typeof state !== 'object' || state === null) return false

    if (!('trips' in state) || !validateArray(state.trips)) return false
    if (!state.trips.every(trip => validateTrip(trip))) return false
    if (!validateUniqueIds(state.trips)) return false

    if (!('activities' in state) || !validateArray(state.activities)) return false
    if (!state.activities.every(activity => validateActivity(activity))) return false
    if (!validateUniqueIds(state.activities)) return false
    if (!validateTripIdsPresent(state.activities, state.trips)) return false

    if (!('locations' in state) || !validateArray(state.locations)) return false
    if (!state.locations.every(location => validateLocation(location))) return false
    if (!validateUniqueIds(state.locations)) return false
    if (!validateTripIdsPresent(state.locations, state.trips)) return false

    if (!('expenses' in state) || !validateArray(state.expenses)) return false
    if (!state.expenses.every(expense => validateExpense(expense))) return false
    if (!validateUniqueIds(state.expenses)) return false
    if (!validateTripIdsPresent(state.expenses, state.trips)) return false

    if (!('tasks' in state) || !validateArray(state.tasks)) return false
    if (!state.tasks.every(task => validateTask(task))) return false
    if (!validateUniqueIds(state.tasks)) return false
    if (!validateTripIdsPresent(state.tasks, state.trips)) return false

    return true
}