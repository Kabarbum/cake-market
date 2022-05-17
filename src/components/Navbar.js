import React from 'react';
import {Link, NavLink} from "react-router-dom";
import vk from "../img/vk.png"
import inst from "../img/instagram.png"
import MyMenu from "./UI/Menu/MyMenu";
import {useDispatch, useSelector} from "react-redux";


const Navbar = () => {
    const isMenuVisible = useSelector(state => state.menu.isMenuVisible)
    const dispatch = useDispatch()

    function setMenuVisible(payload) {
        dispatch({type: "SET_MENU_VISIBLE", payload: payload})
    }

    return (
        <header>
            <nav>
                <span className="logo">
                    <Link to="">
                        <nobr>Для десерта</nobr> <nobr>не нужен повод</nobr></Link>
                </span>
                <ul className="big-menu">

                    <li className="nav-item">
                        <NavLink to="">Каталог</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/fillings">Начинки</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/order">Как заказать</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin">Д</NavLink>
                    </li>

                    <li className="socials">

                        <a href="https://vk.com/karamel_zlat">
                            <img src={vk} alt="vk"/>
                        </a>

                        <a href="https://www.instagram.com/e.a.cherem/">
                            <img src={inst} alt="instagram"/>
                        </a>

                    </li>

                </ul>
                <div className={isMenuVisible ? "burger-menu active" : "burger-menu"}
                     onClick={() => setMenuVisible(!isMenuVisible)}>
                    <span className="line line1"/>
                    <span className="line line2"/>
                    <span className="line line3"/>
                </div>
                <MyMenu isMenuVisible={isMenuVisible} setMenuVisible={setMenuVisible}/>
            </nav>
            <div style={{height:1, backgroundColor:"#aaa", marginBottom:30}}/>
        </header>
    );
};

export default Navbar;