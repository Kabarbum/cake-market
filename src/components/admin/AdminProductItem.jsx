import React from 'react';
import {deleteProduct} from "../../firebase/requests";
import {useSelector} from "react-redux";

const ProductItem = ({product, setItem}) => {
    const categories = useSelector(state=>state.products.categories)
    const changeHandle = () => {
        setItem(product)
    }
    const deleteHandle = () => {
        const res = window.confirm("Удалить?")
        if(res) {
            deleteProduct(product.id, product.imgUrl)
        }
    }
    return (
        <div className="products-item">
            <div className="products-item__img">
                <img src={product.imgUrl} alt="img"/>
            </div>
            <div className="products-item__content">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="products-item__bottom">
                    <span>Вес: {product.weight} кг.</span>
                    <span>Цена: {product.price} руб.</span>
                </div>
                <p>{categories[product.categoryId]?.title}</p>
                <div className="products-item__btn" onClick={changeHandle}>изменить</div>
                <div className="products-item__btn" onClick={deleteHandle}>удалить</div>
            </div>
            <div/>
        </div>
    );
};

export default ProductItem;