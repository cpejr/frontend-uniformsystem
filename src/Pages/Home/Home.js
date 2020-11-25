import React, {useState} from 'react';

import { Carousel } from 'react-bootstrap';

import camisa from '../../Assets/camisa.jpg';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';


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


  return (
    <div className="fullContent">
      <div className="divCarousel">
        <Carousel 
          controls={true}
          indicators={true}
          interval={1000}
          prevIcon={<MdKeyboardArrowLeft />}
          nextIcon={<MdKeyboardArrowRight />}
        >
                <Carousel.Item>
                  <div className="teste">
                    <img src={conteudoHome.Carrossel[0].imgSrc} alt={conteudoHome.Carrossel[0].imgAlt} />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="teste">
                    <img src={conteudoHome.Carrossel[1].imgSrc} alt={conteudoHome.Carrossel[1].imgAlt} />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="teste">
                    <img src={conteudoHome.Carrossel[2].imgSrc} alt={conteudoHome.Carrossel[2].imgAlt} />
                  </div>
                </Carousel.Item>
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
