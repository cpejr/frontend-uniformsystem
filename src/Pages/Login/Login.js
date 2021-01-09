import React, { useState, useContext } from "react";
import { Link, Route } from 'react-router-dom';
import { LoginContext } from "../../contexts/LoginContext";
import api from "../../services/api";
import './Login.css';


function Login(){

  const { signIn } = useContext(LoginContext);
  const { history } = Route;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

	async function handleSubmit(e) {
    e.preventDefault();
    

    try {
      const response = await api.post("login", {email, password});
      if (response.data && response.data.accessToken) {
        const token = response.data.accessToken;
        const user = response.data.user;
        signIn(token, user);
				//Aqui manda para a rota logo apos o login
        history.push("/adm/home");
      } else {
        alert(`Usuario ou senha incorretos!`);
      }
    } catch (error) {
      alert(`Acesso negado!`);
      console.warn(error);
    }
  }
  
  return (
    <div className="login">
      <div className="box">
        <section className="form">
          <form>
            <h1>Login</h1>
            <h5>Usuário</h5>
            <input type="text" placeholder="Usuário" onChange={(e) => handleEmail(e)}/>
            <h5>Senha</h5>
            <input type="password" placeholder="Senha" onChange={(e) => handlePassword(e)}/>
            <button className= "button" type="submit" onChange={(e) => handleSubmit(e)}>Entrar</button>
            <Link to="/register">Esqueci minha senha</Link>
          </form>
        </section>
        </div>
    </div>
  );
}

export default Login;