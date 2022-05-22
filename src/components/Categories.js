import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../firebase/requests";
import {
    fetchProductsAction,
    setCategoryAction,
    setLastVisibleAction, setProductPreLoadingAction, setProductsExistsAction
} from "../store/reducers/products";

function Categories() {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.products.categories)

    const selectedCategoryId = useSelector(state => state.products.selectedCategoryId)
    const limit = useSelector(state => state.products.limit)

    const setCategory = async (categoryId) => {
        dispatch(setProductPreLoadingAction(true))

        dispatch(setCategoryAction(categoryId))
        const products = await fetchProducts(limit, categoryId)

        dispatch(setProductsExistsAction(true))

        dispatch(setLastVisibleAction(products[products.length - 1].id))
        dispatch(fetchProductsAction(products))

        dispatch(setProductPreLoadingAction(false))
    }

    return (
        <div className="categories">
            {categories.map(el =>
                <span
                    className={el.id === selectedCategoryId ? "category__item active" : "category__item"}
                    key={el.id}
                    onClick={() => setCategory(el.id)}
                >
                    {el.title}</span>
            )}
        </div>
    );
}

export default Categories;