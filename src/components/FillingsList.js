import React, {useEffect} from 'react';
import FillingItem from "./FillingItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchFillings} from "../firebase/requests";
import {fetchFillingsAction, setFillingsLoadingAction} from "../store/reducers/fillings";
import Loader from "./UI/Loader/Loader";

const FillingsList = () => {
    const dispatch = useDispatch()
    const fillings = useSelector(state => state.fillings.fillings)
    const isFillingsLoading = useSelector(state => state.fillings.isFillingsLoading)

    const initFillings = async () => {
        dispatch(setFillingsLoadingAction(true))
        const fillings = await fetchFillings()
        dispatch(fetchFillingsAction(fillings))
        dispatch(setFillingsLoadingAction(false))
    }
    useEffect(() => {
        initFillings()
    }, [])

    return (
        <>
            {isFillingsLoading ?
                <Loader/>
                :
                <>
                    {fillings.map(el => <FillingItem key={el.id} value={el}/>)}
                </>

            }
        </>
    );
};

export default FillingsList;