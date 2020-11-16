import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Pages/Home";
import Administrador from "./Pages/Administrador";
import Loja from "./Pages/Loja";
import Produto from "./Pages/Produto";
import Perfil from "./Pages/Perfil";
import Carrinho from "./Pages/Carrinho";
import Contato from "./Pages/Contato";
import Header from './components/Header';
import Footer from './components/Footer';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path ="/" component = {MenuRoutes} /> 
            </Switch>
        </BrowserRouter>
    );
}

function MenuRoutes (){
    return(
        <div>
            <Header/>
            <Switch>
                <Route path="/home" export exact component={Home} />
                <Route path="/adm" export exact component={Administrador} />
                <Route path="/shop" export exact component={Loja} />
                <Route path="/shop/:product_id" export exact component={Produto} />
                <Route path="/perfil" export exact component={Perfil} />
                <Route path="/cart" export exact component={Carrinho} />
                <Route path="/contact" export exact component={Contato} />
            </Switch>
            <Footer/>
        </div>
    )
}
