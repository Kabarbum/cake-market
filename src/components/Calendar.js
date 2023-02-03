import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCalendarDates} from "../utils";
import {getDates} from "../asnycAction/calendar";

const Calendar = () => {
    const dispatch = useDispatch()
    const dates = useSelector(state => state.calendar.dates)
    const [date1] = useState(new Date())
    const [date2, setDate2] = useState(new Date())
    const [currentDate, setCurrentDate] = useState(0)

    useEffect(() => {
        dispatch(getDates())

        let d = new Date()
        d.setMonth(d.getMonth() + 1)
        setDate2(d)

    }, [currentDate])
    const daysArr = getCalendarDates(dates, currentDate)
    return (
        <div className="calendar__wrapper">
            <div className="calendar__header">
                <div onClick={() => setCurrentDate(0)}
                     className={currentDate === 0 ? "active" : null}>{date1.toLocaleString('default', {month: 'long'})}, {date1.getFullYear()}</div>
                &nbsp;-&nbsp;
                <div onClick={() => setCurrentDate(1)}
                     className={currentDate === 1 ? "active" : null }>{date2.toLocaleString('default', {month: 'long'})}, {date2.getFullYear()}</div>

            </div>
            <div className="calendar__map">
                <div className="calendar__map-header">
                    <div>Понедельник</div>
                    <div>Вторник</div>
                    <div>Среда</div>
                    <div>Четверг</div>
                    <div>Пятница</div>
                    <div>Суббота</div>
                    <div>Воскресенье</div>
                </div>
                {daysArr.map((val, idx) =>
                    <div key={idx}>{val}</div>
                )}
            </div>
        </div>
    );
};

export default Calendar;