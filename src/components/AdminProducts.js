import React, {useEffect} from 'react';
import AdminProductsForm from "./AdminProductsForm";
import Loader from "./UI/Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchMoreProductsAction,
    setLastVisibleAction,
    setProductLoadingAction,
    setProductsExistsAction
} from "../store/reducers/products";
import {fetchMoreProducts} from "../firebase/requests";
import AdminProductItem from "./AdminProductItem";
import {
    setProductCategoryIdAction, setProductChangingAction,
    setProductDescriptionAction, setProductUrlAction, setProductIdAction,
    setProductPriceAction,
    setProductTitleAction,
    setProductWeightAction, setPrevProductUrlAction
} from "../store/reducers/admin";

const AdminProducts = ({initProducts}) => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const isProductPreLoading = useSelector(state => state.products.isProductPreLoading)
    const isProductLoading = useSelector(state => state.products.isProductLoading)
    const isProductsExists = useSelector(state => state.products.isProductsExists)

    const selectedSort = useSelector(state => state.products.selectedSort)
    const selectedCategoryId = useSelector(state => state.products.selectedCategoryId)
    const limit = useSelector(state => state.products.limit)
    const lastVisible = useSelector(state => state.products.lastVisible)

    const observer = React.useRef()
    const lastElem = React.useRef()

    const fetchMore = async () => {
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

    useEffect(() => {
        if (isProductPreLoading) return
        if (observer.current) observer.current.disconnect()
        const callback = function (entries, observer) {
            if (entries[0].isIntersecting && !isProductLoading) {
                fetchMore()
            }
        }
        observer.current = new IntersectionObserver(callback)
        observer.current.observe(lastElem.current)

    }, [isProductPreLoading, isProductLoading])

    const setItem = (product) => {
        dispatch(setProductChangingAction(true))
        dispatch(setProductIdAction(product.id))
        dispatch(setProductTitleAction(product.title))
        dispatch(setProductDescriptionAction(product.description))
        dispatch(setProductPriceAction(product.price))
        dispatch(setProductWeightAction(product.weight))
        dispatch(setProductCategoryIdAction(product.categoryId))
        dispatch(setProductUrlAction(product.imgUrl))
        dispatch(setPrevProductUrlAction(product.imgUrl))
    }
    return (
        <div>
            <AdminProductsForm initProducts={initProducts}/>

            <div>
                {isProductPreLoading
                    ?
                    <Loader/>
                    :
                    <div className="products">
                        {products.map(product =>
                            <AdminProductItem
                                initProducts={initProducts}
                                product={product}
                                setItem={setItem}
                                key={product.id}
                            />
                        )}


                        <div ref={lastElem} style={{width: "100vw", height: 2}}/>
                    </div>
                }
                {isProductsExists && isProductLoading && <Loader/>}
            </div>
        </div>
    );
};

export default AdminProducts;