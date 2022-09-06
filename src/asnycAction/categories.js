import {fetchCategoriesAction} from "../store/reducers/products";
import {fetchCategories} from "../firebase/requests/categories";

export const initCategories = () => {
    return async dispatch => {
        let categories = await fetchCategories()
        categories = categories.sort((a, b) => a.id - b.id)
        dispatch(fetchCategoriesAction(categories))
    }
}