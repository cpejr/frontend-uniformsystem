import React, { useContext, useState, useEffect } from "react";
import CardPedido from "../../components/CardPedido";
import DadosPessoais from "../../components/DadosPessoais/DadosPessoais";
import Endereços from "../../components/Endereços";

import api from '../../services/api';
import { LoginContext } from '../../contexts/LoginContext';

import "./Perfil.css";

const pedidos = [
  {
    id: 1,
    pedidoNumber: "Pedido: #12345",
    data: "01/01/2020",
    status: "Status: Em andamento",
    destino: "Destino: Não enviado",
    total: "Total: R$ 100,00",
    button: "Acompanhar o pedido",
  },
  {
    id: 2,
    pedidoNumber: "Pedido: #12346",
    data: "01/01/2020",
    status: "Status: Finalizado",
    destino: "Destino: Confirmado",
    total: "Total: R$ 150,00",
    button: "Acompanhar a entrega",
  },
];

const dados = [
  {
    id: 1,
    name: "Nome completo: João da Silva",
    cpf: "CPF/CNPJ: 888888888-55",
    email: "joaosilva@email.com",
    edit: "Editar meu cadastro",
  },
];

const endereços = [
  {
    local: "Locradouro: Rua Marilia, 123",
    bairro: "Bairro: Mantiqueira",
    cidade: "Cidade: Belo Horizonte",
    cep: "CEP: 52968-985",
    estado: "Cidade: Minas Gerais",
    pais: "País: Brasil",
    editEnd: "Editar meus endereços",
  },
];

function Perfil() {

  const { user, token } = useContext(LoginContext);
  const currentUser = user[0];
  const [userAddress, setUserAddress] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    try{

      async function getAddress(){
        const response = await api.get('/address',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        );
        if(response.data){
          setUserAddress(response.data);
        }
      }

      async function getOrders(){
        const response = await api.get(`/userorder/${currentUser.user_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        );

        if(response.data){
          setUserOrders(response.data);
        }
      }

      getAddress();
      getOrders();

    }catch(err){
      console.warn(err);
    }

  }, [])

  return (
    <div className="profileContainer">
      <div className="personalDataContainer">
        <h1 className="titleProfile">
          DADOS PESSOAIS
          <span className="titleLine"/>
        </h1>
        <div className="containerDados">
            <DadosPessoais dado={currentUser} />
        </div>

        <div className="containerEndereço">
          {
            userAddress.lenght > 0 ?
              userAddress.map((endereco, index) => (
                <Endereços key={index} endereço={endereco} />
              ))
            : 
              null
          }
        </div>
      </div>

      <div className="ordersContainer">
        <h1 className="titleProfile">
          MEUS PEDIDOS
          <span className="titleLine"/>
        </h1>
        <div className="containerPedidos">
          { 
            userOrders.length > 0 ?
              userOrders.map((pedido, index) => (
                <CardPedido key={index} pedido={pedido} />
              ))
            :
            <span>Sem pedidos</span>
          }
        </div>
      </div>
    </div>
  );
}

export default Perfil;
