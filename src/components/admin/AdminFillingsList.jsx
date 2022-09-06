import React, {useEffect} from 'react';
import AdminFillingItem from "./AdminFillingItem";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../UI/Loader/Loader";
import {initFillings} from "../../asnycAction/fillings";
import {
    setFillingChangingAction,
    setFillingCompositionAction,
    setFillingIdAction, setFillingPriceAction,
    setFillingTitleAction,
    setFillingUrlAction, setPrevFillingUrlAction,
} from "../../store/reducers/admin";
import {deleteFilling} from "../../firebase/requests/fillings";

const FillingsList = () => {
    const dispatch = useDispatch()
    const fillings = useSelector(state => state.fillings.fillings)
    const isFillingsLoading = useSelector(state => state.fillings.isFillingsLoading)


    useEffect(() => {
        dispatch(initFillings())
    }, [dispatch])

    const setItem = (value) => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        dispatch(setFillingChangingAction(true))
        dispatch(setFillingIdAction(value.id))
        dispatch(setFillingTitleAction(value.title))
        dispatch(setFillingCompositionAction(value.composition))
        dispatch(setFillingPriceAction(value.price))
        dispatch(setFillingUrlAction(value.imgUrl))
        dispatch(setPrevFillingUrlAction(value.imgUrl))
    }
    const deleteItem = (id, url) => {
        deleteFilling(id, url)
    }
    return (
        <div className="fillings__section-content">
            {isFillingsLoading ?
                <Loader/>
                :
                <>
                    {fillings.map(el =>
                        <AdminFillingItem
                            key={el.id}
                            value={el}
                            setItem={setItem}
                            deleteItem={deleteItem}
                        />
                    )}
                </>
            }
        </div>
    );
};

export default FillingsList;