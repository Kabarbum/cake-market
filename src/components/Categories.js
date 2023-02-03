import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setCategoryAction
} from "../store/reducers/products";
import {useSearchParams} from "react-router-dom";

function Categories() {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.products.categories)

    const selectedCategoryId = useSelector(state => state.products.selectedCategoryId)

    const [, setSearchParams] = useSearchParams();

    const setCategory = async (categoryId) => {
        dispatch(setCategoryAction(categoryId))
        setSearchParams({'category': categoryId})
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