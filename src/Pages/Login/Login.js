import React, { useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import { LoginContext } from "../../contexts/LoginContext";
import api from "../../services/api";
import './Login.css';


function Login(){

  const { signIn } = useContext(LoginContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState('');

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const validateInputs = (type, value) => {

    let isValid;

    switch (type) {
      case 'email':
        if(value === '' || !value.includes('@') || !value.includes('.com')){
          isValid = false;
        }else{
          isValid = true;
        }
        
        break;
        case 'password':
          if(value === ''){
            isValid = false;
          }else{
            isValid = true;
          }
        break;
    
      default:
        break;
    }
    return isValid;
    
  }

	async function handleSubmit() {
    
    const isEmailValid = validateInputs('email', email);
    const isPasswordValid = validateInputs('password', password);

    if( !isEmailValid || !isPasswordValid ){
      if(!isEmailValid){
        setErrorEmail(true);
        setErrorEmailMessage('E-mail inválido');
      }else{
        setErrorEmail(false);
        setErrorEmailMessage('');
      }

      if(!isPasswordValid){
        setErrorPassword(true);
        setErrorPasswordMessage('Campo inválido');
      }else{
        setErrorPassword(false);
        setErrorPasswordMessage('');
      }
    }else{

      setLoading(true);

      setErrorEmail(false);
      setErrorEmailMessage('');
      setErrorPassword(false);
      setErrorPasswordMessage('');

      try {
        const response = await api.post("/login", {
          "email": email, 
          "password": password
        });
        console.log('resposta', response)
        if (response.data && response.data.accessToken) {
          console.log('entou aqui')
          const token = response.data.accessToken;
          const user = response.data.user;
          signIn(token, user);
          console.log('auiq foi')
          //Aqui manda para a rota logo apos o login
          history.push("/adm/home");
        } else {
          alert(`Email ou senha incorretos!`);
        }
        setLoading(false);

      }catch(err) {
        setLoading(false);
        alert(`Acesso negado!`);
        console.warn(err);
      }

    }

  }
  
  return (
    <div className="login">
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
              className= "button" 
              color="primary"
              onClick={() => handleSubmit()}
            >
              {
                loading ?
                  <CircularProgress/> :
                  "Entrar"
              }
            </Button>
            <Link to="/register">Esqueci minha senha</Link>
          </form>
        </section>
        </div>
    </div>
  );
}

export default Login;