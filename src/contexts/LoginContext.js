import { CircularProgress } from "@material-ui/core";
import ClipLoader from "react-spinners/ClipLoader";
import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState();
  const [user, setUser] = useState();

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
          setUser(data.user[0]);
        } else {
          setToken(null);
          setUser(null);
          localStorage.removeItem("accessToken");
        }

        setLoading(false);
      } catch (err) {
        console.warn(err);
      }
    }

    const currentToken = localStorage.getItem("accessToken");

    if (currentToken && currentToken !== " ") {
      verify(currentToken);
    } else {
      setLoading(false);
    }
    console.log("UseEffect LoginContext");
  }, []);

  function signIn(token, user) {
    const existsToken = localStorage.getItem("accessToken");

    if (existsToken) {
      localStorage.removeItem("accessToken");
    }

    localStorage.setItem("accessToken", token);
    setUser(user[0]);
    setToken(token);
  }

  function logOut() {
    localStorage.removeItem("accessToken");
    setUser(null);
    setToken(null);
  }

  function getLoadingScreen() {
    return <CircularProgress color="black" size={25} />;
  }

  return (
    <LoginContext.Provider
      value={{ loading, token, user, signIn, logOut, setUser }}
    >
      {!loading ? props.children : <Loading />}
    </LoginContext.Provider>
  );
};

function Loading(props) {
  return (
    <div className="loading">
      <div className="loading-logo">
        <ClipLoader size={100} color={"#123abc"} loading={true} />
      </div>
    </div>
  );
}

export default LoginContextProvider;
