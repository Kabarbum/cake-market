import {fetchFillings } from "../firebase/requests/fillings";
import {fetchFillingsAction, setFillingsLoadingAction} from "../store/reducers/fillings";

export const initFillings = () =>{
    return async dispatch => {
        dispatch(setFillingsLoadingAction(true))
        const fillings = await fetchFillings()
        dispatch(fetchFillingsAction(fillings))
        dispatch(setFillingsLoadingAction(false))
    }
}