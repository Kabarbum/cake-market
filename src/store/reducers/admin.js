import {v4 as uuidv4} from "uuid";

const SET_PRODUCT = "SET_PRODUCT_"
const SET_PRODUCT_ID = "SET_PRODUCT_ID"
const SET_PRODUCT_TITLE = "SET_PRODUCT_TITLE"
const SET_PRODUCT_DESCRIPTION = "SET_PRODUCT_DESCRIPTION"
const SET_PRODUCT_PRICE = "SET_PRODUCT_PRICE"
const SET_PRODUCT_WEIGHT = "SET_PRODUCT_WEIGHT"
const SET_PRODUCT_CATEGORY = "SET_PRODUCT_CATEGORY"
const SET_PRODUCT_URL = "SET_PRODUCT_URL"
const SET_PRODUCT_CHANGING = "SET_PRODUCT_CHANGING"
const SET_PREV_PRODUCT_URL = "SET_PREV_PRODUCT_URL"

const initialState = {
    isAuth: true,
    product: {
        id: uuidv4(),
        title: "",
        description: "",
        price: 0,
        weight: 0,
        categoryId: 1,
        imgUrl: "https://placehold.co/600"
    },
    filling:{
        id:uuidv4(),

    },
    prevProductUrl: "",
    prevFillingUrl: "",
    isProductChanging: false
}

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                product:
                    {
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
        case SET_PRODUCT_CHANGING:
            return {...state, isProductChanging: action.payload}
        case SET_PREV_PRODUCT_URL:
            return {...state, prevImgUrl: action.payload}
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
export const setProductChangingAction = (payload) => ({type: SET_PRODUCT_CHANGING, payload})
export const setPrevProductUrlAction = (payload) => ({type: SET_PREV_PRODUCT_URL, payload})