import React from 'react';

const ProductItem = ({product}) => {

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
            </div>
            <div/>
        </div>
    );
};

export default ProductItem;