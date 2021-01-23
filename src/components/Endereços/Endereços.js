import React from "react";
import { Link } from 'react-router-dom';
import "./Endereços.css";


function Endereços({endereço}){
    return (
      <div className="endereços">
        <div className="enderecoInfo">{endereço.local}</div>
        <div className="enderecoInfo">{endereço.bairro}</div>
        <div className="enderecoInfo">{endereço.cidade}</div>
        <div className="enderecoInfo">{endereço.cep}</div>
        <div className="enderecoInfo">{endereço.estado}</div>
        <div className="enderecoInfo">{endereço.pais}</div>
        <Link to="/editardados" className="enderecosEdit">
            Editar endereço
        </Link>
      </div>
    );
}

export default Endereços;
