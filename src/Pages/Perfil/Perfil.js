import React from "react";
import CardPedido from "../../components/CardPedido";
import DadosPessoais from "../../components/DadosPessoais/DadosPessoais";
import Endereços from "../../components/Endereços";
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
  return (
    <div className="profileContainer">
      <div>
        <h1 className="title">DADOS PESSOAIS</h1>
        <div className="containerDados">
          {dados.map((dado) => (
            <DadosPessoais key={dado.id} dado={dado} />
          ))}
        </div>

        <div className="containerEndereço">
          {endereços.map((endereço) => (
            <Endereços key={endereço.id} endereço={endereço} />
          ))}
        </div>
      </div>
      <div className="ordersContainer">
        <h1 className="title">MEUS PEDIDOS</h1>
        <div className="containerPedidos">
          {pedidos.map((pedido) => (
            <CardPedido key={pedido.id} pedido={pedido} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
