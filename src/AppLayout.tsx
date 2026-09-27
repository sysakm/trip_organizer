import { Outlet } from "react-router-dom"

function AppLayout() {
    return (
        <div>
            <header>
                status bar...
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default AppLayout