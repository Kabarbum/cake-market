const FETCH_PRODUCTS = "FETCH_PRODUCTS"
const FETCH_CATEGORIES = "FETCH_CATEGORIES"
const SET_CATEGORY = "SET_CATEGORY"

const initialState = {
    products: [],
    categories: [],
    selectedCategoryId: 0,
    sortTypes: [
        {id: 0, title: "Цена: по возрастанию", value: ["price", "asc"]},
        {id: 1, title: "Цена: по убыванию", value: ["price", "desc"]},
    ],
    selectedSort: null
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {...state, products: action.payload}
        case FETCH_CATEGORIES:
            return {...state, categories: action.payload}
        case SET_CATEGORY:
            return {...state, selectedCategoryId: action.payload}
        default:
            return state
    }
}