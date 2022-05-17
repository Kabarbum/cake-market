import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../firebase/requests";

const Categories = ({categories}) => {
    const dispatch = useDispatch()
    const selectedCategoryId = useSelector(state => state.products.selectedCategoryId)

    const setCategory = async (categoryId) => {
        dispatch({type: "SET_CATEGORY", payload: categoryId})
        const arr = await fetchProducts(categoryId)
        dispatch({type: "FETCH_PRODUCTS", payload: arr})
    }

    return (
        <div className="categories">
            {categories.map(el =>
                <span
                    className={el.id === selectedCategoryId? "category__item active": "category__item"}
                    key={el.id}
                    onClick={() => setCategory(el.id)}
                >
                    {el.title}</span>
            )}
        </div>
    );
};

export default Categories;