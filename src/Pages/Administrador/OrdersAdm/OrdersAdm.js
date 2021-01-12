import React, { useState, useEffect, useRef } from 'react';
import api from "../../../services/api";

import './OrdersAdm.css'

import Toggle from "../../../components/Toggle";

import { FaAngleRight, FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const PEDIDOS = [
  { status: "Entregue", ID: 2050 },
  { status: "Pendente", ID: 2051 },
  { status: "Em Andamento", ID: 2052 },
  { status: "Aguardando Pagamento", ID: 2053 },
];

function OrdersAdm(){

  const [Orders, setOrders] = useState([]);
  const [OnlyPending, setOnlyPending] = useState(false);

  const [InputID, setInputID] = useState(0);

  async function getOrders() {
    try {
      const response = await api.get('/orders');
      console.log(response);
    } catch (error) {
      console.warn(error);
      alert(error.message);
    }
  } 
  
  function formatOrder(Order) {
      switch (Order) {
          case "Entregue":
              return (
                  <div
                      id='orderStyle'
                      style={{ backgroundColor: "#60F86A", color: "black" }}
                  >
                      Entregue
                  </div>
              );

          case "Pendente":
              return (
                  <div
                      id='orderStyle'
                      style={{ backgroundColor: "#F94444", color: "white" }}
                  >
                      Pendente
                  </div>
              );

          case "Em Andamento":
              return (
                  <div
                      id='orderStyle'
                      style={{ backgroundColor: "#FFE45A", color: "black" }}
                  >
                      Em Andamento
                  </div>
              );

          case "Aguardando Pagamento":
              return (
                  <div
                      id='orderStyle'
                      style={{ backgroundColor: "#15B5DE", color: "black" }}
                  >
                      Aguardando Pagamento
                  </div>
              );
          default:
              return <></>;
      }
  }

  function AllData() {
      return PEDIDOS.map((pedido, index) => {
          return (
              <tr key={index} className='singleOrder'>
                  <td className='id_table'>
                      <div className='id_camp'>
                          <div
                              className='pedido_text'
                              style={{
                                  width: "fit-content",
                              }}
                          >
                              {pedido.ID}{" "}
                          </div>{" "}
                          <FaAngleRight className='icon_table' />
                      </div>
                  </td>

                  <td className='status_table'>
                      {formatOrder(pedido.status)}{" "}
                  </td>
              </tr>
          );
      });
  }

  function FilteredData() {
      return PEDIDOS.map((pedido, index) => {
          console.log(pedido.ID);
          if (pedido.ID === InputID) {
              return (
                  <tr key={index} className='singleOrder'>
                      <td className='id_table'>
                          <div className='id_camp'>
                              <div
                                  className='pedido_text'
                                  style={{
                                      width: "fit-content",
                                  }}
                              >
                                  {pedido.ID}{" "}
                              </div>{" "}
                              <FaAngleRight className='icon_table' />
                          </div>
                      </td>

                      <td className='status_table'>
                          {formatOrder(pedido.status)}{" "}
                      </td>
                  </tr>
              );
          }
      });
  }

  return (
    <div className='orders_page'>
      <div className='orders_data'>
          <div className='top_page'>
              <div className='search_order'>
                  <div className='filterTitleProducts'>
                      <FaFilter /> FILTRAR:
                  </div>
                  <div className='input_div'>
                      <input
                          type='text'
                          placeholder='Digite um id'
                          className='input_id'
                          onChange={(e) => {
                              setInputID(e.target.value);
                              console.log(InputID);
                          }}
                      />
                      <AiOutlineSearch
                          className='icon_search'
                          size='40px'
                      />
                  </div>
              </div>
              <div className='div_pendente'>
                  <div className='text_pendente'>Pendente</div>
                  <Toggle
                      className='toggle_order'
                      Status={setOnlyPending}
                  ></Toggle>
              </div>
          </div>
          <div className='adm_div_table'>
              <table className='orders'>
                  {/* Os <th> sao o cabeçalho da tabela. O tr é uma linha da tabela. */}
                  <tr>
                      <th>ID</th>
                      <th>Status</th>
                  </tr>
                  {InputID ? FilteredData() : AllData()}
                  {/* {InputID && AllData()} */}
              </table>
          </div>
      </div>
  </div>
  );
}

export default OrdersAdm;
