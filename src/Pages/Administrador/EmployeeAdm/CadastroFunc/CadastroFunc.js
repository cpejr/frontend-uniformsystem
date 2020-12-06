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
      <button className="buttonCad">CADASTRAR</button>
    </div>
  );
}

export default CadastroFunc;
