import React, { useContext } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { FaShoppingCart } from "react-icons/fa";

import "./style.css";
import { useHistory } from "react-router-dom";

import { LoginContext } from "../../../contexts/LoginContext";

import CartHeaderSkeleton from "../../Skeletons/CartHeaderSkeleton";

export default function DropDownCartContent(props) {
  let Subtotal = 0;

  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;
  const { user, loading } = useContext(LoginContext);
  const history = useHistory();

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
              {user.cart.length === 0 ||
              user.cart.length === undefined ? (
                <span style={{ color: "#000" }}>Nenhum produto</span>
              ) : (
                user.cart.map((produto) => {
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
                              <p>R$ {Number(produto.price).toFixed(2).replace(".", ",")}</p>
                            </div>
                            <div className="pt2">
                              <p className="color">Cor: Branca</p>
                              <p className="total_price">
                                {produto.amount} x R${" "}
                                {Number(produto.price).toFixed(2).replace(".", ",")}
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
                R$ {((Subtotal*100)/100).toFixed(2).replace(".", ",")}
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
