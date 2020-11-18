import React from "react";
import "./Carrinho.css";
import CartProduct from "./Components/CartProduct";
import ShippingCalc from "./Components/ShippingCalc";

const productsInCart = [
  {
    id: 1,
    name: "Produto Bonito",
    price: 100,
    amount: 5,
  },
  {
    id: 2,
    name: "Produto Bonito",
    price: 100,
    amount: 5,
  },
  {
    id: 3,
    name: "Produto Bonito",
    price: 100,
    amount: 5,
  },
  {
    id: 4,
    name: "Produto Bonito",
    price: 100,
    amount: 5,
  },
];

function Carrinho() {
  return (
    <div className="cardContainer">
      <h1 className="cartTitle">Carrinho</h1>
      <table className="cartTable">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço Unitário</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {productsInCart.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))}
          <tr>
            <td colSpan="3" className="subTotal" />
            <td colSpan="2" className="subTotal">
              Subtotal: R$178,29
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <ShippingCalc />
            </td>
            <td colSpan="3">Frete</td>
          </tr>
          <tr>
            <td colSpan="5" className="total">
              Total: R$192.95
            </td>
          </tr>
        </tbody>
      </table>
      <button className="checkoutButton">Finalizar Compra</button>
    </div>
  );
}

export default Carrinho;
