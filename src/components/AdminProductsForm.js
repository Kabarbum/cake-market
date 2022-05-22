import React, {useState} from 'react';
import {getDownloadURL, ref, uploadBytesResumable, deleteObject} from "firebase/storage";
import {storage} from "../firebase";
import {AddProduct} from "../firebase/requests";
import {useDispatch, useSelector} from "react-redux";
import {doc, updateDoc} from "firebase/firestore";
import {
    setProductAction,
    setProductCategoryIdAction, setProductChangingAction,
    setProductDescriptionAction, setProductUrlAction,
    setProductPriceAction,
    setProductTitleAction,
    setProductWeightAction
} from "../store/reducers/admin";
import {firestore} from "../firebase";

const AdminProductsForm = ({initProducts}) => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.products.categories).filter(cat => cat.id !== 0)
    const product = useSelector(state => state.admin.product)
    const isProductChanging = useSelector(state => state.admin.isProductChanging)
    const prevProductUrl = useSelector(state => state.admin.prevProductUrl)
    const [error, setError] = useState("")

    const setTitle = (value) => {
        dispatch(setProductTitleAction(value))
    }
    const setDescription = (value) => {
        dispatch(setProductDescriptionAction(value))
    }
    const setPrice = (value) => {
        dispatch(setProductPriceAction(value))
    }
    const setWeight = (value) => {
        dispatch(setProductWeightAction(value))
    }
    const setCategoryId = (value) => {
        dispatch(setProductCategoryIdAction(value))
    }
    const setUrl = (value) => {
        if(value !== undefined)
            dispatch(setProductUrlAction(value))
    }

    const Check = () => {
        if (!product.title) {
            setError("Введите название!")
            return false
        }
        if (!product.description) {
            setError("Введите описание!")
            return false
        }
        if (!product.price) {
            setError("Введите цену!")
            return false
        }
        if (!product.weight) {
            setError("Введите вес!")
            return false
        }
        if (!product.categoryId) {
            setError("Выберите категорию!")
            return false
        }
        if (!product.imgUrl) {
            setError("Добавьте файл!")
            return false
        }
        return true
    }

    const uploadFile = (e) => {
        e.preventDefault()
        if (!Check()) return

        AddProduct(product)
        dispatch(setProductAction())
        setError("")
        initProducts()
    }

    function isValidHttpUrl(string) {
        let url;
        try {url = new URL(string);} catch (_) {return false;}
        return url.protocol === "http:" || url.protocol === "https:";
    }

    const handleSave = async () => {
        dispatch(setProductChangingAction(false))

        const productRef = doc(firestore, "products", "product_" + product.id);

        if(prevProductUrl !== product.imgUrl){
            const productsRef = ref(storage, `products/product_img_${product.id}`)

            const uploadTask = uploadBytesResumable(productsRef, product.imgUrl)

            uploadTask.on('state_changed',
                (snapshot) => {
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.log("Upload image error: ", error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        dispatch(setProductUrlAction(downloadURL))
                        await updateDoc(productRef, {...product, imgUrl:downloadURL});
                    });
                }
            );
        }
        else{
            await updateDoc(productRef, product);
        }
        dispatch(setProductAction())
        setError("")
        initProducts()
    }

    const handleCancel = () => {
        dispatch(setProductAction())
        dispatch(setProductChangingAction(false))
    }
    return (
        <form className="product-form">
            <div className="product-form-left">
                <input
                    placeholder="Название..."
                    className="product-form-left__item"
                    value={product.title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Описание..."
                    className="product-form-left__item"
                    value={product.description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    placeholder="Цена..."
                    className="product-form-left__item"
                    type="number"
                    value={product.price}
                    onChange={e => setPrice(Number(e.target.value))}
                />
                <input
                    placeholder="Вес..."
                    className="product-form-left__item"
                    type="number"
                    value={product.weight}
                    onChange={e => setWeight(Number(e.target.value))}
                />
                <select
                    className="product-form-left__item"
                    value={product.categoryId}
                    onChange={e => setCategoryId(Number(e.target.value))}
                >
                    {categories.map(cat =>
                        <option
                            value={cat.id}
                            key={cat.id}
                        >{cat.title}</option>)}
                </select>
                <input
                    className="product-form-left__item"
                    type="file"
                    onChange={e => setUrl(e.target.files[0])}
                />
                <div className="product-form-error">{error}</div>
                <div className="product-for-btns">
                    {isProductChanging
                        ?
                        <>
                            <div onClick={handleSave}>Сохранить</div>
                            <div onClick={handleCancel}>Отменить</div>
                        </>
                        : <div onClick={e => uploadFile(e)}>Добавить</div>
                    }
                </div>
            </div>
            <div className="product-form-right">
                <div className="product-form-right__img">
                    <img src={isValidHttpUrl(product.imgUrl) ? product.imgUrl : URL.createObjectURL(product.imgUrl)}
                         alt="img"/>
                </div>
            </div>
        </form>
    );
};

export default AdminProductsForm;