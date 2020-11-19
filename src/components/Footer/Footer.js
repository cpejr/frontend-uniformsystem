import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "../../Assets/Logo_1.png";

function ComputerFooter() {
    return (
        <div className="all_footer">
            <div className="content_footer">
                <div className="logo">
                    <Link to="/home">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
                </div>
                <a href="https://www.google.com.br" className="customize">
                    <p
                        className="address"
                        style={{
                            height: "80% !important",
                            textAlign: "center",
                            fontSize: "14px",
                        }}
                    >
                        Rua Alguma Coisa, 100, Liberdade
                        <br />
                        Belo Horizonte - MG
                    </p>
                </a>
                <a href="https://www.google.com.br" className="customize">
                    (31) 99999-9999
                </a>
                <a href="https://www.google.com.br" className="contact">
                    CONTATO
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

function MobileFooter() {
    return (
        <div className="cell_footer">
            <div className="logo">
                <Link to="/home">
                    <img src={Logo} alt="Logo" className="Logo" />
                </Link>
            </div>
            <div className="content_footer">
                <div className="firstLine">
                    <a href="https://www.google.com.br" className="customize">
                        <p
                            className="address"
                        >
                            Rua Alguma Coisa, 100, Liberdade
                            <br />
                            Belo Horizonte - MG
                        </p>
                    </a>
                    <a href="https://www.google.com.br" className="customize">
                        (31) 99999-9999
                    </a>
                </div>
                <div className="secondLine">
                    <a href="https://www.google.com.br" className="contact">
                        CONTATO
                    </a>
                    <div className="icons">
                        <a href="https://www.facebook.com" className="facebook">
                            <FaFacebook />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            className="instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a href="https://www.whatsapp.com" className="whatsapp">
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OngShow(props) {
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;

        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (windowDimensions.width >= 850) return <ComputerFooter />;
    else return <MobileFooter />;
}
