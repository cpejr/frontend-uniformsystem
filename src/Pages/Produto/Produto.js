import React from "react";

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

function Produto() {
    function CheckBoxes() {
        return <div className="CheckBoxes">checkBoxesAqui</div>;
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
                                <button className="send_logo">
                                    Carregue a sua logo!
                                </button>
                            </div>
                            <button>Adicionar ao Carrinho</button>
                        </div>
                    </div>
                    {/* <div className="final_page"></div> */}
                </div>
            </div>
        </div>
    );
}

export default Produto;
