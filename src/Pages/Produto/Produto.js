import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaCheck, FaShoppingCart } from "react-icons/fa";

import { Button, TextField } from "@material-ui/core";
import MetaData from "../../meta/reactHelmet";

import api from "../../services/api";
import { LoginContext } from "../../contexts/LoginContext";
import SnackbarMessage from "../../components/SnackbarMessage";
import Checkbox from "./Checkbox";
import "./Produto.css";
import "./Radio.css";

import ProductSkeleton from "../../components/Skeletons/ProductSkeleton";
import CalculateShipping from "../../components/CalculateShipping";
import { Modal } from "react-bootstrap";

function validateFields(value, type) {
  let isValid;
  switch (type) {
    case "quantity":
      if (value === "" || Number(value) <= 0 || isNaN(Number(value))) {
        isValid = false;
      } else {
        isValid = true;
      }
      break;
    case "size":
      if (value === 0) {
        isValid = false;
      } else {
        isValid = true;
      }
      break;
    default:
      break;
  }

  return isValid;
}

const obj_sizes = ["PP", "P", "M", "G", "GG"];

function Produto() {
  const { token, updateCart, user } = useContext(LoginContext);

  const [selectedValue, setSelectedValue] = useState(0);
  const [Produto, setProduto] = useState({});
  const [gender, setGender] = useState([]);

  const [models, setModels] = useState([]);
  const [modelChoosen, setModelChoosen] = useState({});
  const [isSelect, setIsSelect] = useState(0);

  const [confirmDuplicateModal, setConfirmDuplicateModal] = useState(false);

  const meta = {
    titlePage: "Uniformes Ecommerce | Produto",
    titleSearch: "Profit Uniformes | Produto",
    description: "Produtos personalizados prontos para a compra.",
    keyWords: "Uniformes | Produto | Ecommerce | Profit",
    imageUrl: "",
    imageAlt: "",
  };

  const [errorSize, setErrorSize] = useState(false);

  const [errorToken, setErrorToken] = useState(false);

  const [errorQuantity, setErrorQuantity] = useState(false);
  const [errorQuantityMessage, setErrorQuantityMessage] = useState("");

  const [logoImage, setLogoImage] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("success");

  const inputQuantity = useRef(null);
  const inputSize = useRef(null);
  const inputLogo = useRef(null);

  //Pegando o id do produto pelo link
  const { product_id } = useParams();

  useEffect(() => {
    const setup = async () => {
      const response = await api.get(`/productmodels/${product_id}`);
      const arrayOfModels = response.data.models;
      console.log("MODEL", arrayOfModels);
      setGender(arrayOfModels);
      setProduto(response.data);

      // Armazena o modela
      setModels(arrayOfModels);

      const choosen =
        arrayOfModels[Math.floor(Math.random() * arrayOfModels.length)];

      // Acha modelo principal
      setModelChoosen(!choosen ? 1 : choosen);

      // Acha modelo principal
      setIsSelect(!choosen ? 1 : choosen.product_model_id);
    };
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const sizeValueChild = (child) => {
    setSelectedValue(child);
  };

  //essa funcao tem um CSS só pra ela, pois gastou uns esquemas diferenciados pra fazer
  function Radio(gender) {
    function Content() {
      return (
        <div className="checked">
          <FaCheck color="white" />
        </div>
      );
    }

    return (
      <div className="radio" style={{ display: "flex" }}>
        {obj_sizes.map((size, index) => {
          let value;
          value = gender + "_" + size;
          return (
            <label
              key={index}
              htmlFor="radio_size_item"
              className="radio_container"
              onClick={() => setSelectedValue(value)}
            >
              {size}
              <input
                type="radio"
                name="radio_size_item"
                value={value}
                ref={inputSize}
              />
              <span className="radio_checkmark">
                {selectedValue === value ? Content() : null}
              </span>
            </label>
          );
        })}
      </div>
    );
  }

  const AddToCart = async () => {
    let objProdcutInCart = new FormData();
    objProdcutInCart.append("product_model_id", modelChoosen.product_model_id);

    const formattedGender = selectedValue.split("_")[0] === "Fem" ? "F" : "M";

    objProdcutInCart.append("gender", formattedGender);
    objProdcutInCart.append("size", selectedValue.split("_")[1]);
    objProdcutInCart.append("amount", Number(inputQuantity.current.value));
    objProdcutInCart.append("file", logoImage ? logoImage.imgSrc : null);
    objProdcutInCart.append("isLogoUpload", logoImage ? true : false);

    try {
      await api.put("/cart/addtocart", objProdcutInCart, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `bearer ${token}`,
        },
      });

      // Espera X milissegundos para ativar a função interna
      setTimeout(() => {
        setMessageSnackbar("Produto adicionado no carrinho!");
        setTypeSnackbar("success");
        setOpenSnackbar(true);
      }, 800);
      updateCart();
    } catch (err) {
      setMessageSnackbar("Falha ao adicionar o produto");
      setTypeSnackbar("error");
      console.warn(err);
    }
  };

  const Verify = () => {
    const resultQuantityField = validateFields(
      inputQuantity.current.value,
      "quantity"
    );
    const resultSizeField = validateFields(selectedValue, "size");

    if (!resultQuantityField || !resultSizeField || !token) {
      if (!resultQuantityField) {
        setErrorQuantity(true);
        setErrorQuantityMessage("Quantidade inválida.");
      } else {
        setErrorQuantity(false);
        setErrorQuantityMessage("");
      }

      if (!resultSizeField) {
        setErrorSize(true);
      } else {
        setErrorSize(false);
      }

      if (!token) {
        setErrorToken(true);
      } else {
        setErrorToken(false);
      }
    } else {
      setErrorQuantity(false);
      setErrorQuantityMessage("");
      setErrorSize(false);
      setErrorToken(false);

      if (
        user.cart &&
        user.cart
          .map((item) => item.product_model_id)
          .indexOf(modelChoosen.product_model_id.toString()) !== -1
      ) {
        setConfirmDuplicateModal(true);
      } else {
        AddToCart();
      }
    }
  };

  function AddLogo() {
    inputLogo.current.click();
  }

  function handleAddLogoImage() {
    let fileData = new FileReader();
    fileData.readAsDataURL(inputLogo.current.files[0]);

    fileData.onload = function () {
      const fileLoaded = fileData.result;

      setLogoImage({
        file: fileLoaded,
        imgSrc: inputLogo.current.files[0],
        imgAlt: "Logo",
      });
    };
  }

  const handleSelectModel = (product_model_id) => {
    const selectedModel = models.find(
      (item) => item.product_model_id === product_model_id
    );
    console.log("escolhido", selectedModel);
    setModelChoosen(selectedModel);
    setIsSelect(selectedModel.product_model_id);
  };

  return (
    <div className="productPage">
      {models.length !== 0 ? (
        <>
          <MetaData
            titlePage={meta.titlePage}
            titleSearch={meta.titleSearch}
            description={meta.description}
            keyWords={meta.keyWords}
            imageUrl={meta.imageUrl}
            imageAlt={meta.imageAlt}
          />
          <div className="leftSide">
            <img
              src={`${process.env.REACT_APP_BUCKET_AWS}${modelChoosen.img_link}`}
              alt={`${modelChoosen.model_description}`}
            />
          </div>

          <div className="rightSide">
            <h1 className="productsName">{Produto.name}</h1>
            <div className="titleArea">
              <strong>Descrição do produto:</strong>
              <span>{Produto.description}</span>
            </div>
            <div className="productsInfo">
              <div className="leftSideInside">
                <div className="priceWIthPhotos">
                  <strong>
                    {modelChoosen
                      ? `R$ ${modelChoosen.price?.toFixed(2)}`
                      : "none"}
                  </strong>
                  <div className="productsPhotos">
                    {models.length > 0 ? (
                      models.map((item) => {
                        return (
                          <img
                            src={`${process.env.REACT_APP_BUCKET_AWS}${item.img_link}`}
                            alt={item.model_description}
                            className={
                              isSelect === item.product_model_id
                                ? "productSelect"
                                : null
                            }
                            onClick={() =>
                              handleSelectModel(item.product_model_id)
                            }
                          />
                        );
                      })
                    ) : (
                      <span>Sem modelo</span>
                    )}
                  </div>
                  <div className="logoSpaceDiv">
                    {logoImage && (
                      <img
                        className="logoImgClass"
                        src={logoImage.file}
                        alt={logoImage.imgAlt}
                      />
                    )}
                  </div>
                </div>

                <div className="shipSpace">
                  <CalculateShipping
                    product_models={
                      modelChoosen && [
                        {
                          product_model_id:
                            modelChoosen.product_model_id?.toString(),
                          quantity: inputQuantity.value || 1,
                        },
                      ]
                    }
                  />
                </div>
              </div>
              <div className="sizeAndQuantity">
                {console.log("PRODUTO", Produto)}
                <strong>Tamanho</strong>
                <Checkbox
                  gender={gender[0].gender}
                  setSelectedValue={setSelectedValue}
                  selectedValue={selectedValue}
                />

                <div className="quantity">
                  <strong>Quantidade</strong>
                  <TextField
                    variant="outlined"
                    type="text"
                    inputProps={{ maxLength: 5 }}
                    inputRef={inputQuantity}
                    error={errorQuantity}
                    helperText={errorQuantityMessage}
                  />
                </div>

                <div className="loadLogo">
                  <div className="titleUploadLogo">
                    <strong>Logo da sua empresa</strong>
                    <span>
                      Envie a logo da sua empresa abaixo e veja como fica:
                    </span>
                  </div>

                  <Button onClick={() => AddLogo()}>
                    <input
                      type="file"
                      hidden
                      ref={inputLogo}
                      onChange={(e) => handleAddLogoImage()}
                    />
                    Carregue a sua logo!
                  </Button>
                </div>
                <Button className="addToCart" onClick={() => Verify()}>
                  <FaShoppingCart className="icon" size="35px" />
                  ADICIONAR AO CARRINHO
                </Button>

                {errorSize && (
                  <span style={{ color: "#dc3545", fontSize: "0.9rem" }}>
                    Escolha um tamanho
                  </span>
                )}
                {errorToken && (
                  <span style={{ color: "#dc3545", fontSize: "0.9rem" }}>
                    Necessário logar!
                  </span>
                )}
              </div>
            </div>
          </div>
          <SnackbarMessage
            open={openSnackbar}
            handleClose={handleClose}
            message={messageSnackbar}
            type={typeSnackbar}
          />
          <Modal
            show={confirmDuplicateModal}
            onHide={() => setConfirmDuplicateModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Produto possivelmente duplicado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              O modelo de produto que deseja adicionar já existe em seu
              carrinho. No entato, pode ser que seja de tamanho, gênero ou logo
              diferente.
              <br />
              Caso seja esse o caso e queira seguir com a operação, selecione
              "CONFIRMAR"
              <br />
              Caso seja idêntico, solicitamos que altere a quantidade na página
              de carrinho.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setConfirmDuplicateModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  AddToCart();
                  setConfirmDuplicateModal(false);
                }}
              >
                Confirmar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <ProductSkeleton screenWidth={window.innerWidth} />
      )}
    </div>
  );
}

export default Produto;
