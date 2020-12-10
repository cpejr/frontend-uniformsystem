import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../../../services/api';

import { Button, CircularProgress } from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ProductModelCardAdm from '../../../../components/ProductModelCardAdm';
import PopUpProductModel from '../../../../components/PopUpProductModel';

import AddIcon from '@material-ui/icons/Add';

import { FaChevronLeft } from 'react-icons/fa';

import camisa from '../../../../Assets/camisa.jpg';

import './RegisterProduct.css';

function RegisterProduct({history}) {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1c2VyX2lkIjoiMDg2YThhMS1lZWZlLTRiZmMtZTcxZS1hMTY0MWYwYWU2ZjQiLCJuYW1lIjoiRGlvZ28gQWRtaW4gMSIsImZpcmViYXNlX3VpZCI6Ill1MUkyTzJHNnJibnRjQnVyczZ6YXZSYkVPZDIiLCJ1c2VyX3R5cGUiOiJhZG0iLCJlbWFpbCI6ImRpb2dvYWRtMTNAZW1haWwuY29tIiwiY3BmIjoiMTIzNDU2Nzg5MTgiLCJjcmVhdGVkX2F0IjoiMjAyMC0xMi0wOCAwNToxMDoyOCIsInVwZGF0ZWRfYXQiOiIyMDIwLTEyLTA4IDA1OjEwOjI4In1dLCJpYXQiOjE2MDc0MDQyNDQsImV4cCI6MTYwOTk5NjI0NH0.z5raD9BSVlas7DheRJFuEAw3TW64Wxr4N7sjy4xV9lI';
  
  const [loading, setLoading] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [openToRegister, setOpenToRegister] = useState(false);
  const [openToEdit, setOpenToEdit] = useState(false);

  const [productModelIdToEdit, setProductModelIdToEdit] = useState('');

  const [productInfo, setProductInfo] = useState({});

  const [productModelsArray, setProductModelsArray] = useState([
    // {
    //   productID: '',
    //   modelDescription: 'Um modelo de camisa bonita',
    //   imgSrc: camisa,
    //   isMain: false,
    //   imgLink: 'google.com',
    //   imgAlt: 'Teste',
    //   price: '30,00',
    //   gender: 'M',
      
    // },
    // {
    //   productID: '',
    //   modelDescription: 'MODELO 2',
    //   imgSrc: camisa,
    //   isMain: false,
    //   imgLink: 'google.com',
    //   imgAlt: 'Teste',
    //   price: '31,00',
    //   gender: 'M',
  
    // },
    // {
    //   productID: '',
    //   modelDescription: 'MODELO 3',
    //   imgSrc: camisa,
    //   isMain: false,
    //   imgLink: 'google.com',
    //   imgAlt: 'Teste',
    //   price: '32,00',
    //   gender: 'M',
  
    // }
  ]);

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

  const handleCompleteProductInfo = (e, type) => {

    let newObjProductInfo

    if(type === 'name'){
      newObjProductInfo = {
        name: e.target.value,
      }
      
    }else if (type === 'description'){
        newObjProductInfo = {
          description: e.target.value,
        }
        
      }else{
          newObjProductInfo = {
            product_type: e.target.value,
          }
    }

    setProductInfo({...productInfo, ...newObjProductInfo, models: []});
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleSubmitNewProduct = async (event) => {
    event.preventDefault();

    console.log('produto aqui', productInfo);
    
    try{
      setLoading(true);
      const response = await api.post("/product",
        productInfo
        ,
        {
          headers: { authorization: `bearer ${token}` },
        }
      );

      // Caso tenha product_models
      // if(productModelsArray.length > 0){
        
        productModelsArray.map(async (item) => {

          delete item.imgAlt;
          delete item.imgSrc;
          delete item.productID;

          let objImage = new FormData();
          objImage.append("file", item.imgLink);
          objImage.append("is_main", item.isMain);
          objImage.append("img_link", ".");
          objImage.append("price", item.price);
          objImage.append("model_description", item.modelDescription);
          objImage.append("gender", item.gender);

          // let responseProductModels = await api.post(`/newmodels/${response.data.productId}`,
          await api.post(`/newmodel/${response.data.product_id}`,
            objImage
            ,
            {
              headers: { authorization: `bearer ${token}` },
            }
          );

        });

      // }
      
      setTimeout(() => {
        setLoading(false);
        setOpenSnackBar(true);
      }
      , 3000);

    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {
    console.log('productModels', productModelsArray)
  }, [productModelsArray]);


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
                <input type="radio" name="estiloProduto" 
                onClick={(e) => handleCompleteProductInfo(e, 'radio') }
                id="bone" value="cap"/>
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="camisa" >CAMISA</label>
                <input type="radio" name="estiloProduto" 
                onClick={(e) => handleCompleteProductInfo(e, 'radio') }
                id="camisa" value="shirt" />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="empresarial" >EMPRESARIAL</label>
                <input type="radio" name="estiloProduto" 
                onClick={(e) => handleCompleteProductInfo(e, 'radio') }
                id="empresarial" value="company" />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="esportivo" >ESPORTIVO</label>
                <input type="radio" name="estiloProduto" 
                onClick={(e) => handleCompleteProductInfo(e, 'radio') }
                id="esportivo" value="sport" />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="universitario" >UNIVERSITÁRIO</label>
                <input type="radio" name="estiloProduto" 
                onClick={(e) => handleCompleteProductInfo(e, 'radio') }
                id="universitario" value="university" />
              </div>
            </div>
          </div>

          <div className="spanWithInput">
            <span>NOME:</span>
            <input type="text"  
              onChange={(e) => handleCompleteProductInfo(e, 'name')}
            />
          </div>
          <div className="spanWithInput">
            <span>DESCRIÇÃO:</span>
            <input type="text" 
              onChange={(e) => handleCompleteProductInfo(e, 'description')}
            />
          </div>

          <div className="boxToManipulateProductModel">
            <div className="labelAndButtonAboveBox"> 
              <span>MODELOS:</span>

              <Button type="button" 
                onClick={handleCreate}
              >
                <span className="textAddProduct">ADICIONAR NOVO MODELO</span>
                <AddIcon className="iconAddProduct" />
              </Button>
            </div>

            <div className="boxManipulateModels">
            {productModelsArray.map((item, index) =>
              item ? (
                <ProductModelCardAdm
                  key={index}
                  productModelID={index}
                  handleClose={handleEdit}
                  handleSelectToEdit={setProductModelIdToEdit}
                  productModelArray={productModelsArray}
                  setProductModelArray={setProductModelsArray}
                  imgSrc={item.fileToShow}
                  imgAlt={"item.imgAlt"}
                  productModelName={item.modelDescription}
                  price={item.price}
                  gender={item.gender}
                />
              ) : null
            )}
            </div>

            <Button type="submit" className="finalButtonToRegister"
              onClick={handleSubmitNewProduct}
            >
              {loading ? <CircularProgress /> : "CADASTRAR"}
            </Button>
          </div>
        </form>
      </div>
      <PopUpProductModel open={openToRegister} handleClose={handleCloseRegister} 
        titleModal={"Cadastro de modelo"} isEdit={false} setProductModelArray={setProductModelsArray}
        productModelArray={productModelsArray}
      />
      <PopUpProductModel open={openToEdit} handleClose={handleCloseEdit} 
        titleModal={"Edição de modelo"} isEdit={true} 
        productModelIDFromExistingInfo={productModelIdToEdit} 
        setProductModelIDFromExistingInfo={setProductModelIdToEdit}
        setProductModelArray={setProductModelsArray}
        productModelArray={productModelsArray}
      />

      <Snackbar open={openSnackBar} autoHideDuration={5000} onClose={handleCloseSnackBar}>
        <MuiAlert onClose={handleCloseSnackBar} elevation={6} variant="filled" severity="success">
          Produto cadastrado com sucesso!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default withRouter(RegisterProduct);
