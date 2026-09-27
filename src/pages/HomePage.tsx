import {Link} from "react-router-dom"

function HomePage() {
    return (
        <>
            <h1>Trip Organizer - Home</h1>
            <Link to='/create'>Create new trip</Link>
        </>
    )
}

export default HomePage