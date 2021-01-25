import React, { useEffect, useState, useContext } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import api from "../../../../services/api";
import "./EspecificOrderAdm.css";
import camisa from "../../../../Assets/camisa.jpg";
import { useHistory } from 'react-router-dom';

import { LoginContext } from "../../../../contexts/LoginContext";

function EspecificOrderAdm(props) {
  var date = props.location.state.date;
  var today = new Date();
  var Status = props.location.state.status;
  var deliver = props.location.state.deliver;

  const orderId = props.location.state.orderId;
  var price = [];
  var total;
  var id;
  const [Orders, setOrders] = useState([]);
  const [Code, setCode] = useState([]);
  const [status, setStatus] = useState("pending");
  const history = useHistory();

  //const { token } = useContext(LoginContext);

  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbXSwiaWF0IjoxNjExNTE2NTM4LCJleHAiOjE2MTQxMDg1Mzh9.I8pPQCSitJA_50H--HYsuwe9hVWdVwASF_kP_FSN5l4";

  const obterPedidos = async () => {
    const resultado = await api.get(`productsfromorder/${orderId}`, {
      headers: { authorization: `bearer ${token}` },
    });
    console.log(resultado);
    setOrders(resultado.data);
  };

  useEffect(() => {
    obterPedidos();
  }, []);

  console.log(date);

  async function ModificarStatus() {
    if(status === "pending"){
      try {
        const response = await api.put(`order/${orderId}`, {
        is_paid: 1,
        status: "preparing", 
        shipping: 25.5},
        {
          headers: { authorization: `Bearer ${token}` },
        });
        setStatus("preparing");
      } catch (error) {
        console.warn(error);
        alert(error);
      }
    }else{
      if(Code != "") {
        try{
          const response = await api.post(`deliveratmail/${orderId}`, {
            tracking_code: Code},
            {
              headers: { authorization: `Bearer ${token}` }   
            ,});
          setStatus("delivered");
        } catch (error) {
          console.warn(error);
          alert(error);
        }
      }else{
        alert("código de rastreamento não inserido");
      }
    }
  }

  return (
    <div className="order-container">
      <div className="especific-container">
        <div className="informations">
          <AiOutlineLeft color="black" size={30} onClick={history.goBack} />
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

                const reducer = (accumulator, currentValue) => {
                  return accumulator + currentValue;
                };

                price.push(pedido.product_price);
                total = price.reduce(reducer);
                total = total.toFixed(2);
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
                {today.toLocaleString("pt-BR", date)}
              </span>
              <br />
              <span className="price">
                <strong>Valor do pedido:</strong> R${total}
              </span>
            </div>
            {status === "pending" && (
              <div>
                <button className="button-status" style={{ width: "28vw" }} onClick={ModificarStatus}>
                  Mudar status para "Em produção"
                </button>
              </div>
            )}
            {status === "preparing" && (
              <div>
                <input
                  placeholder="código de rastramento"
                  style={{ marginRight: "10px" }}
                  onChange={(e) => setCode(e.target.value)}
                ></input>
                <button className="button-status" onClick={ModificarStatus}>Entregar pedido</button>
              </div>
            )}
            {status === "delivered" && (
              <div>
                <span className="deliveryman">Entregador: {`${deliver}`}</span>
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
              const colum = (
                <tr className="oder-tr-content">
                  <td className="amount">{pedido.amount}</td>
                  <td className="products">
                    <img src={camisa} className="image-product" />
                    <span className="product-name">Camisa Personalisada 1</span>
                  </td>
                  <td className="logo">Baixar imagem</td>
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
