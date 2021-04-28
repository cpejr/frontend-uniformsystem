import React from "react";
import "../Carrinho.css";
import { FaTrashAlt } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IconContext } from "react-icons";

function CartProduct({ handleDelete, index, changeAmount, product }) {

  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

  const handleChangeAmount = (numberToSumOrSub, value, productIndex) => {
    if(numberToSumOrSub === -1){
      if(value > 0){
        changeAmount(numberToSumOrSub, productIndex)
      }
    }else{
      changeAmount(numberToSumOrSub, productIndex)
    }
  }

  return (
    <tr>
      <td className="productInfo">
        <div className="productNameCartProduct">
          <img src={bucketAWS + product.img_link} className="productImg" alt={product.name} />
          {product.name}
        </div>
      </td>

      <td className="productInfo">
        R${Number(product.price).toFixed(2).replace(".", ",")}
      </td>

      <td className="productInfo">
        <div className="amountContainer">
          <IconContext.Provider
            value={{ size: "4vh", className: "pointerCursor" }}
          >
            <FiMinus onClick={() => handleChangeAmount(-1, product.amount, index)} />
          </IconContext.Provider>
          <input
            className="amountInput"
            type="number"
            value={product.amount}
            onChange={(e) =>
              changeAmount(e.target.value - product.amount, index)
            }
          />
          <IconContext.Provider
            value={{ size: "4vh", className: "pointerCursor" }}
          >
            <FiPlus onClick={() => handleChangeAmount(1, product.amount, index)} />
          </IconContext.Provider>
        </div>
      </td>

      <td className="productInfo">
        R${(product.price * product.amount).toFixed(2).replace(".", ",")}
      </td>

      <td className="productInfo">
        <IconContext.Provider
          value={{
            size: "4vh",
            color: "rgb(150, 7, 7)",
            className: "pointerCursor",
          }}
        >
          <FaTrashAlt onClick={() => handleDelete(index)} />
        </IconContext.Provider>
      </td>
    </tr>
  );
}

export default CartProduct;
