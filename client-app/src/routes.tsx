import { RouteObject } from 'react-router-dom';

import DefaultLayout from './components/containers/DefaultLayout';

import HomePage from './components/HomePage';
import CreateRegion from "./components/Region/CreateRegion"
import CreateHotel from './components/Hotel/CreateHotel';

export interface CustomRouteObject extends RouteObject {
    name: string
}

const routes: RouteObject[] = [
    {
        element: <DefaultLayout />,
        children: [
            { path: "regions/create", element: <CreateRegion /> },
            { path: "hotels/create", element: <CreateHotel /> },
            { path: "*", element: <HomePage /> },
        ]
    }
]

export default routes;