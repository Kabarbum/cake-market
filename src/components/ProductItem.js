import React, {useState} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = ({product}) => {
    const [isOpen, setIsOpen] = useState(false)
    const openHandler = () => {
        setIsOpen(true)
    }
    const closeHandler = () => {
        setIsOpen(false)
    }
    return (
        <div className="products-item">
            <div className="products-item__img"
                 onClick={openHandler}
            >
                <LazyLoadImage
                    className="products-item__img--item"
                    alt="cake"
                    effect="blur"
                    src={product.imgUrl}
                />
            </div>
            <img className={isOpen ? "img--blur active" : "img--blur"} src={product.imgUrl} alt="img"/>
            <div className={isOpen ? "img-bg--blur active" : "img-bg--blur"} onClick={closeHandler}/>
            <div className="products-item__content">
                <h3>{product.title}</h3>
                {/*<p>{product.description}</p>*/}
                <div className="products-item__bottom">
                    <span>Вес: {product.weight} кг.</span>
                    {/*<span>Цена: {product.price} руб.</span>*/}
                </div>
            </div>
            <div/>
        </div>
    );
};

export default ProductItem;