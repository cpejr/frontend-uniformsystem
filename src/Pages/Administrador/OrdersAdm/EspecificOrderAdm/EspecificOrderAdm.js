import React, { useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';

import './EspecificOrderAdm.css';
import camisa from '../../../../Assets/camisa.jpg';


import CircularProgress from "@material-ui/core/CircularProgress"
import { functionsIn } from 'lodash';

function EspecificOrderAdm() {
    const [loadingStatus, setLoadingStatus] = useState(false);

    function ChangeStatus() {
        setLoadingStatus(true);

        setTimeout(() => {
            setLoadingStatus(false);
        }, 3000)
    }

    const status = " ";
    return ( 
        <div className="order-container">
            <div className="especific-container">
                <div className="informations">
                    <AiOutlineLeft color='black' size={30} />
                    <div className="title-status">
                        <span className="title">DETALHES DO PEDIDO</span>
                        <div className="status">
                            <span>STATUS: </span>
                            <div>{status}</div> 
                        </div>
                    </div>

                    <div className="id-button">
                        <div className="especific-info">
                            <span className="id">ID: 002</span>
                            <span className="date">Data do pedido: 01/01/2021</span>
                            <span className="price">Valor do pedido: R$1000,00</span>
                        </div>
                        {
                            (status === "pending") &&
                            <div>
                                <button className="button-status">Mudar status para "Em produção"</button>
                            </div>
                        }
                        {
                            (status === "preparing") &&
                            <div>
                                <input placeholder="código de rastramento" style={{marginRight: "10px"}}></input>
                                <button className="button-status">Entregar pedido</button>
                            </div>
                        }
                        {
                            (status === "delivered") &&
                            <div>
                                <span className="deliveryman">Entregador: 007</span>
                            </div>
                        }
                    </div>

                    <button className="button-status" onClick={ () => ChangeStatus() }>
                        {loadingStatus ? <CircularProgress size={ 35 } color="secondary" className="circularProgress" /> : "Mudar status para ''Em produção''"}
                    </button>

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
