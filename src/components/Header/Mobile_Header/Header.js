import React, { useContext, useState } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";

import { LoginContext } from "../../../contexts/LoginContext";
import Logo from "../../../Assets/Logo_1.png";

//importando icones:
import { FaUser, FaAngleDown, FaSignOutAlt } from "react-icons/fa";

import DropDownLoginContent from "../Components/DropDownLoginContent";

function MobileHeader() {
  const history = useHistory();
  const [ClickLogin, setClickLogin] = useState(false);
  const { user, logOut } = useContext(LoginContext);
  const currentUser = !user ? null : user;

  const handleLogOut = () => {
    logOut();
    history.push("/");
  };

  return (
    <div className="cell_header">
      <div className="logo_container">
        <Link to="/">
          <img src={Logo} alt="Logo" className="Logo" />
        </Link>
      </div>
      <div className="header_content_comum">
        <div className="icons">
          {/* <Link className="icon" to="/">
                        HOME
                    </Link>
                    <Link className="icon" to="/shop">
                        LOJA
                    </Link>
                    <Link className="icon" to="/contact">
                        CONTATO
                    </Link> */}

          <div className="login" style={{ position: "relative", margin: 0 }}>
            {currentUser ? (
              <Link className="icons_log" to="/perfil">
                <FaUser className="user_icon" />
                <div
                  className="aboutTheUser"
                  style={{ width: "fit-content", cursor: "pointer" }}
                >
                  {currentUser.name.split(" ")[0].toUpperCase()}
                </div>
              </Link>
            ) : (
              <>
                <div style={{ width: "230px", height: "2px" }}></div>
                <div
                  className="icons_log"
                  onClick={() => {
                    setClickLogin(!ClickLogin);
                  }}
                >
                  <div style={{ width: "fit-content", cursor: "pointer" }}>
                    {" "}
                    ENTRAR{" "}
                  </div>
                  <FaAngleDown className="arrow_icon" />
                </div>
                {ClickLogin && (
                  <DropDownLoginContent onClose={() => setClickLogin(false)} />
                )}
              </>
            )}
          </div>
          {currentUser ? (
            <>
              <div className="logoutPart" onClick={() => handleLogOut()}>
                <span>LOGOUT</span>
                <FaSignOutAlt />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
