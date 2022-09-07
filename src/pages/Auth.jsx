import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setAuth} from "../store/reducers/admin";
import {useNavigate} from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Auth = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const authHandler = async () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, login, password)
            .then(() => {
                dispatch(setAuth(true))
                navigate("/admin");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                alert("Уходи вон отсюда, паршивка вонючая^_^")
            });
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