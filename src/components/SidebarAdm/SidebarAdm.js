import React, { useEffect, useState } from "react";
import "./SidebarAdm.css";
import { Link } from "react-router-dom";

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

function ComputerSidebar() {
    return (
        <h1>ComputerSidebar</h1>
    );
}

function MobileSidebar() {
    return (
        <h1>MobileSidebar</h1>
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

    if (windowDimensions.width >= 850) return <ComputerSidebar />;
    else return <MobileSidebar />;
}
