import React from 'react';
import "./MyMenu.css"
import {Link} from "react-router-dom";

const MyMenu = ({isMenuVisible, setMenuVisible}) => {
    return (
        isMenuVisible &&
        <div className='menu' onClick={()=>setMenuVisible(false)}>
            <ul>
                <li><Link to="">Каталог</Link></li>
                <li><Link to="/fillings">Начинки</Link></li>
                <li><Link to="/order">Как Заказать</Link></li>

                <li><a href="https://vk.com/karamel_zlat">Вконтакте</a></li>
                <li><a href="https://www.instagram.com/e.a.cherem/">Инстаграм</a></li>
            </ul>
        </div>
    );
};

export default MyMenu;