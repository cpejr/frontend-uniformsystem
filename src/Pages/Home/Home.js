import React, {useState, useEffect} from 'react';

import { Carousel } from 'react-bootstrap';

import camisa from '../../Assets/camisa.jpg';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import api from "../../services/api";

import './Home.css'

const CardProdutosHome = ({ imgSrcProduto, imgAltProduto, nomeProduto}) => {
  return (
    <div className="divCardProdutos">
      <img src={imgSrcProduto} alt={imgAltProduto} />
      <strong>
        {nomeProduto}
      </strong>
    </div>
  )
}

function Home(){

//   function login(){
//     var username = prompt('Digite nome de usuario');
//     var password = prompt("Digite a senha");
//     if(username=="teste" && password=="teste")
//         window.location.pathname = "/checkout";
//     else
//         alert("Senha invalida nome de usuario");
// }

    
//         useEffect(() => {
//             login()
//             console.log('TESTE', window.location.pathname)
//         }, [])

  const conteudoHome = {
      Carrossel: [
        {
          imgSrc: camisa,
          imgAlt: 'teste',
        },
        {
          imgSrc: camisa,
          imgAlt: 'teste',
        },
        {
          imgSrc: camisa,
          imgAlt: 'teste',
        },
    ],
    QuemSomos: {
      imgSrc: camisa,
      imgAlt: '',
    },
    NossosProdutos: {
      Cards: [
        {
          imgSrc: camisa,
          imgAlt: 'teste',
          NomeProduto: 'Nome 1',
        },
        {
          imgSrc: camisa,
          imgAlt: 'teste',
          NomeProduto: 'Nome 2',
        },
        {
          imgSrc: camisa,
          imgAlt: 'teste',
          NomeProduto: 'Nome 3',
        },
      ]
    }
  }

  // Estado para armazenar Imagens do Carrossel
  const [imagesCarousel, setImagesCarousel] = useState([]);
  
  // Estado para armazenar Imagem de Quem Somos
  const [imagesWhoWeAre, setImagesWhoWeAre] = useState({});
  
  // Estado para armazenar Imagens de Produtos
  const [imagesProducts, setImagesProducts] = useState([]);

  // Estados para armazenar textos
  const [textoQuemSomos, setTextoQuemSomos] = useState('');
  const [textoProdutos, setTextoProdutos] = useState('');

  const [telephoneInfo, setTelephoneInfo] = useState('');
  const [enderecoInfo, setEnderecoInfo] = useState('');
  const [facebookInfo, setFacebookInfo] = useState('');
  const [instagramInfo, setInstagramInfo] = useState('');
  const [whatsappInfo, setWhatsappInfo] = useState('');


  const bucketAWS = 'https://profit-uniformes.s3.amazonaws.com/';

  const token = '';

  // UseEffect para inicializar as informações da Home
  useEffect(() => {
    
    async function getHomeInfo(){
      try {
        const response = await api.get('/home/info',
        {
          headers: { authorization: `bearer ${token}` },
        });

        if (response.data.length===0){
          throw new Error('Home info is Empty')
        }

        const textWhoWeAre = response.data.filter(item => item.key === 'textWhoWeAre'? item.data: null)[0]; 
        const textProducts = response.data.filter(item => item.key === 'textProducts'? item.data: null)[0]; 
        const cellphone = response.data.filter(item => item.key === 'cellphone'? item.data: null)[0]; 
        const address = response.data.filter(item => item.key === 'address'? item.data: null)[0]; 
        const facebookLink = response.data.filter(item => item.key === 'facebookLink'? item.data: null)[0]; 
        const instagramLink = response.data.filter(item => item.key === 'instagramLink'? item.data: null)[0]; 
        const whatsAppNumber = response.data.filter(item => item.key === 'whatsAppNumber'? item.data: null)[0];
    
        setTextoQuemSomos(textWhoWeAre.data);
        setTextoProdutos(textProducts.data);
        setTelephoneInfo(cellphone.data);
        setEnderecoInfo(address.data);
        setFacebookInfo(facebookLink.data);
        setInstagramInfo(instagramLink.data);
        setWhatsappInfo(whatsAppNumber.data);
        
      } catch (error) {
        console.warn(error);
        alert(error.message);
      }

    }

    getHomeInfo();

  }, []);

  // UseEffect para inicializar as imagens da Home
  useEffect(() => {
    
    async function getHomeImages(){
      const responseCarousel = await api.get('/home/images?img_place=carousel',
      {
        headers: { authorization: `bearer ${token}` },
      });

      let imagesCarousel = []
      if(responseCarousel.data){
        imagesCarousel = responseCarousel.data.map(item => ({
          file: `${bucketAWS}${item.image_id}`,
          imgSrc: item.imgSrc, 
          imgAlt: item.imgAlt, 
          imgPlace: item.imgPlace
        }));
      }

      const responseWhoWeAre = await api.get('/home/images?img_place=whoWeAre',
      {
        headers: { authorization: `bearer ${token}` },
      });

      
      let imagesWhoWeAre = {}
      if(responseWhoWeAre.data[0]){
        const { image_id, imgSrc, imgAlt, imgPlace } = responseWhoWeAre.data[0];
        imagesWhoWeAre = {
          file: `${bucketAWS}${image_id}`,
          imgSrc: imgSrc, 
          imgAlt: imgAlt, 
          imgPlace: imgPlace
        };
      }

      const responseProducts = await api.get('/home/images?img_place=products',
      {
        headers: { authorization: `bearer ${token}` },
      });
      // const imagesProducts = responseProducts.data;
      let imagesProducts = []
      if(responseProducts.data){
        imagesProducts = responseProducts.data.map(item => ({
          file: `${bucketAWS}${item.image_id}`,
          imgSrc: item.imgSrc, 
          imgAlt: item.imgAlt, 
          imgPlace: item.imgPlace
        }));
      }

      setImagesCarousel([...imagesCarousel])
      setImagesWhoWeAre(imagesWhoWeAre)
      setImagesProducts([...imagesProducts])
    
    }

    getHomeImages();

  }, []);

  return (
    <div className="fullContent">
      <div className="divCarousel">
        {imagesCarousel.length > 0? 
          <Carousel 
            controls={true}
            indicators={true}
            interval={1000}
            prevIcon={<MdKeyboardArrowLeft />}
            nextIcon={<MdKeyboardArrowRight />}
          >
            {
              imagesCarousel.map(item => {
                return (
                  <Carousel.Item>
                    <div className="teste">
                      <img src={item.file} alt={item.imgAlt} />
                    </div>
                  </Carousel.Item>
                );
              })
            }
              {/* <Carousel.Item>
                <div className="teste">
                <img src={imagesCarousel[1].imgSrc} alt={imagesCarousel[1].imgAlt} />
                </div>
                </Carousel.Item>
                <Carousel.Item>
                <div className="teste">
                <img src={imagesCarousel[2].imgSrc} alt={imagesCarousel[2].imgAlt} />
                </div>
              </Carousel.Item> */}
          </Carousel>
          :
            <span style={{alignSelf: 'center'}}>Sem imagem</span>
          }
        </div>
      <div className="divQuemSomos">
        <h2>
          Quem Somos
          <div className="lineUnderTitle" />
        </h2>
        <div className="conteudoQuemSomos">
          <span>
            {textoQuemSomos}
          </span>
          {imagesWhoWeAre.file ? 
            <img src={imagesWhoWeAre.file} alt={imagesWhoWeAre.imgAlt} />
            : <span style={{textAlign: 'center'}}>Sem imagem</span>
          }
        </div>
      </div>
      <div className="divNossosProdutos">
          <h2>
            Nossos Produtos
            <div className="lineUnderTitle" />
          </h2>
          <span>
            {textoQuemSomos}
          </span>
          <div className="divCardsExterna">
            { 
            imagesProducts.length > 0 ? 
              imagesProducts.map( item => {
                return (
                  <CardProdutosHome imgSrcProduto={item.file} 
                    imgAltProduto={item.imgAlt} 
                    nomeProduto={item.imgAlt} 
                  />
                );
              }) :
              <span style={{textAlign: 'center'}}>Sem imagem</span>
            }
          </div>
      </div>

    </div>
  );
}

export default Home;
