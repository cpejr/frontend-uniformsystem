import React, { useState, useEffect, useRef, useContext } from "react";
import { withRouter } from "react-router-dom";
import api from "../../../../services/api";
import { LoginContext } from "../../../../contexts/LoginContext";
import {
  Button,
  CircularProgress,
  makeStyles,
  Snackbar,
  TextField,
} from "@material-ui/core";
import MetaData from "../../../../meta/reactHelmet";
import MuiAlert from "@material-ui/lab/Alert";

import ProductModelCardAdm from "../../../../components/ProductModelCardAdm";
import PopUpProductModel from "../../../../components/PopUpProductModel";

import AddIcon from "@material-ui/icons/Add";

import { FaChevronLeft } from "react-icons/fa";

import "./RegisterProduct.css";
import validators from "./Validators";
import ProductEditModal from "../../../../components/ProductEditModal";

function validateInputWithTypeRadio(
  valueFromInputCap,
  valueFromInputShirt,
  valueFromInputBusiness,
  valueFromInputSport,
  valueFromInputUniversity
) {
  let isValid;
  if (
    valueFromInputCap === false &&
    valueFromInputShirt === false &&
    valueFromInputBusiness === false &&
    valueFromInputSport === false &&
    valueFromInputUniversity === false
  ) {
    isValid = false;
  } else {
    isValid = true;
  }
  return isValid;
}

function validateInputWithTypeText(valueFromInput) {
  let isValid;
  if (valueFromInput === "") {
    isValid = false;
  } else {
    isValid = true;
  }
  return isValid;
}

