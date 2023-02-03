import React, {useEffect} from 'react';
import FillingItem from "./FillingItem";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./UI/Loader/Loader";
import {initFillings} from "../asnycAction/fillings";

const FillingsList = () => {
    const dispatch = useDispatch()
    const fillings = useSelector(state => state.fillings.fillings)
    const isFillingsLoading = useSelector(state => state.fillings.isFillingsLoading)


    useEffect(() => {
        dispatch(initFillings())
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