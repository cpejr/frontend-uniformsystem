import React from "react";
import { Link } from 'react-router-dom';
import "./Enderecos.css";


function Endereços({endereço, handleOpenModal}){

    return (
      <div className="enderecos">
        <div className="enderecoInfo">Logradouro: {endereço.street}</div>
        <div className="enderecoInfo">Complemento: {endereço.complement}</div>
        <div className="enderecoInfo">Bairro: {endereço.neighborhood}</div>
        <div className="enderecoInfo">Cidade: {endereço.city}</div>
        <div className="enderecoInfo">CEP: {endereço.zip_code}</div>
        <div className="enderecoInfo">Estado: {endereço.state}</div>
        <div className="enderecoInfo">País: {endereço.country}</div>
        <Link className="botaoEditarEndereco" onClick={() => handleOpenModal()}>
            Editar endereço
        </Link>
      </div>
    );
}

export default Endereços;
