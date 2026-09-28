import {useAppDispatch} from "@/app/hooks.ts"
import {createTripUtil} from "@/utils/tripUtils.ts"
import {addTrip} from "@/features/trips/tripsSlice.ts"
import TripEditorForm from "@/components/TripEditorForm.tsx"

function TripCreationPage() {
    const dispatch = useAppDispatch()

    return (
        <>
            <h1>Create New Trip:</h1>
            <TripEditorForm submitAction={
                (id: number, name: string, startDate: string, endDate: string) => {
                    dispatch(addTrip(createTripUtil(id, name, startDate, endDate)))
                }
            }/>
        </>
    )
}

export default TripCreationPage