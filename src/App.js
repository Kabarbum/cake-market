import './App.css';
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import Footer from "./components/Footer";
import {fetchCategories, fetchProducts} from "./firebase/requests";

function App() {
    const dispatch = useDispatch()

    const getProducts = async (categoryId) => {
        const arr = await fetchProducts(categoryId)
        dispatch({type: "FETCH_PRODUCTS", payload: arr})
    }
    const getCategories = async () => {
        let arr = await fetchCategories()
        arr = arr.sort((a,b)=> a.id-b.id)
        dispatch({type: "FETCH_CATEGORIES", payload: arr})
    }
    useEffect(() => {
        getCategories()
        getProducts()
    })

    return (
        <div className="App">
            <Navbar/>
            <AppRouter/>
            <Footer/>
        </div>
    );
}

export default App;
