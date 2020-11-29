import React, { useEffect, useState } from "react";
import "./FooterAdm.css";
import { Link } from "react-router-dom";

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "../../Assets/Logo_1.png";

function ComputerFooter() {
    return (
        <div className="all_footerAdm">
            <div className="content_footer">
                <div className="logo">
                    <Link to="/home">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
                </div>
                <span>ÀREA ADMINISTRATIVA</span>
            </div>
        </div>
    );
}

function MobileFooter() {
    return (
        <div className="cell_footerAdm">
            <div className="logo">
                <Link to="/home">
                    <img src={Logo} alt="Logo" className="Logo" />
                </Link>
            </div>
            <span>ÀREA ADMINISTRATIVA</span>
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
