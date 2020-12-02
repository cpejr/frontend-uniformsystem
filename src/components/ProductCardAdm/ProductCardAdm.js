import React from 'react';
import './ProductCardAdm.css';
import { Link } from 'react-router-dom';
import camisa from '../../Assets/camisa.jpg';
import { MdCreate } from 'react-icons/md';
import { size } from 'lodash';

function ProductCardAdm(props) {

    return (
        <Link className="product-adm" to={`/adm/product/${props.product.product_id}`}>
            <div className="edit-button">
                <MdCreate color="black" size="24px" />
            </div>
            <div className="product-content">
                <div className="product-img">
                    <img className="img-product" src={camisa} />
                </div>
                <div className="product-name">{props.product.product_id}</div>
                <div className="product-adm-price">{(props.product.models.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </div>
        </Link>
    )
}

export default ProductCardAdm