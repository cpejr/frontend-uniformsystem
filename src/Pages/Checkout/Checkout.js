import React, { useEffect, useState } from 'react';

import camisa from '../../Assets/camisa.jpg';

import api from "../../services/api";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import Button from '@material-ui/core/Button';

import './Checkout.css'

function InputWithLabel({label, width, setInfo, error, maxLenght}){
  
  return (
    <div className="divInputLabelError" >
      <label >{label}</label>
      <input 
        type="text" 
        name="input" 
        style={{width: `${width}px`}}
        maxLength={`${maxLenght}`}
        onChange={(e) => setInfo(e.target.value)} 
        // onChange={(e) => validateInput(e, type)} 
      />
      <span
        style={{color: '#ff0033', fontSize: '15px'}}
      >
        {error}
      </span>
    </div>

  );
}

function Checkout(){

  
  const [cardNumberStored, setCardNumber] = useState("");
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

  const user_id = 'bd1d08-e614-37d4-5da2-45108852f0'

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1c2VyX2lkIjoiYmQxZDA4LWU2MTQtMzdkNC01ZGEyLTQ1MTA4ODUyZjAiLCJuYW1lIjoiRGlvZ28gQWRtaW4gMCIsImZpcmViYXNlX3VpZCI6Im1FQ001UnV3c3FTZHJaTnlPd01CMmVkOFZkQTIiLCJ1c2VyX3R5cGUiOiJhZG0iLCJlbWFpbCI6ImRpb2dvYWRtMTBAZW1haWwuY29tIiwiY3BmIjoiMTIzNDU2Nzg5MTAiLCJjcmVhdGVkX2F0IjoiMjAyMC0xMS0yNCAwMzowOTozMCIsInVwZGF0ZWRfYXQiOiIyMDIwLTExLTI0IDAzOjA5OjMwIn1dLCJpYXQiOjE2MDYzNjMxMzcsImV4cCI6MTYwODk1NTEzN30.eZhANDozTHrqWDkRPnL75ky7JloUH7_pgW8ZNI1mm7M';

  const serviceCode = '04014'

  const comprasCarrinho = [
    {
      nomeProduto: 'Produto 1',
      quantidadeProduto: 500,
      corProduct: 'Branco',
      precoProduto: '10,00'
    },
    {
      nomeProduto: 'Produto 2',
      quantidadeProduto: 10,
      corProduct: 'Preto',
      precoProduto: '20,00'
    },
    {
      nomeProduto: 'Produto 3',
      quantidadeProduto: 40,
      corProduct: 'Verde',
      precoProduto: '50,00'
    }
  ]

  useEffect(() => {

    function validateBirthInput(type){
      
      if(type === 'day'){
        if( (parseInt(dayStored, 10) <= 31) && (parseInt(dayStored, 10) > 0) && (!isNaN(Number(dayStored)))){
          setErrorBirthInput('')
        }else{
          setErrorBirthInput('Data inválida')
        }
        
      }
      else if(type === 'month'){
          if( (Number(monthStored) <= 12) && (Number(monthStored) > 0) && (!isNaN(Number(monthStored)))){
            setErrorBirthInput('')
          }else{
            setErrorBirthInput('Data inválida')
          }
          
        }else{
          var today = new Date()
          console.log('aqui')
          if( (parseInt(yearStored, 10) <= today.getFullYear()) && (parseInt(yearStored, 10) > 0) && (!isNaN(Number(yearStored)))){
            setErrorBirthInput('')
          }else{
            setErrorBirthInput('Data inválida')
          }
        }
        
      }
      
      validateBirthInput('day')
      validateBirthInput('month')
      validateBirthInput('year')
      
  }, [dayStored, monthStored, yearStored]);

useEffect(() => {

  const maximumInstallment = 10

  function validateInstallmentOptions(){
    if( (parseInt(installmentOptions,10) >= 0) && (parseInt(installmentOptions,10) <= maximumInstallment) && (!isNaN(parseInt(installmentOptions,10)))){
      setErrorInstallmentOptions('')
    }
    else{
      setErrorInstallmentOptions('Parcelamento inválido')
    }
  }

  validateInstallmentOptions()

}, [installmentOptions]);


  useEffect(() => {
    validateInput('cardNumber')
  }, [cardNumberStored]);
  
  useEffect(() => {
    validateInput('securityNumber')
  }, [securityNumberStored]);
  
  useEffect(() => {
    validateInput('cardName')
  }, [cardNameStored]);

  // Post order
  async function handlePostOrder() {
    try{
      const address_id = address.address_id;
      await api.post(`/order`, {
        address_id: address_id,
        service_code: serviceCode,
        products: products,
      },
      {
        headers: { authorization: `bearer ${token}` },

      });
    }
    catch(error){
      console.warn(error);
      alert("Erro ao criar um pedido.");
    }
  }
  
  // Lista dos produtos para finalizar pedido 
  async function getProducts() {
    const response = await api.get("/cart", {
      headers: { authorization: `bearer ${token}` },
    });
    setProducts([...response.data]);
  }
  
  useEffect(() => {
    try {
      getProducts();
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
    // console.log(response.data.adresses[0])
    setAddress({...response.data.adresses[0]});
  }
  
  useEffect(() => {
    try {
      getAddress();
    } catch (error) {
      console.warn(error);
      alert("Erro ao buscar o endereço.");
    }
  }, []);


  function validateInput(type){

    if(type === 'cardNumber'){
      
      if(!isNaN(Number(cardNumberStored)) ){
        setErrorInputCardNumber('')
      }
      else{
        setErrorInputCardNumber('Número de cartão incorreto')
      }
    }else if(type ==='securityNumber'){

      if(!isNaN(Number(securityNumberStored) )){
        setErrorInputSecurityNumber('')
      }else{
        setErrorInputSecurityNumber('Código incorreto')
      }

    }else{

      if(!isNaN(Number(cardNameStored) )){
        setErrorInputCardName('Nome inválido')
      }
      else{
        setErrorInputCardName('')
      }
    }

  }

  return (
    <div className="fullContent">

      <h1>Lista de Produtos</h1>
      <div className="mainContent">
        <div className="leftSide">

          <div className="aboutListProducts">
            { !comprasCarrinho ? 
                  <div className="aboutProduct">
                    <img src={camisa} alt="Camisa"/>
                    <div className="infoProduct">
                      <span>
                        Nome do produto: Produto
                      </span>
                      <span>
                        Quantidade total: 10 uni.
                      </span>
                      <span>
                        Cor: Branco
                      </span>
                      <span>
                        Preço: R$ 500,00
                      </span>
                    </div>
                  </div>
              :
              comprasCarrinho.map( (product, index) => {
                return (
                  <div className="aboutProduct" key={index}>
                    <img src={camisa} alt="Camisa"/>
                    <div className="infoProduct">
                      <span>
                        Nome do produto: {product.nomeProduto}
                      </span>
                      <span>
                        Quantidade total: {product.quantidadeProduto} uni.
                      </span>
                      <span>
                        Cor: {product.corProduto}
                      </span>
                      <span>
                        Preço: R$ {product.precoProduto}
                      </span>
                    </div>
                  </div>
                );
              })
            }
          </div>
            <div className="aboutPayment">
              <h2>Pagamento</h2>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  Cartão de Crédito
                </AccordionSummary>
                <AccordionDetails>

                  <div className="creditCardInfo">
                    <div className="inputsTogether">
                      <InputWithLabel label="Número do Cartão" width={280} 
                        setInfo={setCardNumber} 
                        maxLenght={16}
                        error={cardNumberStored? errorInputCardNumber: ''}
                      />
                      <InputWithLabel label="Código de segurança" 
                        width={70}
                        setInfo={setSecurityNumber}
                        maxLenght={3}
                        error={securityNumberStored? errorInputSecurityNumber: ''}
                      />
                    </div>
                    <div className="inputsTogether">
                      <InputWithLabel label="Nome gravado no cartão" 
                        width={280}
                        setInfo={setCardName}
                        maxLenght={50}
                        error={cardNameStored? errorInputCardName: ''}
                      />
                      <div className="divInputLabelError" >
                        <label htmlFor="input" >Data de Nascimento</label>
                        <div className="inputsBirthday" >
                          <input type="text" name="dayBirth" onChange={(e) => setDayStored(e.target.value)} />
                          <input type="text" name="monthBirth" onChange={(e) => setMonthStored(e.target.value)} />
                          <input type="text" name="yearBirth" onChange={(e) => setYearStored(e.target.value)} />
                        </div>
                        <span style={{color: '#ff0033', fontSize: '15px'}}>
                          {errorBirthInput}
                        </span>
                      </div>
                    </div>

                    <div className="inputsTogether">

                      <div className="divInputLabelError" >
                        <label >Opções de Parcelamento</label>
                        <div className="inputsInstallment" >
                          <input type="text" name="input" 
                            style={{width: '150px'}}
                            onChange={(e) => setInstallmentOptions(e.target.value)} />
                        </div>
                        <span style={{color: '#ff0033', fontSize: '15px'}}>
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
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
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
                <span>
                  Bairro: {address.neighborhood}
                </span>
                <span>
                  Cidade: {address.city} - {address.state} - {address.country}
                </span>
                <span>
                  CEP: {address.zip_code}
                </span>
              </div>

              <div className="changeAddressArea">
                <span>Quer receber seus produtos em outro endereço?</span>
                <Button type="button">Alterar endereço</Button>
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

      <Button type="button" 
        className="purchaseFinished"
        onClick={() => handlePostOrder()}
      >
        Finalizar Compra
      </Button>
    </div>
  );
}

export default Checkout;
