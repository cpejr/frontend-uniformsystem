import React, { useState, useEffect, useRef, useContext } from "react";
import api from "../../../services/api";
import { LoginContext } from "../../../contexts/LoginContext";
import { useHistory, Link } from "react-router-dom";
import {Helmet} from 'react-helmet';
import MetaData from '../../../meta/reactHelmet';
import "./OrdersAdm.css";
import OrderTable from "../../../components/OrderTable/OrderTable";

import Toggle from "../../../components/Toggle";
import EspecificOrderAdm from "../OrdersAdm/EspecificOrderAdm/EspecificOrderAdm";

import { FaAngleRight, FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { BorderRight } from "@material-ui/icons";

const PEDIDOS = [
  { status: "Entregue", ID: 2050 },
  { status: "Pendente", ID: 2051 },
  { status: "Em Andamento", ID: 2052 },
  { status: "Aguardando Pagamento", ID: 2053 },
];

function OrdersAdm() {
  const [Orders, setOrders] = useState([]);
  const [OnlyPending, setOnlyPending] = useState();
  //const { token } = useContext(LoginContext);
  const [InputID, setInputID] = useState(0);
  var date;
  const history = useHistory();

  const { token } = useContext(LoginContext);

  const meta = {
    titlePage: "Home - UniformSystem",
    titleSearch: "",
    description: "",
    keyWords: "",
    imageUrl: "",
    imageAlt: "",
  }


  const obterPedidos = async () => {
     if(OnlyPending === false){
      let query = [];
      let param = 'status=pending';
      query.push(param);
       try {
        const resultado = await api.get(`/order?${query}`, {
          headers: { authorization: `bearer ${token}` },
        });
        setOrders(resultado.data);
      } catch (error) {
        console.warn(error);
        alert(error);
      }
    }else{
      const resultado = await api.get(`order`, {
        headers: { authorization: `bearer ${token}` },
      });
      setOrders(resultado.data);
    }
  };

  useEffect(() => {
    obterPedidos();
  }, []);


  function FilteredData() {
    return PEDIDOS.map((pedido, index) => {
      {
        /*Usar .filter*/
      }
      if (pedido.ID === InputID) {
        return (
          <tr key={index} className="singleOrder">
            <td className="id_table">
              <div className="id_camp">
                <div
                  className="pedido_text"
                  style={{
                    width: "fit-content",
                  }}
                >
                  {pedido.ID}{" "}
                </div>{" "}
                <FaAngleRight className="icon_table" />
              </div>
            </td>

            <td className="status_table">
              <OrderTable Order={pedido.status} />{" "}
            </td>
          </tr>
        );
      }
    });
  }

  return (
    <div className="orders_page">
      <MetaData titlePage={meta.titlePage} titleSearch={meta.titleSearch} description={meta.description} keyWords={meta.keyWords} imageUrl={meta.imageUrl} imageAlt={meta.imageAlt} />
      <div className="orders_data">
        <div className="top_page">
          <div className="search_order">
            <div className="filterTitleProducts">
              <FaFilter /> FILTRAR:
            </div>
          </div>
          <div className="div_pendente">
            <div className="text_pendente">Pendente</div>
            <div className="evento_pendente" onClick={obterPedidos}>
              <Toggle className="toggle_order" Status={setOnlyPending} />
            </div>
          </div>
        </div>

        <div className="adm_div_table">
          <table className="orders">
            <tr>
              <th>ID</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>
                <tr>
                  {Orders.map((pedido) => {
                    const id = pedido.order_id;
                    date = pedido.created_at;
                    const Status = pedido.status;
                    const deliver = pedido.delivered_by;
                    const colum = (
                      <div className="adm_orders_id">
                        <tr>
                          {id}
                          <Link
                            to={{
                              pathname: "/adm/pedidoespecifico",
                              state: {
                                date: date,
                                orderId: id,
                                Status: Status,
                                deliver: deliver,
                              },
                            }}
                            style={{ color: "black" }}
                          >
                            <FaAngleRight className="icon_table" />
                          </Link>
                        </tr>
                      </div>
                    );

                    return colum;
                  })}
                </tr>
              </td>

              <td>
                {Orders.map((pedido) => {
                  const status = pedido.status;
                  const colum = (
                    <div className="adm_orders_status">
                      <tr>{<OrderTable status={status} />}</tr>
                    </div>
                  );
                  return colum;
                })}
              </td>
            </tr>
          </table>

          {/* Os <th> sao o cabeçalho da tabela. O tr é uma linha da tabela. */}

          <tr />
        </div>
      </div>
    </div>
  );
}

export default OrdersAdm;
