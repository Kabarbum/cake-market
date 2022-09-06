import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setCategoryAction,
    setCategoryChangingAction,
    setCategoryIdAction,
    setCategoryTitleAction
} from "../../store/reducers/admin";
import {addCategory, deleteCategory, fetchCategories, updateCategory} from "../../firebase/requests/categories";
import {fetchCategoriesAction} from "../../store/reducers/products";

const AdminFillings = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.products.categories).filter(el => el.id !== 0)
    const isCategoryChanging = useSelector(state => state.admin.isCategoryChanging)
    const category = useSelector(state => state.admin.category)

    const setTitle = (value) => {
        dispatch(setCategoryTitleAction(value))
    }
    const addHandler = () => {
        console.log(category)
        console.log(categories[categories.length-1].id)
        addCategory(category)
        dispatch(setCategoryAction(categories[categories.length-1].id+2))
        setTimeout(fetchData, 1000)
    }
    const changeHandler = (id, title) => {
        dispatch(setCategoryChangingAction(true))
        dispatch(setCategoryIdAction(id))
        dispatch(setCategoryTitleAction(title))
    }
    const saveHandler = () => {
        updateCategory(category)
        dispatch(setCategoryAction(categories[categories.length-1].id+1))
        setTimeout(fetchData, 1000)
        dispatch(setCategoryChangingAction(false))
    }
    const cancelHandler = () => {
        dispatch(setCategoryChangingAction(false))
        dispatch(setCategoryAction(categories[categories.length-1].id+1))
    }
    const deleteHandler = (id) => {
        deleteCategory(id)
        dispatch(setCategoryAction(categories[categories.length-1].id+1))
        setTimeout(fetchData, 1000)
    }

    async function fetchData() {
        let categories = await fetchCategories()
        categories = categories.sort((a, b) => a.id - b.id)
        dispatch(fetchCategoriesAction(categories))
        dispatch(setCategoryAction(categories[categories.length-1].id+1))
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="categories-content">
            <div>
                <div className="categories-content-top">
                    <input type="text" value={category.title} onChange={e => setTitle(e.target.value)}/>
                    {isCategoryChanging
                        ? <div style={{display: "flex"}}>
                            <div className="category-btn" onClick={saveHandler}>Сохранить</div>
                            <div className="category-btn" onClick={cancelHandler}>Отменить</div>
                        </div>
                        : <div className="category-btn" onClick={addHandler}>Добавить</div>}
                </div>
                <ul className="categories-content-list">
                    {categories.map(cat =>
                        <li key={cat.id}>
                            {cat.title}
                            <div className="category-btns">
                                <div className="category-btn"
                                     onClick={() => changeHandler(cat.id, cat.title)}>изменить
                                </div>
                                <div className="category-btn" onClick={() => deleteHandler(cat.id)}>удалить</div>
                            </div>
                        </li>)}
                </ul>
            </div>
        </div>
    );
};

export default AdminFillings;