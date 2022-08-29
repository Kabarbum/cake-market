import React from 'react';
import Inst from "../img/contact-inst.png";
import VK from "../img/contact-vk.png";
import WhatsUp from "../img/contact-whatsapp.png";
import Calendar from "../components/Calendar";
import activeBg from "../img/active-bg.png"
import brushBg from "../img/cross-bg.png"
const Order = () => {
    return (
        <div className="order-page">
            <div className="contacts">
                <div className="container">

                    <div className="contacts-body">
                    <span>
                        <h3>Контакты</h3>
                        <p>Отвечаю в инстаграмме в течение 24 часов.</p>
                        <p>О доставке либо самовывозе договариваемся по факту заказа.</p>
                    </span>
                        <div className="contacts-socials">
                            <a href="https://www.instagram.com/e.a.cherem/">
                                <img src={Inst} alt="Inst"/></a>
                            <a href="https://vk.com/karamel_zlat">
                                <img src={VK} alt="Vk"/></a>
                            <a href="https://api.whatsapp.com/send/?phone=79026017967">
                                <img src={WhatsUp} alt="WhatsUp"/></a>
                        </div>
                        <div className="calendar-description__list">
                            <div className="calendar-description__list-item">
                                <div className="calendar-description__img"><img src={activeBg} alt="cake"/></div>
                                <span> - Свободный для заказа день</span>
                            </div>
                            <div className="calendar-description__list-item">
                                <div className="calendar-description__img"><img src={brushBg} alt="cross"/></div>
                                <span> - День уже заполнен</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Calendar/>

        </div>
    );
};

export default Order;