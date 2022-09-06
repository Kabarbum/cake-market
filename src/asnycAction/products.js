import {
    fetchMoreProductsAction,
    fetchProductsAction,
    setLastVisibleAction, setProductLoadingAction,
    setProductPreLoadingAction,
    setProductsExistsAction
} from "../store/reducers/products";
import {fetchMoreProducts, fetchProducts} from "../firebase/requests/products";

export const initProducts = (limit, categoryId) => {
    return async dispatch => {
        dispatch(setProductPreLoadingAction(true))

        const products = await fetchProducts(limit, categoryId)

        dispatch(setProductsExistsAction(true))
        dispatch(setLastVisibleAction(products[products.length - 1].id))
        dispatch(fetchProductsAction(products))

        dispatch(setProductPreLoadingAction(false))
    }
}
export const getMoreProducts = (selectedCategoryId, selectedSort, limit, lastVisible, isProductsExists) => {
    return async dispatch => {
        if (!isProductsExists) return
        dispatch(setProductLoadingAction(true))

        const products = await fetchMoreProducts(selectedCategoryId, selectedSort, limit, lastVisible)
        if (products.length === 0) {
            dispatch(setProductLoadingAction(false))
            dispatch(setProductsExistsAction(false))
            return
        }

        dispatch(setLastVisibleAction(products[products.length - 1].id))
        dispatch(fetchMoreProductsAction(products))
        dispatch(setProductLoadingAction(false))
    }
}