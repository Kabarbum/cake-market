import React from 'react'
const checkDate = (dates, value) => {
    let check = false
    dates.forEach(el => {
        if (el.date === value) {
            check = true
        }
    })
    return check;
}
export const getCalendarDates = (dates, val = 0) => {
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
