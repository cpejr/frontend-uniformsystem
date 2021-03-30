import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import MetaData from "../../meta/reactHelmet";
import { LoginContext } from "../../contexts/LoginContext";
import api from "../../services/api";
import "./Login.css";

import ForgotPasswordDialog from "../../components/ForgotPasswordDialog";

function Login() {
  const { signIn } = useContext(LoginContext);
  const history = useHistory();

  const [openDialog, setOpenDialog] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const meta = {
    titlePage: "Uniformes Ecommerce | Login",
    titleSearch: "Profit Uniformes | Login",
    description:
      "Faça login com sua conta profit e conheça nossos uniformes personalizados e funcionalidades.",
    keyWords: "Uniformes | Login | Entrar | Ecommerce | Profit",
    imageUrl: "",
    imageAlt: "",
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateInputs = (type, value) => {
    let isValid;

    switch (type) {
      case "email":
        if (value === "" || !value.includes("@") || !value.includes(".com")) {
          isValid = false;
        } else {
          isValid = true;
        }

        break;
      case "password":
        if (value === "") {
          isValid = false;
        } else {
          isValid = true;
        }
        break;

      default:
        break;
    }
    return isValid;
  };

  async function handleSubmit() {
    const isEmailValid = validateInputs("email", email);
    const isPasswordValid = validateInputs("password", password);

    if (!isEmailValid || !isPasswordValid) {
      if (!isEmailValid) {
        setErrorEmail(true);
        setErrorEmailMessage("E-mail inválido");
      } else {
        setErrorEmail(false);
        setErrorEmailMessage("");
      }

      if (!isPasswordValid) {
        setErrorPassword(true);
        setErrorPasswordMessage("Campo inválido");
      } else {
        setErrorPassword(false);
        setErrorPasswordMessage("");
      }
    } else {
      setLoading(true);

      setErrorEmail(false);
      setErrorEmailMessage("");
      setErrorPassword(false);
      setErrorPasswordMessage("");

      try {
        const response = await api.post("/session/login", {
          email: email,
          password: password,
        });
        console.log("resposta", response);
        if (response.data && response.data.accessToken) {
          const token = response.data.accessToken;
          const user = response.data.user;
          signIn(token, user);
          //Aqui manda para a rota logo apos o login
          if (user.user_type === process.env.REACT_APP_ADM_ROLE) {
            history.push("/adm/home");
          } else if (
            user.user_type === process.env.REACT_APP_EMPLOYEE_ROLE
          ) {
            history.push("/adm/pedidos");
          } else {
            history.push("/");
          }
        } else {
          alert(`Email ou senha incorretos!`);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(`Acesso negado!`);
        console.warn(err);
      }
    }
  }

  function handleCloseDialog(){
    setOpenDialog(false);
  }

  async function sendPassword(email){
    try {
      await api.post("/users/sendpassword", {
        email: email,
      });
    } catch (error) {
      if (error.response) {
        const { response } = error;
        if (response.data?.validation?.body?.keys[0] === "email")
          alert("E-mail inválido");
        else if (response.data?.code === "auth/user-not-found")
          alert(
            "E-mail não encontrado. Verifique se escreveu corretamente ou faça o cadastro! :) "
          );
      }
    }
    handleCloseDialog();
  }

  return (
    <div className="login">
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <div className="box">
        <section className="form">
          <form>
            <h1>Login</h1>
            <h5>Usuário</h5>
            <TextField
              variant="outlined"
              type="text"
              label="Usuário"
              error={errorEmail}
              helperText={errorEmailMessage}
              onChange={(e) => handleEmail(e)}
            />
            <h5>Senha</h5>

            <TextField
              variant="outlined"
              type="password"
              label="Senha"
              error={errorPassword}
              helperText={errorPasswordMessage}
              onChange={(e) => handlePassword(e)}
            />
            <Button
              className="button"
              color="primary"
              onClick={() => handleSubmit()}
            >
              {loading ? <CircularProgress /> : "Entrar"}
            </Button>
            <a onClick={()=>setOpenDialog(true)}>Esqueci minha senha</a>
          </form>
        </section>
      </div>
      <ForgotPasswordDialog open={openDialog} handleClose={handleCloseDialog} handleSend={sendPassword} />
    </div>
  );
}

export default Login;
