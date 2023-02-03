import React from 'react';

const FillingItem = ({value}) => {
    return (
        <div className="fillings__item">
            <div className="fillings__item-img">
                <img src={value.imgUrl} alt="img"/>
                <div className="wave"/>
            </div>
            <div className="fillings__item-content">
                <div className="fillings__item-content__top">
                    <h3>{value.title}</h3>
                    <span>{value.price}&nbsp;руб <span style={{whiteSpace:'nowrap'}}>/</span>кг</span>
                </div>
                <ul className="fillings__item-property">
                    {value.composition.map((el, idx) =>
                        <li key={idx}>{el}</li>
                    )}
                </ul>
                <div/>
            </div>
        </div>
    );
};

export default FillingItem;