import React from "react";
import "../Carrinho.css";
import { FaTrashAlt } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IconContext } from "react-icons";

function CartProduct({ handleDelete, index, changeAmount, product }) {

  return (
    <tr>
      <td className="productInfo">
        <div className="productName">
          <img src="/images/blusa1.png" className="productImg" alt="productImg" />
          {product.name}
        </div>
      </td>

      <td className="productInfo">
        R${product.price.toFixed(2).replace(".", ",")}
      </td>

      <td className="productInfo">
        <div className="amountContainer">
          <IconContext.Provider
            value={{ size: "4vh", className: "pointerCursor" }}
          >
            <FiMinus onClick={() => changeAmount(-1, index)} />
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
            <FiPlus onClick={() => changeAmount(1, index)} />
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
