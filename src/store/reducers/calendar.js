const SET_CALENDAR_DATES = "SET_CALENDAR_DATES"

const initialState = {
    dates: []
}

export default function calendarReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CALENDAR_DATES:
            return {...state, dates: action.payload}
        default:
            return state
    }
}

export const setCalendarDatesAction = (payload) => ({type: SET_CALENDAR_DATES, payload})