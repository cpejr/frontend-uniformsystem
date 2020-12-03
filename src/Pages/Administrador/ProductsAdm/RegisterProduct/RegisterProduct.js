import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../services/api';
import ProductModelCardAdm from '../../../../components/ProductModelCardAdm';

import { FaChevronLeft } from 'react-icons/fa';

import camisa from '../../../../Assets/camisa.jpg';

import './RegisterProduct.css';


const productModels = [
  {
    productID: '',
    imgSrc: camisa,
    imgAlt: 'Teste',
    productModelName: 'MODELO 1',
    
  },
  {
    productID: '',
    imgSrc: camisa,
    imgAlt: 'Teste',
    productModelName: 'MODELO 2',

  },
  {
    productID: '',
    imgSrc: camisa,
    imgAlt: 'Teste',
    productModelName: 'MODELO 2',

  }
]

function RegisterProduct() {

  return (
    <div className="registerProductFullContent">
      
      <Link to="/adm/produtos">
        <FaChevronLeft className="iconToReturn" />
      </Link>

      <div className="mainContent">
        <h1>
          CADASTRANDO NOVO PRODUTO
          <span />
        </h1>

        <form className="formRegisterProduct">
          <div className="spanWithInput">
            <span>
              TIPO:
            </span>
            <div className="manyRadioButtons">
              <div className="radioButtonWithLabel">
                <label htmlFor="bone">BONÉ</label>
                <input type="radio" name="estiloProduto" id="bone"/>
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="camisa" >CAMISA</label>
                <input type="radio" name="estiloProduto" id="camisa" />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="empresarial" >EMPRESARIAL</label>
                <input type="radio" name="estiloProduto" id="empresarial" />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="esportivo" >ESPORTIVO</label>
                <input type="radio" name="estiloProduto" id="esportivo" />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="universitario" >UNIVERSITÁRIO</label>
                <input type="radio" name="estiloProduto" id="universitario" />
              </div>
            </div>
          </div>

          <div className="spanWithInput">
            <span>DESCRIÇÃO:</span>
            <input type="text" style={{width: '100%'}} />
          </div>
          <div className="spanWithInput">
            <span>VALOR:</span>
            <input type="text" style={{width: '30%'}} />
          </div>

          <div className="boxToManipulateProductModel">
            <div className="labelAndButtonAboveBox"> 
              <span>MODELOS:</span>

              <button type="button" >ADICIONAR NOVO MODELO</button>
            </div>

            <div className="boxManipulateModels">
            {productModels.map((item, index) =>
              item ? (
                <ProductModelCardAdm
                  key={index}
                  productModelID={item.productModelID}
                  imgSrc={item.imgSrc}
                  imgAlt={item.imgAlt}
                  productModelName={item.productModelName}
                />
              ) : null
            )}
            </div>

            <button type="submit" className="finalButtonToRegister">CADASTRAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterProduct;
