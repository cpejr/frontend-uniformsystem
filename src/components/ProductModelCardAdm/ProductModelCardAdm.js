import React, { useState } from "react";
import "./ProductModelCardAdm.css";

import { FaEdit } from "react-icons/fa";

import Switch from "react-switch";

function ProductModelCardAdm({
  handleOpenDialog,
  fullProduct,
  updateModelInfo,
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

  return (
    <div className="productModelCardAdmFullContent">
      <div className="iconAvailable">
        <span>Disponível</span>
        <Switch
          onChange={() => {
            updateModelInfo(product_model_id, "available", !isAvailable);
            setIsAvailable(!isAvailable);
          }}
          checked={isAvailable}
        />
      </div>
      <div
        className="iconEditImage iconWithText"
        onClick={() =>
          handleOpenDialog(
            "imgLink",
            "Imagem do modelo",
            product_model_id
          )
        }
      >
        <FaEdit className="iconProductModelCard" />
        <span>Editar Imagem</span>
      </div>
      {fileToShow ? (
        <img src={fileToShow} alt={model_description} />
      ) : imgLink.includes(bucketAWS) ? (
        <img src={imgLink} alt={model_description} />
      ) : (
        "Sem imagem"
      )}
      <div
        className="iconWithText"
        onClick={() =>
          handleOpenDialog(
            "model_description",
            "Nome do Modelo",
            product_model_id
          )
        }
      >
        <FaEdit className="iconProductModelCard" />
        <p>Nome do modelo: {model_description}</p>
      </div>

      <div
        className="iconWithText"
        onClick={() => handleOpenDialog("price", "Preço", product_model_id)}
      >
        <FaEdit className="iconProductModelCard" />
        <p>Preço: {`R$ ${Number(price).toFixed(2).replace(".", ",")}`}</p>
      </div>

      <div
        className="iconWithText"
        onClick={() =>
          handleOpenDialog("gender", "Gênero do modelo", product_model_id)
        }
      >
        <FaEdit className="iconProductModelCard" />
        <p>Gênero: {gender === "M" ? "Masculino" : "Feminino"}</p>
      </div>
    </div>
  );
}

export default ProductModelCardAdm;
