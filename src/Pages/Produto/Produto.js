import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaCheck, FaShoppingCart } from "react-icons/fa";

import { Button, TextField } from '@material-ui/core';
import MetaData from '../../meta/reactHelmet';

import api from "../../services/api";
import { LoginContext } from "../../contexts/LoginContext";
import SnackbarMessage from "../../components/SnackbarMessage";

import "./Produto.css";
import "./Radio.css";

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
  const { token } = useContext(LoginContext);

  const [selectedValue, setSelectedValue] = useState(0);
  const [Produto, setProduto] = useState({});

  const [models, setModels] = useState([]);
  const [modelChoosen, setModelChoosen] = useState({});
  const [isSelect, setIsSelect] = useState(0);

  const [errorCEP, setErrorCEP] = useState(false);
  const [errorCEPMessage, setErrorCEPMessage] = useState("");
    const meta = {
        titlePage: "Uniformes Ecommerce | Produto",
        titleSearch: "Profit Uniformes | Produto",
        description: "Produtos personalizados prontos para a compra.",
        keyWords: "Uniformes | Produto | Ecommerce | Profit",
        imageUrl: "",
        imageAlt: "",
      }


  const [errorSize, setErrorSize] = useState(false);

  const [errorToken, setErrorToken] = useState(false);

  const [errorQuantity, setErrorQuantity] = useState(false);
  const [errorQuantityMessage, setErrorQuantityMessage] = useState("");

  const [calculatedShipping, setCalculatedShipping] = useState(null);

  const [logoImage, setLogoImage] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("success");

  const inputQuantity = useRef(null);
  const inputSize = useRef(null);
  const inputCEP = useRef(null);
  const inputLogo = useRef(null);

  //Pegando o id do produto pelo link
  const { product_id } = useParams();

  useEffect(async () => {
    async function getProductModelsFromProduct(product_id) {
      const response = await api.get(`/productmodels/${product_id}`);
      return response.data;
    }

    const response = await getProductModelsFromProduct(product_id);

    setProduto(response);
    const arrayOfModels = response.models;

    // Armazena o modela
    setModels(arrayOfModels);


    const choosen = arrayOfModels[Math.floor(Math.random() * arrayOfModels.length)];;

    // Acha modelo principal
    setModelChoosen(!choosen? 1: choosen);

    // Acha modelo principal
    setIsSelect(!choosen? 1: choosen.product_model_id);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
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
    const resultQuantityField = validateFields(
      inputQuantity.current.value,
      "quantity"
    );
    const resultSizeField = validateFields(selectedValue, "size");

    if (
      !resultQuantityField ||
      !resultSizeField ||
      !token ||
      token === "notYet"
    ) {
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

      if (!token || token === "notYet") {
        setErrorToken(true);
      } else {
        setErrorToken(false);
      }
    } else {
      setErrorQuantity(false);
      setErrorQuantityMessage("");
      setErrorSize(false);
      setErrorToken(false);

      let objProdcutInCart = new FormData();
      objProdcutInCart.append(
        "product_model_id",
        `${modelChoosen.product_model_id}`
      );

      const formattedGender = selectedValue.split("_")[0] === 'Fem' ? 'F' : 'M';

      objProdcutInCart.append("gender", formattedGender);
      objProdcutInCart.append("size", selectedValue.split("_")[1]);
      objProdcutInCart.append("amount", Number(inputQuantity.current.value));
      objProdcutInCart.append("file", logoImage? logoImage.imgSrc : null);
      objProdcutInCart.append("isLogoUpload", logoImage ? true: false);
      
      try {
        const response = await api.put("/addtocart", objProdcutInCart, {
          headers: { authorization: `Bearer ${token}` },
        });

        // Espera X milissegundos para ativar a função interna
        setTimeout(() => {
          setMessageSnackbar("Produto adicionado no carrinho!");
          setTypeSnackbar("success");
          setOpenSnackbar(true);
        }, 800);
        
      } catch (err) {
        setMessageSnackbar("Falha ao adicionar o produto");
        setTypeSnackbar("error");
        console.warn(err);
      }
    }
  };

  async function CalculateCEP() {
    const cepReceived = inputCEP.current.value;

    try {
      if (
        cepReceived === "" ||
        cepReceived.length < 8 ||
        isNaN(Number(cepReceived))
      ) {
        setErrorCEP(true);
        setErrorCEPMessage("Digite um CEP válido.");
      } else {
        setErrorCEP(false);
        setErrorCEPMessage("");

        const response = await api.get(`/shipping/${cepReceived}`);

        setCalculatedShipping(response.data.shipping.Valor);
      }
    } catch (err) {
      setCalculatedShipping(-1);
      console.warn(err);
    }
  }

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
      <MetaData titlePage={meta.titlePage} titleSearch={meta.titleSearch} description={meta.description} keyWords={meta.keyWords} imageUrl={meta.imageUrl} imageAlt={meta.imageAlt} />
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
                {modelChoosen ? `R$ ${modelChoosen.price?.toFixed(2)}` : "none"}
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
                        onClick={() => handleSelectModel(item.product_model_id)}
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
              <span>
                Calcule o CEP:{" "}
                {calculatedShipping && `R$ ${calculatedShipping}`}
              </span>
              <div className="calculateCEPArea">
                <TextField
                  variant="outlined"
                  type="text"
                  inputProps={{ maxLength: 8 }}
                  inputRef={inputCEP}
                  error={errorCEP}
                  helperText={errorCEPMessage}
                />
                <Button className="calculateCEPButton" onClick={CalculateCEP}>
                  Calcular
                </Button>
              </div>

              <a
                href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
                target="_blank"
              >
                <span className="forgotPassword">Não sei meu CEP</span>
              </a>
            </div>
          </div>
          <div className="sizeAndQuantity">
            <strong>Tamanho</strong>
            <div className="divCheckboxes">
              <div className="genderCheckboxes">
                <h6>Feminino</h6>
                {Radio("Fem")}
              </div>
              <div className="genderCheckboxes">
                <h6>Masculino</h6>
                {Radio("Mas")}
              </div>
            </div>

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
            <Button className="addToCart" onClick={() => AddToCart()}>
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
      <SnackbarMessage open={openSnackbar} handleClose={handleClose} message={messageSnackbar} type={typeSnackbar}/>
    </div>
  );
}

export default Produto;
