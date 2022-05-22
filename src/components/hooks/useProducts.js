import {useDispatch, useSelector} from "react-redux";
import {fetchMoreProducts, fetchProducts} from "../../firebase/requests";
import {
    fetchMoreProductsAction,
    fetchProductsAction,
    setLastVisibleAction,
    setProductsExistsAction
} from "../../store/reducers/products";


const useMoreProducts = async() => {
    const dispatch = useDispatch()

    const selectedSort = useSelector(state => state.products.selectedSort)
    const selectedCategoryId = useSelector(state => state.products.selectedCategoryId)
    const limit = useSelector(state => state.products.limit)
    const lastVisible = useSelector(state => state.products.lastVisible)
    const isProductsExists = useSelector(state => state.products.isProductsExists)

    if(!isProductsExists) return


    const products = await fetchMoreProducts(selectedCategoryId, selectedSort, limit, lastVisible)
    console.log(products)
    if (products.length === 0) {
        dispatch(setProductsExistsAction(false))
        return
    }

    dispatch(setLastVisibleAction(products[products.length - 1].id))
    dispatch(fetchMoreProductsAction(products))
};
export default useMoreProducts