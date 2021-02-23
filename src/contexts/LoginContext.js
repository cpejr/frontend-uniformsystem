import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [token, setToken] = useState("notYet");
  const [user, setUser] = useState("notYet");
  //Esses not yet sao gambiarra, por algum motivo o context ta renderizando de novo na atualizacao de pagina
  //Nao era pra fazer isso.

  useEffect(() => {
    async function verify(token) {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        const response = await api.get("/verify", config);
        console.log("Login context: ", response);
        const data = response.data;
        if (data.verified) {
          setToken(currentToken);
          setUser(data.user);
        } else {
          setToken(null);
          setUser(null);
          localStorage.removeItem("accessToken");
        }
      } catch (err) {
        console.warn(err);
      }
    }
    const currentToken = localStorage.getItem("accessToken");
    if (currentToken && currentToken !== " ") {
      verify(currentToken);
    }
    console.log("UseEffect LoginContext");
  }, []);

  function signIn(token, user) {
    const existsToken = localStorage.getItem("accessToken");

    if (existsToken) {
      localStorage.removeItem("accessToken");
    }
    localStorage.setItem("accessToken", token);
    setUser(user);
    setToken(token);
  }

  function logOut() {
    localStorage.removeItem("accessToken");
    setUser(null);
    setToken(null);
  }

  return (
    <LoginContext.Provider value={{ token, user, signIn, logOut, setUser }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
