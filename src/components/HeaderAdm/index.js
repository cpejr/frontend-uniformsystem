import React, { useEffect, useState } from "react";

import ComputerHeaderAdm from "./Computer_HeaderAdm/HeaderAdm";
import MobileHeaderAdm from "./Mobile_HeaderAdm/MobileHeaderAdm";

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

    if (windowDimensions.width >= 850) return <ComputerHeaderAdm />;
    else return <MobileHeaderAdm />;
}
