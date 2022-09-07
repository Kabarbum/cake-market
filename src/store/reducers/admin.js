import {v4 as uuidv4} from "uuid";

const SET_PRODUCT = "SET_PRODUCT"
const SET_PRODUCT_ID = "SET_PRODUCT_ID"
const SET_PRODUCT_TITLE = "SET_PRODUCT_TITLE"
const SET_PRODUCT_DESCRIPTION = "SET_PRODUCT_DESCRIPTION"
const SET_PRODUCT_PRICE = "SET_PRODUCT_PRICE"
const SET_PRODUCT_WEIGHT = "SET_PRODUCT_WEIGHT"
const SET_PRODUCT_CATEGORY = "SET_PRODUCT_CATEGORY"
const SET_PRODUCT_URL = "SET_PRODUCT_URL"
const SET_PREV_PRODUCT_URL = "SET_PREV_PRODUCT_URL"
const SET_PRODUCT_CHANGING = "SET_PRODUCT_CHANGING"

const SET_FILLING = "SET_FILLING"
const SET_FILLING_ID = "SET_FILLING_ID"
const SET_FILLING_TITLE = "SET_FILLING_TITLE"
const SET_FILLING_COMPOSITION = "SET_FILLING_COMPOSITION"
const SET_FILLING_COMPOSITION_ITEM = "SET_FILLING_COMPOSITION_ITEM"
const ADD_FILLING_COMPOSITION_ITEM = "ADD_FILLING_COMPOSITION_ITEM"
const REMOVE_FILLING_COMPOSITION_ITEM = "REMOVE_FILLING_COMPOSITION_ITEM"
const SET_FILLING_PRICE = "SET_FILLING_PRICE"
const SET_FILLING_URL = "SET_FILLING_URL"
const SET_PREV_FILLING_URL = "SET_PREV_FILLING_URL"
const SET_FILLING_CHANGING = "SET_FILLING_CHANGING"

const SET_CATEGORY = "SET_CATEGORY"
const SET_CATEGORY_ID = "SET_CATEGORY_ID"
const SET_CATEGORY_TITLE = "SET_CATEGORY_TITLE"
const SET_CATEGORY_CHANGING = "SET_CATEGORY_CHANGING"

const SET_AUTH = "SET_AUTH"

const initialState = {
    isAuth: false,
    product: {
        id: uuidv4(),
        title: "",
        description: "",
        price: 0,
        weight: 0,
        categoryId: 1,
        imgUrl: "https://placehold.co/600"
    },
    prevProductUrl: "",
    isProductChanging: false,
    filling: {
        id: uuidv4(),
        title: "",
        composition: [""],
        price: 0,
        imgUrl: "https://placehold.co/600"
    },
    prevFillingUrl: "",
    isFillingChanging: false,
    category: {
        id: 0,
        title: ""
    },
    isCategoryChanging: false,
}

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                product: {
                    id: uuidv4(),
                    title: "",
                    description: "",
                    price: 0,
                    weight: 0,
                    categoryId: 1,
                    imgUrl: "https://placehold.co/600"
                }
            }
        case SET_PRODUCT_ID:
            return {...state, product: {...state.product, id: action.payload}}
        case SET_PRODUCT_TITLE:
            return {...state, product: {...state.product, title: action.payload}}
        case SET_PRODUCT_DESCRIPTION:
            return {...state, product: {...state.product, description: action.payload}}
        case SET_PRODUCT_PRICE:
            return {...state, product: {...state.product, price: action.payload}}
        case SET_PRODUCT_WEIGHT:
            return {...state, product: {...state.product, weight: action.payload}}
        case SET_PRODUCT_CATEGORY:
            return {...state, product: {...state.product, categoryId: action.payload}}
        case SET_PRODUCT_URL:
            return {...state, product: {...state.product, imgUrl: action.payload}}
        case SET_PREV_PRODUCT_URL:
            return {...state, prevProductUrl: action.payload}
        case SET_PRODUCT_CHANGING:
            return {...state, isProductChanging: action.payload}
        case SET_FILLING:
            return {
                ...state,
                filling: {
                    id: uuidv4(),
                    title: "",
                    composition: [""],
                    price: 0,
                    imgUrl: "https://placehold.co/600"
                }
            }
        case SET_FILLING_ID:
            return {...state, filling: {...state.filling, id: action.payload}}
        case SET_FILLING_TITLE:
            return {...state, filling: {...state.filling, title: action.payload}}
        case SET_FILLING_COMPOSITION:
            return {
                ...state, filling: {
                    ...state.filling,
                    composition: action.payload
                }
            }
        case SET_FILLING_COMPOSITION_ITEM:
            let arr = [...state.filling.composition]
            arr[action.payload.id] = action.payload.body
            return {
                ...state, filling: {
                    ...state.filling,
                    composition: arr
                }
            }
        case ADD_FILLING_COMPOSITION_ITEM:
            return {
                ...state, filling: {
                    ...state.filling,
                    composition: [...state.filling.composition, ""]
                }
            }
        case REMOVE_FILLING_COMPOSITION_ITEM:
            let mas = [...state.filling.composition]
            mas.splice(action.payload, 1)
            return {
                ...state, filling: {
                    ...state.filling,
                    composition: mas
                }
            }
        case SET_FILLING_PRICE:
            return {...state, filling: {...state.filling, price: action.payload}}
        case SET_FILLING_URL:
            return {...state, filling: {...state.filling, imgUrl: action.payload}}
        case SET_PREV_FILLING_URL:
            return {...state, prevFillingUrl: action.payload}
        case SET_FILLING_CHANGING:
            return {...state, isFillingChanging: action.payload}
        case SET_CATEGORY:
            return {
                ...state, category: {
                    id: action.payload,
                    title: ""
                }
            }
        case SET_CATEGORY_ID:
            return {...state, category: {...state.category, id: action.payload}}
        case SET_CATEGORY_TITLE:
            return {...state, category: {...state.category, title: action.payload}}
        case SET_CATEGORY_CHANGING:
            return {...state, isCategoryChanging: action.payload}
        case SET_AUTH:
            return {...state, isAuth: action.payload}
        default:
            return state
    }
}

