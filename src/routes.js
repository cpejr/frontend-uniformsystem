import React, {useContext, useEffect} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

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
import { LoginContext } from "./contexts/LoginContext";


const PrivateRoute = ({ component: Component, ...rest }) => {
  
  const { user } = useContext(LoginContext);
  
  return (
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
}

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

        <Route path="/shop" export component={Loja} />
        <PrivateRoute path="/checkout" export component={Checkout} />
        <Route path="/product/:product_id" export component={Produto} />
        {/* Abaixo tem somente um teste do privateRoute, que se você tentar entrar na página Perfil sem estar
                logado, você será redirecionado para a página Login. */}
        <PrivateRoute path="/perfil" export component={Perfil} />
        <PrivateRoute path="/cart" export component={Carrinho} />
        <Route path="/login" export component={Login} />
        <Route path="/contact" export component={Contato} />
        <Route path="/signUp" export component={SignUp} />
        <Route path="/cadastro" export component={Cadastro} />
        <Route path="/orders" export component={Pedidos} />
        {/* A página abaixo é para que se algo existir uma página que não está no routes, apracer o seguinte. */}
        <Route path='*' exact component={Error} />
      </Switch>
      <Footer />
    </div>
  );
}

function AdmRoutes() {

  const { user } = useContext(LoginContext);

  if (user === "notYet") return <Loading/>;
  if (user === null || user.user_type === "adm") return <Redirect to="/adm/home" />;
  else
    return (
      <div>
        <HeaderAdm />
        <SidebarAdm>
          <Switch>
            <PrivateRoute path="/adm/home" component={HomeEditable} />
            <PrivateRoute path="/adm/pedidos"  component={OrdersAdm} />
            <PrivateRoute
              path="/adm/pedidoespecifico"
              export
              component={EspecificOrderAdm}
            />
            <PrivateRoute path="/adm/produtos"  component={ProductsAdm} />
            <PrivateRoute
              path="/adm/funcionarios"
              export
              component={EmployeeAdm}
            />
            <PrivateRoute
              path="/adm/funcionarios/cadastro"
              export
              component={CadastroFunc}
            />
            <PrivateRoute
              path="/adm/produtos/cadastro"
              export
              component={RegisterProduct}
            />
            <PrivateRoute
              path="/adm/produtos/:product_id"
              export
              component={EditProduct}
            />
            <PrivateRoute
              path="/adm/funcionarios/funcionarioEspecifico"
              export
              component={EspecificEmployee}
            />
            <Route path='*' exact={true} component={Error} />
          </Switch>
        </SidebarAdm>
        <FooterAdm />
      </div>
  );
}

function Loading(props){
  const { user } = useContext(LoginContext);
  useEffect(()=>{
    console.log("UseEffect Loading: ", user);
    if (user.type === "adm") return <Redirect to="/adm/home"/>;
    if (user === null) return <Redirect to="/login" />;
  },[user])
  return (
    <div className="loading">
      <div className="loading-logo">
        <ClipLoader size={100} color={"#123abc"} loading={true} />
      </div>
    </div>
  );
}