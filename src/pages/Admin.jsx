import React, {useEffect, useState} from 'react';
import AdminProducts from "../components/AdminProducts";
import AdminFillings from "../components/AdminFillings";
import AdminCategories from "../components/AdminCategories";
import AdminCalendar from "../components/AdminCalendar";
import {fetchCategories, fetchProducts} from "../firebase/requests";
import {
    fetchCategoriesAction,
    fetchProductsAction,
    setLastVisibleAction,
    setProductPreLoadingAction
} from "../store/reducers/products";
import {useDispatch, useSelector} from "react-redux";

const Admin = () => {
    const [page, setPage] = useState(0)

    const dispatch = useDispatch()
    const limit = useSelector(state => state.products.limit)

    const initProducts = async () => {
        dispatch(setProductPreLoadingAction(true))
        const products = await fetchProducts(limit)
        dispatch(setLastVisibleAction(products[products.length - 1].id))
        dispatch(fetchProductsAction(products))
        dispatch(setProductPreLoadingAction(false))
    }
    const initCategories = async () => {
        let categories = await fetchCategories()
        categories = categories.sort((a, b) => a.id - b.id)
        dispatch(fetchCategoriesAction(categories))
    }

    useEffect(() => {
        initCategories()
        initProducts()
    }, [])
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