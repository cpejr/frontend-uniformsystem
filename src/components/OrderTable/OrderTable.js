import React from "react";

function OrderTable(Props) {
  switch (Props.status) {
    case "delivered":
      return (
        <div
          className="container"
          style={{ padding: "10px 15px" }}
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#60F86A", color: "black", padding: '5px 8px'  }}
          >
            Entregue
          </div>
        </div>
      );

    case "pending":
      return (
        <div
          className="container"
          style={{ padding: "10px 15px" }}
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#F94444", color: "white", padding: '5px 8px'  }}
          >
            Pendente
          </div>
        </div>
      );

    case "preparing":
      return (
        <div
          className="container"
          style={{ padding: "10px 15px" }}
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#FFE45A", color: "black", padding: '5px 8px' }}
          >
            Em Andamento
          </div>
        </div>
      );

    case "waitingPayment":
      return (
        <div
          className="container"
          style={{ padding: "10px 15px" }}
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#15B5DE", color: "black", padding: '5px 8px' }}
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
