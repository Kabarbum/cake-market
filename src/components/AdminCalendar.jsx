import React, {useMemo, useState} from 'react';
import {addDate, deleteDate} from "../firebase/requests";
import Calendar from "./Calendar";
import {useSelector} from "react-redux";

const AdminCalendar = () => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState(new Date())
    const data = `${time.getFullYear()}-${time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`}-${time.getDate()}`
    const dates = useSelector(state => state.calendar.dates).sort((a, b) => {
        let ai = a.date.split('.')
        ai=`${ai[2]}.${ai[1]}.${ai[0]}`
        let bi = b.date.split('.')
        bi=`${bi[2]}.${bi[1]}.${bi[0]}`
        return ai.localeCompare(bi)
    })
    const transformDate = useMemo(() => {
        let d = date.split("-")
        d = `${d[2]}.${d[1]}.${d[0]}`
        return d
    }, [date])

    const clickHandler = () => {
        if (transformDate) {
            addDate(transformDate)
        }
    }
    const deleteHandler = (id) => {
        deleteDate(id)
    }
    return (
        <div className="admin-calendar__content">
            <div>
                <div className="admin-calendar__form">
                    <input
                        type="date"
                        min={data}
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <div className="admin-calendar__btn" onClick={clickHandler}>добавить</div>
                </div>
                <div className="admin-calendar__list">
                    <ul>
                        {dates.map(el =>
                            <li key={el.id}>{el.date}
                                <div onClick={() => deleteHandler(el.id)} className="admin-calendar__delete-btn"></div>
                            </li>)}
                    </ul>
                </div>
            </div>
            <Calendar/>
        </div>
    );
};

export default AdminCalendar;