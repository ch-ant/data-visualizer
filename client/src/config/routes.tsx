import IRoute from '../interfaces/route';
import HomePage from '../pages/home';
import Visualization from '../pages/visualization';

const mainRoutes: IRoute[] = [
    {
        path: '/home',
        element: <HomePage />
    },
    {
        path: '/visual',
        element: <Visualization />
    }
];

const routes: IRoute[] = [...mainRoutes];

// Alternative routes implementation

// const home: IRoute = {
//     path: '/home',
//     element: <HomePage />
// };

// const visualization: IRoute = {
//     path: '/visual',
//     element: <Visualization />
// };

// const routes = [home, visualization];

export default routes;
