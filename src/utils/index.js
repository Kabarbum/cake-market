import {
    fetchMoreProductsAction, fetchProductsAction, setCategoryAction,
    setLastVisibleAction,
    setProductLoadingAction, setProductPreLoadingAction,
    setProductsExistsAction
} from "../store/reducers/products";
import {fetchFillings, fetchMoreProducts, fetchProducts} from "../firebase/requests";
import {fetchFillingsAction, setFillingsLoadingAction} from "../store/reducers/fillings";

export const initProducts = async (dispatch) => {
    dispatch(setProductPreLoadingAction(true))
    dispatch(setCategoryAction(0))
    const products = await fetchProducts(3)
    dispatch(setLastVisibleAction(products[products.length - 1].id))
    dispatch(fetchProductsAction(products))
    dispatch(setProductPreLoadingAction(false))
}
export const fetchMore = async (selectedCategoryId, selectedSort, limit, lastVisible, isProductsExists, dispatch) => {
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

export const initFillings = async (dispatch) => {
    dispatch(setFillingsLoadingAction(true))
    const fillings = await fetchFillings()
    dispatch(fetchFillingsAction(fillings))
    dispatch(setFillingsLoadingAction(false))
}