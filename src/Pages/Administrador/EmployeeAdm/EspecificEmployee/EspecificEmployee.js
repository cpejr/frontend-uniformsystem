import React, {useEffect, useContext, useState} from "react";
import api from "../../../../services/api";
import TabelaFuncionarios from "../../../../components/TabelaFuncionario/TabelaFuncionario";
import { LoginContext } from "../../../../contexts/LoginContext";
import { Helmet } from "react-helmet";
import MetaData from "../../../../meta/reactHelmet";
import { withRouter, useParams } from "react-router-dom";

import "./EspecificEmployee.css";
import { FaChevronLeft } from 'react-icons/fa';


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

function EspecificEmployee( {history} ) {
  const [Employees, setEmployees] = useState([]);
  const [Orders, setOrders] = useState([]);
  const meta = {
    titlePage: "Administrador | Funcionário Específico",
    titleSearch: "Funcionário Específico Profit",
    description:
      "Encontre os funcionários desejados com seus respectivos dados.",
    keyWords: "Dados, Funcionário, Específico, Profit",
    imageUrl: "",
    imageAlt: "",
  };
  var user_id;
  var name_employee;
  var cpf;
  var order_id;
  var idpedido;
  var data;
  var id_order;

  const {id} = useParams();

  const { token } = useContext(LoginContext);

  async function getEspecificEmployee() {
    console.log(id);
    try {
      const resultado = await api.get(`/employees/${id}`, {
        headers: { authorization: `bearer ${token}` },
      });
      console.log(resultado.data);
      setEmployees([...resultado.data.user]);
    } catch (error) {
      console.warn(error);
      alert(error);
    }
  };

  async function getOrders() {
    console.log(id);
    try {
      const resultado2 = await api.get(`/shipping/deliveredby/${id}`, {
        headers: { authorization: `bearer ${token}` },
      });
      console.log(resultado2);
      setOrders([...resultado2.data]);
    } catch (error) {
      console.warn(error);
      alert(error);
    }
  };

  useEffect(() => {
    getEspecificEmployee();
    getOrders();
  }, []); // executa assim que carregar a página

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
        {Employees.map((employee) => {
          name_employee = employee.name
          user_id = employee.id
          cpf = employee.cpf
        })}
        {Orders.map((order) => {
          id_order = 3
          idpedido = order.order_id
          data = order.updated_at
        })}
        <TabelaFuncionarios
          funcionario={ 
            {
            id: user_id,
            nome: name_employee,
            cpf: cpf,
            }
          }
          orderHistory={[
            {
              id: id_order,
              idpedido: idpedido,
              data: data,
            },
            {
              id: 2,
              idpedido: "",
              data: "",
            },
            {
              id: 1,
              idpedido: "",
              data: "",
            },
          ]}
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
