import React, { useEffect, useState, useContext } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import api from "../../../../services/api";
import "./EspecificOrderAdm.css";
import camisa from "../../../../Assets/camisa.jpg";
import { LoginContext } from "../../../../contexts/LoginContext";

function EspecificOrderAdm(props) {
  const date = props.location.state.date;
  var created = new Date();

  const orderId = props.location.state.orderId;
  let status = "pending";
  var price = [];
  var discount = [];
  var total;
  var id;

  var modelos = {
    id: [],
    description: [],
  };

  const [Orders, setOrders] = useState([]);
  const [Models, setModels] = useState([]);

  const { token } = useContext(LoginContext);

  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

  const obterPedidos = async () => {
    const resultado = await api.get(`productsfromorder/${orderId}`, {
      headers: { authorization: `bearer ${token}` },
    });

    setOrders(resultado.data);
  };

  const obterModelos = async () => {
    const resultado = await api.get(`productmodels`, {
      headers: { authorization: `bearer ${token}` },
    });

    setModels(resultado.data.models);
  };

  useEffect(() => {
    obterPedidos();
    obterModelos();
  }, []);

  Models.map((produto) => {
    modelos.id.push(produto.product_model_id);
    modelos.description.push(produto.model_description);
    return "";
  });

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
                id = pedido.order_id;
                discount.push(pedido.discount);

                const reducerDiscount = (accumulator, currentValue) => {
                  return accumulator + currentValue;
                };

                price.push(pedido.product_price * pedido.amount);

                const reducer = (accumulator, currentValue) => {
                  return accumulator + currentValue;
                };

                total =
                  price.reduce(reducer) - discount.reduce(reducerDiscount);

                total = total.toFixed(2);
                if (id === 0) {
                  id = "Sem dados";
                  total = "Sem dados";
                }
                return "";
              })}
            </div>
            <div className="adm_orders">
              <span className="id">
                <strong>ID:</strong> {id}
              </span>
              <br />
              <span className="date">
                <strong>Data do pedido:</strong>
                {created.toLocaleString("pt-BR", date)}
              </span>
              <br />
              <span className="price">
                <strong>Valor do pedido:</strong> R${total}
              </span>
            </div>
            {status === "pending" && (
              <div>
                <button className="button-status" style={{ width: "28vw" }}>
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
            {Orders.map((pedido) => {
              var description;

              for (var i = 0; i < modelos.id.length; i++) {
                var product = pedido.product_model_id;

                if (modelos.id[i] === product) {
                  description = modelos.description[i];
                }
              }
              const colum = (
                <tr className="oder-tr-content">
                  <td className="amount">{pedido.amount}</td>
                  <td className="products">
                    <img src={camisa} className="image-product" />

                    <span className="product-name">{description}</span>
                  </td>
                  <td className="logo">
                    {" "}
                    <a href={`${bucketAWS}${pedido.logo_link}`} download>
                      Baixar Imagem
                    </a>{" "}
                  </td>
                </tr>
              );
              return colum;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EspecificOrderAdm;
