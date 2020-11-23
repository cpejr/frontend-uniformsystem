import React, { useState } from "react";
import { FaCheck, FaShoppingCart } from "react-icons/fa";

import "./Produto.css";

import Image from "../../Assets/camisa.jpg";

const secundary_images = [
    {
        src: Image,
        alt: "alt_img2",
    },
    {
        src: Image,
        alt: "alt_img3",
    },
    {
        src: Image,
        alt: "alt_img4",
    },
];

const ProdutoEscolhido = {
    name: "Nome do Produto Escolhido",
    description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
    price: "50",
    images: [
        {
            src: Image,
            alt: "alt_img",
        },
        {
            src: Image,
            alt: "alt_img1",
        },
    ],
};

const obj_sizes = ["PP", "P", "M", "G", "GG"];

function Produto() {
    function Content() {
        return (
            <div
                className="checked"
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#4DCDBC",
                    /* border: "solid 1px black", */
                    borderRadius: "4px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <FaCheck color="white" />
            </div>
        );
    }

    function CheckBox() {
        const [checked, setChecked] = useState(false);
        return (
            <div className="CheckBoxes">
                <div
                    className="square"
                    onClick={() => setChecked(!checked)}
                    style={{
                        width: "30px",
                        height: "25px",
                        backgroundColor: "white",
                        border: "solid 1px black",
                        borderRadius: "5px",
                    }}
                >
                    {checked && Content()}
                </div>
            </div>
        );
    }

    function CheckBoxes() {
        return (
            <div className="" style={{ display: "flex" }}>
                {obj_sizes.map((size, index) => {
                    return (
                        <div
                            className="size"
                            key={index}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                paddingLeft: "5px",
                            }}
                        >
                            {size} {CheckBox()}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="all_page">
            <div className="page_content">
                <div className="shirt_images">
                    <div className="div_main_image">
                        <img src={Image} alt="Imagem" className="main_image" />
                    </div>
                    <div className="div_secundary_images">
                        {secundary_images.map((image) => {
                            return (
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="secundary_images"
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="shirt_informations">
                    <div className="title_and_description">
                        <h1 className="title_shirt">{ProdutoEscolhido.name}</h1>
                        <div className="div_descript">
                            <h5>Descrição:</h5>
                            <p className="descript_text">
                                {ProdutoEscolhido.description}
                            </p>
                        </div>
                    </div>

                    <div className="two_columns">
                        <div className="priceAndImages">
                            <div className="teste">
                                <div className="price">
                                    <h2>R${ProdutoEscolhido.price},00</h2>
                                </div>
                                <div className="images">
                                    {ProdutoEscolhido.images.map((image) => {
                                        return (
                                            <img
                                                src={image.src}
                                                alt={image.a}
                                                className="image"
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="frete">
                                <h6>Calcule o frete:</h6>
                                <input type="text" /> <button>Calcular</button>
                                <p>Não sei meu cep</p>
                            </div>
                        </div>
                        <div className="order_container">
                            <div className="sizes">
                                <h5>Tamanho</h5>
                                <h6>Feminino</h6>
                                {CheckBoxes()}
                                <h6>Masculino</h6>
                                {CheckBoxes()}
                            </div>
                            <div className="quantity">
                                <h5>Quantidade:</h5>
                                <input type="number" />
                            </div>
                            <div className="interprise_logo">
                                <h5>Logo da sua empresa:</h5>
                                <p>
                                    Envie o logo da sua empresa abaixo e veja
                                    como fica:
                                </p>
                                <button
                                    id="stilyzed_button"
                                    className="send_logo"
                                >
                                    Carregue a sua logo!
                                </button>
                            </div>
                            <button
                                id="stilyzed_button"
                                className="cart_button"
                            >
                                <FaShoppingCart className="icon" size="35px" />
                                <div className="text">
                                    <p>ADICIONAR AO CARRINHO</p>
                                </div>
                            </button>
                        </div>
                    </div>
                    {/* <div className="final_page"></div> */}
                </div>
            </div>
        </div>
    );
}

export default Produto;
