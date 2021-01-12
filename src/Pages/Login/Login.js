import React from 'react';
import './Login.css';
import { useState } from 'react';

import CircularProgress from "@material-ui/core/CircularProgress";


function Login(){
  const [loading, setLoading] = useState(false);

  function handleEnter(e) {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <div className="login">
      <div className="box">
        <section className="form">
          <form>
            <h1>Login</h1>
            <h5>Usuário</h5>
            <input placeholder="Usuário"></input>
            <h5>Senha</h5>
            <input placeholder="Senha"></input>
            <button className= "button" type="submit" onClick={ handleEnter }>
              { loading ? <CircularProgress size={25} color='red' /> : "Entrar" }
            </button>
            <a href="/register">Esqueci minha senha</a>
          </form>
        </section>
        </div>
    </div>
  );
}

export default Login;