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
    modelDescription,
    price,
    gender,
    product_model_id,
  } = fullProduct;



  const handleEditModel = () => {
    handleSelectToEdit(product_model_id);
    // handleClose();
  };

  const handleSwitchChange = async (type) => {
    
    if(type === 'edit'){
      try {
        await api.put(`/model/${product_model_id}`, { available: !isAvailable });
        setIsAvailable(!isAvailable);
        fullProduct.available = !isAvailable;
      } catch (error) {
        console.error(error);
      }
    }else{
      setIsAvailable(!isAvailable);
      fullProduct.available = !isAvailable;
    }
  };

  return (
    <div className="productModelCardAdmFullContent">
      <Switch onChange={() => handleSwitchChange(whichMethodIs)} checked={isAvailable} className="iconAvailable"/>
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
