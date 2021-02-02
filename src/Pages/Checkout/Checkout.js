import React, { useEffect, useState, useContext } from 'react';
import MetaData from '../../meta/reactHelmet';
import api from '../../services/api';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PopUpChangeAddress from '../../components/PopUpChangeAddress';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import Button from '@material-ui/core/Button';

import { LoginContext } from '../../contexts/LoginContext'; 

import './Checkout.css';

import { useHistory } from 'react-router-dom';

import CircularProgress from "@material-ui/core/CircularProgress";

function InputWithLabel({ label, width, setInfo, error, maxLenght }) {
  return (
    <div className="divInputLabelError">
      <label>{label}</label>
      <input
        type="text"
        name="input"
        style={{ width: `${width}px` }}
        maxLength={`${maxLenght}`}
        onChange={e => setInfo(e.target.value)}
        // onChange={(e) => validateInput(e, type)}
      />
      <span style={{ color: '#ff0033', fontSize: '15px' }}>{error}</span>
    </div>
  );
}

function Checkout() {
  const history = useHistory();

  const [cardNumberStored, setCardNumber] = useState('');
  const [securityNumberStored, setSecurityNumber] = useState('');
  const [cardNameStored, setCardName] = useState('');

  const [errorInputCardNumber, setErrorInputCardNumber] = useState('');
  const [errorInputSecurityNumber, setErrorInputSecurityNumber] = useState('');
  const [errorInputCardName, setErrorInputCardName] = useState('');

  const [errorBirthInput, setErrorBirthInput] = useState('');
  const [errorInstallmentOptions, setErrorInstallmentOptions] = useState('');

  const [dayStored, setDayStored] = useState('');
  const [monthStored, setMonthStored] = useState('');
  const [yearStored, setYearStored] = useState('');

  const [installmentOptions, setInstallmentOptions] = useState(' ');

  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({});

  const [openModal, setOpenModal] = useState(false);

  const [loadingPurchase, setLoadingPurchase] = useState(false);

  const { token, user } = useContext(LoginContext);


  const currentUser = user[0];
  const user_id = currentUser.user_id;

  const serviceCode = '04014';

  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

  const meta = {
    titlePage: "Uniformes E-commerce | Checkout",
    titleSearch: "Checkout",
    description: "Checkout de pagamento",
    keyWords: "Checkout",
    imageUrl: "",
    imageAlt: "",
  }

  useEffect(
    () => {
      function validateBirthInput(type) {
        if (type === 'day') {
          if (
            parseInt(dayStored, 10) <= 31 &&
            parseInt(dayStored, 10) > 0 &&
            !isNaN(Number(dayStored))
          ) {
            setErrorBirthInput('');
          } else {
            setErrorBirthInput('Data inválida');
          }
        } else if (type === 'month') {
          if (
            Number(monthStored) <= 12 &&
            Number(monthStored) > 0 &&
            !isNaN(Number(monthStored))
          ) {
            setErrorBirthInput('');
          } else {
            setErrorBirthInput('Data inválida');
          }
        } else {
          var today = new Date();
          if (
            parseInt(yearStored, 10) <= today.getFullYear() &&
            parseInt(yearStored, 10) > 0 &&
            !isNaN(Number(yearStored))
          ) {
            setErrorBirthInput('');
          } else {
            setErrorBirthInput('Data inválida');
          }
        }
      }

      validateBirthInput('day');
      validateBirthInput('month');
      validateBirthInput('year');
    },
    [dayStored, monthStored, yearStored],
  );

  useEffect(
    () => {
      const maximumInstallment = 10;

      function validateInstallmentOptions() {
        if (
          parseInt(installmentOptions, 10) >= 0 &&
          parseInt(installmentOptions, 10) <= maximumInstallment &&
          !isNaN(parseInt(installmentOptions, 10))
        ) {
          setErrorInstallmentOptions('');
        } else {
          setErrorInstallmentOptions('Parcelamento inválido');
        }
      }

      validateInstallmentOptions();
    },
    [installmentOptions],
  );

  useEffect(
    () => {
      validateInput('cardNumber');
    },
    [cardNumberStored],
  );

  useEffect(
    () => {
      validateInput('securityNumber');
    },
    [securityNumberStored],
  );

  useEffect(
    () => {
      validateInput('cardName');
    },
    [cardNameStored],
  );

  // Post order
  async function handlePostOrder() {
    setLoadingPurchase(true);
    
    try {
      const address_id = address.address_id;
      await api.post(
        `/order`,
        {
          address_id: address_id,
          service_code: serviceCode,
          products: products,
        },
        {
          headers: { authorization: `bearer ${token}` },
        },
      );

      setTimeout(() => {
        setLoadingPurchase(false);
      }, 3000);
    } catch (error) {
      console.warn(error);
      alert('Erro ao criar um pedido.');
      history.push('Error');
    }
  }

  // Lista dos produtos para finalizar pedido
  async function getProducts() {
    try {
      const response = await api.get('/cart', {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      // if(response.data.length>0){
      setProducts([...response.data]);
      // }
      // else{
      //   history.push('/')
      // }
    } catch (error) {
      console.warn(error);
      history.push('Error');
    }
  }

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.warn(error);
      alert('Erro ao buscar os produtos.');
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
      alert('Erro ao buscar o endereço.');
      history.push('Error');
    }
  }, []);

  // Chamado quando address atualiza (depois do popUp fechar)
  useEffect(() => {}, [address]);

  function validateInput(type) {
    if (type === 'cardNumber') {
      if (!isNaN(Number(cardNumberStored))) {
        setErrorInputCardNumber('');
      } else {
        setErrorInputCardNumber('Número de cartão incorreto');
      }
    } else if (type === 'securityNumber') {
      if (!isNaN(Number(securityNumberStored))) {
        setErrorInputSecurityNumber('');
      } else {
        setErrorInputSecurityNumber('Código incorreto');
      }
    } else {
      if (!isNaN(Number(cardNameStored))) {
        setErrorInputCardName('Nome inválido');
      } else {
        setErrorInputCardName('');
      }
    }
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  return (
    <div className="fullContent">
      <MetaData titlePage={meta.titlePage} titleSearch={meta.titleSearch} description={meta.description} keyWords={meta.keyWords} imageUrl={meta.imageUrl} imageAlt={meta.imageAlt} />
      <h1>Lista de Produtos</h1>
      <div className="mainContent">
        <div className="leftSide">
          <div className="aboutListProducts">
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
                      <span>Gênero: {product.gender === 'F'? 'Feminino' : 'Masculino'}</span>
                      <span>Preço único: R$ {product.price}</span>
                      <span>Total: R$ {product.amount * product.price}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="aboutPayment">
            <h2>Pagamento</h2>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Cartão de Crédito
              </AccordionSummary>
              <AccordionDetails>
                <div className="creditCardInfo">
                  <div className="inputsTogether">
                    <InputWithLabel
                      label="Número do Cartão"
                      width={280}
                      setInfo={setCardNumber}
                      maxLenght={16}
                      error={cardNumberStored ? errorInputCardNumber : ''}
                    />
                    <InputWithLabel
                      label="Código de segurança"
                      width={70}
                      setInfo={setSecurityNumber}
                      maxLenght={3}
                      error={
                        securityNumberStored ? errorInputSecurityNumber : ''
                      }
                    />
                  </div>
                  <div className="inputsTogether">
                    <InputWithLabel
                      label="Nome gravado no cartão"
                      width={280}
                      setInfo={setCardName}
                      maxLenght={50}
                      error={cardNameStored ? errorInputCardName : ''}
                    />
                    <div className="divInputLabelError">
                      <label htmlFor="input">Data de Nascimento</label>
                      <div className="inputsBirthday">
                        <input
                          type="text"
                          name="dayBirth"
                          onChange={e => setDayStored(e.target.value)}
                        />
                        <input
                          type="text"
                          name="monthBirth"
                          onChange={e => setMonthStored(e.target.value)}
                        />
                        <input
                          type="text"
                          name="yearBirth"
                          onChange={e => setYearStored(e.target.value)}
                        />
                      </div>
                      <span style={{ color: '#ff0033', fontSize: '15px' }}>
                        {errorBirthInput}
                      </span>
                    </div>
                  </div>

                  <div className="inputsTogether">
                    <div className="divInputLabelError">
                      <label>Opções de Parcelamento</label>
                      <div className="inputsInstallment">
                        <input
                          type="text"
                          name="input"
                          style={{ width: '150px' }}
                          onChange={e => setInstallmentOptions(e.target.value)}
                        />
                      </div>
                      <span style={{ color: '#ff0033', fontSize: '15px' }}>
                        {errorInstallmentOptions}
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="contained" color="#8ED7CD">
                  Adicionar
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Boleto
              </AccordionSummary>
              <AccordionDetails>
                Boleto aqui BLABLABLA
                <Button variant="contained" color="#8ED7CD">
                  Gerar Boleto
                </Button>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div className="rightSide">
          <div className="productSummary">
            <div className="summaryTitle">
              <strong>Resumo do Pedido</strong>
            </div>

            <div className="addressInfo">
              <div className="addressConfirmation">
                <strong>Endereço de entrega</strong>
                <span>
                  {address.street}/ {address.complement}
                </span>
                <span>Bairro: {address.neighborhood}</span>
                <span>
                  Cidade: {address.city} - {address.state} - {address.country}
                </span>
                <span>CEP: {address.zip_code}</span>
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
              <div className="valueShipping">
                <div className="leftValueShipping">
                  <LocalShippingIcon />
                  <span>Valor</span>
                </div>
                <div className="rightValueShipping">
                  <span>R$25,00</span>
                </div>
              </div>
            </div>

            <div className="totalArea">
              <strong>Total</strong>
              <strong>R$525,00</strong>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="button"
        className="purchaseFinished"
        onClick={() => handlePostOrder()}
      >
        {loadingPurchase ? <CircularProgress size={40} color='secondary' className="circular-progress" /> : "FINALIZAR COMPRA"}
      </Button>
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
