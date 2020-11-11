import React from 'react';
import './ProductCard.css';

function ProductCard (props){
    return(
        <div className = "product">
            <div className = "productImage">
                <img className = "imageProduct" src = "blusa1.png"></img>
            </div>
            <div className = "productDescription">{props.product.model_description}</div>
            <div className = "productPrice">R${props.product.price}</div>
        </div>
    )
}
export default ProductCard