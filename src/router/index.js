import React from 'react'
import Catalog from "../pages/Catalog";
import Order from "../pages/Order";
import Admin from "../pages/Admin";
import Fillings from "../pages/Fillings";
import Auth from "../pages/Auth";


export const publicRoutes = [
    {path: '', exact: true, element: <Catalog/>},
    {path: '/order', exact: true, element: <Order/>},
    {path: '/fillings', exact: true, element: <Fillings/>},
    {path: '/auth', exact: true, element: <Auth/>},
]
export const adminRoutes = [
    ...publicRoutes,
    {path: '/admin', exact: true, element: <Admin/>},

]
