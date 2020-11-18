import React from 'react';
import CardPedido from "../../components/CardPedido"
import './Perfil.css'

const pedidos = [
  {
    id: 1,
    pedidoNumber:"Pedido: #12345",
    data:"01/01/2020",
    status:"Status: Em andamento",
    destino:"Destino: Não enviado",
    total:"Total: R$ 100,00",
    button:"Acompanhar o pedido",
  },
  {
    id: 2,
    pedidoNumber:"Pedido: #12346",
    data:"01/01/2020",
    status:"Status: Finalizado",
    destino:"Destino: Confirmado",
    total:"Total: R$ 150,00",
    button:"Acompanhar a entrega",
  },
]

function Perfil(){
  return (
    <div className="containerPedidos">
      {pedidos.map((pedido) => (
        <CardPedido key={pedido.id} pedido={pedido} />
      ))}
    </div>
  );
}

export default Perfil;
