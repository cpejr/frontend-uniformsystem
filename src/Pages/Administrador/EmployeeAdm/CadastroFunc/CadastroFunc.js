import React, { useEffect, useState } from "react";
import "./CadastroFunc.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import api from "../../../../services/api";

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

function CadastroFunc() {
  const [nameStored, setName] = useState("");
  const [cpfStored, setCpf] = useState("");
  const [passwordStored, setPassword] = useState("");

  const [errorInputCpf, setErrorInputCpf] = useState("");
  const [errorInputPassword, setErrorInputPassword] = useState("");

  function validateInput(type) {
    if (type === "cpf") {
      if (
        !isNaN(Number(cpfStored)) &&
        cpfStored.length >= 11 ||
        cpfStored.length == 0
      ) {
        setErrorInputCpf("");
      } else {
        setErrorInputCpf("Número de cpf incorreto");
      }
    }
    if (type === "password") {
      if (
        !isNaN(Number(passwordStored)) &&
        passwordStored.length >= 6 ||
        passwordStored.length == 0
      ) {
        setErrorInputPassword("");
      } else {
        setErrorInputPassword("Senha inválida");
      }
    }
  }

  useEffect(() => {
    validateInput("cpf");
  }, [cpfStored]);

  useEffect(() => {
    validateInput("password");
  }, [passwordStored]);

  // const handleSubmit = ()=>{

  // }

  // async function handlePostOrder() {
  //   try{
  //     const address_id = address.address_id;
  //     await api.post(`/order`, {
  //       address_id: address_id,
  //       service_code: serviceCode,
  //       products: products,
  //     },
  //     {
  //       headers: { authorization: `bearer ${token}` },

  //     });
  //   }
  //   catch(error){
  //     console.warn(error);
  //     alert("Erro ao criar um pedido.");
  //   }
  // }

  return (
    <div className="fullPage">
      <ArrowBackIosIcon className="setaVoltar"></ArrowBackIosIcon>
      <h1 className="titleCad2">CADASTRAR NOVO FUNCIONÁRIO</h1>
      <hr className="titleLineExp2"></hr>
      <InputWithLabel
        label="Nome Completo:"
        width={500}
        setInfo={setName}
        maxLenght={50}
      />{" "}
      <InputWithLabel
        label="CPF:"
        width={200}
        setInfo={setCpf}
        maxLenght={11}
        error={errorInputCpf}
      />{" "}
      <InputWithLabel
        label="Senha:"
        width={200}
        setInfo={setPassword}
        maxLenght={50}
        type="password"
        error={errorInputPassword}
      />
      <label for="tipodefunc">Tipo de Funcionário:</label>
      <select className="divInputLabelError">
        <option value="vazio"> </option>
        <option value="func1">Funcionário 1</option>
        <option value="func2">Funcionário 2</option>
        <option value="func3">Funcionário 3</option>
        <option value="func4">Funcionário 4</option>
      </select>
      <button className="buttonCad2">CADASTRAR</button>
      {/* onClick={handleSubmit} */}
    </div>
  );
}

export default CadastroFunc;
