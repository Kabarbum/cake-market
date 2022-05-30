import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../store/reducers/admin";
import {useNavigate} from "react-router-dom"

const Auth = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const lgn = useSelector(state=>state.admin.login)
    const psw = useSelector(state=>state.admin.password)
    const authHandler = () => {
        if(login===lgn && password === psw) {
            dispatch(setAuth(true))
            navigate("/admin");
        }
        else
            alert("Уходи вон отсюда, паршивка вонючая^_^")
    }
    return (
        <main>
            <form className="auth-form">
                <h3>Вход в админ-панель</h3>
                <input
                    type="text"
                    placeholder="Логин..."
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="admin-from__btn" onClick={authHandler}>Войти</div>
            </form>
        </main>
    );
};

export default Auth;