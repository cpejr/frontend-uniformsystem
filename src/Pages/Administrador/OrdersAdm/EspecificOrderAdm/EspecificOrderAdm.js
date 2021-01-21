import React, { useEffect, useState, useContext } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import api from "../../../../services/api";
import "./EspecificOrderAdm.css";
import camisa from "../../../../Assets/camisa.jpg";

import { LoginContext } from "../../../../contexts/LoginContext";

function EspecificOrderAdm(props) {
  let status = "pending";
  var price = [];
  var total;
  const [Orders, setOrders] = useState([]);

  //const { token } = useContext(LoginContext);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1c2VyX2lkIjoiOGJmODMtOGUwZi02YjA3LTg3Yy0wNDRmM2EwMTNkM2MiLCJuYW1lIjoiQnJ5YW4iLCJmaXJlYmFzZV91aWQiOiJyZTRwc2pGNlR0aEhReXFpdjhyb2xYV2U0dWgxIiwidXNlcl90eXBlIjoiYWRtIiwiZW1haWwiOiJicnlhbkBjcGUuY29tIiwiY3BmIjoiMDAwMDAwMDAwMDAiLCJjcmVhdGVkX2F0IjoiMjAyMS0wMS0xMSAxMjoxODo0NyIsInVwZGF0ZWRfYXQiOiIyMDIxLTAxLTExIDEyOjE4OjQ3In1dLCJpYXQiOjE2MTAzNjc1NTAsImV4cCI6MTYxMjk1OTU1MH0.czTnB8wKs6T0JIBF9T9dPz4YZmY3EXG8oW6ZOE1v6f8";

  const obterPedidos = async () => {
    const resultado = await api.get(
      `productsfromorder/fb1db8-87af-54da-2f24-401a3084152`,
      {
        headers: { authorization: `bearer ${token}` },
      }
    );
    console.log(resultado);
    setOrders(resultado.data);
  };

  useEffect(() => {
    obterPedidos();
  }, []);

  console.log(Orders);

  return (
    <div className="order-container">
      <div className="especific-container">
        <div className="informations">
          <AiOutlineLeft color="black" size={30} />
          <div className="title-status">
            <span className="title">DETALHES DO PEDIDO</span>
            <div className="status">
              <span>STATUS: </span>
              <div>{status}</div>
            </div>
          </div>

          <div className="id-button">
            <div className="especific-info">
              {Orders.map((pedido) => {
                const id = pedido.order_id;
                const date = props.date;

                const reducer = (accumulator, currentValue) => {
                  return accumulator + currentValue;
                };

                price.push(pedido.product_price);
                total = price.reduce(reducer);
                return "";
              })}
            </div>
            <div className="adm_orders_id">
              <span className="id">ID: {}</span>
              <br />
              <span className="date">Data do pedido:{}</span>
              <br />
              <span className="price">Valor do pedido: R${total}</span>
            </div>
            {status === "pending" && (
              <div>
                <button className="button-status">
                  Mudar status para "Em produção"
                </button>
              </div>
            )}
            {status === "preparing" && (
              <div>
                <input
                  placeholder="código de rastramento"
                  style={{ marginRight: "10px" }}
                ></input>
                <button className="button-status">Entregar pedido</button>
              </div>
            )}
            {status === "delivered" && (
              <div>
                <span className="deliveryman">Entregador: 007</span>
              </div>
            )}
          </div>
        </div>

        <table className="order-table">
          <thead>
            <tr className="order-tr-header">
              <th className="amount">Quantidade</th>
              <th className="products">Produtos</th>
              <th className="logo">Logo</th>
            </tr>
          </thead>
          <tbody>
            <tr className="oder-tr-content">
              <td className="amount">10</td>
              <td className="products">
                <img src={camisa} className="image-product" />
                <span className="product-name">Camisa Personalisada 1</span>
              </td>
              <td className="logo">Baixar imagem</td>
            </tr>
            <tr className="oder-tr-content">
              <td className="amount">10</td>
              <td className="products">
                <img src={camisa} className="image-product" />
                <span className="product-name">Camisa Personalisada 1</span>
              </td>
              <td className="logo">Baixar imagem</td>
            </tr>
            <tr className="oder-tr-content">
              <td className="amount">10</td>
              <td className="products">
                <img src={camisa} className="image-product" />
                <span className="product-name">Camisa Personalisada 1</span>
              </td>
              <td className="logo">Baixar imagem</td>
            </tr>
            <tr className="oder-tr-content">
              <td className="amount">10</td>
              <td className="products">
                <img src={camisa} className="image-product" />
                <span className="product-name">Camisa Personalisada 1</span>
              </td>
              <td className="logo">Baixar imagem</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EspecificOrderAdm;
