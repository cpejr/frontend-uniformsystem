import React, { useContext } from "react";
import "./MobileHeaderAdm.css";
import { Link } from "react-router-dom";

import Logo from "../../../Assets/Logo_1.png";
import { LoginContext } from '../../../contexts/LoginContext';

//importando icones:
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function MobileHeaderAdm() {

    const { user, logOut } = useContext(LoginContext);

    const currentUser = user[0];

    return (
        <div className="cell_header" >
            <div className="logo_container">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
            </div>
            <div className="header_content">
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

                    <div className="logoutPart" onClick={() => logOut()}>
                        <span>Logout</span>
                        <FaSignOutAlt/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileHeaderAdm;
