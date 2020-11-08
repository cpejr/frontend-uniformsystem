import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "../../Assets/Logo_1.png";

function Footer() {
    return (
        <div className="all_footer">
            <div className="content_footer">
                <div className="logo">
                    <Link to="/home">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
                </div>
                <a href="https://www.google.com.br" className="customize">
                    Customize o seu uniforme
                </a>
                <a href="https://www.google.com.br" className="contact">
                    Contato
                </a>
                <div className="icons">
                    <a href="https://www.facebook.com" className="facebook">
                        <FaFacebook />
                    </a>
                    <a href="https://www.instagram.com" className="instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://www.whatsapp.com" className="whatsapp">
                        <FaWhatsapp />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
