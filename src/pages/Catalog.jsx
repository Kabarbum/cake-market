import React, {useEffect} from 'react';
import Categories from "../components/Categories";
import Products from "../components/Products";
import {useDispatch, useSelector} from "react-redux";
import {initProducts} from "../asnycAction/products";
import {initCategories} from "../asnycAction/categories";

const Catalog = () => {
    const dispatch = useDispatch()
    const limit = useSelector(state => state.products.limit)
    const categoryId = useSelector(state => state.products.selectedCategoryId)

    useEffect(() => {
        dispatch(initProducts(limit, categoryId))
        dispatch(initCategories())
    }, [categoryId, limit, dispatch])
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