import React from "react";
import "./CardPedido.css";
import { MdInfoOutline } from 'react-icons/md';
import { RiTruckFill } from 'react-icons/ri';
import { Button } from 'react-bootstrap';




function CardPedido({pedido}){
    return (<div className="pedido">
      <div className="pedidoNumber">{pedido.pedidoNumber}</div>
      <div className="pedidoData">{pedido.data}</div>  
      <hr></hr>
      <div className="pedidoStatus"><MdInfoOutline />{pedido.status}</div>  
      <div className="pedidoDestino"><RiTruckFill/>{pedido.destino}</div>  
      <div className="pedidoTotal">{pedido.total}</div>  
      <div className="pedidoBotao"><Button variant="primary">{pedido.button}</Button>{' '}</div>

    </div>);

}

export default CardPedido;





