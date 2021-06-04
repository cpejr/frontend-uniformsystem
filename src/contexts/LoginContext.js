import ClipLoader from "react-spinners/ClipLoader";
import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState();
  const [user, setUser] = useState();

  async function verify(token) {
    try {
      const responseUser = await api.get("/session/verify");
      const data = responseUser.data;

      if (data.verified) {
        let user = data.user[0];
        setToken(token);
        const responseCart = await api.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (responseCart.data) {
          user.cart = responseCart.data;
        }
        setUser(user);
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

  async function updateCart(baseUser) {
    try {
      if (baseUser) {
        const responseCart = await api.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        baseUser.cart = responseCart.data;
        setUser({ ...baseUser });
      }
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    const verification = async () => {
      const currentToken = localStorage.getItem("accessToken");

      if (currentToken && currentToken !== " ") {
        await verify(currentToken);
      } else {
        setLoading(false);
      }
      console.log("UseEffect LoginContext");
    };
    verification();
  }, []);

  function signIn(token, user) {
    const existsToken = localStorage.getItem("accessToken");

    if (existsToken) {
      localStorage.removeItem("accessToken");
    }

    localStorage.setItem("accessToken", token);
    setUser(user[0]);
    setToken(token);
    updateCart(user[0]);
  }

  function logOut() {
    localStorage.removeItem("accessToken");
    setUser(null);
    setToken(null);
  }

  return (
    <LoginContext.Provider
      value={{
        loading,
        token,
        user,
        signIn,
        logOut,
        setUser,
        verify,
        updateCart,
      }}
    >
      {!loading ? props.children : <Loading />}
    </LoginContext.Provider>
  );
};

function Loading(props) {
  return (
    <div className="loading" style={{ width: "100vw", height: "100vh" }}>
      <div
        className="loading-logo"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ClipLoader size={100} color={"#123abc"} loading={true} />
      </div>
    </div>
  );
}

export default LoginContextProvider;
