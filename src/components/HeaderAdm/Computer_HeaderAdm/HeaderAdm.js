import React from "react";
import "./HeaderAdm.css";
import { Link } from "react-router-dom";

import Logo from "../../../Assets/Logo_1.png";

//importando icones:
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function HeaderAdm() {

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
                            <span>Algum Fulano Aí</span>
                            <p>Administrador</p>
                        </div>
                    </div>

                    <div className="logoutPart">
                        <span>Logout</span>
                        <FaSignOutAlt/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAdm;
