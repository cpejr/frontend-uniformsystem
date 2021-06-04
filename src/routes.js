import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

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

import AdmButton from "./components/AdmButton";

import HeaderAdm from "./components/HeaderAdm";
import FooterAdm from "./components/FooterAdm";
import SidebarAdm from "./components/SidebarAdm";
import SidebarClient from "./components/SidebarClient";

import { isAuthenticated, isADM, isADMOrEmployee } from "./services/auth";
import { LoginContext } from "./contexts/LoginContext";

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
        isAuthenticated() && !isADMOrEmployee(user) ? (
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
      <>
        <Header />
        <SidebarClient>
          <Switch>
            <Route path="/" export exact component={Home} />

            <Route path="/shop" export component={Loja} />
            <PrivateClientRoute path="/checkout" export component={Checkout} />
            <Route path="/product/:product_id" export component={Produto} />
            {/* Abaixo tem somente um teste do privateRoute, que se você tentar entrar na página Perfil sem estar
                  logado, você será redirecionado para a página Login. */}

            <Route path="/perfil" export exact component={Perfil} />
            <PrivateClientRoute
              path="/editarPerfil"
              export
              exact
              component={EditarPerfil}
            />

            <Route path="/cart" export component={Carrinho} />
            <Route path="/login" export component={Login} />
            <Route path="/contact" export component={Contato} />
            <Route path="/cadastro" export component={Cadastro} />

            {/* A página abaixo é para que se algo existir uma página que não está no routes, apracer o seguinte. */}
            <Route path="*" exact component={Error} />
          </Switch>
        </SidebarClient>
        {user && user?.user_type === "adm" ? (
          <AdmButton linkToRedirect="/adm/home" isEdit={true} />
        ) : user?.user_type === "employee" ? (
          <AdmButton linkToRedirect="/adm/pedidos" isEdit={true} />
        ) : null}
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/" export exact component={Home} />

          <Route path="/shop" export component={Loja} />
          <PrivateClientRoute path="/checkout" export component={Checkout} />
          <Route path="/product/:product_id" export component={Produto} />
          {/* Abaixo tem somente um teste do privateRoute, que se você tentar entrar na página Perfil sem estar
                  logado, você será redirecionado para a página Login. */}

          <Route path="/perfil" export exact component={Perfil} />
          <PrivateClientRoute
            path="/editarPerfil"
            export
            exact
            component={EditarPerfil}
          />

          <Route path="/cart" export component={Carrinho} />
          <Route path="/login" export component={Login} />
          <Route path="/contact" export component={Contato} />
          <Route path="/cadastro" export component={Cadastro} />

          {/* A página abaixo é para que se algo existir uma página que não está no routes, apracer o seguinte. */}
          <Route path="*" exact component={Error} />
        </Switch>
        {user && user?.user_type === "adm" ? (
          <AdmButton linkToRedirect="/adm/home" isEdit={true} />
        ) : user?.user_type === "employee" ? (
          <AdmButton linkToRedirect="/adm/pedidos" isEdit={true} />
        ) : null}
        <Footer />
      </>
    );
  }
}

function AdmRoutes() {
  const { user } = useContext(LoginContext);

  if (user && user?.user_type !== "adm" && user?.user_type !== "employee")
    return <Redirect to="/" />;
  else
    return (
      <>
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
        {user &&
        (user?.user_type === "adm" || user?.user_type === "employee") ? (
          <AdmButton linkToRedirect="/" isEdit={false} />
        ) : null}
        <FooterAdm />
      </>
    );
}
