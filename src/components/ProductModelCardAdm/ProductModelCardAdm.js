import React from 'react';
import './ProductModelCardAdm.css';
import { Link } from 'react-router-dom';

import { FaEdit, FaStar, FaTrashAlt } from 'react-icons/fa';

function ProductModelCardAdm({productModelID, handleClose, handleSelectToEdit,
    imgSrc, imgAlt, productModelName}) {


    const handleIsMain = () => {
        
    }

    const handleEditModel = () => {
    }

    const handleDeleteModel = () => {
    }

    return (
        <div className="productModelCardAdmFullContent">
            <FaTrashAlt className="iconGarbage" onClick={() => handleDeleteModel(productModelID)}/>
            <img src={imgSrc} alt={imgAlt} />
            <span className="modelName">{productModelName}</span>

            <div className="iconWithText">
                <FaEdit className="iconProductModelCard" onClick={handleEditModel} />
                <span onClick={handleClose}>EDITAR MODELO</span>
            </div>
            <div className="iconWithText">
                <FaStar className="iconProductModelCard" onClick={handleIsMain} />
                <span onClick={() => handleSelectToEdit(productModelID)} >ADICIONAR COMO MODELO PRINCIPAL</span>
            </div>
        </div>
    );
}

export default ProductModelCardAdm;