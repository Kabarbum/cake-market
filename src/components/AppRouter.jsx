import React from 'react';
import {Route, Routes} from "react-router-dom";
import {adminRoutes, publicRoutes} from "../router";
import Catalog from "../pages/Catalog";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const isAuth = useSelector(state => state.admin.isAuth)

    return (isAuth
            ?
            <Routes>
                {adminRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Catalog/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(el =>
                    <Route
                        path={el.path}
                        element={el.element}
                        exact={el.exact}
                        key={el.path}
                    />
                )}
                <Route path="*" element={<Catalog/>}/>
            </Routes>

    );
};

export default AppRouter;