import './App.css';
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Footer from "./components/Footer";
import {fetchCategories, fetchProducts} from "./firebase/requests";
import {
    fetchCategoriesAction,
    fetchProductsAction,
    setLastVisibleAction,
    setProductPreLoadingAction
} from "./store/reducers/products";

function App() {
    const dispatch = useDispatch()
    const limit = useSelector(state => state.products.limit)

    const initProducts = async () => {
        dispatch(setProductPreLoadingAction(true))
        const products = await fetchProducts(limit)
        dispatch(setLastVisibleAction(products[products.length - 1].id))
        dispatch(fetchProductsAction(products))
        dispatch(setProductPreLoadingAction(false))
    }
    const initCategories = async () => {
        let categories = await fetchCategories()
        categories = categories.sort((a, b) => a.id - b.id)
        dispatch(fetchCategoriesAction(categories))
    }

    useEffect(() => {
        initCategories()
        initProducts()
    }, [])

    return (
        <div className="App">
            <Navbar/>
            <AppRouter/>
            <Footer/>
        </div>
    );
}

export default App;
