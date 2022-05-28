import React, {useEffect} from 'react';
import Categories from "../components/Categories";
import Products from "../components/Products";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCategoriesAction,
    fetchProductsAction,
    setLastVisibleAction,
    setProductPreLoadingAction
} from "../store/reducers/products";
import {fetchCategories, fetchProducts} from "../firebase/requests";

const Catalog = () => {
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
            <div className="container">

                <Categories/>
                <Products/>

            </div>
        </main>
    );
};

export default Catalog;