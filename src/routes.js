import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Pages/Home";
import Administrador from "./Pages/Administrador";
import Loja from "./Pages/Loja";
import Perfil from "./Pages/Perfil";
import Carrinho from "./Pages/Carrinho";
import Contato from "./Pages/Contato";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" export exact component={Home} />
                <Route path="/adm" export exact component={Administrador} />
                <Route path="/shop" export exact component={Loja} />
                <Route path="/perfil" export exact component={Perfil} />
                <Route path="/cart" export exact component={Carrinho} />
                <Route path="/contact" export exact component={Contato} />
            </Switch>
        </BrowserRouter>
    );
}
