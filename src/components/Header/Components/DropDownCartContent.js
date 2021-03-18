import React, { useEffect, useContext, useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { FaShoppingCart } from "react-icons/fa";

import "./style.css";
import { useHistory } from "react-router-dom";

import api from "../../../services/api";
import { LoginContext } from "../../../contexts/LoginContext";

import CartHeaderSkeleton from "../../Skeletons/CartHeaderSkeleton";

export default function DropDownCartContent(props) {
  let Subtotal = 0;

  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;
  const { token } = useContext(LoginContext);
  const history = useHistory();

  const [productsInCart, setProductsInCart] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getProducts() {
    setLoading(true);
    const response = await api.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProductsInCart(response.data);
  }

  useEffect(() => {
    try {
      getProducts();
      setTimeout(() => {
        setLoading(false);
      }, [600]);
    } catch (error) {
      console.warn(error);
      alert("Erro ao Buscar carrinho");
    }
  }, []);

  function handleClickAway() {
    props.setClickCart(false);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="all_window">
        <div className="blueLine"></div>

        {!loading ? (
          <>
            <div className="products">
              {productsInCart.length === 0 ||
              productsInCart.length === undefined ? (
                <span style={{ color: "#000" }}>Nenhum produto</span>
              ) : (
                productsInCart.map((produto) => {
                  Subtotal =
                    Subtotal +
                    parseFloat(produto.price) * parseFloat(produto.amount);

                  return (
                    <>
                      <div className="singleProduct">
                        <div className="photo">
                          <img
                            src={bucketAWS + produto.img_link}
                            alt={produto.name}
                            className="FotoCamisa"
                          />
                        </div>
                        <div className="texts">
                          <h4 className="Prod_Title">{produto.name}</h4>
                          <div className="description">
                            <div className="pt1">
                              <p className="size">Tamanho: {produto.size}</p>
                            </div>
                            <div className="pt1">
                              <p className="gender">
                                Gênero:{" "}
                                {produto.gender === "F"
                                  ? "Feminino"
                                  : "Masculino"}
                              </p>
                              <p>R$ {Number(produto.price).toFixed(2)}</p>
                            </div>
                            <div className="pt2">
                              <p className="color">Cor: Branca</p>
                              <p className="total_price">
                                {produto.amount} x R${" "}
                                {Number(produto.price).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr
                        style={{
                          width: "90%",
                          margin: "-1px auto",
                        }}
                      />
                    </>
                  );
                })
              )}
            </div>

            <div className="subtotal_div">
              <h5 className="subtotal" style={{ color: "black" }}>
                SUBTOTAL{" "}
              </h5>
              <h5 className="price" style={{ color: "black" }}>
                R$ {Subtotal},00
              </h5>
            </div>
          </>
        ) : (
          <CartHeaderSkeleton />
        )}
        <button
          className="stylized_button"
          onClick={() => {
            handleClickAway();
            history.push("/cart"); //pagina do carrinho
          }}
        >
          Ir para o carrinho
          <FaShoppingCart className="cart_icon" />
        </button>
      </div>
    </ClickAwayListener>
  );
}