function RegisterProduct({ history }) {
  const meta = {
    titlePage: "Administrador | Registro",
    titleSearch: "Registro Profit Uniformes",
    description:
      "Registre seus uniformes selecionados. Nossa equipe está pronta para armazenar e selecionar seu produto em nosso estoque.",
    keyWords: "Registro, Profit, Armazenar, Profit",
    imageUrl: "",
    imageAlt: "",
  };

  const { token } = useContext(LoginContext);

  const [loading, setLoading] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [productModelIdToEdit, setProductModelIdToEdit] = useState(null);

  const [productInfo, setProductInfo] = useState({});

  const [isEditProduct, setIsEditProduct] = useState(false);

  const [productModelsArray, setProductModelsArray] = useState([]);

  // Estados voltados para gerenciar erros no campo Type
  const [errorTypeProduct, setErrorTypeProduct] = useState(false);
  const [errorTypeProductMessage, setErrorTypeProductMessage] = useState("");

  // Estados voltados para gerenciar erros no campo Name
  const [errorNameProduct, setErrorNameProduct] = useState(false);
  const [errorNameProductMessage, setErrorNameProductMessage] = useState("");

  // Estados voltados para gerenciar erros no campo Description
  const [errorDescriptionProduct, setErrorDescriptionProduct] = useState(false);
  const [
    errorDescriptionProductMessage,
    setErrorDescriptionProductMessage,
  ] = useState("");

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
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNewProduct = () => {
    setIsEditProduct(false);
    handleCreateModal();
  };

  const handleOpenToEdit = (productModelID) => {
    setIsEditProduct(true);
    handleCreateModal();
    setProductModelIdToEdit(productModelID);
  };

  const handleCompleteProductInfo = (e, type) => {
    let newObjProductInfo;
    if (type === "name") {
      newObjProductInfo = {
        name: e.target.value,
      };
    } else if (type === "description") {
      newObjProductInfo = {
        description: e.target.value,
      };
    } else {
      newObjProductInfo = {
        product_type: e.target.value,
      };
    }
    setProductInfo({ ...productInfo, ...newObjProductInfo, models: [] });
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleSubmitNewProduct = async (event) => {
    event.preventDefault();

    const resultValidateType = validateInputWithTypeRadio(
      inputTypeCap.current.checked,
      inputTypeShirt.current.checked,
      inputTypeBusiness.current.checked,
      inputTypeSport.current.checked,
      inputTypeUniversity.current.checked
    );
    const resultValidateName = validateInputWithTypeText(
      inputName.current.value
    );
    const resultValidateDescription = validateInputWithTypeText(
      inputDescription.current.value
    );

    // Cobre as opções dos diferentes erros no Cadastro de um porduto novo
    if (
      resultValidateType &&
      !resultValidateName &&
      resultValidateDescription
    ) {
      // tipo ok, nome errado, descrição ok
      setErrorTypeProduct(false);
      setErrorTypeProductMessage("");

      setErrorNameProduct(true);
      setErrorNameProductMessage("Digite um nome.");

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage("");
    } else if (
      resultValidateType &&
      resultValidateName &&
      !resultValidateDescription
    ) {
      // tipo ok, nome ok, descrição errado
      setErrorTypeProduct(false);
      setErrorTypeProductMessage("");

      setErrorNameProduct(false);
      setErrorNameProductMessage("");

      setErrorDescriptionProduct(true);
      setErrorDescriptionProductMessage("Digite uma descrição.");
    } else if (
      !resultValidateType &&
      resultValidateName &&
      resultValidateDescription
    ) {
      // tipo errado, nome ok, descrição errado
      setErrorTypeProduct(true);
      setErrorTypeProductMessage("Escolha um tipo.");

      setErrorNameProduct(false);
      setErrorNameProductMessage("");

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage("");
    } else if (
      !resultValidateType &&
      !resultValidateName &&
      resultValidateDescription
    ) {
      // tipo errado, nome errado, descrição ok
      setErrorTypeProduct(true);
      setErrorTypeProductMessage("Escolha um tipo.");

      setErrorNameProduct(true);
      setErrorNameProductMessage("Digite um nome.");

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage("");
    } else if (
      !resultValidateType &&
      resultValidateName &&
      !resultValidateDescription
    ) {
      // tipo errado, nome ok, descrição errado
      setErrorTypeProduct(true);
      setErrorTypeProductMessage("Escolha um tipo.");

      setErrorNameProduct(false);
      setErrorNameProductMessage("");

      setErrorDescriptionProduct(true);
      setErrorDescriptionProductMessage("Digite uma descrição.");
    } else if (
      resultValidateType &&
      !resultValidateName &&
      !resultValidateDescription
    ) {
      // tipo ok, nome errado, descrição errado
      setErrorTypeProduct(false);
      setErrorTypeProductMessage("");

      setErrorNameProduct(true);
      setErrorNameProductMessage("Digite um nome.");

      setErrorDescriptionProduct(true);
      setErrorDescriptionProductMessage("Digite uma descrição.");
    } else if (
      !resultValidateType &&
      !resultValidateName &&
      !resultValidateDescription
    ) {
      // tipo errado, nome errado, descrição errado
      setErrorTypeProduct(true);
      setErrorTypeProductMessage("Escolha um tipo.");

      setErrorNameProduct(true);
      setErrorNameProductMessage("Digite um nome.");

      setErrorDescriptionProduct(true);
      setErrorDescriptionProductMessage("Digite uma descrição.");
    } else {
      // tipo ok, nome ok, descrição ok

      setErrorTypeProduct(false);
      setErrorTypeProductMessage("");

      setErrorNameProduct(false);
      setErrorNameProductMessage("");

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage("");

      try {
        setLoading(true);
        const response = await api.post("/product", productInfo, {
          headers: { authorization: `bearer ${token}` },
        });

        // Caso tenha product_models
        if (productModelsArray.length > 0) {
          productModelsArray.map(async (item) => {
            let objImage = new FormData();
            objImage.append("file", item.imgLink);
            // objImage.append("is_main", item.isMain);
            objImage.append("available", item.available);
            objImage.append("img_link", ".");
            objImage.append("price", item.price.replace(",", ".")); // substitui "," por ".", pois backend tem validação por "." em price
            objImage.append("model_description", item.modelDescription);
            objImage.append("gender", item.gender);

            await api.post(`/newmodel/${response.data.product_id}`, objImage, {
              headers: { authorization: `bearer ${token}` },
            });
          });
        }

        setTimeout(() => {
          setLoading(false);
          setOpenSnackBar(true);

          // reseta as informações depois do envio
          inputTypeCap.current.checked = false;
          inputTypeShirt.current.checked = false;
          inputTypeBusiness.current.checked = false;
          inputTypeSport.current.checked = false;
          inputTypeUniversity.current.checked = false;
          inputName.current.value = "";
          inputDescription.current.value = "";
          setProductModelsArray([]);
        }, 2000);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // -----------------------------------------------------
  //                   CODIGO DO LIMA
  // -----------------------------------------------------

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState();

  function handleOpenDialog(fieldKey, fieldName, modelId) {
    setDialogInfo({
      fieldKey,
      fieldName,
      validator: validators[fieldKey],
      modelId,
    });
    setOpenEditDialog(true);
  }

  const handleClose = () => setOpenEditDialog(false);

  async function updateModelInfo(modelId, fieldKey, value) {
    if (fieldKey === "price") {
      value = value.replace(",", ".");
    }
    const index = productModelsArray
      .map((model) => model.product_model_id)
      .indexOf(modelId);
    productModelsArray[index][fieldKey] = value;
    setProductModelsArray([...productModelsArray]);
    handleClose();
  }

  async function createModel(model) {
    model.available=true;
    model.product_model_id=productModelsArray.length;
    setProductModelsArray([...productModelsArray, model]);
  }

  // -----------------------------------------------------
  //                   CODIGO DO LIMA
  // -----------------------------------------------------

  return (
    <div className="registerProductFullContent">
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />

      <FaChevronLeft
        className="iconToReturn"
        onClick={() => history.goBack()}
      />

      <div className="mainContent">
        <h1>
          CADASTRANDO NOVO PRODUTO
          <span />
        </h1>

        <form className="formRegisterProduct">
          <div className="spanWithInput">
            <span>TIPO:</span>
            <div className="manyRadioButtons">
              <div className="radioButtonWithLabel">
                <label htmlFor="bone">BONÉ</label>
                <input
                  type="radio"
                  name="estiloProduto"
                  onClick={(e) => handleCompleteProductInfo(e, "radio")}
                  ref={inputTypeCap}
                  id="bone"
                  value="cap"
                />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="camisa">CAMISA</label>
                <input
                  type="radio"
                  name="estiloProduto"
                  onClick={(e) => handleCompleteProductInfo(e, "radio")}
                  ref={inputTypeShirt}
                  id="camisa"
                  value="shirt"
                />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="empresarial">EMPRESARIAL</label>
                <input
                  type="radio"
                  name="estiloProduto"
                  onClick={(e) => handleCompleteProductInfo(e, "radio")}
                  ref={inputTypeBusiness}
                  id="empresarial"
                  value="company"
                />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="esportivo">ESPORTIVO</label>
                <input
                  type="radio"
                  name="estiloProduto"
                  onClick={(e) => handleCompleteProductInfo(e, "radio")}
                  ref={inputTypeSport}
                  id="esportivo"
                  value="sport"
                />
              </div>
              <div className="radioButtonWithLabel">
                <label htmlFor="universitario">UNIVERSITÁRIO</label>
                <input
                  type="radio"
                  name="estiloProduto"
                  onClick={(e) => handleCompleteProductInfo(e, "radio")}
                  ref={inputTypeUniversity}
                  id="universitario"
                  value="university"
                />
              </div>
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#f44336",
                fontFamily: "Roboto",
                marginLeft: "14px",
              }}
            >
              {errorTypeProductMessage}
            </span>
          </div>

          <div className="spanWithInput">
            <span>NOME:</span>
            <TextField
              required
              inputRef={inputName}
              className={classes.inputText}
              error={errorNameProduct}
              helperText={errorNameProductMessage}
              onChange={(e) => handleCompleteProductInfo(e, "name")}
              variant="outlined"
            />
          </div>
          <div className="spanWithInput">
            <span>DESCRIÇÃO:</span>
            <TextField
              required
              inputRef={inputDescription}
              className={classes.inputText}
              error={errorDescriptionProduct}
              helperText={errorDescriptionProductMessage}
              onChange={(e) => handleCompleteProductInfo(e, "description")}
              variant="outlined"
            />
          </div>

          <div className="boxToManipulateProductModel">
            <div className="labelAndButtonAboveBox">
              <span>MODELOS:</span>

              <Button type="button" onClick={handleNewProduct}>
                <span className="textAddProduct">ADICIONAR NOVO MODELO</span>
                <AddIcon className="iconAddProduct" />
              </Button>
            </div>

            <div className="boxManipulateModels">
              {productModelsArray.map((item, index) =>
                item ? (
                  <ProductModelCardAdm
                    key={index}
                    handleOpenDialog={handleOpenDialog}
                    fullProduct={{...item}}
                    updateModelInfo={updateModelInfo}
                  />
                ) : null
              )}
            </div>

            <Button
              type="submit"
              className="finalButtonToRegister"
              onClick={handleSubmitNewProduct}
            >
              {loading ? <CircularProgress color="secondary" /> : "CADASTRAR"}
            </Button>
          </div>
        </form>
      </div>

      <PopUpProductModel
        open={openModal}
        handleClose={handleCloseModal}
        createModel={createModel}
      />

      {dialogInfo && (
        <ProductEditModal
          fieldName={dialogInfo.fieldName}
          fieldKey={dialogInfo.fieldKey}
          validator={dialogInfo.validator}
          callback={updateModelInfo}
          modelId={dialogInfo.modelId}
          open={openEditDialog}
          handleClose={handleClose}
        />
      )}

      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
      >
        <MuiAlert
          onClose={handleCloseSnackBar}
          elevation={6}
          variant="filled"
          severity="success"
        >
          Produto cadastrado com sucesso!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  inputText: {
    width: "100%",
    outline: "none",
    padding: "5px 10px",
    "&:focus": {
      width: "70%",
    },
    borderRadius: "7px",
  },
  saveButton: {
    width: "85%",
    marginTop: "30px",
    outline: "none",
    backgroundColor: "#4BB543",
    display: "flex",
    justifyContent: "space-evenly",
    fontSize: "18px",
    fontWeight: 600,
  },
}));

export default withRouter(RegisterProduct);
