import React from "react";
import "./CardPedido.css";
import { MdInfoOutline } from 'react-icons/md';
import { RiTruckFill } from 'react-icons/ri';
import { Button } from 'react-bootstrap';

function formatOrderStatus(status){
  let statusInPortuguese;
  switch (status) {
    case 'waitingPayment':
      statusInPortuguese = 'Aguardando Pagamento';
      break;
    case 'pending':
      statusInPortuguese = 'Pendente';
      break;
    case 'preparing':
      statusInPortuguese = 'Preparando';
      break;
    case 'delivering':
      statusInPortuguese = 'Em entrega';
      break;
    default:
      break;
  }
  return statusInPortuguese;
}


function CardPedido({pedido}){

    const orderDate = new Date(pedido.created_at);
    const dayOrder = orderDate.getDate();
    const monthOrder = orderDate.getMonth() + 1;
    const yearOrder = orderDate.getFullYear();

    const statusFormatted = formatOrderStatus(pedido.status);

    return (
      <div className="pedido">
        <div className="pedidoNumber">ID: {pedido.order_id}</div>
        <div className="pedidoData">{dayOrder}/{monthOrder}/{yearOrder}</div>  
        <hr></hr>
        <div className="pedidoStatus">
          <MdInfoOutline />
          <span>{statusFormatted}</span>
        </div>  
        <div className="pedidoDestino">
          <RiTruckFill/>
          <span>{pedido.city}/{pedido.state} - {pedido.zip_code}</span>
        </div>  
        <div className="pedidoTotal">{pedido.total}</div>  
        <Button className="pedidoBotao2">
          Acompanhar pedido
        </Button>
      </div>
    );

}

export default CardPedido;





