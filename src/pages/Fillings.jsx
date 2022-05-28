import React from 'react';
import FillingsList from "../components/FillingsList";

const Fillings = () => {
    return (
        <main>
            <div className="container">
                <div className="fillings">
                    <h1>Начинки</h1>

                    <div className="title-line"/>

                    <div className="fillings__section">
                        <div className="fillings__section-content">

                            <FillingsList/>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Fillings;