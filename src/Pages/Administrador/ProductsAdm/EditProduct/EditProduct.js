import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import api from '../../../../services/api';

import { Button, CircularProgress, makeStyles, Snackbar, TextField } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import ProductModelCardAdm from '../../../../components/ProductModelCardAdm';
import PopUpProductModel from '../../../../components/PopUpProductModel';

import AddIcon from '@material-ui/icons/Add';

import { FaChevronLeft } from 'react-icons/fa';

import './EditProduct.css';

function validateInputWithTypeText(valueFromInput){
  let isValid;
  if(valueFromInput === ""){
      isValid = false;
  }else{
      isValid = true;
  }
  return isValid;
}

function EditProduct({history}) {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1c2VyX2lkIjoiMDg2YThhMS1lZWZlLTRiZmMtZTcxZS1hMTY0MWYwYWU2ZjQiLCJuYW1lIjoiRGlvZ28gQWRtaW4gMSIsImZpcmViYXNlX3VpZCI6Ill1MUkyTzJHNnJibnRjQnVyczZ6YXZSYkVPZDIiLCJ1c2VyX3R5cGUiOiJhZG0iLCJlbWFpbCI6ImRpb2dvYWRtMTNAZW1haWwuY29tIiwiY3BmIjoiMTIzNDU2Nzg5MTgiLCJjcmVhdGVkX2F0IjoiMjAyMC0xMi0wOCAwNToxMDoyOCIsInVwZGF0ZWRfYXQiOiIyMDIwLTEyLTA4IDA1OjEwOjI4In1dLCJpYXQiOjE2MDc0MDQyNDQsImV4cCI6MTYwOTk5NjI0NH0.z5raD9BSVlas7DheRJFuEAw3TW64Wxr4N7sjy4xV9lI';
  
  const bucketAWS = "https://profit-uniformes.s3.amazonaws.com/";

  const [loading, setLoading] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [productModelIdToEdit, setProductModelIdToEdit] = useState(null);

  const [productInfo, setProductInfo] = useState();

  const [isEditProduct, setIsEditProduct] = useState(false);

  const [oldProductModelsArray, setOldProductModelsArray] = useState([]);

  const [productModelsArray, setProductModelsArray] = useState([]);

  // Estados voltados para gerenciar erros no campo Name
  const [errorNameProduct, setErrorNameProduct] = useState(false);
  const [errorNameProductMessage, setErrorNameProductMessage] = useState('');

  const { product_id } = useParams();

  // Estados voltados para gerenciar erros no campo Description
  const [errorDescriptionProduct, setErrorDescriptionProduct] = useState(false);
  const [errorDescriptionProductMessage, setErrorDescriptionProductMessage] = useState('');

  const inputName = useRef(null);
  const inputDescription = useRef(null);

  const classes = useStyles();

  useEffect( () => {

    async function getProductInfo(){
      const responseProduct = await api.get(`/product/${product_id}`,
            {
              headers: { authorization: `bearer ${token}` },
            }
          );
      
      setProductInfo({...responseProduct.data.product[0]});

      if(responseProduct.data){
        let productModelInfo;
        
        const responseProductModels = await api.get(`/productmodels/${responseProduct.data.product[0].product_id}`,
              {
                headers: { authorization: `bearer ${token}` },
              }
            );
        

        const productModelsAuxiliar = [];      
        responseProductModels.data.models.map( item => {
          
          const {gender, img_link, is_main, model_description, price, product_model_id} = item;
  
          productModelInfo = {
            product_model_id: product_model_id,
            gender: gender, 
            imgLink: img_link !== 'Sem imagem' ? `${bucketAWS}${img_link}`: 'Sem imagem', 
            isMain: is_main === 0? false: true, 
            modelDescription: model_description, 
            price: price, 
          }
          productModelsAuxiliar.push(productModelInfo);

        });
    
        setProductModelsArray([...productModelsAuxiliar]);

        setOldProductModelsArray([...productModelsAuxiliar]);
        
      }else{
        setProductModelsArray([]);
        setOldProductModelsArray([]);
      }

    }

    getProductInfo();

  }, []);

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
      
    }else{
        newObjProductInfo = {
          description: e.target.value,
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

    const resultValidateName = validateInputWithTypeText(inputName.current.value);
    const resultValidateDescription = validateInputWithTypeText(inputDescription.current.value);
    
    // Cobre as opções dos diferentes erros no Cadastro de um porduto novo
    if(!resultValidateName && resultValidateDescription){ // nome errado, descrição ok
      setErrorNameProduct(true);
      setErrorNameProductMessage('Digite um nome.');
      
      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage('');
    }else if(resultValidateName && !resultValidateDescription){  // nome ok, descrição errado
      
      setErrorNameProduct(false);
      setErrorNameProductMessage('');
      
      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage('');
    }else if(!resultValidateName && !resultValidateDescription){  // nome errado, descrição errado
      
      setErrorNameProduct(true);
      setErrorNameProductMessage('Digite um nome.');

      setErrorDescriptionProduct(true);
      setErrorDescriptionProductMessage('Digite uma descrição.');
    }else{  // nome ok, descrição ok

      setErrorNameProduct(false);
      setErrorNameProductMessage('');

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage('');

      try{
        setLoading(true);

        const updated_fields = {
          "updated_fields": {
            name: productInfo.name,
            description: productInfo.description,
          }
        }
        const response = await api.put(`/product/${productInfo.product_id}`,
          updated_fields
          ,
          {
            headers: { authorization: `bearer ${token}` },
          }
        );

        // Deleto todos os product models de início
        if(oldProductModelsArray.length > 0){

          let params;

          oldProductModelsArray.map(async (item) => {
            
            if(item.imgLink !== 'Sem imagem'){
              let nameWithType = item.imgLink.split(bucketAWS)[1]
              params = {
                name: nameWithType.split('.')[0],
                type: nameWithType.split('.')[1]
              }
            }else{
              params = {
                name: 'Sem imagem',
                type: null,
              }
            }
            

            await api.delete(`/model/${item.product_model_id}`,
              {
                headers: { authorization: `bearer ${token}` },
                params
              }
            );
          });
        }

        // Caso tenha product_models
        if(productModelsArray.length > 0){
          
          productModelsArray.map(async (item) => {
            let objImage = new FormData();
            objImage.append("file", item.imgLink.name !== undefined ? item.imgLink : null );
            objImage.append("is_main", item.isMain);
            objImage.append("img_link", item.imgLink.name ? '.' : item.imgLink);
            objImage.append("price", item.price.replace(',', '.'));    // substitui "," por ".", pois backend tem validação por "." em price
            objImage.append("model_description", item.modelDescription);
            objImage.append("gender", item.gender);

            await api.post(`/newmodel/${productInfo.product_id}`,
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

  // Re-renderiza a tela depois que productModelsArray foi atualizado 
  useEffect(() => {
  }, [productModelsArray]);


  return (
    <div className="editProductFullContent">
      
      <FaChevronLeft className="iconToReturn" onClick={() => history.goBack()} />

      <div className="mainContent">
        <h1>
          EDITAR PRODUTO
          <span />
        </h1>

        <form className="formEditProduct">

          <div className="spanWithInput">
            <span>NOME:</span>
            {
              productInfo &&
                <TextField
                  required
                  inputRef={inputName}
                  defaultValue={productInfo.name}
                  className={classes.inputText}
                  error={errorNameProduct}
                  helperText={errorNameProductMessage}
                  onChange={(e) => handleCompleteProductInfo(e, 'name')}
                  variant="outlined"
                />
            }
          </div>
          <div className="spanWithInput">
            <span>DESCRIÇÃO:</span>
            {
              productInfo && 
                <TextField
                  required
                  defaultValue={productInfo.description}
                  inputRef={inputDescription}
                  className={classes.inputText}
                  error={errorDescriptionProduct}
                  helperText={errorDescriptionProductMessage}
                  onChange={(e) => handleCompleteProductInfo(e, 'description')}
                  variant="outlined"
                />
            }
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
              {loading ? <CircularProgress /> : "SALVAR ALTERAÇÕES"}
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
          Produto atualizado com sucesso!
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

export default withRouter(EditProduct);