import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import {
    FaCheck,
    FaShoppingCart,
} from "react-icons/fa";

import { Button, TextField } from '@material-ui/core'

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
    const [selectedValue, setSelectedValue] = useState(0);
    const [Produto, setProduto] = useState({});

    const [models, setModels] = useState([]);
    const [modelChoosen, setModelChoosen] = useState({});
    const [isSelect, setIsSelect] = useState(0);

    const [errorCEP, setErrorCEP] = useState(false);
    const [errorCEPMessage, setErrorCEPMessage] = useState('');

    const [Cep, setCep] = useState(null);
    const [Quantity, setQuantity] = useState(null);

    const inputQuantity = useRef(null);
    const inputSize = useRef(null);
    const inputCEP = useRef(null);

    //Pegando o id do produto pelo link
    const { product_id } = useParams();


    useEffect(async () => {

        async function getProductModelsFromProduct(product_id) {
            const response = await api.get(`/productmodels/${product_id}`);
            return response.data;
        }

        const response = await getProductModelsFromProduct(product_id);
        console.log('aqui', response)

        setProduto(response);

        // Armazena o modela
        setModels(response.models)

        const choosen = response.models.find(item => item.is_main === 1);

        // Acha modelo principal
        setModelChoosen(choosen);

        // Acha modelo principal
        setIsSelect(choosen.product_model_id);

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
        const cepReceived = inputCEP.current.value;

        if(cepReceived === '' || cepReceived.length < 8 || isNaN(Number(cepReceived))){
            setErrorCEP(true);
            setErrorCEPMessage('Digite um CEP válido.');
        }else{
            setErrorCEP(false);
            setErrorCEPMessage('');

            alert('Ola', cepReceived);

        }

    }

    function AddALogo(){
        window.alert('Voce AddALogo !!')
    }

    const handleSelectModel = (product_model_id) => {
        const selectedModel = models.find(item => item.product_model_id === product_model_id);
        setModelChoosen(selectedModel);
    }

    return (
        <div className='productPage'>

            <div className='leftSide'>
                <img src={Image} alt="imagem" />
            </div>

            <div className='rightSide'>
                <h1 className='productsName'>{Produto.name}</h1>
                <div className="titleArea">
                    <strong>Descrição do produto:</strong>
                    <span>{Produto.description}</span>
                </div>
                <div className='productsInfo'>
                    <div className="leftSideInside">
                        <div className="priceWIthPhotos">
                            <strong>{modelChoosen? `R$ ${modelChoosen.price?.toFixed(2)}` : 'none'}</strong>
                            <div className="productsPhotos">
                                {   
                                    models.length > 0 ?
                                        models.map(item => {
                                            <img   
                                                src={item.img_link} 
                                                alt={item.model_description}
                                                className={isSelect === item.product_model_id ? 'productSelect': null}
                                                onClick={() => handleSelectModel(item.product_model_id)} 
                                            />
                                        })
                                    :
                                    <span>Sem modelo</span>
                                }
                                {/* <img src={Image} alt="imagem" />
                                <img src={Image} alt="imagem" /> */}
                            </div>
                        </div>

                        <div className="shipSpace">
                            <span>Calcule o CEP:</span>
                            <div className="calculateCEPArea">
                                <TextField
                                    variant="outlined" 
                                    type="text" 
                                    inputProps={{maxLength: 8}}
                                    inputRef={inputCEP}
                                    error={errorCEP} 
                                    helperText={errorCEPMessage}
                                />
                                <Button className="calculateCEPButton" onClick={CalculateCEP}>Calcular</Button>
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
