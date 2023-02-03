import React, {useState} from 'react';
import Inst from "../img/contact-inst.png";
import VK from "../img/contact-vk.png";
import WhatsUp from "../img/contact-whatsapp.png";
import venchik from "../img/venchik.png"
import Loader from "../components/UI/Loader/Loader";
const Order = () => {
    const [isLoading, setIsLoading] = useState(0)
    return (
        <div className="order-page">
            <div className="contacts">
                <div className="container">

                    <div className="contacts-body">
                    <span>
                        <h3>С радостью отвечу тебе в соц.&nbsp;сетях</h3>
                        <p>Отвечаю в инстаграме в течение суток</p>
                    </span>
                        <div className="contacts-socials">
                            <ul>
                                <li>
                                    <a href="https://www.instagram.com/e.a.cherem/">
                                        <img src={Inst} alt="Inst"/>
                                        <span>e.a.cherem</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://vk.com/vkysnotort_spb">
                                        <img src={VK} alt="Vk"/>
                                        <span>vkysnotort_spb</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://api.whatsapp.com/send/?phone=79823662301">
                                        <img src={WhatsUp} alt="WhatsUp"/>
                                        <span>+7 (982) 366-23-01</span>
                                    </a>
                                </li>
                            </ul>

                            <div className="venchik">
                                <img src={venchik} alt="venchik"/>
                            </div>
                        </div>
                        {
                            isLoading===0 && <Loader/>
                        }
                            <iframe
                                onLoad={() => setIsLoading("100%")}
                                title={"yaMap"}
                                src="https://yandex.ru/map-widget/v1/?um=constructor%3A4c7cf2a2eb882a94ca8831cfe4ba079f6e52fe6f27f665f3035498373849af9b&amp;source=constructor"
                                width={isLoading} height="450" frameBorder="0"/>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default Order;