import React, { useState, useEffect, useContext } from "react";
import { withRouter, useParams } from "react-router-dom";
import api from "../../../../services/api";
import { LoginContext } from "../../../../contexts/LoginContext";

import { Button, makeStyles, Snackbar, TextField } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import ProductModelCardAdm from "../../../../components/ProductModelCardAdm";
import PopUpProductModel from "../../../../components/PopUpProductModel";
import ProductEditModal from "../../../../components/ProductEditModal";

import AddIcon from "@material-ui/icons/Add";

import { FaChevronLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

import "./EditProduct.css";
import validators from "./Validators";

function EditProduct({ history }) {
  const { token } = useContext(LoginContext);

  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [productInfo, setProductInfo] = useState();

  const [productModelsArray, setProductModelsArray] = useState([]);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState();

  const { product_id } = useParams();

  const classes = useStyles();

  useEffect(() => {
    try {
      getProductInfo();
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setProductInfo({ ...product });
    } else {
      setProductModelsArray([]);
      setProductInfo({});
    }
  }

  const handleCreateModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleCloseDialog = () => setOpenEditDialog(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  function handleOpenDialog(fieldKey, fieldName, placeholder = "", modelId) {
    if (modelId) {
      if (fieldKey === "delete") {
        setDialogInfo({
          fieldKey,
          callback: deleteModel,
          modelId,
        });
      } else {
        setDialogInfo({
          fieldKey,
          fieldName,
          validator: validators[fieldKey],
          callback: updateModelInfo,
          modelId,
          placeholder,
        });
      }
    } else {
      setDialogInfo({
        fieldKey,
        fieldName,
        placeholder,
        validator: validators[fieldKey],
        callback: updateProductInfo,
      });
    }
    setOpenEditDialog(true);
  }

  async function updateProductInfo(fieldKey, value) {
    try {
      let updated_fields = {};
      const convertGramsToKilos = 1000;
      if (fieldKey === "weight") {
        updated_fields[fieldKey] = (value / convertGramsToKilos).toFixed(3);
      } else {
        updated_fields[fieldKey] = value;
      }

      await api.put(`/product/${product_id}`, { updated_fields });
      if (fieldKey === "weight") {
        productInfo[fieldKey] = (value / convertGramsToKilos).toFixed(3);
      } else {
        productInfo[fieldKey] = value;
      }

      setProductInfo(productInfo);
      handleCloseDialog();
    } catch (error) {
      alert("Erro na atualização do produto");
      console.warn(error);
    }
  }

  async function updateModelInfo(modelId, fieldKey, value) {
    try {
      if (fieldKey === "imgLink") {
        let objImage = new FormData();
        objImage.append("file", value.imgFile);
        await api.put(`/productmodels/model/${modelId}`, objImage, {
          headers: { authorization: `bearer ${token}` },
        });
        getProductInfo();
      } else {
        if (fieldKey === "price") {
          value = value.replace(",", ".");
        }
        let updated_fields = {};
        updated_fields[fieldKey] = value;
        await api.put(`/productmodels/model/${modelId}`, updated_fields);
        const index = productModelsArray
          .map((model) => model.product_model_id)
          .indexOf(modelId);
        productModelsArray[index][fieldKey] = value;
        setProductModelsArray([...productModelsArray]);
      }
      handleCloseDialog();
    } catch (error) {
      alert("Erro na atualização do produto");
      console.warn(error);
    }
  }

  async function deleteModel(modelId) {
    try {
      await api.delete(`/productmodels/model/${modelId}`);
      const index = productModelsArray
        .map((model) => model.product_model_id)
        .indexOf(modelId);
      productModelsArray.splice(index, 1);
      setProductModelsArray([...productModelsArray]);
      handleCloseDialog();
    } catch (error) {
      alert("Erro ao deletar model");
      console.warn(error);
    }
  }

  async function createModel(model) {
    try {
      let objImage = new FormData();
      objImage.append("file", model.imgLink);
      objImage.append("available", true);
      objImage.append("img_link", ".");
      objImage.append("price", model.price.replace(",", "."));
      objImage.append("model_description", model.modelDescription);
      objImage.append("gender", model.gender);

      await api.post(`/productmodels/newmodel/${product_id}`, objImage, {
        headers: { authorization: `bearer ${token}` },
      });

      getProductInfo();
    } catch (error) {
      alert("Erro ao criar o modelo");
      console.warn(error);
    }
  }

  const handleDeleteProduct = async () => {
    await api.delete(`/product/${product_id}`, {
      headers: { authorization: `bearer ${token}` },
    });

    setTimeout(() => {
      history.push("/adm/produtos");
    }, [1000]);
  };

  return (
    <div className="editProductFullContent">
      {dialogInfo && (
        <ProductEditModal
          fieldName={dialogInfo.fieldName}
          fieldKey={dialogInfo.fieldKey}
          validator={dialogInfo.validator}
          callback={dialogInfo.callback}
          modelId={dialogInfo.modelId}
          placeholder={dialogInfo.placeholder}
          open={openEditDialog}
          handleClose={handleCloseDialog}
        />
      )}
      <FaChevronLeft
        className="iconToReturn"
        onClick={() => history.goBack()}
      />

      <FaTrashAlt
        className="excludeProductIcon"
        onClick={() => handleDeleteProduct()}
      />

      <div className="mainContent">
        <h1>
          EDITAR PRODUTO
          <span />
        </h1>

        <form className="formEditProduct">
          <div className="spanWithInput">
            <div>
              <IconContext.Provider
                value={{ size: "1.5em", className: "produtEditIcon" }}
              >
                <FaEdit
                  onClick={() => {
                    handleOpenDialog("name", "Nome");
                  }}
                />
              </IconContext.Provider>
              <span>NOME:</span>
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
              <IconContext.Provider
                value={{ size: "1.5em", className: "produtEditIcon" }}
              >
                <FaEdit
                  onClick={() => {
                    handleOpenDialog("description", "Descrição do Produto");
                  }}
                />
              </IconContext.Provider>
              <span>DESCRIÇÃO:</span>
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

          <div className="spanWithInput">
            <div>
              <IconContext.Provider
                value={{ size: "1.5em", className: "produtEditIcon" }}
              >
                <FaEdit
                  onClick={() => {
                    handleOpenDialog(
                      "height",
                      "Altura do Produto",
                      "Ex: 20 (cm)"
                    );
                  }}
                />
              </IconContext.Provider>
              <span>ALTURA:</span>
            </div>
            {productInfo && (
              <TextField
                value={productInfo.height}
                className={classes.inputText}
                disabled={true}
                variant="outlined"
                helperText="Considere a altura da vestimenta dobrada. Medida em centímetros, com limite de 100 cm."
              />
            )}
          </div>
          <div className="spanWithInput">
            <div>
              <IconContext.Provider
                value={{ size: "1.5em", className: "produtEditIcon" }}
              >
                <FaEdit
                  onClick={() => {
                    handleOpenDialog(
                      "length",
                      "Largura do Produto",
                      "Ex: 20 (cm)"
                    );
                  }}
                />
              </IconContext.Provider>
              <span>COMPRIMENTO:</span>
            </div>
            {productInfo && (
              <TextField
                value={productInfo.length}
                className={classes.inputText}
                disabled={true}
                variant="outlined"
                helperText="Medida em centímetros, com limite de 100 cm."
              />
            )}
          </div>
          <div className="spanWithInput">
            <div>
              <IconContext.Provider
                value={{ size: "1.5em", className: "produtEditIcon" }}
              >
                <FaEdit
                  onClick={() => {
                    handleOpenDialog(
                      "weight",
                      "Peso do Produto",
                      "Ex: 350 (gramas)"
                    );
                  }}
                />
              </IconContext.Provider>
              <span>PESO:</span>
            </div>
            {productInfo && (
              <TextField
                value={productInfo.weight}
                className={classes.inputText}
                disabled={true}
                variant="outlined"
                helperText="Medida em gramas, com limite de 30000 gramas."
              />
            )}
          </div>
          <div className="spanWithInput">
            <div>
              <IconContext.Provider
                value={{ size: "1.5em", className: "produtEditIcon" }}
              >
                <FaEdit
                  onClick={() => {
                    handleOpenDialog(
                      "width",
                      "Largura do Produto",
                      "Ex: 45 (cm)"
                    );
                  }}
                />
              </IconContext.Provider>
              <span>LARGURA:</span>
            </div>
            {productInfo && (
              <TextField
                value={productInfo.width}
                className={classes.inputText}
                disabled={true}
                variant="outlined"
                helperText="Medida em centímetros, com limite de 100 cm."
              />
            )}
          </div>

          <div className="boxToManipulateProductModel">
            <div className="labelAndButtonAboveBox">
              <span>MODELOS:</span>

              <Button type="button" onClick={handleCreateModal}>
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
