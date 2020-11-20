import React from 'react';

import camisa from '../../Assets/camisa.jpg';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './Checkout.css'


function Checkout(){

  return (
    <div className="fullContent">

      <h1>Lista de Produtos</h1>
      <div className="mainContent">
        <div className="leftSide">

          <div className="aboutProduct">
            <img src={camisa} alt=""/>
            <div className="infoProduct">
              <span>
                Nome do produto: Produto
              </span>
              <span>
                Quantidade total: 10 uni.
              </span>
              <span>
                Cor: Branco
              </span>
              <span>
                Preço: R$ 500,00
              </span>
            </div>
          </div>
            <div className="aboutPayment">
              <h2>Pagamento</h2>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  Cartão de Crédito
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
              <Accordion>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  Boleto
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>

            </div>
        </div>

        <div className="rightSide">
          <div className="productSummary">
            <div className="summaryTitle">
              <strong>Resumo do Pedido</strong>
            </div>

            <div className="addressInfo">

              <div className="addressConfirmation">
                <strong>Endereço de entrega</strong>
                <span>
                  Rua Fulano de Tal, 900
                </span>
                <span>
                  Bairro: Esse aqui
                </span>
                <span>
                  Cidade: Belo Horizonte - MG
                </span>
                <span>
                  CEP: 00000-000
                </span>
              </div>

              <div className="changeAddressArea">
                <span>Quer receber seus produtos em outro endereço?</span>
                <button type="button">Alterar endereço</button>
              </div>
            </div>

            <div className="shippingInfo">
              <strong>Frete</strong>
              <div className="valueShipping">
                <div className="leftValueShipping">
                  <img src="" alt=""/>
                  <span>Valor</span>
                </div> 
                <div className="rightValueShipping">
                  <span>R$25,00</span>
                </div> 
              </div>
            </div>

            <div className="totalArea">
              <strong>Total</strong>
              <strong>R$525,00</strong>
            </div>

          </div>
        </div>

      </div>

      <button type="button" className="purchaseFinished">
        Finalizar Compra
      </button>
    </div>
  );
}

export default Checkout;
