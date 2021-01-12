import React, { useContext } from "react";
import "./HeaderAdm.css";
import { Link, useHistory } from "react-router-dom";

import Logo from "../../../Assets/Logo_1.png";

import { LoginContext } from '../../../contexts/LoginContext';

//importando icones:
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function HeaderAdm() {
    const history = useHistory();
    const { user, logOut } = useContext(LoginContext);
    const currentUser = user[0];

    const handleLogOut = () => {
        logOut();
        history.push('/');
    }

    return (
        <div className="all_header">
            <div className="header_content">
                <div className="logo_container">
                    <Link to="/adm">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
                </div>
                <div className="rightSide">
                    
                    <div className="aboutTheUser">
                        <FaUserCircle />
                        <div className="divNameFunction" >
                            <span>{currentUser.name}</span>
                            <p>{currentUser.user_type === 'adm' ? "Administrador"
                            :
                                "Funcionário"
                            }</p>
                        </div>
                    </div>

                    <div className="logoutPart" onClick={() => handleLogOut()}>
                        <span>Logout</span>
                        <FaSignOutAlt/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAdm;
