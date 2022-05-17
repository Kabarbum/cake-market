import React from 'react';
import {useSelector} from "react-redux";

const MySelect = () => {

    const sortTypes = useSelector(state => state.products.sortTypes)
    const selectedSort = useSelector(state => state.products.selectedSort)

    const handleSelect = (e) => {
        console.log(e)
    }
    return (
        <div className="sortmenu">
            <span>Сортировка: </span>
            <select onChange={e => handleSelect(e.target.value)}>
                {sortTypes.map(type =>
                    <option
                        value={type.id}
                        key={type.id}
                    >{type.title}</option>
                )}
            </select>
        </div>
    );
};

export default MySelect;