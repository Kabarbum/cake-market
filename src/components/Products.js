import React, {useEffect} from 'react';
import ProductItem from "./ProductItem";
import Loader from "./UI/Loader/Loader"
import {useDispatch, useSelector} from "react-redux";
import {fetchMoreProducts} from "../firebase/requests";
import {
    fetchMoreProductsAction,
    setLastVisibleAction,
    setProductLoadingAction,
    setProductsExistsAction
} from "../store/reducers/products";

const Products = () => {
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
        if(!isProductsExists) return
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
    return (
        <div>
            {isProductPreLoading
                ?
                <Loader/>
                :
                <div className="products">
                    {products.map(product =>
                        <ProductItem
                            product={product}
                            key={product.id}
                        />
                    )}


                    <div ref={lastElem} style={{width: "100vw", height: 2}}/>
                </div>
            }
            {isProductsExists && isProductLoading && <Loader/>}
        </div>
    );
};

export default Products;