import React, {useEffect, useState} from 'react';
import AdminProducts from "../components/AdminProducts";
import AdminFillings from "../components/AdminFillings";
import {useDispatch} from "react-redux";
import {fetchProductsAction, setLastVisibleAction, setProductPreLoadingAction} from "../store/reducers/products";
import {fetchProducts} from "../firebase/requests";
import AdminCategories from "../components/AdminCategories";

const Admin = () => {
    const [page, setPage] = useState(0)
    const dispatch = useDispatch()

    const initProducts = async () => {
        dispatch(setProductPreLoadingAction(true))
        const products = await fetchProducts(50)
        dispatch(setLastVisibleAction(products[products.length - 1].id))
        dispatch(fetchProductsAction(products))
        dispatch(setProductPreLoadingAction(false))
    }

    useEffect(() => {
        initProducts()
    }, [])

    return (
        <main>
            <div className="container admin-container">
                <div className="admin-header">
                    <div onClick={() => setPage(0)} className={page === 0 ? "active" : null}>Каталог</div>
                    <div onClick={() => setPage(1)} className={page === 1 ? "active" : null}>Начинки</div>
                    <div onClick={() => setPage(2)} className={page === 2 ? "active" : null}>Категории</div>
                </div>
                <div className="admin-content">
                    {/*{page === 0*/}
                    {/*    ? <AdminProducts initProducts={initProducts}/>*/}
                    {/*    : <AdminFillings/>*/}
                    {/*}*/}
                    {page === 0 && <AdminProducts initProducts={initProducts}/>}
                    {page === 1 && <AdminFillings/>}
                    {page === 2 && <AdminCategories/>}
                </div>
            </div>
        </main>
    );
};

export default Admin;