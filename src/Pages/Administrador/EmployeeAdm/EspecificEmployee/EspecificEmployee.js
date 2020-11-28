import React from "react";
import TabelaFuncionarios from "../../../../components/TabelaFuncionario/TabelaFuncionario";

import "./EspecificEmployee.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const funcionarios = [
  {
    id: 1,
    nome: "MARIA SOUZA",
    cpf: "123456789-35",
  },
];

const historicoPedidos = [
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

function EspecificEmployee() {
  return (
    <div>
      <ArrowBackIosIcon className="setaVoltar"></ArrowBackIosIcon>
      <div className="boxTitle">
        <h1 className="titleFuncExp">FUNCIONÁRIO ESPECÍFICO</h1>
        <hr className="titleLineExp"></hr>
      </div>
      <div className="tabela">
        {funcionarios.map((funcionario) => (
          <TabelaFuncionarios key={funcionario.id} funcionario={funcionario} />
        ))}
      </div>
    </div>
  );
}

export default EspecificEmployee;

/*todo: arrowback funcional
        tamanho arrowback
        cor da borda
        .map id e data
        tirar barra esquerda (Diogão)
*/
