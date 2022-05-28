import {
    fetchMoreProductsAction, fetchProductsAction, setCategoryAction,
    setLastVisibleAction,
    setProductLoadingAction, setProductPreLoadingAction,
    setProductsExistsAction
} from "../store/reducers/products";
import {fetchFillings, fetchMoreProducts, fetchProducts} from "../firebase/requests";
import {fetchFillingsAction, setFillingsLoadingAction} from "../store/reducers/fillings";
import React from "react";

export const initProducts = async (dispatch) => {
    dispatch(setProductPreLoadingAction(true))
    dispatch(setCategoryAction(0))
    const products = await fetchProducts(3)
    dispatch(setLastVisibleAction(products[products.length - 1].id))
    dispatch(fetchProductsAction(products))
    dispatch(setProductPreLoadingAction(false))
}
export const fetchMore = async (selectedCategoryId, selectedSort, limit, lastVisible, isProductsExists, dispatch) => {
    if (!isProductsExists) return
    dispatch(setProductLoadingAction(true))

    const products = await fetchMoreProducts(selectedCategoryId, selectedSort, limit, lastVisible)
    if (products.length === 0) {
        dispatch(setProductLoadingAction(false))
        dispatch(setProductsExistsAction(false))
        return
    }

    dispatch(setLastVisibleAction(products[products.length - 1].id))
    dispatch(fetchMoreProductsAction(products))
    dispatch(setProductLoadingAction(false))
}

export const initFillings = async (dispatch) => {
    dispatch(setFillingsLoadingAction(true))
    const fillings = await fetchFillings()
    dispatch(fetchFillingsAction(fillings))
    dispatch(setFillingsLoadingAction(false))
}
const checkDate = (dates, value) => {
    let check = false
    dates.forEach(el => {
        if (el.date === value) {
            check = true
        }
    })
    return check;

}
export const fetchCalendarDates = (dates, val = 0) => {
    const date = new Date()
    let month = date.getMonth() + val
    const year = date.getFullYear()
    let day = (new Date(year, month, 1)).getDay()
    day = day === 0 ? 7 : day
    let count = new Date(year, month + 1, 0).getDate();

    let arr = []
    for (let i = 1; i < day; i++) {
        arr.push(<div className="calendar__ceil blank"/>)
    }

    month = month > 9 ? month + 1 : `0${1 + month}`
    for (let i = 1; i <= count; i++) {
        if (checkDate(dates, `${i > 9 ? i : `0${i}`}.${month}.${year}`))
            arr.push(<div className="calendar__ceil cross">{i}</div>)
        else
            arr.push(<div className="calendar__ceil active">{i}</div>)
    }

    for (let i = arr.length % 7; i < 7; i++) {
        arr.push(<div className="calendar__ceil blank"/>)
    }
    return arr
}