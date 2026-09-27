import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/AppLayout.tsx"
import HomePage from "@/pages/HomePage.tsx"
import TripBrowserPage from "@/pages/TripBrowserPage.tsx"
import RouterError from "@/pages/RouterError.tsx"
import RouterLoader from "@/pages/RouterLoader.tsx"

export const router = createBrowserRouter([
    {
        Component: AppLayout,
        ErrorBoundary: RouterError,
        children: [
            {
                index: true,
                Component: HomePage,
                HydrateFallback: RouterLoader
            },
            {
                path: 'browse',
                Component: TripBrowserPage,
                HydrateFallback: RouterLoader,
                loader: async () => {
                    await new Promise(resolve => setTimeout(resolve, 500))
                }
            }
        ]
    }
])