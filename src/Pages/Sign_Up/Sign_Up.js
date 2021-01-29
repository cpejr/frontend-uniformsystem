import React from 'react';
import './Sign_Up.css';
import {Helmet} from 'react-helmet';
import MetaData from '../../meta/reactHelmet';

function Sign_Up() {

  const meta = {
    titlePage: "Uniformes Ecommerce | Cadastro",
    titleSearch: "Profit Uniformes | Cadastro",
    description: "Cadastre-se no nosso ecommerce e tenha a melhor experiência possível com sua conta profit e nossos uniformes personalizados!",
    keyWords: "Uniformes | Cadastro | Ecommerce | Profit",
    imageUrl: "",
    imageAlt: "",
  }

  return (
    <div>
      <MetaData titlePage={meta.titlePage} titleSearch={meta.titleSearch} description={meta.description} keyWords={meta.keyWords} imageUrl={meta.imageUrl} imageAlt={meta.imageAlt} />
      Pagina Sign_Up
    </div>
  );
}

export default Sign_Up;
