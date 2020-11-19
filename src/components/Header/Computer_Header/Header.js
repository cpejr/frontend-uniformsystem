import React, {useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import Logo from "../../../Assets/Logo_1.png";

//importando icones:
import { FaShoppingCart, FaUser, FaAngleDown } from "react-icons/fa";

//importando os DropDowns
import DropDownLoginContent from '../Components/DropDownLoginContent'
import DropDownCartContent from '../Components/DropDownCartContent'


function Header() {
    const [ClickLogin, setClickLogin] = useState(false);
    const [ClickCart, setClickCart] = useState(false);

    return (
        <div className="all_header">
            <div className="header_content">
                <div className="logo_container">
                    <Link to="/home">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
                </div>
                <div className="icons">
                    <Link className="icon" to="/home">
                        HOME
                    </Link>
                    <Link className="icon" to="/shop">
                        LOJA
                    </Link>
                    <Link className="icon" to="/contact">
                        CONTATO
                    </Link>

                    <div
                        className="login"
                        style={{ position: "relative", margin: 0 }}
                    >
                        <div
                            className="icons_log"
                            onClick={() => {
                                setClickLogin(!ClickLogin);
                            }}
                        >
                            <FaUser className="user_icon" />{" "}
                            <div style={{ width: "fit-content" }}>ENTRAR</div>
                            <FaAngleDown className="arrow_icon" />
                        </div>
                        {ClickLogin && <DropDownLoginContent setClickLogin={setClickLogin}/> }
                    </div>

                    <div
                        className="all_cart"
                        style={{ position: "relative", margin: 0 }}
                    >
                        <div
                            className="cart"
                            onClick={() => setClickCart(!ClickCart)}
                        >
                            <FaShoppingCart
                                className="cart_icon"
                                style={{ margin: "0 30px" }}
                            />
                        </div>
                        {ClickCart && <DropDownCartContent setClickCart={setClickCart}/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
