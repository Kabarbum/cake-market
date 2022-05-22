import React from 'react';
import Categories from "../components/Categories";
import Products from "../components/Products";

const Catalog = () => {
    return (
        <main>
            <div className="container">

                <Categories/>
                <Products/>

            </div>
        </main>
    );
};

export default Catalog;