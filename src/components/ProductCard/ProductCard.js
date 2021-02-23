import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const bucketAWS = process.env.REACT_APP_BUCKET_AWS;
function ProductCard({ product }) {
  if (product)
    return (
      <Link className="product" to={`/product/${product.product_id}`}>
        {console.log("AQUI", product.product_id)}
        <div className="productImage">
          <img
            className="imageProduct"
            alt="Imagem do produto"
            src={`${bucketAWS}${product.model.img_link}`}
          ></img>
        </div>
        <div className="productName">{product.name}</div>
        <div className="productDescription">{product.description}</div>
        <div className="productPrice">
          {product.model.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
        <div className="Button">
          <Link to={`/product/${product.product_id}`} className="buyButton">
            COMPRAR
          </Link>
        </div>
      </Link>
    );
}
export default ProductCard;
