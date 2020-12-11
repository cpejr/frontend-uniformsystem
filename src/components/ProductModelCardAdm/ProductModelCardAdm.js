import React from 'react';
import './ProductModelCardAdm.css';

import { FaEdit, FaStar, FaTrashAlt } from 'react-icons/fa';

function ProductModelCardAdm({productModelID, handleSelectToEdit,
    productModelArray, setProductModelArray, fullProduct}) {

    const {fileToShow, imgAlt, modelDescription, price, gender} = fullProduct;

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
        // handleClose();
    }

    const handleDeleteModel = (productModelID) => {
        const copyProductModelArray = [...productModelArray];
        copyProductModelArray.splice(productModelID, 1);
        setProductModelArray(copyProductModelArray);
    }

    return (
        <div className="productModelCardAdmFullContent">
            <FaTrashAlt className="iconGarbage" onClick={() => handleDeleteModel(productModelID)}/>
            <img src={fileToShow} alt={imgAlt} />
            <span className="modelName">{modelDescription}</span>

            <div className="priceAndGender">
                <span>{`R$ ${price}`}</span>
                <span>{gender === 'M'? 'Masculino': 'Feminino'}</span>
            </div>

            <div className="iconWithText" onClick={() => handleEditModel()}>
                <FaEdit className="iconProductModelCard" />
                <span>EDITAR MODELO</span>
            </div>
            <div className={productModelArray[productModelID].isMain ? 
                    "iconWithText selected"
                    : "iconWithText"}
                    onClick={() => handleIsMain()}
            >
                <FaStar className="iconProductModelCard" />
                <span >ADICIONAR COMO MODELO PRINCIPAL</span>
            </div>
        </div>
    );
}

export default ProductModelCardAdm;