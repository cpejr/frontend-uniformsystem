import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import {
    FaCheck,
    FaShoppingCart,
} from "react-icons/fa";

import "./Produto.css";
import "./Radio.css";

import Image from "../../Assets/camisa.jpg";
import Camisa from "../../Assets/Foto_camisa.png";


import CircularProgress from "@material-ui/core/CircularProgress";


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

const obj_sizes = ["PP", "P", "M", "G", "GG"];

function Produto() {
    const [indexImage, setIndexImage] = useState(0);
    const [selectedValue, setSelectedValue] = useState(0);
    const [Produto, setProduto] = useState({});

    const [Cep, setCep] = useState(null);
    const [Quantity, setQuantity] = useState(null);


    const [loadingCep, setLoadingCep] = useState(false);
    const [loadingLogo, setLoadingLogo] = useState(false);
    const [loadingAddToCart, setLoadingAddToCart] = useState(false);


    const inputQuantity = useRef(null);
    const inputSize = useRef(null);


    //Pegando o id do produto pelo link
    const { product_id } = useParams();

    //depois de pego o id do produto pelo link
    //depois com o id produto os models (getproductmodel)
    //depois eu pego a img link.

    useEffect(() => {
        async function getProduto(product_id) {
            const response = await api.get(`/productmodels/${product_id}`);
            return response.data;
        }

        getProduto(product_id).then((response) => {
            setProduto(response);
        });
    }, []);



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
                                ref={inputSize}
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

    
    
    function AddToCart(){
        // window.alert('Voce AddToCart !!');

        setLoadingAddToCart(true);

        setTimeout(() => {
            setLoadingAddToCart(false);
        }, 3000);

        window.alert('Voce AddToCart !!')

    }

    function CalculateCEP(){
        // window.alert('Voce CalculateCEP !!');

        setLoadingCep(true);

        setTimeout(() => {
            setLoadingCep(false);
        }, 3000);
    }

    function AddALogo(){
        // window.alert('Voce AddALogo !!');

        setLoadingLogo(true);

        setTimeout(() => {
            setLoadingLogo(false);
        }, 3000);
    }

    return (
        <div className='all_page'>
            <div className='page_content'>
                <div className='shirt_images'>
                    <div className='div_main_image'>
                        {MainImage(indexImage)}
                    </div>
                </div>

                <div className='shirt_informations'>
                    <div className='title_and_description'>
                        <h1 className='title_shirt'>{Produto.name}</h1>
                        <div className='div_descript'>
                            <h6 className='small_title'>Descrição:</h6>
                            <p className='descript_text'>
                                {Produto.description}
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
                                    {Produto.models?.map(
                                        
                                        (model, index) => {
                                            return (
                                                <img
                                                    key={index}
                                                    src={Image}
                                                    alt={`alt_da_${index}`}
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
                                    <button id='stylized_button' onClick={() => CalculateCEP()}>
                                        {loadingCep ? <CircularProgress size={15} color="secondary" /> : "Calcular"}
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
                                    ref={inputQuantity}
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
                                    onClick={() => AddALogo()}
                                >
                                    {loadingLogo ? <CircularProgress size={15} color="secondary" /> : "Carregue a sua logo!"}
                                </button>
                            </div>
                            <div className='div_cart_button'>
                                <div
                                    id='stylized_button'
                                    className='cart_button'
                                    onClick={() => AddToCart()}
                                >
                                    {
                                        loadingAddToCart ? <CircularProgress size={35} color="secondary" /> :
                                        <>
                                            <FaShoppingCart
                                                className='icon'
                                                size='35px'
                                            />
                                            <div className='text'>
                                                ADICIONAR AO CARRINHO
                                            </div>
                                        </>
                                    }
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
