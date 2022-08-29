import Catalog from "../pages/Catalog";
import Order from "../pages/Order";
import Fillings from "../pages/Fillings";


export const publicRoutes = [
    {path: '', exact: true, element: <Catalog/>},
    {path: '/order', exact: true, element: <Order/>},
    {path: '/fillings', exact: true, element: <Fillings/>},
]
