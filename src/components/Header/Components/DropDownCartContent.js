import React from "react";
import { ClickAwayListener } from "@material-ui/core";
import { FaShoppingCart } from "react-icons/fa";

const Products_in_Cart = [
    {
        name: "Camisa 1",
        price: "15,00",
        quantity: 10,
        size: "P",
        imgLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROM5jiaPvJ6rmWc1OwhzHC8EdexGOEXSM9Y0IcwIHvI7mUQPoST6wHIFoSUpsx7qJusI5ly-DI&usqp=CAc",
        color: "Branco",
    },
    {
        name: "Camisa 1",
        price: "15,00",
        quantity: 10,
        size: "P",
        imgLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROM5jiaPvJ6rmWc1OwhzHC8EdexGOEXSM9Y0IcwIHvI7mUQPoST6wHIFoSUpsx7qJusI5ly-DI&usqp=CAc",
        color: "Branco",
    },
    {
        name: "Camisa 1",
        price: "15,00",
        quantity: 10,
        size: "P",
        imgLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROM5jiaPvJ6rmWc1OwhzHC8EdexGOEXSM9Y0IcwIHvI7mUQPoST6wHIFoSUpsx7qJusI5ly-DI&usqp=CAc",
        color: "Branco",
    },
    {
        name: "Camisa 1",
        price: "15,00",
        quantity: 10,
        size: "P",
        imgLink:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROM5jiaPvJ6rmWc1OwhzHC8EdexGOEXSM9Y0IcwIHvI7mUQPoST6wHIFoSUpsx7qJusI5ly-DI&usqp=CAc",
        color: "Branco",
    },
];

export default function DropDownCartContent(props) {
    let Subtotal = 0;

    //essa funcao somente lista os produtos
    function SingleProducts() {
        return Products_in_Cart.map((produto) => {
            Subtotal =
                Subtotal +
                parseFloat(produto.price) * parseFloat(produto.quantity);

            return (
                <>
                    <div
                        className="singleProduct"
                        style={{
                            boxSizing: "border-box",
                            width: "95%",
                            height: "90px",
                            margin: "auto",
                            padding: "0px 1px 0px 3px",
                            color: "black",

                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            className="photo"
                            /* Provavel que seja necessario um width ali. Nao coloquei por enquanto */
                            style={{
                                height: "90%",
                                maxWidth: "33%",
                                margin: "auto",
                            }}
                        >
                            {/* Na linha abaixo deveria entrar uma variavel do objeto, no campo SRC. */}
                            <img
                                src={produto.imgLink}
                                alt="FotoCamisa"
                                style={{
                                    width: "90%",
                                    height: "90%",
                                }}
                            />
                        </div>
                        <div
                            className="texts"
                            style={{
                                width: "67%",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                            }}
                        >
                            <h4
                                style={{
                                    margin: "10px 0px",
                                    fontWeight: "lighter",
                                }}
                            >
                                {produto.name}
                            </h4>
                            <div
                                className="description"
                                syle={{ color: "black" }}
                            >
                                <div
                                    className="pt1"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        fontSize: "12px",
                                        color: "#666",
                                        margin: "3px 0",
                                    }}
                                >
                                    <p
                                        style={{
                                            width: "fit-content",
                                            margin: "0",
                                        }}
                                    >
                                        Tamanho: {produto.size}
                                    </p>
                                    <p
                                        style={{
                                            width: "fit-content",
                                            margin: "0",
                                        }}
                                    >
                                        R$ {produto.price}
                                    </p>
                                </div>
                                <div
                                    className="pt2"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        fontSize: "12px",
                                        color: "#666",
                                    }}
                                >
                                    <p
                                        style={{
                                            width: "fit-content",
                                            margin: "0",
                                        }}
                                    >
                                        Cor: Branca
                                    </p>
                                    <p
                                        style={{
                                            width: "fit-content",
                                            margin: "0",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {produto.quantity}xR$ {produto.price}
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
        });
    }

    function handleClickAway() {
        props.setClickCart(false);
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div
                className="all_window"
                style={{
                    position: "absolute",
                    top: "25px",
                    right: "20px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#fff",
                    height: "fit-content",
                    width: "350px",
                    boxSizing: "content-box",

                    borderLeft: "solid 0.5px rgba(0,0,0,0.2)",
                    borderRight: "solid 0.5px rgba(0,0,0,0.2)",
                    borderBottom: "solid 0.5px rgba(0,0,0,0.2)",
                    /* paddingTop:'10px' */
                }}
            >
                <div
                    className="blueLine"
                    style={{
                        width: "100.60%",
                        height: "4px",
                        backgroundColor: "#4DCDBC",
                        marginBottom: "15px",
                        margin: "-1.5px",
                        zIndex: "9",
                    }}
                ></div>

                <div
                    className="products"
                    style={{
                        minHeight: "90px",
                        maxHeight: "175px",
                        overflow: "auto",
                        width: "100%",
                        margin: "auto",
                        padding: "10px 0px",
                    }}
                >
                    {SingleProducts()}
                </div>

                <div
                    className="subtotal_div"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "90%",
                        color: "black",
                        margin: "auto",
                    }}
                >
                    <h5 className="subtotal" style={{ color: "black" }}>
                        SUBTOTAL{" "}
                    </h5>
                    <h5 className="price" style={{ color: "black" }}>
                        R$ {Subtotal},00
                    </h5>
                </div>
                <button
                    style={{
                        margin: "auto",
                        width: "fit-content",
                        color: "black",
                        marginBottom: "10px",
                        backgroundColor: "#4DCDBC",
                        padding: "5px 20px",
                        borderRadius: "15px",
                        border: "0",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    Ir para o carrinho {"  "}
                    <FaShoppingCart className="cart_icon" style={{}} />
                </button>
            </div>
        </ClickAwayListener>
    );
}
