import React from "react";
import TabelaFuncionarios from "../../../../components/TabelaFuncionario/TabelaFuncionario";

import { withRouter } from 'react-router-dom';

import "./EspecificEmployee.css";
import { FaChevronLeft } from 'react-icons/fa';

const funcionario = 
  {
    id: 1,
    nome: "MARIA SOUZA",
    cpf: "123456789-35",
  };


const orderHistory = [
  {
    id: 3,
    idpedido: "#0003",
    data: "05/11/2020",
  },
  {
    id: 2,
    idpedido: "#0002",
    data: "04/11/2020",
  },
  {
    id: 1,
    idpedido: "#0001",
    data: "03/11/2020",
  },
];

function EspecificEmployee({history}) {
  return (
    <div className="especific-employee">
      <FaChevronLeft className="setaVoltar" onClick={() => history.goBack()} />
      <div className="boxTitle">
        <h1 className="titleFuncExp">FUNCIONÁRIO ESPECÍFICO</h1>
        <hr className="titleLineExp"></hr>
      </div>
      <div className="tabela">
          <TabelaFuncionarios funcionario={funcionario} orderHistory={orderHistory} />
      </div>
    </div>
  );
}

export default withRouter(EspecificEmployee);

/*todo: arrowback funcional
        tamanho arrowback
        cor da borda
        .map id e data
        tirar barra esquerda (Diogão)
*/
