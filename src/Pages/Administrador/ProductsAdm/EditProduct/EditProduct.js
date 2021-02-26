import React, { useState, useEffect, useRef, useContext } from "react";
import { withRouter, useParams } from "react-router-dom";
import api from "../../../../services/api";
import { LoginContext } from "../../../../contexts/LoginContext";

import {
  Button,
  CircularProgress,
  makeStyles,
  Snackbar,
  TextField,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import ProductModelCardAdm from "../../../../components/ProductModelCardAdm";
import PopUpProductModel from "../../../../components/PopUpProductModel";
import ProductEditModal from "../../../../components/ProductEditModal";

import AddIcon from "@material-ui/icons/Add";

import { FaChevronLeft, FaEdit } from "react-icons/fa";

import "./EditProduct.css";
import validators from "./Validators";

function validateInputWithTypeText(valueFromInput) {
  let isValid;
  if (valueFromInput === "") {
    isValid = false;
  } else {
    isValid = true;
  }
  return isValid;
}

function EditProduct({ history }) {
  const { token } = useContext(LoginContext);

  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

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
  const [errorNameProductMessage, setErrorNameProductMessage] = useState("");

  const { product_id } = useParams();

  // Estados voltados para gerenciar erros no campo Description
  const [errorDescriptionProduct, setErrorDescriptionProduct] = useState(false);
  const [
    errorDescriptionProductMessage,
    setErrorDescriptionProductMessage,
  ] = useState("");

  const inputName = useRef(null);
  const inputDescription = useRef(null);

  const classes = useStyles();

  async function getProductInfo() {
    const response = await api.get(`/productmodels/${product_id}`, {
      headers: { authorization: `bearer ${token}` },
    });

    if (response.data) {
      const { models, ...product } = response.data;
      const productModelsAuxiliar = models.map(({ img_link, ...model }) => {
        return {
          imgLink:
            img_link !== "Sem imagem"
              ? `${bucketAWS}${img_link}`
              : "Sem imagem",
          ...model,
        };
      });
      setProductModelsArray(productModelsAuxiliar);
      setOldProductModelsArray(productModelsAuxiliar);
      setProductInfo({ ...product });
    } else {
      setProductModelsArray([]);
      setOldProductModelsArray([]);
      setProductInfo([]);
    }
  }

  useEffect(() => {
    try {
      getProductInfo();
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    } else {
      newObjProductInfo = {
        description: e.target.value,
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

    const resultValidateName = validateInputWithTypeText(
      inputName.current.value
    );
    const resultValidateDescription = validateInputWithTypeText(
      inputDescription.current.value
    );

    // Cobre as opções dos diferentes erros no Cadastro de um porduto novo
    if (!resultValidateName && resultValidateDescription) {
      // nome errado, descrição ok
      setErrorNameProduct(true);
      setErrorNameProductMessage("Digite um nome.");

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage("");
    } else if (resultValidateName && !resultValidateDescription) {
      // nome ok, descrição errado

      setErrorNameProduct(false);
      setErrorNameProductMessage("");

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage("");
    } else if (!resultValidateName && !resultValidateDescription) {
      // nome errado, descrição errado

      setErrorNameProduct(true);
      setErrorNameProductMessage("Digite um nome.");

      setErrorDescriptionProduct(true);
      setErrorDescriptionProductMessage("Digite uma descrição.");
    } else {
      // nome ok, descrição ok

      setErrorNameProduct(false);
      setErrorNameProductMessage("");

      setErrorDescriptionProduct(false);
      setErrorDescriptionProductMessage("");

      try {
        setLoading(true);

        const updated_fields = {
          updated_fields: {
            name: productInfo.name,
            description: productInfo.description,
          },
        };
        await api.put(`/product/${productInfo.product_id}`, updated_fields, {
          headers: { authorization: `bearer ${token}` },
        });

        // Deleto todos os product models de início
        if (oldProductModelsArray.length > 0) {
          oldProductModelsArray.map(async (item) => {
            await api.delete(`/model/${item.product_model_id}`, {
              headers: { authorization: `bearer ${token}` },
            });
          });
        }

        // Caso tenha product_models
        if (productModelsArray.length > 0) {
          productModelsArray.forEach(async (item) => {
            let objImage = new FormData();
            objImage.append(
              "file",
              item.imgLink.name !== undefined ? item.imgLink : null
            );
            objImage.append("is_main", item.isMain);
            objImage.append("img_link", item.imgLink.name ? "." : item.imgLink);
            objImage.append("price", item.price); // substitui "," por ".", pois backend tem validação por "." em price
            objImage.append("model_description", item.modelDescription);
            objImage.append("gender", item.gender);
            console.log(
              "🚀 ~ file: EditProduct.js ~ line 249 ~ productModelsArray.map ~ objImage",
              objImage
            );

            await api.post(`/newmodel/${productInfo.product_id}`, objImage, {
              headers: { authorization: `bearer ${token}` },
            });
          });
        }

        setTimeout(() => {
          setLoading(false);
          setOpenSnackBar(true);
        }, 3000);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // Re-renderiza a tela depois que productModelsArray foi atualizado
  useEffect(() => {}, [productModelsArray]);

  // -----------------------------------------------------
  //                   CODIGO DO LIMA
  // -----------------------------------------------------

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState();

  function handleOpenDialog(fieldKey, fieldName, modelId) {
    console.log(
      "🚀 ~ file: EditProduct.js ~ line 260 ~ handleOpenDialog ~ fieldKey",
      fieldKey
    );
    if (modelId) {
      setDialogInfo({
        fieldKey,
        fieldName,
        validator: validators[fieldKey],
        callback: updateModelInfo,
        modelId,
      });
    } else {
      setDialogInfo({
        fieldKey,
        fieldName,
        validator: validators[fieldKey],
        callback: updateProductInfo,
      });
    }
    setOpenEditDialog(true);
  }

  const handleClose = () => setOpenEditDialog(false);

  async function updateProductInfo(fieldKey, value) {
    try {
      let updated_fields = {};
      updated_fields[fieldKey] = value;
      await api.put(`/product/${product_id}`, { updated_fields });
      productInfo[fieldKey] = value;
      setProductInfo({ ...productInfo });
      handleClose();
    } catch (error) {
      alert("Erro na atualização do produto");
      console.warn(error);
    }
  }

  async function updateModelInfo(modelId, fieldKey, value) {
    try {
      if (fieldKey === "price") {
        value = value.replace(",", ".");
      }
      let updated_fields = {};
      updated_fields[fieldKey] = value;
      await api.put(`/model/${modelId}`, updated_fields);
      const index = productModelsArray
        .map((model) => model.product_model_id)
        .indexOf(modelId);
      productModelsArray[index][fieldKey] = value;
      setProductModelsArray([...productModelsArray]);
      handleClose();
    } catch (error) {
      alert("Erro na atualização do produto");
      console.warn(error);
    }
  }

  async function createModel(model) {
    try {
      let objImage = new FormData();
      objImage.append("file", model.imgLink);
      // objImage.append("is_main", model.isMain);
      objImage.append("available", true);
      objImage.append("img_link", ".");
      objImage.append("price", model.price.replace(",", ".")); // substitui "," por ".", pois backend tem validação por "." em price
      objImage.append("model_description", model.modelDescription);
      objImage.append("gender", model.gender);

      await api.post(`/newmodel/${product_id}`, objImage, {
        headers: { authorization: `bearer ${token}` },
      });

      getProductInfo();
    } catch (error) {
      alert("Erro ao criar o modelo")
      console.warn(error)
    }
  }

  // -----------------------------------------------------
  //                   CODIGO DO LIMA
  // -----------------------------------------------------

  return (
    <div className="editProductFullContent">
      {dialogInfo && (
        <ProductEditModal
          fieldName={dialogInfo.fieldName}
          fieldKey={dialogInfo.fieldKey}
          validator={dialogInfo.validator}
          callback={dialogInfo.callback}
          modelId={dialogInfo.modelId}
          open={openEditDialog}
          handleClose={handleClose}
        />
      )}
      <FaChevronLeft
        className="iconToReturn"
        onClick={() => history.goBack()}
      />

      <div className="mainContent">
        <h1>
          EDITAR PRODUTO
          <span />
        </h1>

        <form className="formEditProduct">
          <div className="spanWithInput">
            <div>
              <span>NOME:</span>
              <FaEdit
                onClick={() => {
                  handleOpenDialog("name", "Nome");
                }}
              />
            </div>
            {productInfo && (
              <TextField
                value={productInfo.name}
                className={classes.inputText}
                variant="outlined"
                disabled={true}
              />
            )}
          </div>
          <div className="spanWithInput">
            <div>
              <span>DESCRIÇÃO:</span>
              <FaEdit
                onClick={() => {
                  handleOpenDialog("description", "Descrição do Produto");
                }}
              />
            </div>
            {productInfo && (
              <TextField
                value={productInfo.description}
                className={classes.inputText}
                disabled={true}
                variant="outlined"
              />
            )}
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
                    fullProduct={{ ...item }}
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
              {loading ? (
                <CircularProgress color="secondary" />
              ) : (
                "SALVAR ALTERAÇÕES"
              )}
            </Button>
          </div>
        </form>
      </div>

      <PopUpProductModel
        open={openModal}
        handleClose={handleCloseModal}
        createModel={createModel}
      />

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
          Produto atualizado com sucesso!
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

export default withRouter(EditProduct);
