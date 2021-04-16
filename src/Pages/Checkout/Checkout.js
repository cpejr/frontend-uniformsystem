import React, { useEffect, useState, useContext } from "react";
import MetaData from "../../meta/reactHelmet";
import api from "../../services/api";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PopUpChangeAddress from "../../components/PopUpChangeAddress";
import SnackbarMessage from "../../components/SnackbarMessage";

import Button from "@material-ui/core/Button";

import { LoginContext } from "../../contexts/LoginContext";

import "./Checkout.css";

import { useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import HeroSquareSkeleton from "../../components/Skeletons/HeroSquareSkeleton";
import SelectShipping from "../../components/SelectShipping";

function InputWithLabel({ label, width, setInfo, error, maxLenght }) {
  return (
    <div className="divInputLabelError">
      <label>{label}</label>
      <input
        type="text"
        name="input"
        style={{ width: `${width}px` }}
        maxLength={`${maxLenght}`}
        onChange={(e) => setInfo(e.target.value)}
        // onChange={(e) => validateInput(e, type)}
      />
      <span style={{ color: "#ff0033", fontSize: "15px" }}>{error}</span>
    </div>
  );
}

function Checkout() {
  const history = useHistory();

  const [cardNumberStored, setCardNumber] = useState("");
  const [securityNumberStored, setSecurityNumber] = useState("");
  const [cardNameStored, setCardName] = useState("");

  const [loading, setLoading] = useState(false);

  const [errorInputCardNumber, setErrorInputCardNumber] = useState("");
  const [errorInputSecurityNumber, setErrorInputSecurityNumber] = useState("");
  const [errorInputCardName, setErrorInputCardName] = useState("");

  const [errorBirthInput, setErrorBirthInput] = useState("");
  const [errorInstallmentOptions, setErrorInstallmentOptions] = useState("");

  const [dayStored, setDayStored] = useState("");
  const [monthStored, setMonthStored] = useState("");
  const [yearStored, setYearStored] = useState("");

  const [installmentOptions, setInstallmentOptions] = useState(" ");

  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({});
  const [shipping, setShipping] = useState();

  const [openModal, setOpenModal] = useState(false);

  const [loadingPurchase, setLoadingPurchase] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("success");

  const { token, user } = useContext(LoginContext);

  const currentUser = user;
  const user_id = currentUser.user_id;

  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

  const meta = {
    titlePage: "Uniformes E-commerce | Checkout",
    titleSearch: "Checkout",
    description: "Checkout de pagamento",
    keyWords: "Checkout",
    imageUrl: "",
    imageAlt: "",
  };

  useEffect(() => {
    function validateBirthInput(type) {
      if (type === "day") {
        if (
          parseInt(dayStored, 10) <= 31 &&
          parseInt(dayStored, 10) > 0 &&
          !isNaN(Number(dayStored))
        ) {
          setErrorBirthInput("");
        } else {
          setErrorBirthInput("Data inválida");
        }
      } else if (type === "month") {
        if (
          Number(monthStored) <= 12 &&
          Number(monthStored) > 0 &&
          !isNaN(Number(monthStored))
        ) {
          setErrorBirthInput("");
        } else {
          setErrorBirthInput("Data inválida");
        }
      } else {
        var today = new Date();
        if (
          parseInt(yearStored, 10) <= today.getFullYear() &&
          parseInt(yearStored, 10) > 0 &&
          !isNaN(Number(yearStored))
        ) {
          setErrorBirthInput("");
        } else {
          setErrorBirthInput("Data inválida");
        }
      }
    }

    validateBirthInput("day");
    validateBirthInput("month");
    validateBirthInput("year");
  }, [dayStored, monthStored, yearStored]);

  useEffect(() => {
    const maximumInstallment = 10;

    function validateInstallmentOptions() {
      if (
        parseInt(installmentOptions, 10) >= 0 &&
        parseInt(installmentOptions, 10) <= maximumInstallment &&
        !isNaN(parseInt(installmentOptions, 10))
      ) {
        setErrorInstallmentOptions("");
      } else {
        setErrorInstallmentOptions("Parcelamento inválido");
      }
    }

    validateInstallmentOptions();
  }, [installmentOptions]);

  useEffect(() => {
    validateInput("cardNumber");
  }, [cardNumberStored]);

  useEffect(() => {
    validateInput("securityNumber");
  }, [securityNumberStored]);

  useEffect(() => {
    validateInput("cardName");
  }, [cardNameStored]);

  // Post order
  async function handlePostOrder() {
    setLoadingPurchase(true);

    const productsWithRightAttributes = products.map((item) => {
      delete item.name;
      delete item.img_link;
      delete item.product_in_cart_id;
      delete item.user_id;
      return item;
    });

    try {
      const address_id = address.address_id;

      console.log("produtos: ", products[0].price);
      await api
        .post(
          "/order",
          {
            address_id: address_id,
            shipping_service_code: shipping.ServiceCode,
            products: products,
          },
          {
            headers: { authorization: `bearer ${token}` },
          }
        )
        .then(
          (response) => {
            window.alert(
              "Você será redirecionado para a página de pagamento da Cielo"
            );
            window.open(response.data.settings.checkoutUrl);
          },
          (error) => {
            console.log(error);
          }
        );

      setTimeout(() => {
        setLoadingPurchase(false);
        setMessageSnackbar("Pedido feito com sucesso");
        setTypeSnackbar("success");
        setOpenSnackbar(true);
      }, 2000);
      setTimeout(() => {
        history.push("/perfil");
      }, 4000);
    } catch (error) {
      console.warn(error);
      setMessageSnackbar("Falha ao realizar o pedido");
      setTypeSnackbar("error");
      // history.push("/Error");
    }
  }

  // Lista dos produtos para finalizar pedido
  async function getProducts() {
    setLoading(true);
    try {
      const response = await api.get("/cart", {
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      // if(response.data.length>0){
      setProducts([...response.data]);
      console.log("OPA EU", products);
      // }
      // else{
      //   history.push('/')
      // }
    } catch (error) {
      console.warn(error);
      history.push("Error");
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    try {
      getProducts();
      setTimeout(() => {
        setLoading(false);
      }, [500]);
    } catch (error) {
      console.warn(error);
      alert("Erro ao buscar os produtos.");
    }
  }, []);

  // Pega endereço
  async function getAddress() {
    const response = await api.get(`/address/${user_id}`, {
      headers: { authorization: `bearer ${token}` },
    });
    setAddress({ ...response.data.adresses[0] });
  }

  useEffect(() => {
    try {
      getAddress();
    } catch (error) {
      console.warn(error);
      alert("Erro ao buscar o endereço.");
      history.push("Error");
    }
  }, []);

  // Chamado quando address atualiza (depois do popUp fechar)
  useEffect(() => {}, [address]);

  function validateInput(type) {
    if (type === "cardNumber") {
      if (!isNaN(Number(cardNumberStored))) {
        setErrorInputCardNumber("");
      } else {
        setErrorInputCardNumber("Número de cartão incorreto");
      }
    } else if (type === "securityNumber") {
      if (!isNaN(Number(securityNumberStored))) {
        setErrorInputSecurityNumber("");
      } else {
        setErrorInputSecurityNumber("Código incorreto");
      }
    } else {
      if (!isNaN(Number(cardNameStored))) {
        setErrorInputCardName("Nome inválido");
      } else {
        setErrorInputCardName("");
      }
    }
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  let price = 0;

  products.forEach((product) => {
    price += product.amount * product.price;
  });

  if (shipping) price += parseFloat(shipping.ShippingPrice);

  price = `R$ ${price.toFixed(2).toString().replace(".", ",")}`;

  return (
    <div className="fullContent">
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <h1>Lista de Produtos</h1>
      <div className="mainContent">
        <div className="leftSide">
          <div className="aboutListProducts">
            {!loading ? (
              <>
                {products.length == 0 ? (
                  <div className="aboutProduct">
                    <div className="infoProduct">
                      <span>Sem produtos</span>
                    </div>
                  </div>
                ) : (
                  products.map((product, index) => {
                    return (
                      <div className="aboutProduct" key={index}>
                        <img
                          src={bucketAWS + product.img_link}
                          alt={product.name}
                        />
                        <div className="infoProduct">
                          <span>Nome do produto: {product.name}</span>
                          <span>Quantidade total: {product.amount} uni.</span>
                          <span>Tamanho: {product.size}</span>
                          <span>
                            Gênero:{" "}
                            {product.gender === "F" ? "Feminino" : "Masculino"}
                          </span>
                          <span>Preço único: R$ {product.price}</span>
                          <span>
                            Total: R$ {product.amount * product.price}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </>
            ) : (
              <HeroSquareSkeleton />
            )}
          </div>
          <div className="aboutPayment">
            <h2>Por favor confira todos os seus dados.</h2>
          </div>

          <Button
            type="button"
            className="purchaseFinished"
            onClick={() => handlePostOrder()}
          >
            {loadingPurchase ? (
              <CircularProgress
                size={40}
                color="secondary"
                className="circular-progress"
              />
            ) : (
              "FINALIZAR COMPRA"
            )}
          </Button>
        </div>

        <div className="rightSide">
          <div className="productSummary">
            <div className="summaryTitle">
              <strong>Resumo do Pedido</strong>
            </div>

            <div className="addressInfo">
              <div className="addressConfirmation">
                {!loading ? (
                  <>
                    <strong>Endereço de entrega</strong>
                    <span>
                      {address.street}/ {address.complement}
                    </span>
                    <span>Bairro: {address.neighborhood}</span>
                    <span>
                      Cidade: {address.city} - {address.state} -{" "}
                      {address.country}
                    </span>
                    <span>CEP: {address.zip_code}</span>
                  </>
                ) : (
                  <HeroSquareSkeleton />
                )}
              </div>

              <div className="changeAddressArea">
                <span>Quer receber seus produtos em outro endereço?</span>
                <Button type="button" onClick={() => handleOpenModal()}>
                  Alterar endereço
                </Button>
              </div>
            </div>

            <div className="shippingInfo">
              <strong>Frete</strong>
              <SelectShipping
                onSelectShipping={setShipping}
                cep={address.zip_code}
                product_models={products?.map(
                  ({ product_model_id, amount }) => ({
                    product_model_id,
                    quantity: amount,
                  })
                )}
              />
            </div>

            <div className="totalArea">
              <strong>Total</strong>
              <strong>{price}</strong>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="button"
        className="purchaseFinished"
        onClick={() => handlePostOrder()}
      >
        {loadingPurchase ? (
          <CircularProgress
            size={40}
            color="secondary"
            className="circular-progress"
          />
        ) : (
          "FINALIZAR COMPRA"
        )}
      </Button>
      <SnackbarMessage
        open={openSnackbar}
        handleClose={handleClose}
        message={messageSnackbar}
        type={typeSnackbar}
      />
      <PopUpChangeAddress
        open={openModal}
        handleClose={handleCloseModal}
        setAddress={setAddress}
        address={address}
      />
    </div>
  );
}

export default Checkout;
