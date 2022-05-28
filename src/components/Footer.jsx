import React from 'react';

const Footer = () => {
    return (
        <footer>
            © 2022-{(new Date()).getFullYear()} Все права защищены, 'торты Златоуст на заказ'
        </footer>
    );
};

export default Footer;