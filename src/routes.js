import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import Home from "./Pages/Home";

import HomeEditable from "./Pages/Administrador/HomeEditable";
import OrdersAdm from "./Pages/Administrador/OrdersAdm";
import EspecificOrderAdm from "./Pages/Administrador/OrdersAdm/EspecificOrderAdm";
import ProductsAdm from "./Pages/Administrador/ProductsAdm";
import RegisterProduct from "./Pages/Administrador/ProductsAdm/RegisterProduct";
import EditProduct from "./Pages/Administrador/ProductsAdm/EditProduct";
import EmployeeAdm from "./Pages/Administrador/EmployeeAdm";
import CadastroFunc from "./Pages/Administrador/EmployeeAdm/CadastroFunc";
import EspecificEmployee from "./Pages/Administrador/EmployeeAdm/EspecificEmployee";

import Loja from "./Pages/Loja";
import Produto from "./Pages/Produto";
import Perfil from "./Pages/Perfil";
import EditarPerfil from "./Pages/EditarPerfil";
import Login from "./Pages/Login";
import Carrinho from "./Pages/Carrinho";
import Contato from "./Pages/Contato";
import Checkout from "./Pages/Checkout";
import Cadastro from "./Pages/Cadastro";
import Error from "./Pages/Error";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HeaderAdm from "./components/HeaderAdm";
import FooterAdm from "./components/FooterAdm";
import SidebarAdm from "./components/SidebarAdm";
import SidebarClient from "./components/SidebarClient";

import {
  isAuthenticated,
  isADM,
  isADMOrEmployee,
  isClientOrADMOrEmployee,
} from "./services/auth";
import { LoginContext } from "./contexts/LoginContext";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

// Controle de rotas para Cliente
const PrivateClientRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(LoginContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isClientOrADMOrEmployee(user) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

// Controle de rotas para ADM
const PrivateADMRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(LoginContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isADM(user) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

// Controle de rotas para Employee ou ADM
const PrivateADMOrEmployeeRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(LoginContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isADMOrEmployee(user) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          render={(path) =>
            path.location.pathname.includes("/adm/") ? (
              <AdmRoutes />
            ) : (
              <MenuRoutes />
            )
          }
        />
      </Switch>
    </BrowserRouter>
  );
}

function MenuRoutes() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const { user } = useContext(LoginContext);
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (windowDimensions.width <= 850) {
    return (
      <div>
        <Header />
        <SidebarClient>
          <Switch>
            <Route path="/" export exact component={Home} />

            <Route path="/shop" export component={Loja} />
            <Route path="/checkout" export component={Checkout} />
            <Route path="/product/:product_id" export component={Produto} />
            {/* Abaixo tem somente um teste do privateRoute, que se você tentar entrar na página Perfil sem estar
                  logado, você será redirecionado para a página Login. */}

            <Route path="/perfil" export exact component={Perfil} />
            <Route path="/editarPerfil" export exact component={EditarPerfil} />

            <Route path="/cart" export component={Carrinho} />
            <Route path="/login" export component={Login} />
            <Route path="/contact" export component={Contato} />
            <Route path="/cadastro" export component={Cadastro} />

            {/* A página abaixo é para que se algo existir uma página que não está no routes, apracer o seguinte. */}
            <Route path="*" exact component={Error} />
          </Switch>
        </SidebarClient>
        {user && user.user_type === "adm" ? (
          <Link
            to="/adm/home"
            style={{ position: "fixed", right: 10, bottom: 10 }}
          >
            <Fab color="primary" aria-label="edit">
              <EditIcon />
            </Fab>
          </Link>
        ) : null}
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" export exact component={Home} />

          <Route path="/shop" export component={Loja} />
          <Route path="/checkout" export component={Checkout} />
          <Route path="/product/:product_id" export component={Produto} />
          {/* Abaixo tem somente um teste do privateRoute, que se você tentar entrar na página Perfil sem estar
                  logado, você será redirecionado para a página Login. */}

          <Route path="/perfil" export exact component={Perfil} />
          <Route path="/editarPerfil" export exact component={EditarPerfil} />

          <Route path="/cart" export component={Carrinho} />
          <Route path="/login" export component={Login} />
          <Route path="/contact" export component={Contato} />
          <Route path="/cadastro" export component={Cadastro} />

          {/* A página abaixo é para que se algo existir uma página que não está no routes, apracer o seguinte. */}
          <Route path="*" exact component={Error} />
        </Switch>
        {user && user.user_type === "adm" ? (
          <Link
            to="/adm/home"
            style={{ position: "fixed", right: "1vw", bottom: "11vh" }}
          >
            <Fab color="primary" aria-label="edit">
              <EditIcon />
            </Fab>
          </Link>
        ) : null}
        <Footer />
      </div>
    );
  }
}

function AdmRoutes() {
  const { user } = useContext(LoginContext);

  if (user && user.user_type !== "adm")
    return <Redirect to="/" />;
  else
    return (
      <div>
        <HeaderAdm />
        <SidebarAdm>
          <Switch>
            <PrivateADMRoute path="/adm/home" component={HomeEditable} />
            <PrivateADMOrEmployeeRoute
              path="/adm/pedidos"
              exact
              component={OrdersAdm}
            />
            <PrivateADMOrEmployeeRoute
              path="/adm/pedidoespecifico"
              export
              component={EspecificOrderAdm}
            />
            <PrivateADMRoute
              path="/adm/produtos"
              exact
              component={ProductsAdm}
            />
            <PrivateADMRoute
              path="/adm/produtos/cadastro"
              export
              component={RegisterProduct}
            />
            <PrivateADMRoute
              path="/adm/produtos/:product_id"
              export
              component={EditProduct}
            />
            <PrivateADMRoute
              path="/adm/funcionarios"
              export
              exact
              component={EmployeeAdm}
            />
            <PrivateADMRoute
              path="/adm/funcionarios/cadastro"
              export
              component={CadastroFunc}
            />
            <PrivateADMRoute
              path="/adm/funcionario/:id"
              export
              component={EspecificEmployee}
            />
            <Route path="*" exact={true} component={Error} />
          </Switch>
        </SidebarAdm>
        {user && user.user_type === "adm" ? (
          <Link
            to="/"
            style={{ position: "fixed", right: "1vw", bottom: "11vh" }}
          >
            <Fab color="primary" aria-label="home">
              <HomeIcon />
            </Fab>
          </Link>
        ) : null}
        <FooterAdm />
      </div>
    );
}
