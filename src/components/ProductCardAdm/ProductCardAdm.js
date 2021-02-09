import React from 'react';
import './ProductCardAdm.css';
import { Link } from 'react-router-dom';
import camisa from '../../Assets/camisa.jpg';
import { MdCreate } from 'react-icons/md';

function ProductCardAdm({product}) {

    return (
        <Link to={`/adm/produtos/${product.product_id}`}>
            <div className="product-adm">
                <div className="edit-button">
                    <MdCreate color="black" size="24px" />
                </div>
                <div className="product-content">
                    <div className="product-img">
                        <img className="img-product" alt="Product" src={camisa} />
                    </div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-adm-price">{(product.model.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCardAdm