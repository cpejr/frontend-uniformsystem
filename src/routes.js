import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./Pages/Home";

import HomeEditable from "./Pages/Administrador/HomeEditable";
import OrdersAdm from "./Pages/Administrador/OrdersAdm";
import ProductsAdm from "./Pages/Administrador/ProductsAdm";
import EmployeeAdm from "./Pages/Administrador/EmployeeAdm";


import Loja from "./Pages/Loja";
import Produto from "./Pages/Produto";
import Perfil from "./Pages/Perfil";
import Carrinho from "./Pages/Carrinho";
import Contato from "./Pages/Contato";
import SignUp from "./Pages/Sign_Up";
import Checkout from "./Pages/Checkout";


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
                <Route path="/" component={MenuRoutes} />:
                <Route path="/adm/home" component={AdmRoutes} />
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

                {/* <Route path="/adm" export exact component={AdmRoutes} /> */}

                <Route path="/shop" export exact component={Loja} />
                <Route path="/checkout" export exact component={Checkout} />
                {/* Abaixo tem somente um teste do privateRoute, que se você tentar entrar na página Perfil sem estar
                logado, você será redirecionado para a página Login. */}
                <PrivateRoute path="/perfil" export exact component={Perfil} />
                <Route
                    path="/login"
                    export
                    exact
                    component={() => <h1>Página Login</h1>}
                />
                <Route path="/cart" export exact component={Carrinho} />
                <Route path="/contact" export exact component={Contato} />
                <Route path="/signUp" export exact component={SignUp} />
                {/* A página abaixo é para que se algo existir uma página que não está no routes, apracer o seguinte. */}
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
            <Footer />
        </div>
    );
}

function AdmRoutes() {
    return (
        <div>
            <HeaderAdm />
            <SidebarAdm >
            <Switch>
                <Route path="/adm/home" export exact component={HomeEditable} />
                <Route path="/adm/pedidos" export exact component={OrdersAdm} />
                <Route path="/adm/produtos" export exact component={ProductsAdm} />
                <Route path="/adm/funcionarios" export exact component={EmployeeAdm} />
            </Switch>
            </SidebarAdm>
            <FooterAdm />
        </div>
    );
}
