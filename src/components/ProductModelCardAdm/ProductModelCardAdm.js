import React, { useState } from "react";
import "./ProductModelCardAdm.css";

import { FaEdit } from "react-icons/fa";

import Switch from "react-switch";
import api from "../../services/api";

function ProductModelCardAdm({
  handleSelectToEdit,
  fullProduct,
  whichMethodIs
}) {
  const [isAvailable, setIsAvailable] = useState(fullProduct.available);
  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

  const {
    fileToShow,
    imgLink,
    model_description,
    price,
    gender,
    product_model_id,
  } = fullProduct;

  const handleEditModel = () => {
    handleSelectToEdit(product_model_id);
    // handleClose();
  };

  const handleSwitchChange = async (type) => {

      try {
        await api.put(`/model/${product_model_id}`, { available: !isAvailable });
        setIsAvailable(!isAvailable);
        fullProduct.available = !isAvailable;
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="productModelCardAdmFullContent">
      <div className="iconAvailable">
        <span>Disponível</span>
        <Switch onChange={() => handleSwitchChange()} checked={isAvailable}/>
      </div>
      {fileToShow ? (
        <img src={fileToShow} alt={model_description} />
      ) : imgLink.includes(bucketAWS) ? (
        <img src={imgLink} alt={model_description} />
      ) : (
        "Sem imagem"
      )}
      <div className="iconWithText" onClick={() => handleEditModel()}>
        <FaEdit className="iconProductModelCard" />
        <p>Nome do modelo: {model_description}</p>
      </div>

      <div className="iconWithText" onClick={() => handleEditModel()}>
        <FaEdit className="iconProductModelCard" />
        <p>Preço: {`R$ ${Number(price).toFixed(2).replace(".", ",")}`}</p>
      </div>

      <div className="iconWithText" onClick={() => handleEditModel()}>
        <FaEdit className="iconProductModelCard" />
        <p>Gênero: {gender === "M" ? "Masculino" : "Feminino"}</p>
      </div>

    </div>
  );
}

export default ProductModelCardAdm;
