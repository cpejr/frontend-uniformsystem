import React, { useEffect, useContext, useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { FaShoppingCart } from "react-icons/fa";

import "./style.css";
import { useHistory } from "react-router-dom";

import api from '../../../services/api';
import { LoginContext } from '../../../contexts/LoginContext';


export default function DropDownCartContent(props) {
  let Subtotal = 0;

  const { token } = useContext(LoginContext);
  const history = useHistory();

  const [productsInCart, setProductsInCart] = useState([]);

  async function getProducts() {
    const response = await api.get('/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProductsInCart(response.data);
  }

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.warn(error);
      alert('Erro ao Buscar carrinho');
    }
  }, []);


  function handleClickAway() {
    props.setClickCart(false);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="all_window">
        <div className="blueLine"></div>

        <div className="products">
          {
            productsInCart.length === 0 || productsInCart.length === undefined ?
              <span style={{color: '#000'}}>Nenhum produto</span>
            :
              productsInCart.map((produto) => {
                Subtotal =
                  Subtotal + parseFloat(produto.price) * parseFloat(produto.amount);
        
                return (
                  <>
                    <div className="singleProduct">
                      <div className="photo">
                        <img
                          src={produto.img_link}
                          alt="FotoCamisa"
                          className="FotoCamisa"
                        />
                      </div>
                      <div className="texts">
                        <h4 className="Prod_Title">{produto.name}</h4>
                        <div className="description">
                          <div className="pt1">
                            <p className="size">Tamanho: {produto.size}</p>
                            <p>R$ {Number(produto.price).toFixed(2)}</p>
                          </div>
                          <div className="pt2">
                            <p className="color">Cor: Branca</p>
                            <p className="total_price">
                              {produto.amount} x R$ {Number(produto.price).toFixed(2)}
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
          }
        </div>

        <div className="subtotal_div">
          <h5 className="subtotal" style={{ color: "black" }}>
            SUBTOTAL{" "}
          </h5>
          <h5 className="price" style={{ color: "black" }}>
            R$ {Subtotal},00
          </h5>
        </div>
        <button
          className="stylized_button"
          onClick={() => {
            handleClickAway();
            history.push("/cart");
          }}
        >
          Ir para o carrinho
          <FaShoppingCart className="cart_icon" style={{}} />
        </button>
      </div>
    </ClickAwayListener>
  );
}
