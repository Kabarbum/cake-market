import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsAction, setLastVisibleAction, setSelectedSortAction} from "../store/reducers/products";
import {fetchProducts} from "../firebase/requests";

const MySelect = () => {

    const dispatch = useDispatch()
    const sortTypes = useSelector(state => state.products.sortTypes)
    const selectedCategoryId = useSelector(state => state.products.selectedCategoryId)
    const limit = useSelector(state => state.products.limit)

    const handleSelect = async (e) => {
        let value = sortTypes.find(type => type.id === Number(e)).value
        dispatch(setSelectedSortAction(value))
        const products = await fetchProducts(limit, selectedCategoryId, value)
        if (products.length === 0) return

        dispatch(setLastVisibleAction(products[products.length - 1].id))
        dispatch(fetchProductsAction(products))
    }
    return (
        <div className="sortmenu">
            <span>Сортировка: </span>
            <select onChange={e => handleSelect(e.target.value)}>
                {sortTypes.map(type =>
                    <option
                        value={type.id}
                        key={type.id}
                    >{type.title}</option>
                )}
            </select>
        </div>
    );
}

export default MySelect;