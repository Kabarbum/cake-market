import React, {useState} from 'react';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../firebase";
import {addFilling, AddProduct, updateFilling} from "../firebase/requests";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {
    setProductTitleAction,
    setFillingCompositionAction,
    setFillingPriceAction,
    setFillingUrlAction,
    setFillingAction,
    setFillingChangingAction,
    setFillingCompositionItemAction,
    removeFillingCompositionItemAction,
    addFillingCompositionItemAction, setFillingTitleAction
} from "../store/reducers/admin";
import cross from "../img/cross.png"

const AdminProductsForm = () => {
    const dispatch = useDispatch()
    const filling = useSelector(state => state.admin.filling)
    const isFillingChanging = useSelector(state => state.admin.isFillingChanging)
    const prevFillingUrl = useSelector(state => state.admin.prevFillingUrl)
    const [error, setError] = useState("")

    const setTitle = (value) => {
        dispatch(setFillingTitleAction(value))
    }
    const setCompositionItem = (body, id) => {
        dispatch(setFillingCompositionItemAction({body, id}))
    }
    const setPrice = (value) => {
        dispatch(setFillingPriceAction(value))
    }
    const setUrl = (value) => {
        if (value !== undefined)
            dispatch(setFillingUrlAction(value))
    }

    const Check = () => {
        if (!filling.title) {
            setError("Введите название!")
            return false
        }
        if (!filling.composition) {
            setError("Введите описание!")
            return false
        }
        if (!filling.price) {
            setError("Введите цену!")
            return false
        }
        if (!filling.imgUrl) {
            setError("Добавьте файл!")
            return false
        }
        return true
    }

    const uploadProduct = async (e) => {
        e.preventDefault()
        if (!Check()) return

        await addFilling(filling, prevFillingUrl, dispatch)
        dispatch(setFillingAction())
        setError("")
    }

    function isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    const handleSave = async () => {
        dispatch(setFillingChangingAction(false))

        await updateFilling(filling, prevFillingUrl, dispatch)
        dispatch(setFillingAction())
        setError("")
    }

    const handleCancel = () => {
        dispatch(setFillingAction())
        dispatch(setFillingChangingAction(false))
    }
    const addHandler = () => {
        dispatch(addFillingCompositionItemAction())
    }
    const deleteHandler = (id) => {
        dispatch(removeFillingCompositionItemAction(id))
    }

    return (
        <form className="product-form">
            <div className="product-form-left">
                <input
                    placeholder="Название..."
                    className="product-form-left__item"
                    value={filling.title}
                    onChange={e => setTitle(e.target.value)}
                />
                <div>Состав:</div>
                <ul className="filling-composition">
                    {filling.composition.map((el, idx) =>
                        <li key={idx}>
                            <input
                                className="product-form-left__item"
                                type="text"
                                placeholder="Ингридиент..."
                                value={el}
                                onChange={e => setCompositionItem(e.target.value, idx)}
                            />
                            <img src={cross} alt="X" onClick={() => deleteHandler(idx)}/>
                        </li>
                    )}
                    <li>
                        <div className="composition__add" onClick={addHandler}>добавить</div>
                    </li>
                </ul>
                <input
                    placeholder="Цена..."
                    className="product-form-left__item"
                    type="number"
                    value={filling.price}
                    onChange={e => setPrice(Number(e.target.value))}
                />
                <input
                    className="product-form-left__item"
                    type="file"
                    onChange={e => setUrl(e.target.files[0])}
                />
                <div className="product-form-error">{error}</div>
                <div className="product-for-btns">
                    {isFillingChanging
                        ?
                        <>
                            <div onClick={handleSave}>Сохранить</div>
                            <div onClick={handleCancel}>Отменить</div>
                        </>
                        : <div onClick={e => uploadProduct(e)}>Добавить</div>
                    }
                </div>
            </div>
            <div className="product-form-right">
                <div className="product-form-right__img">
                    <img src={isValidHttpUrl(filling.imgUrl) ? filling.imgUrl : URL.createObjectURL(filling.imgUrl)}
                         alt="img"/>
                </div>
            </div>
        </form>
    );
};

export default AdminProductsForm;