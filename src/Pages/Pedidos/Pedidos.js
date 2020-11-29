import React from "react";

import "./Pedidos.css";

import SidebarAdm from "../../components/SidebarAdm";
import Toggle from "../../components/Toggle";

import { FaAngleRight, FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { green } from "@material-ui/core/colors";

const PEDIDOS = [
    { status: "Entregue", ID: 2050 },
    { status: "Pendente", ID: 2051 },
    { status: "Em Andamento", ID: 2052 },
    { status: "Aguardando Pagamento", ID: 2053 },
];

export default function Pedidos() {
    function formatOrder(Order) {
        console.log(Order);
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
        }
    }

    return (
        <div className='orders_page'>
            <div className='sideBar'>
                <SidebarAdm />
            </div>
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
                            />
                            <AiOutlineSearch
                                className='icon_search'
                                size='40px'
                            />
                        </div>
                    </div>
                    <div className='div_pendente'>
                        <div className='text_pendente'>Pendente</div>
                        <Toggle className='toggle_order'></Toggle>
                    </div>
                </div>
                <div className='div_table'>
                    <table className='orders'>
                        {/* Os <th> sao o cabeçalho da tabela. O tr é uma linha da tabela. */}

                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                        </tr>
                        {PEDIDOS.map((pedido, index) => {
                            return (
                                <tr key={index} className='singleOrder'>
                                    <td className='id_table'>
                                    <div className='id_camp'>
                                            <div
                                                className='pedido_text'
                                                style={{ width: "fit-content" }}
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
                        })}
                    </table>
                </div>
            </div>
        </div>
    );
}
