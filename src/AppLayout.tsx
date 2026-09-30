import {NavLink, Outlet} from "react-router-dom"

function AppLayout() {
    return (
        <div className='app-shell'>
            <header className='app-header'>
                <NavLink className='app-header__brand' to='/'>Trip Organizer</NavLink>
                <nav className='app-header__nav' aria-label='Main navigation'>
                    <NavLink className={({isActive}) => `app-header__link${isActive ? ' app-header__link--active' : ''}`} to='/'>Home</NavLink>
                    <NavLink className={({isActive}) => `app-header__link${isActive ? ' app-header__link--active' : ''}`} to='/create'>Create trip</NavLink>
                    <NavLink className={({isActive}) => `app-header__link${isActive ? ' app-header__link--active' : ''}`} to='/browse'>Browse trips</NavLink>
                </nav>
            </header>
            <main className='app-main'>
                <Outlet/>
            </main>
        </div>
    )
}

export default AppLayout
