import {Link, Outlet} from "react-router-dom"

function AppLayout() {
    return (
        <div>
            <header>
                status bar...
                <Link to='/create'>Create new trip</Link>
                <Link to='/browse'>Browse trips</Link>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default AppLayout