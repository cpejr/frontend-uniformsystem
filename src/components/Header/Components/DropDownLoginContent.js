import React, { useState, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";
import api from "../../../services/api";
import { LoginContext } from "../../../contexts/LoginContext";

import { makeStyles } from "@material-ui/core/styles";

import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import PopUpForgotPassword from "../../../components/PopUpForgotPassword";

export default function DropDownLoginContent(props) {
  const User = useRef();
  const Password = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { signIn } = useContext(LoginContext);
  const history = useHistory();
  const classes = useStyles();

  const [forgotOpen, setForgotOpen] = useState(false);

  function handleOpen() {
    setForgotOpen(true);
  }

  function handleForgotClose() {
    setForgotOpen(false);
  }

  function handleClickAway(e) {
    props.setClickLogin(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    if (User.length > 0 && Password.length > 6) {
      try {
        const response = await api.post("/login", {
          email: User,
          password: Password,
        });
        if (response.data && response.data.accessToken) {
          const token = response.data.accessToken;
          const user = response.data.user;
          signIn(token, user);
          //Aqui manda para a rota logo apos o login
          if (user[0].user_type === process.env.REACT_APP_ADM_ROLE) {
            history.push("/adm/home");
          } else if (
            user[0].user_type === process.env.REACT_APP_EMPLOYEE_ROLE
          ) {
            history.push("/adm/pedidos");
          } else {
            history.push("/");
          }
        } else {
          alert(`Email ou senha incorretos!`);
        }

        setError(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    setLoading(false);
  }

  function verifyFields() {}

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <form className="drop_content">
        <div className="title_login">LOGIN</div>
        <div className="drop_content_body">
          <div className="input_wrap">
            USUÁRIO
            <input
              type="text"
              onChange={(e) => {
                User.current = e.target.value;
              }}
            />
            {User.length === 0 && (
              <Alert
                className={classes.alertStyle}
                variant="outlined"
                severity="error"
              >
                Digite um usuário.
              </Alert>
            )}
          </div>
          <div className="input_wrap">
            SENHA
            <input
              type="password"
              onChange={(e) => {
                Password.current = e.target.value;
              }}
            />
            {Password.length < 6 && (
              <Alert
                className={classes.alertStyle}
                variant="outlined"
                severity="error"
              >
                Digite uma senha com no mínimo 6 caracteres.
              </Alert>
            )}
            {true && (
              <Alert
                className={classes.alertStyle}
                variant="outlined"
                severity="error"
              >
                Usuário e/ou senha incorretos.
              </Alert>
            )}
          </div>
          <div className="buttons">
            <button onClick={(e) => handleLogin(e)}>
              {loading ? (
                <CircularProgress color="black" size={25} />
              ) : (
                "ACESSAR"
              )}
            </button>

            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="/cadastro"
            >
              <button onClick={() => history.push("/cadastro")}>
                CADASTRAR
              </button>
            </Link>
          </div>

          <div className="forgetPassword" onClick={handleOpen}>
            Esqueceu sua senha?
          </div>
        </div>
        <PopUpForgotPassword open={forgotOpen} onClose={handleForgotClose} />
      </form>
    </ClickAwayListener>
  );
}

const useStyles = makeStyles((theme) => ({
  alertStyle: {
    border: "none",
    margin: "0",
    padding: "0",
    color: "red",
    fontSize: "0.8rem",
  },
}));
