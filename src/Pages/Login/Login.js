import React from 'react';
import './Login.css';


function Login(){
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
            <button className= "button" type="submit">Entrar</button>
            <a href="/register">Esqueci minha senha</a>
          </form>
        </section>
        </div>
    </div>
  );
}

export default Login;