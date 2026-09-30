import {tripsSelector} from "@/app/selectors.ts"
import {useAppSelector} from "@/app/hooks.ts"
import {dateDifferenceUtil} from "@/utils/dateUtils.ts"
import type {Trip} from "@/types/tripTypes.ts"

function HomePage() {
    const trips = useAppSelector(tripsSelector)

    const earliestDate = trips.reduce((dt: null | string, trip) =>
        !dt || trip.startDate.localeCompare(dt) < 0 ? trip.startDate : dt, null)
    const latestDate = trips.reduce((dt: null | string, trip) =>
        !dt || trip.endDate.localeCompare(dt) > 0 ? trip.endDate : dt, null)
    const longestTrip = trips.reduce(
        (longest: null | [Trip, number], trip) => {
            const tripLength = dateDifferenceUtil(trip.startDate, trip.endDate) + 1
            if (!longest || longest[1] < tripLength) {
                return [trip, tripLength] as [Trip, number]
            }
            return longest
        },
        null
    )
    const totalBudget = trips.reduce((budg, trip) => budg + trip.budget, 0)

    return (
        <>
            <h1>Trip Organizer - Home</h1>
            <div>
                <p>{trips.length > 0 ? `Currently tracking ${trips.length} trips.` : 'No trips created yet.'}</p>
                {earliestDate && latestDate && (<p>Tracking trips from {earliestDate} to {latestDate}.</p>)}
                {longestTrip && (
                    <p>
                        Longest trip is {longestTrip[0].name} - {longestTrip[1]} days, from {longestTrip[0].startDate} to {longestTrip[0].endDate}.
                    </p>
                )}
                {totalBudget > 0 && (<p>Total budget is ${totalBudget}.</p>)}
            </div>
        </>
    )
}

export default HomePage