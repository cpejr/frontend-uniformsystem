import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../../../../services/api';

import { Button } from '@material-ui/core';

import ProductModelCardAdm from '../../../../components/ProductModelCardAdm';
import PopUpProductModel from '../../../../components/PopUpProductModel';

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

function RegisterProduct({history}) {

  const [openToRegister, setOpenToRegister] = useState(false);
  const [openToEdit, setOpenToEdit] = useState(false);

  const [productModelIdToEdit, setProductModelIdToEdit] = useState('');

  const handleCreate = () => {
    setOpenToRegister(true);
  }
  
  const handleCloseRegister = () => {
    setOpenToRegister(false);
  }
  
  const handleEdit = () => {
    setOpenToEdit(true);
  }

  const handleCloseEdit = () => {
    setOpenToEdit(false);
  }


  return (
    <div className="registerProductFullContent">
      
      <FaChevronLeft className="iconToReturn" onClick={() => history.goBack()} />

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
            <span>NOME:</span>
            <input type="text" style={{width: '100%'}} />
          </div>
          <div className="spanWithInput">
            <span>DESCRIÇÃO:</span>
            <input type="text" style={{width: '100%'}} />
          </div>

          <div className="boxToManipulateProductModel">
            <div className="labelAndButtonAboveBox"> 
              <span>MODELOS:</span>

              <button type="button" 
                onClick={handleCreate}
              >ADICIONAR NOVO MODELO</button>
            </div>

            <div className="boxManipulateModels">
            {productModels.map((item, index) =>
              item ? (
                <ProductModelCardAdm
                  key={index}
                  handleClose={handleEdit}
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
      <PopUpProductModel open={openToRegister} handleClose={handleCloseRegister} 
        titleModal={"Cadastro de modelo"}
      />
      <PopUpProductModel open={openToEdit} handleClose={handleCloseEdit} 
        titleModal={"Edição de modelo"}
      />
    </div>
  );
}

export default withRouter(RegisterProduct);
