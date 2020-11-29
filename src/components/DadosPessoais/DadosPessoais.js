import React from "react";
import "./DadosPessoais.css";


function DadosPessoais({dado}){
    return (<div className="dados">
      <div className="dadosName">{dado.name}</div>
      <div className="dadosCpf">{dado.cpf}</div>
      <div className="dadosEmail">{dado.email}</div>
      <div className="dadosEdit"><a href="url">{dado.edit}</a></div>
      
    </div>);
}

export default DadosPessoais;


