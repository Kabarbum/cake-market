import React, {useEffect} from 'react';
import FillingItem from "./FillingItem";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./UI/Loader/Loader";
import {initFillings, initProducts} from "../utils";

const FillingsList = () => {
    const dispatch = useDispatch()
    const fillings = useSelector(state => state.fillings.fillings)
    const isFillingsLoading = useSelector(state => state.fillings.isFillingsLoading)


    useEffect(() => {
        async function fetchData() {
            await initFillings(dispatch)
        }
        fetchData();
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