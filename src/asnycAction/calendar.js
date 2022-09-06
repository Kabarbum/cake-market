import {fetchDates} from "../firebase/requests/calendar";
import {setCalendarDatesAction} from "../store/reducers/calendar";

export const getDates = () =>{
    return async dispatch => {
        const arr = await fetchDates();
        dispatch(setCalendarDatesAction(arr))
    }
}