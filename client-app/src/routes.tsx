import HomePage from './components/HomePage';
import DefaultLayout from './components/containers/DefaultLayout';
import { RouteObject } from 'react-router-dom';

export interface CustomRouteObject extends RouteObject {
    name: string
}

const routes: RouteObject[] = [
    {

        element: <DefaultLayout />,
        children: [
            { path: "*", element: <HomePage /> },
        ]
    }
]

export default routes;