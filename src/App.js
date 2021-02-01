/*eslint-disable*/
import React from "react";

import Routes from "./routes";
import LoginContextProvider from "./contexts/LoginContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <LoginContextProvider>
      <Routes />
    </LoginContextProvider>
  );
}

export default App;
