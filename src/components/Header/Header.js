import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";


import Logo from "../../Assets/Logo_1.png";

//importando icones:
import { FaShoppingCart, FaUser, FaAngleDown, FaSearch } from "react-icons/fa";

//o import abaixo é para fechar os dropdowns quando clicarmos fora deles
import { ClickAwayListener } from "@material-ui/core";


const Products_in_Cart = [
    { name: "Camisa 1", price: "15,00", quantity: 10 },
    {
        name: "Camisa 2",
        price: "20,00",
        quantity: 10,
    },
    {
        name: "Camisa 2",
        price: "20,00",
        quantity: 10,
    },
];

function Header() {
    const [ShowInput, setShowInput] = useState(false);
    const [SearchWord, setSearchWord] = useState("");
    const [ClickLogin, setClickLogin] = useState(false);
    const [ClickCart, setClickCart] = useState(false);

    function Login() {
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
            console.log("gfora?");
        }
        return (
            <ClickAwayListener onClickAway={handleClickAway}>
                <div
                    className="all_window"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#fff",
                        height: "100px",
                        width: "120px",
                        boxSizing: "content-box",
                    }}
                >
                    {Products_in_Cart.map((produto) => {
                        return (
                            <div
                                className="singleProduct"
                                style={{
                                    boxSizing: "border-box",
                                    width: "100%",
                                    height: "30px",
                                    backgroundColor: "#ccc",
                                    margin: "1px 0px",
                                    padding: "0px 1px",
                                    border: "solid 0px #000",
                                }}
                            >
                                Nome:{produto.name}
                            </div>
                        );
                    })}
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
                    <div className="all_cart">
                        <div
                            className="cart"
                            onClick={() => setClickCart(!ClickCart)}
                            style={{ position: "relative" }}
                        >
                            <FaShoppingCart className="cart_icon" />
                        </div>
                        {ClickCart && DropDownCartContent()}
                    </div>

                    <div className="login" style={{ position: "relative" }}>
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

                    <FaSearch
                        className="search_icon"
                        onClick={() => setShowInput(!ShowInput)}
                    />

                    {ShowInput && (
                        <input
                            type="search"
                            className="inputSearch"
                            onChange={(e) => setSearchWord(e.target.value)}
                            placeholder="O que deseja encontrar?"
                        ></input>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Header;
