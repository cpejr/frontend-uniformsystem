import React, { useState, useEffect } from "react";
import MetaData from "../../meta/reactHelmet";
import { Carousel } from "react-bootstrap";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import api from "../../services/api";

import "./Home.css";

const CardProdutosHome = ({ imgSrcProduto, imgAltProduto, nomeProduto }) => {
  return (
    <div className="divCardProdutos">
      <img src={imgSrcProduto} alt={imgAltProduto} />
      <strong>{nomeProduto}</strong>
    </div>
  );
};

function Home() {

  const meta = {
    titlePage: "Uniformes Ecommerce | Home",
    titleSearch: "Profit Uniformes | Home",
    description:
      "Loja on-line de uniformização profissional. Venha conhecer nossos produtos!",
    keyWords: "Uniformes | Home | Ecommerce | Profit",
    imageUrl: "",
    imageAlt: "",
  };

  // Estado para armazenar Imagens do Carrossel
  const [imagesCarousel, setImagesCarousel] = useState([]);

  // Estado para armazenar Imagem de Quem Somos
  const [imagesWhoWeAre, setImagesWhoWeAre] = useState({});

  // Estado para armazenar Imagens de Produtos
  const [imagesProducts, setImagesProducts] = useState([]);

  // Estados para armazenar textos
  const [textoQuemSomos, setTextoQuemSomos] = useState("");

  // Estados para armazenar textos
  const [textoProdutos, setTextoProdutos] = useState("");

  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

  // UseEffect para inicializar as informações da Home
  useEffect(() => {
    async function getHomeInfo() {
      try {
        const response = await api.get("/home/info");

        if (response.data.length === 0) {
          throw new Error("Home info is Empty");
        }

        const textWhoWeAre = response.data.filter((item) =>
          item.key === "textWhoWeAre" ? item.data : null
        )[0];

        const textProducts = response.data.filter((item) =>
          item.key === "textProducts" ? item.data : null
        )[0];

        setTextoQuemSomos(textWhoWeAre.data);
        setTextoProdutos(textProducts.data);
      } catch (error) {
        console.warn(error);
        // history.push('Error');
      }
    }

    getHomeInfo();
  }, []);

  // UseEffect para inicializar as imagens da Home
  useEffect(() => {
    async function getHomeImages() {
      const responseCarousel = await api.get("/home/images?img_place=carousel");

      let imagesCarousel = [];
      if (responseCarousel.data) {
        imagesCarousel = responseCarousel.data.map((item) => ({
          file: `${bucketAWS}${item.image_id}`,
          imgSrc: item.imgSrc,
          imgAlt: item.imgAlt,
          imgPlace: item.imgPlace,
        }));
      }

      const responseWhoWeAre = await api.get("/home/images?img_place=whoWeAre");

      let imagesWhoWeAre = {};
      if (responseWhoWeAre.data[0]) {
        const { image_id, imgSrc, imgAlt, imgPlace } = responseWhoWeAre.data[0];
        imagesWhoWeAre = {
          file: `${bucketAWS}${image_id}`,
          imgSrc: imgSrc,
          imgAlt: imgAlt,
          imgPlace: imgPlace,
        };
      }

      const responseProducts = await api.get("/home/images?img_place=products");
      // const imagesProducts = responseProducts.data;
      let imagesProducts = [];
      if (responseProducts.data) {
        imagesProducts = responseProducts.data.map((item) => ({
          file: `${bucketAWS}${item.image_id}`,
          imgSrc: item.imgSrc,
          imgAlt: item.imgAlt,
          imgPlace: item.imgPlace,
        }));
      }

      setImagesCarousel([...imagesCarousel]);
      setImagesWhoWeAre(imagesWhoWeAre);
      setImagesProducts([...imagesProducts]);
    }

    getHomeImages();
  }, []);

  return (
    <div className="fullContent">
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <div className="divCarousel">
        {imagesCarousel.length > 0 ? (
          imagesCarousel.length === 1 ? (
            <div className="imgCarousel">
              <img
                src={imagesCarousel[0].file}
                alt={imagesCarousel[0].imgAlt}
                style={{ height: "100vh" }}
              />
            </div>
          ) : (
            <Carousel
              controls={true}
              indicators={true}
              interval={1000}
              prevIcon={<MdKeyboardArrowLeft />}
              nextIcon={<MdKeyboardArrowRight />}
            >
              {imagesCarousel.map((item) => {
                return (
                  <Carousel.Item>
                    <div className="imgCarousel">
                      <img
                        src={item.file}
                        alt={item.imgAlt}
                        style={{ height: "100vh" }}
                      />
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          )
        ) : (
          <span style={{ alignSelf: "center" }}>Sem imagem</span>
        )}
      </div>
      <div className="divQuemSomos">
        <h2>
          Quem Somos
          <div className="lineUnderTitle" />
        </h2>
        <div className="conteudoQuemSomos">
          <span>{textoQuemSomos}</span>
          {imagesWhoWeAre.file ? (
            <img src={imagesWhoWeAre.file} alt={imagesWhoWeAre.imgAlt} />
          ) : (
            <span style={{ textAlign: "center" }}>Sem imagem</span>
          )}
        </div>
      </div>
      <div className="divNossosProdutos">
        <h2>
          Nossos Produtos
          <div className="lineUnderTitle" />
        </h2>
        <span>{textoProdutos}</span>
        <div className="divCardsExterna">
          {imagesProducts.length > 0 ? (
            imagesProducts.map((item) => {
              return (
                <CardProdutosHome
                  imgSrcProduto={item.file}
                  imgAltProduto={item.imgAlt}
                  nomeProduto={item.imgAlt}
                />
              );
            })
          ) : (
            <span style={{ textAlign: "center" }}>Sem imagem</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
