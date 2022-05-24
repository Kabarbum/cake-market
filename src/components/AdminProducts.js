import React, {useEffect} from 'react';
import AdminProductsForm from "./AdminProductsForm";
import Loader from "./UI/Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {
    setProductsExistsAction
} from "../store/reducers/products";
import AdminProductItem from "./AdminProductItem";
import {
    setProductCategoryIdAction, setProductChangingAction,
    setProductDescriptionAction, setProductUrlAction, setProductIdAction,
    setProductPriceAction,
    setProductTitleAction,
    setProductWeightAction, setPrevProductUrlAction
} from "../store/reducers/admin";
import {fetchMore, initProducts} from "../utils";

const AdminProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const isProductLoading = useSelector(state => state.products.isProductLoading)
    const isProductPreLoading = useSelector(state => state.products.isProductPreLoading)
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

    const setItem = (product) => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
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

    useEffect(() => {
        dispatch(setProductsExistsAction(true))
        async function fetchData() {
            await initProducts(dispatch)
        }
        fetchData();

    }, [])

    return (
        <div>
            <AdminProductsForm/>

            <div>
                {isProductPreLoading
                    ?
                    <Loader/>
                    :
                    <div className="products">
                        {products.map(product =>
                            <AdminProductItem
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