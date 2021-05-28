import React, { useState, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";
import api from "../../../services/api";
import { LoginContext } from "../../../contexts/LoginContext";

import { makeStyles } from "@material-ui/core/styles";

import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import PopUpForgotPassword from "../../../components/PopUpForgotPassword";

export default function DropDownLoginContent({ onClose }) {
  const User = useRef();
  const Password = useRef();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  function goToRegister() {
    history.push("/cadastro");
    onClose();
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    if (verifyFields()) {
      if (errors) setErrors({});

      try {
        const response = await api.post("/session/login", {
          email: User.current,
          password: Password.current,
        });

        if (response.data?.accessToken) {
          const { accessToken, user } = response.data;

          signIn(accessToken, user);
          //Aqui manda para a rota logo apos o login
          switch (user.user_type) {
            case process.env.REACT_APP_ADM_ROLE:
              history.push("/adm/home");
              break;
            case process.env.REACT_APP_EMPLOYEE_ROLE:
              history.push("/adm/pedidos");
              break;

            default:
              history.push("/");
              break;
          }
        } else {
          setErrors({ general: "Usuário e/ou senha incorretos." });
        }
      } catch (error) {
        console.warn(error.response);
        if (error.response.status >= 400 && error.response.status < 500)
          setErrors({ general: "Usuário e/ou senha incorretos." });
        else {
          setErrors({
            general:
              "Ocorreu uma falha interna no servidor, tente novamente mais tarde",
          });
          console.error(error.response.data);
        }
      }
    }
    setLoading(false);
  }

  function verifyFields() {
    const newErrors = {};
    if (User.length === 0) newErrors.user = "Digite um usuário.";
    if (Password.length < 6)
      newErrors.password = "Digite uma senha com no mínimo 6 caracteres.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={onClose}
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
            {errors?.user && (
              <Alert
                className={classes.alertStyle}
                variant="outlined"
                severity="error"
              >
                {errors.user}
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
            <div className="alert_size_fix">
              {errors?.password && (
                <Alert
                  className={classes.alertStyle}
                  variant="outlined"
                  severity="error"
                >
                  {errors.password}
                </Alert>
              )}
              {errors?.general && (
                <Alert
                  className={classes.alertStyle}
                  variant="outlined"
                  severity="error"
                >
                  {errors.general}
                </Alert>
              )}
            </div>
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
              <button onClick={goToRegister} className="outlined">
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
