import React from 'react';
import "./MyMenu.css"
import {Link} from "react-router-dom";

const MyMenu = ({isMenuVisible, setMenuVisible}) => {
    return (
        isMenuVisible &&
        <div className='menu' onClick={()=>setMenuVisible(false)}>
            <ul>
                <li><Link to="">Каталог</Link></li>
                <li><Link to="/order">Как Заказать</Link></li>
                <li><a href="">Вконтакте</a></li>
                <li><a href="">Инстаграм</a></li>
            </ul>
        </div>
    );
};

export default MyMenu;