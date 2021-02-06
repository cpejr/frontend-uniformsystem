import React from "react";
import "./TabelaFuncionario.css";

function TabelaFuncionarios({ funcionario, orderHistory }) {
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
          <td className="employee">
            NOME COMPLETO: {funcionario.nome}
            <br></br>
            CPF:{funcionario.cpf}
          </td>
          <td>
            <tr>
              <th className="subtitle">ID DO PEDIDO</th>
              <th className="subtitle">DATA DE ENVIO</th>
            </tr>
            {orderHistory.map((order) => {
              return (
                <tr>
                  {" "}
                  <td className="idfunc">{order.idpedido}</td>
                  <td className="datafunc">{order.data}</td>
                </tr>
              );
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TabelaFuncionarios;
