import React, {useState, useContext } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";

import { LoginContext } from '../../../contexts/LoginContext';
import Logo from "../../../Assets/Logo_1.png";

//importando icones:
import { FaShoppingCart, FaUser, FaAngleDown, FaSignOutAlt } from "react-icons/fa";

//importando os DropDowns
import DropDownLoginContent from '../Components/DropDownLoginContent'
import DropDownCartContent from '../Components/DropDownCartContent'


function Header() {
    const history = useHistory();
    const [ClickLogin, setClickLogin] = useState(false);
    const [ClickCart, setClickCart] = useState(false);

    const { user, logOut } = useContext(LoginContext);
    const currentUser = !user || user === 'notYet' ? null : user[0];
    const name = currentUser.name.split(" ");

    const handleLogOut = () => {
        logOut();
        history.push('/');
    }

    return (
        <div className="all_header">
            <div className="header_content_comum">
                <div className="logo_container">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
                </div>
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
                                <div style={{ width: "fit-content", cursor: "pointer"}}>{name[0].toUpperCase()}</div>
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
                            <>
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
                                            style={{ margin: "0 30px", cursor: "pointer"}}
                                        />
                                    </div>
                                    {ClickCart && <DropDownCartContent setClickCart={setClickCart}/>}
                                </div>
                                <div className="logoutPart" onClick={() => handleLogOut()}>
                                    <span>LOGOUT</span>
                                    <FaSignOutAlt/>
                                </div>
                            </>
                        :
                            <>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;
