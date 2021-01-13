import React, { useContext, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import { LoginContext } from '../../../contexts/LoginContext';
import Logo from "../../../Assets/Logo_1.png";

//importando icones:
import { FaShoppingCart, FaUser, FaAngleDown } from "react-icons/fa";

import DropDownLoginContent from "../Components/DropDownLoginContent";
import DropDownCartContent from "../Components/DropDownCartContent";

function MobileHeader() {
    const [ClickLogin, setClickLogin] = useState(false);
    const [ClickCart, setClickCart] = useState(false);

    const { user } = useContext(LoginContext);
    const currentUser = !user || user === 'notYet' ? null : user[0];

    return (
        <div className="cell_header">
             <div className="logo_container">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
                </div>
            <div className="header_content">
                <div className="icons">
                    <Link className="icon" to="/">
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
                        {
                            currentUser ? 
                            <Link
                                className="icons_log"
                                to="/perfil"
                            >
                                <FaUser className="user_icon" />
                                <div style={{ width: "fit-content", cursor: "pointer"}}>{currentUser.name.toUpperCase()}</div>
                            </Link>
                            :
                                <>
                                    <div
                                        className="icons_log"
                                        onClick={() => {
                                            setClickLogin(!ClickLogin);
                                        }}
                                    >
                                        <div style={{ width: "fit-content", cursor: "pointer"}}> ENTRAR </div>
                                        <FaAngleDown className="arrow_icon" />
                                    </div>
                                    {ClickLogin && <DropDownLoginContent setClickLogin={setClickLogin}/> }
                                </>
                        }
                    </div>
                    {
                        currentUser ? 
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
                                {ClickCart && (
                                    <DropDownCartContent setClickCart={setClickCart} />
                                )}
                            </div>
                        :
                            <>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default MobileHeader;
