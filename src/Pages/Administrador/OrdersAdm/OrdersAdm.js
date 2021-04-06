import React, { useState, useEffect, useContext, useCallback } from "react";
import api from "../../../services/api";
import { LoginContext } from "../../../contexts/LoginContext";
import { Link } from "react-router-dom";
import MetaData from "../../../meta/reactHelmet";
import "./OrdersAdm.css";
import OrderTable from "../../../components/OrderTable/OrderTable";

import Toggle from "../../../components/Toggle";

import { FaFilter } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

function OrdersAdm() {
  const [Orders, setOrders] = useState([]);
  const [onlyPending, setOnlyPending] = useState(false);

  const { token } = useContext(LoginContext);

  const meta = {
    titlePage: "Administrador | Ordem",
    titleSearch: "Ordem Pedidos Profit",
    description:
      "Selecione seus produtos e faça já sua ordem de pedido, sua encomenda será prontamente solicitada.",
    keyWords: "Encomenda, Ordem, Pedido, Profit",
    imageUrl: "",
    imageAlt: "",
  };

  const obterPedidos = async (onlyPending) => {
    if (onlyPending === true) {
      let query = [];
      let param = "status=pending";
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
    } else {
      const resultado = await api.get("/order", {
        headers: { authorization: `bearer ${token}` },
      });
      setOrders(resultado.data);
    }
    Orders.reverse();
  };

  function Invert() {
    return true;
  }

  useEffect(async () => {
    await obterPedidos(onlyPending);
  }, [onlyPending]);

  return (
    <div className="orders_page">
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <div className="orders_data">
        <div className="top_page">
          <div className="search_order">
            <div className="filterTitleProducts">
              <FaFilter /> FILTRAR:
            </div>
          </div>
          <div className="div_pendente">
            <div className="text_pendente">Pendente</div>
            <div className="evento_pendente">
              <Toggle
                className="toggle_order"
                Status={setOnlyPending}
                isChecked={onlyPending}
              />
            </div>
          </div>
        </div>

        <div className="adm_div_table">
          <TableContainer component={Paper}>
            <Table className="orders" size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="header-table">
                    ID
                  </TableCell>
                  <TableCell align="center" className="header-table">
                    STATUS
                  </TableCell>
                  <TableCell align="center" className="header-table">
                    ESPECIFICAÇÕES
                  </TableCell>
                  <TableCell align="center" className="header-table">
                    DATA
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Invert() &&
                  Orders.length > 0 &&
                  Orders.slice(0)
                    .reverse()
                    .map((pedido) => {
                      const id = pedido.order_id;
                      const createdAt = pedido.created_at;
                      const updatedAt = pedido.updated_at;
                      const Status = pedido.status;
                      var formatDate = new Date(pedido.created_at);
                      // const deliver = pedido.delivered_by;
                      const colum = (
                        <TableRow>
                          <TableCell component="td" scope="row">
                            {pedido.order_id}
                          </TableCell>
                          <TableCell component="td" scope="row">
                            {<OrderTable status={pedido.status} />}
                          </TableCell>
                          <TableCell align="center" component="td" scope="row">
                            <Link
                              to={{
                                pathname: "/adm/pedidoespecifico",
                                state: {
                                  createdAt: createdAt,
                                  updatedAt: updatedAt,
                                  orderId: id,
                                  status: Status,
                                  // deliver: deliver,
                                },
                              }}
                              style={{ color: "black", marginLeft: "8px" }}
                            >
                              Detalhes...
                            </Link>
                          </TableCell>
                          <TableCell align="center" component="td" scope="row">
                            {formatDate.toLocaleString(
                              "pt-BR",
                              pedido.created_at
                            )}
                          </TableCell>
                        </TableRow>
                      );
                      return colum;
                    })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Os <th> sao o cabeçalho da tabela. O tr é uma linha da tabela. */}
        </div>
      </div>
    </div>
  );
}

export default OrdersAdm;
