import React, { useEffect, useState } from "react";
import "./Cadastro.css";

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
      />
      <span style={{ color: "#ff0033", fontSize: "15px" }}>{error}</span>
    </div>
    
  );
}

function Cadastro() {
  const [errorBirthInput, setErrorBirthInput] = useState("");
  const [errorInstallmentOptions, setErrorInstallmentOptions] = useState("");

  const [dayStored, setDayStored] = useState("");
  const [monthStored, setMonthStored] = useState("");
  const [yearStored, setYearStored] = useState("");

  const [installmentOptions, setInstallmentOptions] = useState(" ");

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
        console.log("aqui");
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

  const [cardNumberStored, setCardNumber] = useState("");
  const [securityNumberStored, setSecurityNumber] = useState("");
  const [cardNameStored, setCardName] = useState("");
  const [nameStored, setName] = useState("");
  const [cpfStored, setCpf] = useState("");
  const [emailStored, setEmail] = useState("");
  const [passwordStored, setPassword] = useState("");
  const [streetStored, setStreet] = useState("");
  const [bairroStored, setBairro] = useState("");
  const [cityStored, setCity] = useState("");
  const [estadoStored, setEstado] = useState("");
  const [cepStored, setCep] = useState("");
  const [complementoStored, setComplemento] = useState("");

  const [errorInputCardNumber, setErrorInputCardNumber] = useState("");
  const [errorInputSecurityNumber, setErrorInputSecurityNumber] = useState("");
  const [errorInputCardName, setErrorInputCardName] = useState("");

  useEffect(() => {
    validateInput("cardNumber");
  }, [cardNumberStored]);

  useEffect(() => {
    validateInput("securityNumber");
  }, [securityNumberStored]);

  useEffect(() => {
    validateInput("cardName");
  }, [cardNameStored]);

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
  return (
    <div className="fullPage">
      <h1 className="titleCad">CADASTRO</h1>
      <div className="inputsTogetherCad">
        <div className="inputsPrimeira">
          <InputWithLabel
            label="Nome"
            width={500}
            setInfo={setName}
            maxLenght={50}
          />{" "}
          <InputWithLabel
            label="CPF"
            width={105}
            setInfo={setCpf}
            maxLenght={11}
          />{" "}
          <InputWithLabel
            label="Email"
            width={500}
            setInfo={setEmail}
            maxLenght={150}
          />
          <InputWithLabel
            label="Senha"
            width={200}
            setInfo={setPassword}
            maxLenght={50}
          />
        </div>
        <div className="inputsEndereço">
          <InputWithLabel
            label="Rua"
            width={500}
            setInfo={setStreet}
            maxLenght={100}
          />

          <InputWithLabel
            label="Bairro"
            width={300}
            setInfo={setBairro}
            maxLenght={100}
          />

          <InputWithLabel
            label="Cidade"
            width={300}
            setInfo={setCity}
            maxLenght={100}
          />

          <InputWithLabel
            label="Estado"
            width={80}
            setInfo={setEstado}
            maxLenght={2}
          />

          <InputWithLabel
            label="CEP"
            width={150}
            setInfo={setCep}
            maxLenght={20}
          />

          <InputWithLabel
            label="Complemento (opcional)"
            width={100}
            setInfo={setComplemento}
            maxLenght={10}
          />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
