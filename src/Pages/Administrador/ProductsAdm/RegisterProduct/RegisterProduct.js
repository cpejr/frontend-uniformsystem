import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../../../services/api';

import { Button, CircularProgress, makeStyles, Snackbar, TextField } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import ProductModelCardAdm from '../../../../components/ProductModelCardAdm';
import PopUpProductModel from '../../../../components/PopUpProductModel';

import AddIcon from '@material-ui/icons/Add';

import { FaChevronLeft } from 'react-icons/fa';

import './RegisterProduct.css';

function validateInputWithTypeRadio(valueFromInputCap, valueFromInputShirt, valueFromInputBusiness, valueFromInputSport, valueFromInputUniversity){
  let isValid;
  if(valueFromInputCap === false && valueFromInputShirt === false && valueFromInputBusiness === false && valueFromInputSport === false && valueFromInputUniversity === false){
      isValid = false;
  }else{
      isValid = true;
  }
  return isValid;
}

function validateInputWithTypeText(valueFromInput){
  let isValid;
  if(valueFromInput === ""){
      isValid = false;
  }else{
      isValid = true;
  }
  return isValid;
}

function RegisterProduct({history}) {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1c2VyX2lkIjoiMDg2YThhMS1lZWZlLTRiZmMtZTcxZS1hMTY0MWYwYWU2ZjQiLCJuYW1lIjoiRGlvZ28gQWRtaW4gMSIsImZpcmViYXNlX3VpZCI6Ill1MUkyTzJHNnJibnRjQnVyczZ6YXZSYkVPZDIiLCJ1c2VyX3R5cGUiOiJhZG0iLCJlbWFpbCI6ImRpb2dvYWRtMTNAZW1haWwuY29tIiwiY3BmIjoiMTIzNDU2Nzg5MTgiLCJjcmVhdGVkX2F0IjoiMjAyMC0xMi0wOCAwNToxMDoyOCIsInVwZGF0ZWRfYXQiOiIyMDIwLTEyLTA4IDA1OjEwOjI4In1dLCJpYXQiOjE2MDc0MDQyNDQsImV4cCI6MTYwOTk5NjI0NH0.z5raD9BSVlas7DheRJFuEAw3TW64Wxr4N7sjy4xV9lI';
  
  const [loading, setLoading] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [productModelIdToEdit, setProductModelIdToEdit] = useState(null);

  const [productInfo, setProductInfo] = useState({});

  const [isEditProduct, setIsEditProduct] = useState(false);

  const [productModelsArray, setProductModelsArray] = useState([]);

  // Estados voltados para gerenciar erros no campo Type
  const [errorTypeProduct, setErrorTypeProduct] = useState(false);
  const [errorTypeProductMessage, setErrorTypeProductMessage] = useState('');

  // Estados voltados para gerenciar erros no campo Name
  const [errorNameProduct, setErrorNameProduct] = useState(false);
  const [errorNameProductMessage, setErrorNameProductMessage] = useState('');

  // Estados voltados para gerenciar erros no campo Description
  const [errorDescriptionProduct, setErrorDescriptionProduct] = useState(false);
  const [errorDescriptionProductMessage, setErrorDescriptionProductMessage] = useState('');

  const inputTypeCap = useRef(null);
  const inputTypeShirt = useRef(null);
  const inputTypeBusiness = useRef(null);
  const inputTypeSport = useRef(null);
  const inputTypeUniversity = useRef(null);

  const inputName = useRef(null);
  const inputDescription = useRef(null);

  const classes = useStyles();

  const handleCreateModal = () => {
    setOpenModal(true);
  }
  
  const handleCloseModal = () => {
    setOpenModal(false);
  }
  
  const handleNewProduct = () => {
    setIsEditProduct(false);
    handleCreateModal();
  }

  const handleOpenToEdit = (productModelID) => {
    setIsEditProduct(true);
    handleCreateModal();
    setProductModelIdToEdit(productModelID);
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

    const resultValidateType = validateInputWithTypeRadio(inputTypeCap.current.checked, 
      inputTypeShirt.current.checked,
      inputTypeBusiness.current.checked,
      inputTypeSport.current.checked,
      inputTypeUniversity.current.checked
    );
    const resultValidateName = validateInputWithTypeText(inputName.current.value);
    const resultValidateDescription = validateInputWithTypeText(inputDescription.current.value);
    
    // Cobre as opções dos diferentes erros no Cadastro de um porduto novo
    if(resultValidateType && !resultValidateName && resultValidateDescription){ // tipo ok, nome errado, descrição ok
      setErrorTypeProduct(false);
      setErrorTypeProductMessage('');

      setErrorNameProduct(true);
      setErrorNameProductMessage('Digite um nome.');

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage('');
    }else if(resultValidateType && resultValidateName && !resultValidateDescription){  // tipo ok, nome ok, descrição errado
      setErrorTypeProduct(false);
      setErrorTypeProductMessage('');
      
      setErrorNameProduct(false);
      setErrorNameProductMessage('');

      setErrorDescriptionProduct(true);
      setErrorDescriptionProductMessage('Digite uma descrição.');
    }else if(!resultValidateType && resultValidateName && resultValidateDescription){  // tipo errado, nome ok, descrição errado
      setErrorTypeProduct(true);
      setErrorTypeProductMessage('Escolha um tipo.');
      
      setErrorNameProduct(false);
      setErrorNameProductMessage('');

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage('');
    }else if(!resultValidateType && !resultValidateName && resultValidateDescription){  // tipo errado, nome errado, descrição ok
      setErrorTypeProduct(true);
      setErrorTypeProductMessage('Escolha um tipo.');
      
      setErrorNameProduct(true);
      setErrorNameProductMessage('Digite um nome.');

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage('');
    }else if(!resultValidateType && resultValidateName && !resultValidateDescription){  // tipo errado, nome ok, descrição errado
      setErrorTypeProduct(true);
      setErrorTypeProductMessage('Escolha um tipo.');
      
      setErrorNameProduct(false);
      setErrorNameProductMessage('');

      setErrorDescriptionProduct(true);
      setErrorDescriptionProductMessage('Digite uma descrição.');
    }else if(resultValidateType && !resultValidateName && !resultValidateDescription){  // tipo ok, nome errado, descrição errado
      setErrorTypeProduct(false);
      setErrorTypeProductMessage('');
      
      setErrorNameProduct(true);
      setErrorNameProductMessage('Digite um nome.');

      setErrorDescriptionProduct(true);
      setErrorDescriptionProductMessage('Digite uma descrição.');
    }else if(!resultValidateType && !resultValidateName && !resultValidateDescription){  // tipo errado, nome errado, descrição errado
        setErrorTypeProduct(true);
        setErrorTypeProductMessage('Escolha um tipo.');

        setErrorNameProduct(true);
        setErrorNameProductMessage('Digite um nome.');
  
        setErrorDescriptionProduct(true);
        setErrorDescriptionProductMessage('Digite uma descrição.');
    }else{  // tipo ok, nome ok, descrição ok

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
        if(productModelsArray.length > 0){
          
          productModelsArray.map(async (item) => {
  
            delete item.imgAlt;
            delete item.imgSrc;
            delete item.productID;
  
            let objImage = new FormData();
            objImage.append("file", item.imgLink);
            objImage.append("is_main", item.isMain);
            objImage.append("img_link", ".");
            objImage.append("price", item.price.replace(',', '.'));    // substitui "," por ".", pois backend tem validação por "." em price
            objImage.append("model_description", item.modelDescription);
            objImage.append("gender", item.gender);
  
            await api.post(`/newmodel/${response.data.product_id}`,
              objImage
              ,
              {
                headers: { authorization: `bearer ${token}` },
              }
            );
          });
        }
        
        setTimeout(() => {
          setLoading(false);
          setOpenSnackBar(true);
        }
        , 3000);
  
      }catch(err){
        console.log(err.message);
      }

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
                ref={inputTypeCap}
                id="bone" value="cap"/>
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="camisa" >CAMISA</label>
                <input type="radio" name="estiloProduto" 
                onClick={(e) => handleCompleteProductInfo(e, 'radio') }
                ref={inputTypeShirt}
                id="camisa" value="shirt" />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="empresarial" >EMPRESARIAL</label>
                <input type="radio" name="estiloProduto" 
                onClick={(e) => handleCompleteProductInfo(e, 'radio') }
                ref={inputTypeBusiness}
                id="empresarial" value="company" />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="esportivo" >ESPORTIVO</label>
                <input type="radio" name="estiloProduto" 
                onClick={(e) => handleCompleteProductInfo(e, 'radio') }
                ref={inputTypeSport}
                id="esportivo" value="sport" />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="universitario" >UNIVERSITÁRIO</label>
                <input type="radio" name="estiloProduto" 
                onClick={(e) => handleCompleteProductInfo(e, 'radio') }
                ref={inputTypeUniversity}
                id="universitario" value="university" />
              </div>
            </div>
            <span style={{fontSize: '0.75rem', color: '#f44336', fontFamily: 'Roboto', marginLeft: '14px'}}>
              {errorTypeProductMessage}
            </span>
          </div>

          <div className="spanWithInput">
            <span>NOME:</span>
            {/* <input type="text"  
              onChange={(e) => handleCompleteProductInfo(e, 'name')}
            /> */}
            <TextField
              required
              inputRef={inputName}
              className={classes.inputText}
              error={errorNameProduct}
              helperText={errorNameProductMessage}
              onChange={(e) => handleCompleteProductInfo(e, 'name')}
              variant="outlined"
            />
          </div>
          <div className="spanWithInput">
            <span>DESCRIÇÃO:</span>
            {/* <input type="text" 
              onChange={(e) => handleCompleteProductInfo(e, 'description')}
            /> */}
            <TextField
              required
              inputRef={inputDescription}
              className={classes.inputText}
              error={errorDescriptionProduct}
              helperText={errorDescriptionProductMessage}
              onChange={(e) => handleCompleteProductInfo(e, 'description')}
              variant="outlined"
            />
          </div>

          <div className="boxToManipulateProductModel">
            <div className="labelAndButtonAboveBox"> 
              <span>MODELOS:</span>

              <Button type="button" 
                onClick={handleNewProduct}
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
                  // handleClose={handleCloseModal}
                  handleSelectToEdit={handleOpenToEdit}
                  productModelArray={productModelsArray}
                  setProductModelArray={setProductModelsArray}
                  fullProduct={item}
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

            <PopUpProductModel open={openModal} handleClose={handleCloseModal} 
              isEdit={isEditProduct} 
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

const useStyles = makeStyles((theme) => ({
  inputText: {
    width: '100%',
    outline: 'none',
    padding: '5px 10px',
    '&:focus': {
      width: '70%',
    },
    borderRadius: '7px',
  },
  saveButton: {
      width: '85%',
      marginTop: '30px',
      outline: 'none',
      backgroundColor: '#4BB543',
      display: 'flex',
      justifyContent: 'space-evenly',
      fontSize: '18px',
      fontWeight: 600,
  }
}));

export default withRouter(RegisterProduct);
