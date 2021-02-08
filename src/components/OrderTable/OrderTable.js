import React from "react";

function OrderTable(Props) {
  switch (Props.status) {
    case "delivered":
      return (
        <div
          className="container"
          style={{ paddingLeft: "0vw", paddingBottom: "0vh" }}
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#60F86A", color: "black" }}
          >
            Entregue
          </div>
        </div>
      );

    case "pending":
      return (
        <div
          className="container"
          style={{ paddingLeft: "4.5vw", paddingBottom: "1vh" }}
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#F94444", color: "white" }}
          >
            Pendente
          </div>
        </div>
      );

    case "preparing":
      return (
        <div
          className="container"
          style={{ paddingLeft: "0", paddingBottom: "0" }}
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#FFE45A", color: "black" }}
          >
            Em Andamento
          </div>
        </div>
      );

    case "waitingPayment":
      return (
        <div
          className="container"
          style={{ paddingLeft: "0", paddingBottom: "0" }}
        >
          <div
            id="orderStyle"
            style={{ backgroundColor: "#15B5DE", color: "black" }}
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
