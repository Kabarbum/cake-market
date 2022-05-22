const FETCH_FILLINGS = "FETCH_FILLINGS"
const SET_FILLINGS_LOADING = "SET_FILLINGS_LOADING"

const initialState = {
    fillings: [],
    isFillingsLoading: false
}

export default function fillingsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_FILLINGS:
            return {...state, fillings: action.payload}
        case SET_FILLINGS_LOADING:
            return {...state, isFillingsLoading: action.payload}
        default:
            return state
    }
}

export const fetchFillingsAction = (payload) => ({type: FETCH_FILLINGS, payload})
export const setFillingsLoadingAction = (payload) => ({type: SET_FILLINGS_LOADING, payload})