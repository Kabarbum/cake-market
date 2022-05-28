import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {fetchFillingsAction, setFillingsLoadingAction} from "../store/reducers/fillings";
import {fetchFillings} from "../firebase/requests";
import AdminFillingsList from "./AdminFillingsList";
import AdminFillingsForm from "./AdminFillingsForm";

const AdminFillings = () => {
    const dispatch = useDispatch()

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
            <AdminFillingsForm/>

            <AdminFillingsList/>
        </>
    );
};

export default AdminFillings;