import React from 'react';
import "./MyMenu.css"
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const MyMenu = ({isMenuVisible, setMenuVisible}) => {
    const isAuth = useSelector(state=>state.admin.isAuth)
    const menuHandler = () => {
        setMenuVisible(false)
    }
    return (
        isMenuVisible &&
        <div className='menu' onClick={menuHandler}>
            <ul>
                <li><Link to="">Каталог</Link></li>
                <li><Link to="/fillings">Начинки</Link></li>
                <li><Link to="/order">Как Заказать</Link></li>
                {isAuth && <li><Link to="/admin">Админка</Link></li>}


                <li><a href="https://vk.com/karamel_zlat">Вконтакте</a></li>
                <li><a href="https://www.instagram.com/e.a.cherem/">Инстаграм</a></li>
            </ul>
        </div>
    );
};

export default MyMenu;