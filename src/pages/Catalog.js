import React from 'react';
import {useSelector} from "react-redux";
import Categories from "../components/Categories";
import Products from "../components/Products";
import MySelect from "../components/MySelect";

const Catalog = () => {
    const categories = useSelector(state => state.products.categories)
    const products = useSelector(state => state.products.products)
    return (
        <main>
            <div className="container">

                <div className="catalog__menu">
                    <Categories categories={categories}/>
                    <MySelect/>
                </div>

                <Products products={products}/>

            </div>
        </main>
    );
};

export default Catalog;