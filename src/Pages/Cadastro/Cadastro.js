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
    <div className="inputsTogether">
      <InputWithLabel
        label="Número do Cartão"
        width={280}
        setInfo={setCardNumber}
        maxLenght={16}
        error={cardNumberStored ? errorInputCardNumber : ""}
      />
      <InputWithLabel
        label="Código de segurança"
        width={70}
        setInfo={setSecurityNumber}
        maxLenght={3}
        error={securityNumberStored ? errorInputSecurityNumber : ""}
      />
    </div>
  );
}

export default Cadastro;
