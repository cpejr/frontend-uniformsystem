import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import {
    FaCheck,
    FaShoppingCart,
  /*   FaAngleRight,
    FaAngleLeft, */
} from "react-icons/fa";

import "./Produto.css";
import "./Radio.css";

import Image from "../../Assets/camisa.jpg";
import Camisa from "../../Assets/Foto_camisa.png";

import { Carousel } from "react-bootstrap";

const secundary_images = [
    {
        src: Image,
        alt: "alt_img2",
    },
    {
        src: Camisa,
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

/* const Models = [
    { imgLink: Image, alt: "alt_img2 },
    { imgLink: Camisa , alt: "alt_img1" },
]; */

const obj_sizes = ["PP", "P", "M", "G", "GG"];

function Produto() {
    const [indexImage, setIndexImage] = useState(0);
    const [selectedValue, setSelectedValue] = useState(0);

    const [Cep, setCep] = useState(null);
    const [Quantity, setQuantity] = useState(null);

    //Pegando o id do produto pelo link
    const { product_id } = useParams();

    useEffect(() => {
        const produto = getProduto(product_id);
        console.log(produto);
    }, []);

    async function getProduto(product_id) {
        await api.get(`/productmodels?${product_id}`);
    }

    //essa funcao tem um CSS só pra ela, pois gastou uns esquemas diferenciados pra fazer
    function Radio(gender) {
        function Content() {
            return (
                <div className='checked'>
                    <FaCheck color='white' />
                </div>
            );
        }

        return (
            <div className={"radio"} style={{ display: "flex" }}>
                {obj_sizes.map((size, index) => {
                    let value;
                    value = gender + "_" + size;
                    return (
                        <label
                            key={index}
                            htmlFor='radio_size_item'
                            className='radio_container'
                            onClick={() => setSelectedValue(value)}
                        >
                            {size}
                            <input
                                type='radio'
                                name='radio_size_item'
                                value={value}
                            ></input>
                            <span className='radio_checkmark'>
                                {selectedValue === value ? Content() : null}
                            </span>
                        </label>
                    );
                })}
            </div>
        );
    }

    function MainImage(indexImage = 0) {
        //retorna uma imagem principal, com base no clique da imagem
        return (
            <img
                className='main_image'
                src={secundary_images[indexImage].src}
                alt='main_imagem'
            ></img>
        );
    }

    function LittleCarrousel() {
        return (
            <div className='div_carousel'>
                <Carousel
                    controls={true}
                    /* indicators={true} */ interval={99999}
                    className='carrousel_product'
                >
                    {secundary_images.map((img, index) => {
                        /* Possíveis soluções pro carrousel:
                        -Matriz de imagens, em vez de vetor
                            Cada Matriz [i][3] tem na posição i 3 imagens, que servem de 
                            para entrar no carrousel. Conforme o i passa, se tem novas imagens. No fim, 
                            se faz uma tratativa para nao pegarmos matrizes vazias */
                        return (
                            <Carousel.Item>
                                <div className='div_img_carousel'>
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className='carousel_image'
                                        onClick={() => setIndexImage(index)}
                                    />

                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className='carousel_image'
                                        onClick={() => setIndexImage(index)}
                                    />

                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className='carousel_image'
                                        onClick={() => setIndexImage(index)}
                                    />
                                </div>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </div>
        );
    }

    return (
        <div className='all_page'>
            <div className='page_content'>
                <div className='shirt_images'>
                    <div className='div_main_image'>
                        {MainImage(indexImage)}
                    </div>
                    <div className='container_secundary_images'>
                        {/*  <div className='left_arrow'>
                            <FaAngleLeft size='30px' />
                        </div>
                        <div className='div_secundary_images'>
                            {secundary_images.map((image, indexImage) => {
                                return (
                                    <img
                                        onClick={() =>
                                            setIndexImage(indexImage)
                                        }
                                        key={indexImage}
                                        src={image.src}
                                        alt={image.alt}
                                        className='secundary_images'
                                    />
                                );
                            })}
                        </div>
                        <div className='right_arrow'>
                        <FaAngleRight size='30px' /> */}
                        {LittleCarrousel()}
                    </div>
                </div>

                <div className='shirt_informations'>
                    <div className='title_and_description'>
                        <h1 className='title_shirt'>{ProdutoEscolhido.name}</h1>
                        <div className='div_descript'>
                            <h6 className='small_title'>Descrição:</h6>
                            <p className='descript_text'>
                                {ProdutoEscolhido.description}
                            </p>
                        </div>
                    </div>

                    <div className='two_columns'>
                        <div className='priceAndImages'>
                            <div className='div_aux'>
                                <div className='price'>
                                    <h2>R${ProdutoEscolhido.price},00</h2>
                                </div>
                                <div className='images'>
                                    {ProdutoEscolhido.images.map(
                                        (image, index) => {
                                            return (
                                                <img
                                                    key={index}
                                                    src={image.src}
                                                    alt={image.a}
                                                    className='image'
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            <div className='frete'>
                                <div>
                                    <h6>Calcule o frete:</h6>
                                    <input
                                        type='text'
                                        placeholder=' CEP'
                                        onChange={(e) => setCep(e.target.value)}
                                    />{" "}
                                    <button id='stylized_button'>
                                        Calcular
                                    </button>
                                </div>

                                <a href='http://www.google.com'>
                                    Não sei meu cep
                                </a>
                            </div>
                        </div>
                        <div className='order_container'>
                            <div className='sizes'>
                                <h6 className='small_title'>Tamanho</h6>
                                <h6>Feminino</h6>
                                {Radio("Fem")}
                                <h6>Masculino</h6>
                                {Radio("Mas")}
                            </div>
                            <div className='quantity'>
                                <h6 className='small_title'>Quantidade:</h6>
                                <input
                                    type='number'
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                            <div className='interprise_logo'>
                                <h6 className='small_title'>
                                    Logo da sua empresa:
                                </h6>
                                <p>
                                    Envie o logo da sua empresa abaixo e veja
                                    como fica:
                                </p>
                                <button
                                    id='stylized_button'
                                    className='send_logo'
                                >
                                    Carregue a sua logo!
                                </button>
                            </div>
                            <div className='div_cart_button'>
                                <div
                                    id='stylized_button'
                                    className='cart_button'
                                >
                                    <FaShoppingCart
                                        className='icon'
                                        size='35px'
                                    />
                                    <div className='text'>
                                        <p>ADICIONAR AO CARRINHO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="final_page"></div> */}
                </div>
            </div>
        </div>
    );
}

export default Produto;
