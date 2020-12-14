import React from 'react';
import './ProductCard.css';
import {Link} from 'react-router-dom';

function ProductCard (props){
    return(
        <Link className = "product" to={`/product/${props.product.product_model_id}`}>
            <div className = "productImage">
                <img className = "imageProduct" src = "images/blusa1.png"></img>
            </div>
            <div className = "productName">{props.product.name}</div>
            <div className = "productDescription">{props.product.model_description}</div>
            <div className = "productPrice">{(props.product.price).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
            <div className="Button">
                <Link to={`/product/${props.product.product_model_id}`} className="buyButton">COMPRAR</Link>
            </div>
        </Link>
    )
}
export default ProductCard