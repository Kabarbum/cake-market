const SET_MENU_VISIBLE = "SET_MENU_VISIBLE"

const initialState = {
    isMenuVisible: false
}

export default function menuReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MENU_VISIBLE:
            return {...state, isMenuVisible: action.payload}
        default:
            return state
    }
}