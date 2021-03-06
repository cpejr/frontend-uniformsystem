import React from "react";
import { Link } from 'react-router-dom';
import "./DadosPessoais.css";
import {isClient} from "../../services/auth";


function DadosPessoais({dado}){
    return (
      <div className="dadosPessoais">
        <span className="dadosName">Nome: {dado.name}</span>
        <span className="dadosCpf">CPF/CNPF: {dado.cpf}</span>
        <span className="dadosEmail">E-mail: {dado.email}</span>
        {isClient(dado) &&
          <Link to="/editarPerfil" className="botaoEditarDados">
            Editar meu cadastro
          </Link>
        }
      </div>
    );
}

export default DadosPessoais;


