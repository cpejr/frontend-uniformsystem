import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';

import './EspecificOrderAdm.css';
import camisa from '../../../../Assets/camisa.jpg';


function EspecificOrderAdm() {

    return (
        <div className="order-container">
            <div className="informations">
                <AiOutlineLeft color='black' size={30} />
                <div className="title-status">
                    <span className="title">DETALHES DO PEDIDO</span>
                    <div className="status">
                        <span>STATUS: </span>
                        <div>Pendente</div> 
                    </div>
                </div>

                <div className="id-button">
                    <div className="especific-info">
                        <span className="id">ID: 002</span>
                        <span className="date">Data do pedido: 01/01/2021</span>
                        <span className="price">Valor do pedido: R$1000,00</span>
                    </div>
                    <button className="button-status">Mudar status para "Em produção"</button>
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
                </tbody>
            </table>
        </div>
    );
}

export default EspecificOrderAdm;
