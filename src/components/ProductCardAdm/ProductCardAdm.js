import React from 'react';
import './ProductCardAdm.css';
import { Link } from 'react-router-dom';
import camisa from '../../Assets/camisa.jpg';
import { MdCreate } from 'react-icons/md';
import { size } from 'lodash';

function ProductCardAdm(props) {

    return (
        <Link to={`/adm/produtos/${props.product.product_id}`}>
            <div className="product-adm">
                <div className="edit-button">
                    <MdCreate color="black" size="24px" />
                </div>
                <div className="product-content">
                    <div className="product-img">
                        <img className="img-product" src={camisa} />
                    </div>
                    <div className="product-name">{props.product.name}</div>
                    <div className="product-adm-price">{(props.product.models.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCardAdm