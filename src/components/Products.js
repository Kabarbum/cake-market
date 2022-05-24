import React, {useEffect} from 'react';
import ProductItem from "./ProductItem";
import Loader from "./UI/Loader/Loader"
import {useDispatch, useSelector} from "react-redux";
import {fetchMore} from "../utils";

const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const isProductPreLoading = useSelector(state => state.products.isProductPreLoading)
    const isProductLoading = useSelector(state => state.products.isProductLoading)
    //for fetchMore
    const selectedSort = useSelector(state => state.products.selectedSort)
    const selectedCategoryId = useSelector(state => state.products.selectedCategoryId)
    const limit = useSelector(state => state.products.limit)
    const lastVisible = useSelector(state => state.products.lastVisible)
    const isProductsExists = useSelector(state => state.products.isProductsExists)

    const observer = React.useRef()
    const lastElem = React.useRef()


    useEffect(() => {
        if (isProductPreLoading) return
        if (observer.current) observer.current.disconnect()
        const callback = async function (entries, observer) {
            if (entries[0].isIntersecting && !isProductLoading) {
                await fetchMore(selectedCategoryId, selectedSort, limit, lastVisible, isProductsExists, dispatch)
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