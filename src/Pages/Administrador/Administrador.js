import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* import Dropdown from "react-dropdown";
import "react-dropdown/style.css"; */

function Administrador() {

    let Var;
    const options = ["one", "two", "three"];
    const defaultOption = options[0];
    return (
        <div>
            <Header></Header>
            Pagina Administrador
            <br />
            <br />
            <Footer></Footer>
        </div>
    );
}

export default Administrador;
