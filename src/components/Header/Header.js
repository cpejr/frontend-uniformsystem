import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import Logo from "../../Assets/Logo_1.png";

//importando icones:
import { FaShoppingCart, FaUser, FaAngleDown, FaSearch } from "react-icons/fa";

function Header() {
    return (
        <div className="all_header">
            <div className="header_content">
                <div className="logo_container">
                    <Link to="/home">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
                </div>
                <div className="icons">
                    <Link to="./cart">
                        <FaShoppingCart className="cart_icon" />
                    </Link>

                    <Link to="./login" className="login">
                        <FaUser className="user_icon" /> ENTRAR
                        <FaAngleDown className="arrow_icon" />
                    </Link>

                    <FaSearch className="search_icon" />
                </div>
            </div>
        </div>
    );
}

export default Header;
