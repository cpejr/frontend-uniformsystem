import React, { useEffect, useState } from 'react';

import camisa from '../../Assets/camisa.jpg';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

  const [errorBirthInput, setErrorBirthInput] = useState('');
  const [dayStored, setDayStored] = useState('');
  const [monthStored, setMonthStored] = useState('');
  const [yearStored, setYearStored] = useState('');

  function validateBirthInput(type){

    var data = new Date(Number(yearStored),  Number(monthStored)-1, Number(dayStored), 0, 0, 0)

    console.log(data)
    console.log(isNaN(Date.parse(data)))

    if(type === 'day'){
      console.log('aqui')
      if( (Number(dayStored) <= 31) || (Number(dayStored) > 0) || (!isNaN(Number(dayStored)))){
        setErrorBirthInput('')
      }else{
        setErrorBirthInput('Data inválida')
      }
      
    }
    else if(type === 'month'){
        if( (Number(monthStored) <= 12) || (Number(monthStored) > 0) || (!isNaN(Number(monthStored)))){
          setErrorBirthInput('')
        }else{
          setErrorBirthInput('Data inválida')
        }
        
      }else{
          var today = new Date()
          if( (Number(yearStored) <= today.getFullYear()) || (Number(yearStored) > 0) || (!isNaN(Number(yearStored)))){
            setErrorBirthInput('')
          }else{
            setErrorBirthInput('Data inválida')
          }
    }

  }

  function validateInstallmentOptions(value){
    console.log('aqui')
  }

  const [cardNumberStored, setCardNumber] = useState("");
  const [securityNumberStored, setSecurityNumber] = useState('');
  const [cardNameStored, setCardName] = useState('');

  const [errorInputCardNumber, setErrorInputCardNumber] = useState('');
  const [errorInputSecurityNumber, setErrorInputSecurityNumber] = useState('');
  const [errorInputCardName, setErrorInputCardName] = useState('');


  useEffect(() => {
    validateInput('cardNumber')
  }, [cardNumberStored]);

  useEffect(() => {
    validateInput('securityNumber')
  }, [securityNumberStored]);

  useEffect(() => {
    validateInput('cardName')
  }, [cardNameStored]);

  useEffect(() => {
    validateBirthInput('day')
    // validateBirthInput('month')
    // validateBirthInput('year')
  }, [dayStored, monthStored, yearStored]);


  function validateInput(type){

    if(type === 'cardNumber'){
      
      if(!isNaN(Number(cardNumberStored)) ){
        setErrorInputCardNumber('')
      }
      else{
        setErrorInputCardNumber('Número de cartão incorreto.')
      }
    }else if(type ==='securityNumber'){

      if(!isNaN(Number(securityNumberStored) )){
        setErrorInputSecurityNumber('')
      }else{
        setErrorInputSecurityNumber('Código de segurança incorreto.')
      }

    }else{

      if(!isNaN(Number(cardNameStored) )){
        setErrorInputCardName('Nome inválido.')
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

          <div className="aboutProduct">
            <img src={camisa} alt=""/>
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
                            onChange={(value) => validateInstallmentOptions(value)} />
                        </div>
                        <span style={{color: '#ff0033', fontSize: '15px'}}>
                          {errorBirthInput}
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
                  Rua Fulano de Tal, 900
                </span>
                <span>
                  Bairro: Esse aqui
                </span>
                <span>
                  Cidade: Belo Horizonte - MG
                </span>
                <span>
                  CEP: 00000-000
                </span>
              </div>

              <div className="changeAddressArea">
                <span>Quer receber seus produtos em outro endereço?</span>
                <button type="button">Alterar endereço</button>
              </div>
            </div>

            <div className="shippingInfo">
              <strong>Frete</strong>
              <div className="valueShipping">
                <div className="leftValueShipping">
                  <img src="" alt=""/>
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

      <button type="button" className="purchaseFinished">
        Finalizar Compra
      </button>
    </div>
  );
}

export default Checkout;
