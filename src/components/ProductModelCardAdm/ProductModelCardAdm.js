import React from 'react';
import './ProductModelCardAdm.css';

import { FaEdit, FaStar, FaTrashAlt } from 'react-icons/fa';

function ProductModelCardAdm({productModelID, handleClose, handleSelectToEdit,
    productModelArray, setProductModelArray, imgSrc, imgAlt, productModelName, price, gender}) {


    const handleIsMain = () => {

        const objWithNewIsMain = {
            ...productModelArray[productModelID],
            isMain: !productModelArray[productModelID].isMain
        }

        const copyProductModelArray = [...productModelArray]
        copyProductModelArray.splice(productModelID, 1, objWithNewIsMain);

        setProductModelArray(copyProductModelArray)
    }

    const handleEditModel = () => {
        handleSelectToEdit(productModelID);
        handleClose();
    }

    const handleDeleteModel = (productModelID) => {
        const copyProductModelArray = [...productModelArray];
        copyProductModelArray.splice(productModelID, 1);
        setProductModelArray(copyProductModelArray);
    }

    return (
        <div className="productModelCardAdmFullContent">
            <FaTrashAlt className="iconGarbage" onClick={() => handleDeleteModel(productModelID)}/>
            <img src={imgSrc} alt={imgAlt} />
            <span className="modelName">{productModelName}</span>

            <div className="priceAndGender">
                <span>{`R$ ${price}`}</span>
                <span>{gender === 'M'? 'Masculino': 'Feminino'}</span>
            </div>

            <div className="iconWithText">
                <FaEdit className="iconProductModelCard" onClick={handleEditModel} />
                <span onClick={handleEditModel}>EDITAR MODELO</span>
            </div>
            <div className={productModelArray[productModelID].isMain ? 
                    "iconWithText selected"
                    : "iconWithText"}
            >
                <FaStar className="iconProductModelCard" onClick={handleIsMain} />
                <span onClick={handleIsMain} >ADICIONAR COMO MODELO PRINCIPAL</span>
            </div>
        </div>
    );
}

export default ProductModelCardAdm;