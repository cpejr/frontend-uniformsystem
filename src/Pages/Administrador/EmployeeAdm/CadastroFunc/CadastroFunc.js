import React, { useEffect, useState } from "react";
import "./CadastroFunc.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
      />{" "}
      <InputWithLabel
        label="Senha:"
        width={200}
        setInfo={setPassword}
        maxLenght={50}
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
    </div>
  );
}

export default CadastroFunc;
