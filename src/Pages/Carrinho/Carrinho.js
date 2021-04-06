import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { LoginContext } from "../../contexts/LoginContext";
import CartProduct from "./Components/CartProduct";
import MetaData from "../../meta/reactHelmet";
import "./Carrinho.css";
import CalculateShipping from "../../components/CalculateShipping";

function Carrinho() {
  const history = useHistory();

  const { token } = useContext(LoginContext);

  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(10);

  const meta = {
    titlePage: "Uniformes E-commerce | Carrinho",
    titleSearch: "Carrinho",
    description: "Seu carrinho de compras em Profit",
    keyWords: "Carrinho",
    imageUrl: "",
    imageAlt: "",
  };

  async function handleChangeAmount(number, product_key) {
    try {
      const id = products[product_key].product_in_cart_id;
      const newAmount = products[product_key].amount + number;
      await api.put(
        `/cart/${id}`,
        {
          amount: newAmount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      products[product_key].amount = newAmount;
      setProducts([...products]);
    } catch (error) {
      console.warn(error);
      alert(error);
      history.push("Error");
    }
  }

  async function handleDelete(product_key) {
    try {
      const id = products[product_key].product_in_cart_id;
      await api.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      products.splice(product_key, 1);
      setProducts([...products]);
    } catch (error) {
      console.warn(error);
      alert(error);
      history.push("Error");
    }
  }

  async function getProducts() {
    const response = await api.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
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
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <h1 className="cartTitle">Carrinho</h1>
      <div className="cartTable">
        <table className="table">
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
              <td colSpan="3" className="subTotalCarrinho">
                Subtotal:{" "}
              </td>
              <td colSpan="2" className="subTotalCarrinho">
                R${((subTotal * 100) / 100).toFixed(2).replace(".", ",")}
                <p style={{ fontSize: 16, margin: 0 }}> + frete</p>
              </td>
            </tr>
            <tr>
              <td colSpan="5">
                <CalculateShipping
                  className="p-3"
                  onCalculateShipping={(e) => console.log(e)}
                  product_models={products?.map(
                    ({ product_model_id, amount }) => ({
                      product_model_id,
                      quantity: amount,
                    })
                  )}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        classname="buttonSize"
        style={{
          alignSelf: "flex-end",
        }}
      >
        {products.length > 0 && (
          <button
            className="checkoutButton"
            onClick={() => history.push("checkout")}
          >
            Finalizar Compra
          </button>
        )}
      </div>
    </div>
  );
}

export default Carrinho;
