import React from "react";
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
import SignUp from "./Pages/Sign_Up";
import Checkout from "./Pages/Checkout";
import Cadastro from "./Pages/Cadastro";
import Pedidos from "./Pages/Pedidos";
import Error from "./Pages/Error";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HeaderAdm from "./components/HeaderAdm";
import FooterAdm from "./components/FooterAdm";
import SidebarAdm from "./components/SidebarAdm";

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

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
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" export exact component={Home} />

        <Route path="/shop" export exact component={Loja} />
        <Route path="/checkout" export exact component={Checkout} />
        <Route path="/product/:product_id" export component={Produto} />
        {/* Abaixo tem somente um teste do privateRoute, que se você tentar entrar na página Perfil sem estar
                logado, você será redirecionado para a página Login. */}
        <Route path="/perfil" export exact component={Perfil} />
        <Route path="/editarPerfil" export exact component={EditarPerfil} />
        <Route path="/login" export exact component={Login} />
        <Route path="/cart" export exact component={Carrinho} />
        <Route path="/contact" export exact component={Contato} />
        <Route path="/signUp" export exact component={SignUp} />
        <Route path="/cadastro" export exact component={Cadastro} />
        <Route path="/orders" export exact component={Pedidos} />
        {/* A página abaixo é para que se algo existir uma página que não está no routes, apracer o seguinte. */}
        <Route path="*" export exact component={Error} />
      </Switch>
      <Footer />
    </div>
  );
}

function AdmRoutes() {
  return (
    <div>
      <HeaderAdm />
      <SidebarAdm>
        <Switch>
          <Route path="/adm/home" export exact component={HomeEditable} />
          <Route path="/adm/pedidos" export exact component={OrdersAdm} />
          <Route
            path="/adm/pedidoespecifico"
            export
            exact
            component={EspecificOrderAdm}
          />
          <Route path="/adm/produtos" export exact component={ProductsAdm} />
          <Route
            path="/adm/funcionarios"
            export
            exact
            component={EmployeeAdm}
          />
          <Route
            path="/adm/funcionarios/cadastro"
            export
            exact
            component={CadastroFunc}
          />
          <Route
            path="/adm/produtos/cadastro"
            export
            exact
            component={RegisterProduct}
          />
          <Route
            path="/adm/produtos/:product_id"
            export
            exact
            component={EditProduct}
          />
          <Route
            path="/adm/funcionarios/funcionarioEspecifico"
            export
            exact
            component={EspecificEmployee}
          />
          <Route path="*" export exact component={Error} />
        </Switch>
      </SidebarAdm>
      <FooterAdm />
    </div>
  );
}
