import React from "react";
import './OrderTable.css';

function OrderTable(Props) {
  switch (Props.status) {
    case "delivered":
      return (
        <div
          className="containerOrderTable"
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#60F86A"}}
          >
            Entregue
          </div>
        </div>
      );

    case "pending":
      return (
        <div
          className="containerOrderTable"
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#F94444"}}
          >
            Pendente
          </div>
        </div>
      );

    case "preparing":
      return (
        <div
          className="containerOrderTable"
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#FFE45A"}}
          >
            Em Andamento
          </div>
        </div>
      );

    case "waitingPayment":
      return (
        <div
          className="containerOrderTable"
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#15B5DE"}}
          >
            Aguardando Pagamento
          </div>
        </div>
      );
    default:
      return <></>;
  }
}

export default OrderTable;
