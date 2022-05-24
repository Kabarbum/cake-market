import React from 'react';

const FillingItem = ({value, setItem, deleteItem}) => {
    const handleChange = ()=>{
        setItem(value)
    }
    const deleteHandle = () => {
        const res = window.confirm("Удалить?")
        if(res) {
            deleteItem(value.id, value.imgUrl)
        }
    }
    return (
        <div className="fillings__item">
            <div className="fillings__item-img">
                <img src={value.imgUrl} alt="img"/>
                <div className="wave"/>
            </div>
            <div className="fillings__item-content">
                <div className="fillings__item-content__top">
                    <h3>{value.title}</h3>
                    <span>{value.price} руб/кг</span>
                </div>
                <ul className="fillings__item-property">
                    {value.composition.map((el, idx) =>
                        <li key={idx}>{el}</li>
                    )}
                </ul>
                <div className="fillings__item-btns">
                    <div onClick={handleChange}>изменить</div>
                    <div onClick={deleteHandle}>удалить</div>
                </div>
            </div>
        </div>
    );
};

export default FillingItem;