import React from "react";
import "./TabelaFuncionario.css";

function TabelaFuncionarios({ funcionario, historico }) {
  return (
    <table className="tabela">
      <thead>
        <tr className="titulotab">
          <th>DADOS PESSOAIS</th>
          <th>HISTÓRICO DE PEDIDOS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            NOME COMPLETO: {funcionario.nome}
            <br></br>
            CPF:{funcionario.cpf}
          </td>
          <td>
            <tr>
              <th className="subtitle">ID DO PEDIDO</th>
              <th className="subtitle">DATA DE ENVIO</th>
            </tr>
            <td className="idfunc">#alguma id</td>
            <td className="datafunc">alguma data</td>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TabelaFuncionarios;
