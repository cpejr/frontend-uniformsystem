import React from "react";
import "../Carrinho.css";
import { FaTrashAlt } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IconContext } from "react-icons";

function CartProduct({ product }) {
  return (
    <tr>
      <td className="productInfo">
        <div className="productName">
          <img src="/blusa1.png" className="productImg" alt="productImg" />
          {product.name}
        </div>
      </td>

      <td className="productInfo">
        R${product.price.toFixed(2).replace(".", ",")}
      </td>

      <td className="productInfo">
        <div className="amountContainer">
          <IconContext.Provider value={{ size: "4vh" }}>
            <FiMinus />
          </IconContext.Provider>
          <input className="amountInput" type="number" value={product.amount} />
          <IconContext.Provider value={{ size: "4vh" }}>
            <FiPlus />
          </IconContext.Provider>
        </div>
      </td>

      <td className="productInfo">
        R${(product.price * product.amount).toFixed(2).replace(".", ",")}
      </td>

      <td className="productInfo">
        <IconContext.Provider value={{ size: "4vh", color: "rgb(150, 7, 7)" }}>
          <FaTrashAlt />
        </IconContext.Provider>
      </td>
    </tr>
  );
}

export default CartProduct;
