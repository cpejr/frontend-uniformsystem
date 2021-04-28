import React, { useEffect, useState, useMemo } from "react";
import "./CardPedido.css";
import { MdInfoOutline } from "react-icons/md";
import { RiTruckFill } from "react-icons/ri";
import { Button } from "react-bootstrap";

import api from "../../services/api";

function formatOrderStatus(status) {
  let statusInPortuguese;
  switch (status) {
    case "waitingPayment":
      statusInPortuguese = "Aguardando Pagamento";
      break;
    case "pending":
      statusInPortuguese = "Pendente";
      break;
    case "preparing":
      statusInPortuguese = "Preparando";
      break;
    case "delivering":
      statusInPortuguese = "Em entrega";
      break;
    default:
      break;
  }
  return statusInPortuguese;
}

function CardPedido({ pedido, token }) {
  const [productsFromOrder, setProductsFromOrder] = useState([]);

  const orderDate = new Date(pedido.created_at);
  const dayOrder = orderDate.getDate();
  const monthOrder = orderDate.getMonth() + 1;
  const yearOrder = orderDate.getFullYear();

  const statusFormatted = formatOrderStatus(pedido.status);

  useEffect(() => {
    async function getProductsFromOrder() {
      const response = await api.get(
        `/order/productsfromorder/${pedido.order_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        setProductsFromOrder(response.data);
      }
    }

    getProductsFromOrder();
  }, []);

  const totalPriceOrder = useMemo(() => {
    let totalAux = 0;
    productsFromOrder.forEach((item) => {
      totalAux += item.product_price * item.amount - item.discount;
      return totalAux;
    });

    return totalAux;
  }, [productsFromOrder]);

    return (
    <div>
      <div className="pedido">
        <div className="pedidoNumber">ID: {pedido.order_id}</div>
        <div className="pedidoData">Data do pedido: {dayOrder}/{monthOrder}/{yearOrder}</div>  
        <hr className="horizontalLine"></hr>
        <div className="pedidoStatus">
          <MdInfoOutline style={{fontSize:'22px', marginRight: '7px'}}/>
          <span>Status: {statusFormatted}</span>
        </div>  
        <div className="pedidoDestino">
          <RiTruckFill style={{fontSize:'22px', marginRight: '7px'}}/>
          <span>Destino: {pedido.city}/{pedido.state} - {pedido.zip_code}</span>
        </div>  
        <div className="pedidoTotal">Total: R$ {totalPriceOrder.toFixed(2)}</div>
        {
          pedido.status === "delivered" && 
          <>
            <span className="trackingCode">Cod. Rastreamento: {pedido.tracking_code}</span>  
            <Button className="pedidoBotao2">
              <a href="https://www2.correios.com.br/sistemas/rastreamento/default.cfm" target="_blank" rel="noreferrer" >
                Acompanhar pedido
              </a>
            </Button>
          </>
        }
      </div>
      <hr className="horizontalLine"></hr>
    </div>
  );
}

export default CardPedido;
