import React, { useEffect, useState } from "react";

import ComputerHeader from "./Computer_Header/Header";
import MobileHeader from "./Mobile_Header/Header";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
        width,
        height,
    };
}

export default function OngShow(props) {
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

    if (windowDimensions.width >= 850) return <ComputerHeader />;
    else return <MobileHeader />;
}
