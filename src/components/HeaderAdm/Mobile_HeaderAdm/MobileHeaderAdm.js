import React, { useContext } from "react";
import "./MobileHeaderAdm.css";
import { Link, useHistory } from "react-router-dom";

import Logo from "../../../Assets/Logo_1.png";
import { LoginContext } from '../../../contexts/LoginContext';

//importando icones:
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function MobileHeaderAdm() {
    const history = useHistory();
    const { user, logOut } = useContext(LoginContext);

    const handleLogOut = () => {
        logOut();
        history.push('/');
    }

    return (
        <div className="cell_header" >
            <div className="logo_container">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
            </div>
            <div className="header_content">
                <div className="rightSide">
                    <Link className="aboutTheUser" style={{textDecoration: 'none', color: "#fff"}} to="/perfil">
                        <FaUserCircle />
                        <div className="divNameFunction" >
                            <span>{user.name.split(" ")[0]}</span>
                            <p>{user.user_type === 'adm' ? "Administrador"
                            :
                                "Funcionário"
                            }</p>
                        </div>
                    </Link>

                    <div className="logoutPart" onClick={() => handleLogOut()}>
                        <span>Logout</span>
                        <FaSignOutAlt/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileHeaderAdm;
