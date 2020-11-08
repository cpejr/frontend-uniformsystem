import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import { Input } from "@material-ui/core";

import Logo from "../../Assets/Logo_1.png";

//importando icones:
import { FaShoppingCart, FaUser, FaAngleDown, FaSearch } from "react-icons/fa";

function Header() {
    const [ShowInput, setShowInput] = useState(false);
    const [SearchWord, setSearchWord] = useState("");

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

                    <Link to="./perfil" className="login">
                        <FaUser className="user_icon" />{" "}
                        <div style={{ width: "fit-content" }}>ENTRAR</div>
                        <FaAngleDown className="arrow_icon" />
                    </Link>

                    <FaSearch
                        className="search_icon"
                        onClick={() => setShowInput(!ShowInput)}
                    />

                    {ShowInput && (
                        <input
                            type="search"
                            className="inputSearch"
                            onChange={(e) => setSearchWord(e.target.value)}
                            placeholder="O que deseja encontrar?"
                        ></input>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
