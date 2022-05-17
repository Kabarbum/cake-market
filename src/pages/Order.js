import React from 'react';
import Inst from "../img/contact-inst.png";
import VK from "../img/contact-vk.png";
import WhatsUp from "../img/contact-whatsapp.png";

const Order = () => {
    return (
        <div>
           order page
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
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Order;