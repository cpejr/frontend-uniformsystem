import React from "react";

function OrderTable(Order) {
  switch (Order) {
    case "Entregue":
      return (
        <div
          id="orderStyle"
          style={{ backgroundColor: "#60F86A", color: "black" }}
        >
          Entregue
        </div>
      );

    case "Pendente":
      return (
        <div
          id="orderStyle"
          style={{ backgroundColor: "#F94444", color: "white" }}
        >
          Pendente
        </div>
      );

    case "Em Andamento":
      return (
        <div
          id="orderStyle"
          style={{ backgroundColor: "#FFE45A", color: "black" }}
        >
          Em Andamento
        </div>
      );

    case "Aguardando Pagamento":
      return (
        <div
          id="orderStyle"
          style={{ backgroundColor: "#15B5DE", color: "black" }}
        >
          Aguardando Pagamento
        </div>
      );
    default:
      return <></>;
  }
}

export default OrderTable;
