const FETCH_PRODUCTS = "FETCH_PRODUCTS"
const FETCH_MORE_PRODUCTS = "FETCH_MORE_PRODUCTS"
const FETCH_CATEGORIES = "FETCH_CATEGORIES"
const SET_CATEGORY = "SET_CATEGORY"
const SET_SELECTED_SORT = "SET_SELECTED_SORT"
const SET_LAST_VISIBLE = "SET_LAST_VISIBLE"
const SET_PRODUCT_PRELOADING = "SET_PRODUCT_PRELOADING"
const SET_PRODUCT_LOADING = "SET_PRODUCT_LOADING"
const SET_PRODUCTS_EXISTS = "SET_PRODUCTS_EXISTS"

const initialState = {
    products: [],
    categories: [],
    selectedCategoryId: 0,
    sortTypes: [
        {id: 0, title: "Цена: по возрастанию", value: ["price", "asc"]},
        {id: 1, title: "Цена: по убыванию", value: ["price", "desc"]},
    ],
    selectedSort: ["id", "asc"],
    limit: 6,
    lastVisible: "0",
    isProductPreLoading: false,
    isProductLoading: false,
    isProductsExists: true
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {...state, products: action.payload}
        case FETCH_MORE_PRODUCTS:
            return {...state, products: [...state.products, ...action.payload]}
        case FETCH_CATEGORIES:
            return {...state, categories: action.payload}
        case SET_CATEGORY:
            return {...state, selectedCategoryId: action.payload}
        case SET_SELECTED_SORT:
            return {...state, selectedSort: action.payload}
        case SET_LAST_VISIBLE:
            return {...state, lastVisible: action.payload}
        case SET_PRODUCT_PRELOADING:
            return {...state, isProductPreLoading: action.payload}
        case SET_PRODUCT_LOADING:
            return {...state, isProductLoading: action.payload}
        case SET_PRODUCTS_EXISTS:
            return {...state, isProductsExists: action.payload}
        default:
            return state
    }
}

export const fetchProductsAction = (payload) => ({type: FETCH_PRODUCTS, payload})
export const fetchMoreProductsAction = (payload) => ({type: FETCH_MORE_PRODUCTS, payload})
export const fetchCategoriesAction = (payload) => ({type: FETCH_CATEGORIES, payload})
export const setCategoryAction = (payload) => ({type: SET_CATEGORY, payload})
export const setSelectedSortAction = (payload) => ({type: SET_SELECTED_SORT, payload})
export const setLastVisibleAction = (payload) => ({type: SET_LAST_VISIBLE, payload})
export const setProductPreLoadingAction = (payload) => ({type: SET_PRODUCT_PRELOADING, payload})
export const setProductLoadingAction = (payload) => ({type: SET_PRODUCT_LOADING, payload})
export const setProductsExistsAction = (payload) => ({type: SET_PRODUCTS_EXISTS, payload})