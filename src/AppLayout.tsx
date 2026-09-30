import {NavLink, Outlet} from "react-router-dom"

function AppLayout() {
    return (
        <div>
            <header>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/create'>Create new trip</NavLink>
                <NavLink to='/browse'>Browse trips</NavLink>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default AppLayout