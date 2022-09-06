import React, {useEffect, useState} from 'react';
import AdminProducts from "../components/admin/AdminProducts";
import AdminFillings from "../components/admin/AdminFillings";
import AdminCategories from "../components/admin/AdminCategories";
import AdminCalendar from "../components/admin/AdminCalendar";
import {useDispatch, useSelector} from "react-redux";
import {initCategories, initProducts} from "../asnycAction/products";

const Admin = () => {
    const [page, setPage] = useState(0)

    const dispatch = useDispatch()
    const limit = useSelector(state => state.products.limit)
    const categoryId = useSelector(state => state.products.selectedCategoryId)

    useEffect(() => {
        dispatch(initProducts(limit, categoryId))
        dispatch(initCategories())
    }, [categoryId, limit, dispatch])

    return (
        <main>
            <div className="container admin-container">
                <div className="admin-header">
                    <div onClick={() => setPage(0)} className={page === 0 ? "active" : null}>Каталог</div>
                    <div onClick={() => setPage(1)} className={page === 1 ? "active" : null}>Начинки</div>
                    <div onClick={() => setPage(2)} className={page === 2 ? "active" : null}>Категории</div>
                    <div onClick={() => setPage(3)} className={page === 3 ? "active" : null}>Календарь</div>
                </div>
                <div className="admin-content">
                    {page === 0 && <AdminProducts/>}
                    {page === 1 && <AdminFillings/>}
                    {page === 2 && <AdminCategories/>}
                    {page === 3 && <AdminCalendar/>}
                </div>
            </div>
        </main>
    );
};

export default Admin;