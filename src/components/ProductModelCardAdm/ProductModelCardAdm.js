import React, { useState } from "react";
import "./ProductModelCardAdm.css";

import { FaEdit } from "react-icons/fa";

import Switch from "react-switch";
import api from "../../services/api";

function ProductModelCardAdm({
  handleSelectToEdit,
  productModelArray,
  setProductModelArray,
  fullProduct,
}) {
  const [available, setAvailable] = useState(fullProduct.available);
  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

  const {
    fileToShow,
    imgLink,
    modelDescription,
    price,
    gender,
    product_model_id,
  } = fullProduct;

  const handleEditModel = () => {
    handleSelectToEdit(product_model_id);
    // handleClose();
  };

  const handleSwitchChange = async () => {
    try {
      await api.put(`/model/${product_model_id}`, { available: !available });
      setAvailable(!available);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="productModelCardAdmFullContent">
      <Switch onChange={handleSwitchChange} checked={available} className="iconAvailable"/>
      {fileToShow ? (
        <img src={fileToShow} alt={modelDescription} />
      ) : imgLink.includes(bucketAWS) ? (
        <img src={imgLink} alt={modelDescription} />
      ) : (
        "Sem imagem"
      )}
      <span className="modelName">{modelDescription}</span>

      <div className="priceAndGender">
        <span>{`R$ ${Number(price).toFixed(2).replace(".", ",")}`}</span>
        <span>{gender === "M" ? "Masculino" : "Feminino"}</span>
      </div>

      <div className="iconWithText" onClick={() => handleEditModel()}>
        <FaEdit className="iconProductModelCard" />
        <span>EDITAR MODELO</span>
      </div>
    </div>
  );
}

export default ProductModelCardAdm;
