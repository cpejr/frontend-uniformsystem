import React, {useState} from 'react';

import { Carousel } from "react-responsive-carousel";

import camisa from '../../Assets/camisa.jpg';

import './Home.css'

const CardProdutosHome = ({ imgSrcProduto, imgAltProduto, nomeProduto}) => {
  console.log(imgSrcProduto)
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
      texto: '',
      imgSrc: camisa,
      imgAlt: '',
    },
    NossosProdutos: {
      Cards: [
        {
          imgSrc: camisa,
          imgAlt: 'teste',
          NomeProduto: 'Nome',
        },
        {
          imgSrc: camisa,
          imgAlt: 'teste',
          NomeProduto: 'Nome',
        },
        {
          imgSrc: camisa,
          imgAlt: 'teste',
          NomeProduto: 'Nome',
        },
      ]
    }
  }

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  return (
    <div className="fullContent">
      <div className="divCarousel">
        <Carousel 
          showArrows={true}
          showIndicators={false}
          // width="100"
          showThumbs={false}
          showStatus={false}
          // indicators={false}
          // interval={1000}
        >
          {
            conteudoHome.Carrossel.map(item => {
              return (
                // <Carousel.Item>
                  <div>
                    <img src={item.imgSrc} alt={item.imgSrc} />
                  </div>
                // </Carousel.Item>
              );
            })
          }
        </Carousel>
      </div>
      <div className="divQuemSomos">
        <h2>
          Quem Somos
          <div className="lineUnderTitle" />
        </h2>
        <div className="conteudoQuemSomos">
          <span>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita 
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita 
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
            eirmod tempor invidunt ut labore et.
          </span>
          <img src={conteudoHome.QuemSomos.imgSrc} alt={conteudoHome.QuemSomos.imgAlt} />
        </div>
      </div>
      <div className="divNossosProdutos">
          <h2>
            Nossos Produtos
            <div className="lineUnderTitle" />
          </h2>
          <span>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita 
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita 
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
            eirmod tempor invidunt ut labore et.
          </span>
          <div className="divCardsExterna">
            { 
              conteudoHome.NossosProdutos.Cards.map( item => {
                return (
                  <CardProdutosHome imgSrcProduto={item.imgSrc} 
                    imgAltProduto={item.imgAlt} 
                    nomeProduto={item.NomeProduto} 
                  />
                );
              })
            }
          </div>
      </div>

    </div>
  );
}

export default Home;
