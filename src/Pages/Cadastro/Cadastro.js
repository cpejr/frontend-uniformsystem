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
        <div>
          <button className="buttonCad">CRIAR CONTA</button>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
