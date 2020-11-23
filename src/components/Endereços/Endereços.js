import React from "react";
import "./Endereços.css";


function Endereços({endereço}){
    return (<div className="endereços">
      <div className="endereçosLocal">{endereço.local}</div>
      <div className="endereçosBairro">{endereço.bairro}</div>
      <div className="endereçosCidade">{endereço.cidade}</div>
      <div className="endereçosCep">{endereço.cep}</div>
      <div className="endereçosEstado">{endereço.estado}</div>
      <div className="endereçosPais">{endereço.pais}</div>
      <div className="endereçosEdit"><a href="url">{endereço.editEnd}</a></div>
    </div>);
}

export default Endereços;
