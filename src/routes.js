import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./Pages/Home";
import Administrador from "./Pages/Administrador";
import Loja from "./Pages/Loja";
import Produto from "./Pages/Produto";
import Perfil from "./Pages/Perfil";
import Carrinho from "./Pages/Carrinho";
import Contato from "./Pages/Contato";
import SignUp from "./Pages/Sign_Up";
import Checkout from "./Pages/Checkout";
import Cadastro from "./Pages/Cadastro";



import Header from "./components/Header";
import Footer from "./components/Footer";

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
                <Route path="/" component={MenuRoutes} />
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
                <Route path="/adm" export exact component={Administrador} />
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
                <Route path="/cadastro" export exact component={Cadastro} />
                {/* A página abaixo é para que se algo existir uma página que não está no routes, apracer o seguinte. */}
                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
            <Footer />
        </div>
    );
}