export const setProductAction = () => ({type: SET_PRODUCT})
export const setProductIdAction = (payload) => ({type: SET_PRODUCT_ID, payload})
export const setProductTitleAction = (payload) => ({type: SET_PRODUCT_TITLE, payload})
export const setProductDescriptionAction = (payload) => ({type: SET_PRODUCT_DESCRIPTION, payload})
export const setProductPriceAction = (payload) => ({type: SET_PRODUCT_PRICE, payload})
export const setProductWeightAction = (payload) => ({type: SET_PRODUCT_WEIGHT, payload})
export const setProductCategoryIdAction = (payload) => ({type: SET_PRODUCT_CATEGORY, payload})
export const setProductUrlAction = (payload) => ({type: SET_PRODUCT_URL, payload})
export const setPrevProductUrlAction = (payload) => ({type: SET_PREV_PRODUCT_URL, payload})
export const setProductChangingAction = (payload) => ({type: SET_PRODUCT_CHANGING, payload})

export const setFillingAction = () => ({type: SET_FILLING})
export const setFillingIdAction = (payload) => ({type: SET_FILLING_ID, payload})
export const setFillingTitleAction = (payload) => ({type: SET_FILLING_TITLE, payload})
export const setFillingCompositionAction = (payload) => ({type: SET_FILLING_COMPOSITION, payload})
export const setFillingCompositionItemAction = (payload) => ({type: SET_FILLING_COMPOSITION_ITEM, payload})
export const addFillingCompositionItemAction = () => ({type: ADD_FILLING_COMPOSITION_ITEM})
export const removeFillingCompositionItemAction = (payload) => ({type: REMOVE_FILLING_COMPOSITION_ITEM, payload})
export const setFillingPriceAction = (payload) => ({type: SET_FILLING_PRICE, payload})
export const setFillingUrlAction = (payload) => ({type: SET_FILLING_URL, payload})
export const setPrevFillingUrlAction = (payload) => ({type: SET_PREV_FILLING_URL, payload})
export const setFillingChangingAction = (payload) => ({type: SET_FILLING_CHANGING, payload})

export const setCategoryAction = (payload) => ({type: SET_CATEGORY, payload})
export const setCategoryIdAction = (payload) => ({type: SET_CATEGORY_ID, payload})
export const setCategoryTitleAction = (payload) => ({type: SET_CATEGORY_TITLE, payload})
export const setCategoryChangingAction = (payload) => ({type: SET_CATEGORY_CHANGING, payload})

export const setAuth = (payload) => ({type: SET_AUTH, payload})