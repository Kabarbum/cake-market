import React from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "../router";
import Catalog from "../pages/Catalog";

const AppRouter = () => {

    return (
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