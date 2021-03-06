import React, { useEffect, useState, useContext } from "react";
import { FaChevronLeft } from "react-icons/fa";
import api from "../../../../services/api";
import "./EspecificOrderAdm.css";
import MetaData from "../../../../meta/reactHelmet";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../../../contexts/LoginContext";

function EspecificOrderAdm(props) {
  const statusFromOrder = props.location.state.status;
  let deliver = props.location.state.deliver;

  const { token, user } = useContext(LoginContext);
  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

  // Caso ainda não tenha um deliver e vai efetuar a mudança de status no momento
  if (!deliver) {
    deliver = user.name;
  }

  const createdAt = props.location.state.createdAt;
  const updatedAt = props.location.state.updatedAt;

  const orderId = props.location.state.orderId;
  var price = [];
  var discount = [];
  var total;
  var id;
  var formatDate = new Date(createdAt);
  var formatUpdate = new Date(updatedAt);
  var modelos = {
    id: [],
    description: [],
    imgLink: [],
  };
  const [Orders, setOrders] = useState([]);
  const [Models, setModels] = useState([]);
  const [Code, setCode] = useState("");
  const [disableSendOrderButton, setDisableSendOrderButton] = useState(false);

  const [status, setStatus] = useState(statusFromOrder);
  const history = useHistory();

  const meta = {
    titlePage: "Administrador | Ordem Específica",
    titleSearch: "Ordem Específica Profit",
    description:
      "Tendo solicitado seu pedido especifique o que é necessário para sua confecção e entrega. É possível também acompanhar o andamento do seu pedido.",
    keyWords: "Específico, Pedido, Detalhes, Profit",
    imageUrl: "",
    imageAlt: "",
  };

  function validateBeforeSetCode(value) {
    // Vazio ou menor do que 5
    if (value === "" || value.length < 5) {
      setDisableSendOrderButton(true);
    } else {
      setDisableSendOrderButton(false);
      setCode(value);
    }
  }

  const obterPedidos = async () => {
    try {
      const resultado = await api.get(`/order/productsfromorder/${orderId}`, {
        headers: { authorization: `bearer ${token}` },
      });
      setOrders(resultado.data);
    } catch (err) {
      console.warn(err.message);
      setOrders([]);
    }
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

  Models.forEach((produto) => {
    modelos.id.push(produto.product_model_id);
    modelos.description.push(produto.model_description);
    modelos.imgLink.push(produto.img_link);
  });

  async function ModificarStatus() {
    if (status === "pending") {
      try {
        setStatus("preparing");
      } catch (error) {
        console.warn(error);
        alert(error);
      }
    } else {
      if (Code !== "") {
        try {
          await api.post(
            `order/deliveratmail/${orderId}`,
            {
              tracking_code: Code,
            },
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          setStatus("delivered");
        } catch (error) {
          console.warn(error);
          alert(error);
        }
      } else {
        alert("Código de rastreamento não inserido.");
      }
    }
  }

  const setColorStatusLabel = (statusOrder) => {
    let colorStatus;
    switch (statusOrder) {
      case "waitingPayment":
        colorStatus = "#15B5DE";
        break;
      case "preparing":
        colorStatus = "#FFE45A";
        break;
      case "pending":
        colorStatus = "#F94444";
        break;
      case "delivered":
        colorStatus = "#60F86A";
        break;
      default:
        break;
    }
    return colorStatus;
  };

  return (
    <div className="order-container">
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <div className="especific-container">
        <div className="informations">
          <FaChevronLeft
            className="setaVoltar"
            onClick={() => history.goBack()}
          />

          <div className="title-status">
            <span className="title">DETALHES DO PEDIDO</span>
            <div className="status">
              <span>STATUS: </span>
              <div
                className={"statusOrderLabel"}
                style={{ backgroundColor: setColorStatusLabel(status) }}
              >
                {status}
              </div>
            </div>
          </div>

          <div className="id-button">
            <div className="especific-info">
              {Orders.map((pedido) => {
                id = pedido.order_id;

                const reducer = (accumulator, currentValue) => {
                  return accumulator + currentValue;
                };

                discount.push(pedido.discount);

                const reducerDiscount = (accumulator, currentValue) => {
                  return accumulator + currentValue;
                };

                price.push(pedido.product_price * pedido.amount);

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
                {formatDate.toLocaleString("pt-BR", createdAt)}
              </span>
              <br />
              <span className="date">
                <strong>Última atualização:</strong>
                {formatUpdate.toLocaleString("pt-BR", updatedAt)}
              </span>
              <br />
              <span className="price">
                <strong>Valor do pedido:</strong> R$ {total}
              </span>
            </div>
            {status === "pending" && (
              <div>
                <button
                  className="button-status"
                  style={{ width: "28vw" }}
                  onClick={ModificarStatus}
                >
                  Mudar status para "Em produção"
                </button>
              </div>
            )}
            {status === "preparing" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  placeholder="Código de rastreamento"
                  style={{ marginRight: "10px", marginBottom: "10px" }}
                  onChange={(e) => validateBeforeSetCode(e.target.value)}
                />
                <button
                  className="button-status"
                  onClick={ModificarStatus}
                  disabled={disableSendOrderButton}
                >
                  Entregar pedido
                </button>
              </div>
            )}
            {status === "delivered" && (
              <div style={{ margin: "20px 0px" }}>
                <span className="deliveryman">
                  <strong>Entregador:</strong> {`${deliver}`}
                </span>
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
              var img_link;

              for (var i = 0; i < modelos.id.length; i++) {
                var product = pedido.product_model_id;

                if (modelos.id[i] === product) {
                  description = modelos.description[i];
                  img_link = modelos.imgLink[i];
                }
              }
              const colum = (
                <tr className="oder-tr-content">
                  <td className="amount">{pedido.amount}</td>
                  <td className="products">
                    <img
                      src={`${bucketAWS}${img_link}`}
                      className="image-product"
                    />

                    <span className="product-name">{description}</span>
                  </td>
                  <td className="logo">
                    {pedido.logo_link === "Sem Imagem" ? (
                      <span>Logo não cadastrada</span>
                    ) : (
                      <a href={`${bucketAWS}${pedido.logo_link}`} download>
                        Baixar Imagem
                      </a>
                    )}
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
