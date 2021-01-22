import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import {
    FaCheck,
    FaShoppingCart,
} from "react-icons/fa";

import { Button } from '@material-ui/core'

import "./Produto.css";
import "./Radio.css";

import Image from "../../Assets/camisa.jpg";
import Camisa from "../../Assets/Foto_camisa.png";

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

    const inputQuantity = useRef(null);
    const inputSize = useRef(null);

    //Pegando o id do produto pelo link
    const { product_id } = useParams();


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
            <div className="radio" style={{ display: "flex" }}>
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
                            />
                            <span className='radio_checkmark'>
                                {selectedValue === value ? Content() : null}
                            </span>
                        </label>
                    );
                })}
            </div>
        );
    }


    function AddToCart(){
        window.alert('Voce AddToCart !!')
    }

    function CalculateCEP(){
        window.alert('Voce CalculateCEP !!')
    }

    function AddALogo(){
        window.alert('Voce AddALogo !!')
    }

    return (
        <div className='productPage'>

            <div className='leftSide'>
                <img src={Image} alt="imagem" />
            </div>

            <div className='rightSide'>
                <h1 className='productsName'>{Produto.name}</h1>
                <div className="titleArea">
                    <strong>Descrição:</strong>
                    <span>Uma descrição</span>
                </div>
                <div className='productsInfo'>
                    <div className="leftSideInside">
                        <div className="priceWIthPhotos">
                            <strong>R$ 50,00</strong>
                            <div className="productsPhotos">
                                <img src={Image} alt="imagem" />
                                <img src={Image} alt="imagem" />
                            </div>
                        </div>

                        <div className="shipSpace">
                            <span>Calcule o CEP:</span>
                            <div className="calculateCEPArea">
                                <input type="text"/>
                                <Button className="calculateCEPButton">Calcular</Button>
                            </div>
                            <span className="forgotPassword">Não sei meu CEP</span>
                        </div>

                    </div>
                    <div className="sizeAndQuantity">
                        <strong>Tamanho</strong>
                        <div className="divCheckboxes">
                            <div className="genderCheckboxes">
                                <h6>Feminino</h6>
                                {Radio("Fem")}
                            </div>
                            <div className="genderCheckboxes">
                                <h6>Masculino</h6>
                                {Radio("Mas")}
                            </div>
                        </div>

                        <div className="quantity">
                            <strong>Quantidade</strong>
                            <input type="text" />
                        </div>

                        <div className="loadLogo">
                            <div className="titleUploadLogo">
                                <strong>
                                    Logo da sua empresa
                                </strong>
                                <span>
                                    Envie a logo da sua empresa abaixo e veja como fica:
                                </span>
                            </div>

                            <Button>Carregue a sua logo!</Button>
                        </div>
                        <Button className="addToCart">
                            <FaShoppingCart
                                className='icon'
                                size='35px'
                            />
                            ADICIONAR AO CARRINHO
                        </Button>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Produto;
