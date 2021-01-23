import React from "react";
import { Link } from 'react-router-dom';
import "./Endereços.css";


function Endereços({endereço}){
    return (
      <div className="endereços">
        <div className="enderecoInfo">Logradouro: {endereço.local}</div>
        <div className="enderecoInfo">Bairro: {endereço.bairro}</div>
        <div className="enderecoInfo">Cidade: {endereço.cidade}</div>
        <div className="enderecoInfo">CEP: {endereço.cep}</div>
        <div className="enderecoInfo">Estado: {endereço.estado}</div>
        <div className="enderecoInfo">País: {endereço.pais}</div>
        <Link to="/editardados" className="enderecosEdit">
            Editar endereço
        </Link>
      </div>
    );
}

export default Endereços;
