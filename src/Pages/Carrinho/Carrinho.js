import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./Carrinho.css";
import CartProduct from "./Components/CartProduct";
import ShippingCalc from "./Components/ShippingCalc";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1c2VyX2lkIjoiNmIxZWMtMzU1Yi03ZjZjLWFjMzYtMmNjNzhiNjY0MGRmIiwibmFtZSI6IkFydGh1ciIsImZpcmViYXNlX3VpZCI6IlA4U3NCQ1l2VWZiY0VDTGJHZkN2N29qaXpIOTIiLCJ1c2VyX3R5cGUiOiJhZG0iLCJlbWFpbCI6ImFydGh1cmxpbWFAY3BlanIuY29tLmJyIiwiY3BmIjoiMTIzNDU2Nzg5MDMiLCJjcmVhdGVkX2F0IjoiMjAyMC0xMS0xOCAyMToyNTo0MiIsInVwZGF0ZWRfYXQiOiIyMDIwLTExLTE4IDIxOjI1OjQyIn1dLCJpYXQiOjE2MDU4MjE4ODIsImV4cCI6MTYwODQxMzg4Mn0.OdkhbKw9_q5IzvlZBxG5OGYr1V1q4-0-GP_ZrhvY3P8";

function Carrinho() {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState();

  async function handleChangeAmount(number, product_key) {
    try{
      const id = products[product_key].product_in_cart_id;
      const newAmount = products[product_key].amount + number;
      await api.put(`/cart/${id}`, {
        amount: newAmount,
      },
      {
        headers: { authorization: `bearer ${token}` },

      });
      products[product_key].amount = newAmount;
      setProducts([...products]);
    }
    catch(error){
      console.warn(error);
      alert(error);
    }
  }

  async function handleDelete(product_key) {
    try {
      const id = products[product_key].product_in_cart_id;
      await api.delete(`/cart/${id}`, {
        headers: { authorization: `bearer ${token}` },
      });
      products.splice(product_key, 1);
      setProducts([...products]);
    } catch (error) {
      console.warn(error);
      alert(error);
    }
  }

  async function getProducts() {
    const response = await api.get("/cart", {
      headers: { authorization: `bearer ${token}` },
    });
    setProducts([...response.data]);
  }

  useEffect(() => {
    let aux = 0;
    products.forEach((product) => {
      aux += product.price * product.amount;
    });
    setSubTotal(aux);
  }, [products]);

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.warn(error);
      alert("Erro ao Buscar carrinho");
    }
  }, []);

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
          {products.map((product, index) => (
            <CartProduct
              key={index}
              index={index}
              product={product}
              changeAmount={handleChangeAmount}
              handleDelete={handleDelete}
            />
          ))}
          <tr>
            <td colSpan="3" className="subTotal">
              Subtotal:{" "}
            </td>
            <td colSpan="2" className="subTotal">
              R${subTotal.toFixed(2).replace(".", ",")}
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <ShippingCalc setShipping={setShipping} />
            </td>
            <td colSpan="3">
              {shipping && `R$${shipping.toFixed(2).replace(".", ",")}`}
            </td>
          </tr>
          <tr>
            <td colSpan="5" className="total">
              R$
              {shipping
                ? (subTotal + shipping).toFixed(2).replace(".", ",")
                : subTotal.toFixed(2).replace(".", ",")}
            </td>
          </tr>
        </tbody>
      </table>
      {
        (products.length>0) &&
        <button className="checkoutButton" onClick={() => history.push('checkout')}>Finalizar Compra</button>
      }
    </div>
  );
}

export default Carrinho;
