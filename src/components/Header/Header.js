import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import Logo from "../../Assets/Logo_1.png";

//importando icones:
import { FaShoppingCart, FaUser, FaAngleDown, FaSearch } from "react-icons/fa";

//o import abaixo é para fechar os dropdowns quando clicarmos fora deles
import { ClickAwayListener } from "@material-ui/core";

import api from "../../services/api";

import Foto_camisa from "../../Assets/Foto_camisa.png";

const Products_in_Cart = [
    { name: "Camisa 1", price: "15,00", quantity: 10 },
    {
        name: "Camisa 2",
        price: "20,00",
        quantity: 10,
    },
    {
        name: "Camisa 3",
        price: "20,00",
        quantity: 10,
    },
    {
        name: "Camisa 3",
        price: "20,00",
        quantity: 10,
    },
    {
        name: "Camisa 3",
        price: "20,00",
        quantity: 10,
    },
    {
        name: "Camisa 3",
        price: "20,00",
        quantity: 10,
    },
];

function Header() {
    const [ShowInput, setShowInput] = useState(false);
    const [SearchWord, setSearchWord] = useState("");
    const [ClickLogin, setClickLogin] = useState(false);
    const [ClickCart, setClickCart] = useState(false);

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    async function Login() {
        try {
            const response = await api.post("login", { Email, Password });
            console.log(response);
        } catch (error) {
            console.log(error);
        }

        console.log("AAAAAAAA");
    }

    function DropDownLoginContent() {
        function handleClickAway() {
            setClickLogin(false);
        }

        return (
            <ClickAwayListener onClickAway={handleClickAway}>
                <div
                    className="drop_content"
                    style={{
                        margin: "15px",
                        padding: "20px",
                        width: "fit-content",
                        height: "fit-content",
                        backgroundColor: "#ccc",
                        position: "absolute",
                        bottom: "-210px",
                        right: "15px",
                    }}
                >
                    <label
                        htmlFor="input_login"
                        style={{ width: "fit-content", color: "black" }}
                    >
                        Login:
                        <input
                            className="input_login"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "black",
                                width: "95%",
                            }}
                            type="text"
                            placeholder="Digite seu Email aqui"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </label>

                    <label
                        htmlFor="password"
                        style={{ width: "fit-content", color: "black" }}
                    >
                        Senha:
                        <input
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "black",
                                width: "95%",
                            }}
                            className="input_password"
                            type="password"
                            placeholder="Digite sua Senha aqui"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </label>

                    <div
                        className="buttons"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "80%",
                            margin: "auto",
                        }}
                    >
                        <button
                            className="b_login"
                            onClick={() => Login()}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "black",
                                width: "50%",
                                padding: "auto",
                            }}
                        >
                            Login
                        </button>

                        <button
                            className="b_register"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "black",
                                width: "50%",
                                padding: "auto",
                            }}
                        >
                            Cadastrar
                        </button>
                    </div>
                </div>
            </ClickAwayListener>
        );
    }

    function DropDownCartContent() {
        function handleClickAway() {
            setClickCart(false);
        }

        return (
            <ClickAwayListener onClickAway={handleClickAway}>
                <div
                    className="all_window"
                    style={{
                        position: "absolute",
                        top: "25px",
                        right: "0px",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#fff",
                        height: "240px",
                        width: "350px",
                        boxSizing: "content-box",
                    }}
                >
                    <div
                        className="blueLine"
                        style={{
                            width: "100%",
                            height: "2px",
                            backgroundColor: "blue",
                        }}
                    ></div>

                    <div
                        className="products"
                        style={{
                            minHeight: "180px",
                            maxHeight: "440px",
                            overflow: "auto",
                            width: "100%",
                        }}
                    >
                        {Products_in_Cart.map((produto) => {
                            return (
                                <div
                                    className="singleProduct"
                                    style={{
                                        boxSizing: "border-box",
                                        width: "90%",
                                        height: "90px",
                                        /*  backgroundColor: "#ccc", */
                                        margin: "auto",
                                        padding: "0px 1px",
                                        borderBottom: "solid 1px #ccc",
                                        color: "black",

                                        display: "flex",
                                        justifyContent:'space-between'

                                        
                                    }}
                                >
                                    <div
                                        className="photo"
                                        style={{ width: "33%", height: "100%" }}
                                    >
                                        {/* Na linha abaixo deveria entrar uma variavel do objeto, no campo SRC. */}
                                        <img
                                            src={Foto_camisa}
                                            alt="FotoCamisa"
                                            style={{
                                                width: "90%",
                                                height: "90%",
                                            }}
                                        />
                                    </div>
                                    <div className="texts" style={{width:'67%', display:'flex', flexDirection:"column", height:'100%'}}>
                                        <h3 style={{margin:'0'}}>{produto.name}</h3>
                                        <div className="description" syle={{color:'black'}}>
                                            <div className="pt1" style={{display:'flex', justifyContent:'space-between', width:'100%',fontSize:'11px', color:'#666'}}>
                                                <p style={{width:'fit-content',margin:'0'}}>Tamanho:P</p>
                                                <p style={{width:'fit-content',margin:'0'}}>R$50,00</p>
                                            </div>
                                            <div className="pt2" style={{display:'flex', justifyContent:'space-between', width:'100%', fontSize:'11px', color:'#666'}}>
                                                <p style={{width:'fit-content',margin:'0'}}>Cor:Branca</p>
                                                <p style={{width:'fit-content',margin:'0',fontSize:'11px'}}>10x50,00=R$500,00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div
                        className="subtotal"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            color: "black",
                        }}
                    >
                        <h5 className="subtotal" style={{ color: "black" }}>
                            Subtotal{" "}
                        </h5>
                        <h5 className="price" style={{ color: "black" }}>
                            R$5500,00
                        </h5>
                    </div>
                    <button style={{ margin: "auto", color: "black" }}>
                        Ir para o carrinho
                    </button>
                </div>
            </ClickAwayListener>
        );
    }

    return (
        <div className="all_header">
            <div className="header_content">
                <div className="logo_container">
                    <Link to="/home">
                        <img src={Logo} alt="Logo" className="Logo" />
                    </Link>
                </div>
                <div className="icons">
                    <Link className='icon' to="/home">HOME</Link>
                    <Link className='icon' to="/shop">LOJA</Link>
                    <Link className='icon' to="/contact">CONTATO</Link>

                    <div
                        className="login"
                        style={{ position: "relative", margin: 0 }}
                    >
                        <div
                            className="icons_log"
                            onClick={() => {
                                setClickLogin(!ClickLogin);
                            }}
                        >
                            <FaUser className="user_icon" />{" "}
                            <div style={{ width: "fit-content" }}>ENTRAR</div>
                            <FaAngleDown className="arrow_icon" />
                        </div>
                        {ClickLogin && DropDownLoginContent()}
                    </div>

                    <div
                        className="all_cart"
                        style={{ position: "relative", margin: 0 }}
                    >
                        <div
                            className="cart"
                            onClick={() => setClickCart(!ClickCart)}
                        >
                            <FaShoppingCart
                                className="cart_icon"
                                style={{ margin: 0 }}
                            />
                        </div>
                        {ClickCart && DropDownCartContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
