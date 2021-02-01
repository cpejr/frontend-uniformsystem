import React from "react";
import TabelaFuncionarios from "../../../../components/TabelaFuncionario/TabelaFuncionario";
import { Helmet } from "react-helmet";
import MetaData from "../../../../meta/reactHelmet";
import { withRouter } from "react-router-dom";

import "./EspecificEmployee.css";
import { FaChevronLeft } from 'react-icons/fa';

const funcionario = {
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

function EspecificEmployee({ history }) {
  const meta = {
    titlePage: "Administrador | Funcionário Específico",
    titleSearch: "Funcionário Específico Profit",
    description:
      "Encontre os funcionários desejados com seus respectivos dados.",
    keyWords: "Dados, Funcionário, Específico, Profit",
    imageUrl: "",
    imageAlt: "",
  };

  return (

    <div className="especific-employee">
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <FaChevronLeft
        className="setaVoltar"
        onClick={() => history.goBack()}
      />
      <div className="boxTitle">
        <h1 className="titleFuncExp">FUNCIONÁRIO ESPECÍFICO</h1>
        <hr className="titleLineExp"></hr>
      </div>
      <div className="tabela">
        <TabelaFuncionarios
          funcionario={funcionario}
          orderHistory={orderHistory}
        />
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
