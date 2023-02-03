import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import AdminFillingsList from "./AdminFillingsList";
import AdminFillingsForm from "./AdminFillingsForm";
import {initFillings} from "../../asnycAction/fillings";

const AdminFillings = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initFillings())
    }, [])
    return (
        <>
            <AdminFillingsForm/>

            <AdminFillingsList/>
        </>
    );
};

export default AdminFillings;