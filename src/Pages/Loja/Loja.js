import React, { useState, useEffect, useRef } from "react";
import "./Loja.css";
import api from "../../services/api";
import ProductCard from "../../components/ProductCard";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import MetaData from "../../meta/reactHelmet";
import { FaFilter, FaSearch, FaTruckLoading } from "react-icons/fa";
import _ from "lodash";
import ShopSkeleton from "../../components/Skeletons/ShopSkeleton";
import MobileShopSkeleton from "../../components/Skeletons/MobileShopSkeleton";

const FILTER_OPTIONS = [
  "FEMININO",
  "MASCULINO",
  "ESPORTIVO",
  "UNIVERSITÁRIO",
  "EMPRESARIAL",
  "BONÉS",
];
const PRICE_OPTIONS = [
  "Até R$25,00",
  "R$25,00 - R$50,00",
  "R$50,00 - R$100,00",
  "R$100,00 - R$150,00",
  "Acima de R$150,00",
  "Qualquer valor",
];

function Loja() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ product_type: [], gender: [] });
  const page = useRef(1);
  const pageLoading = useRef(false);

  const meta = {
    titlePage: "Uniformes Ecommerce | Loja",
    titleSearch: "Profit Uniformes | Loja",
    description:
      "Uniformes e bonés personalizados para sua empresa, universidade, time e muito mais. Venha conhecer nossos modelos e suas possibilidades de personalização!",
    keyWords: "Uniformes | Loja | Ecommerce | Profit",
    imageUrl: "",
    imageAlt: "",
  };

  const inputSearch = useRef(null);
  const history = useHistory();

  async function getProducts() {
    //fazendo a requisição pro back

    try {
      let query = [];
      if (filter.product_type.length > 0) {
        let products_type = filter.product_type.join(",");
        let param = "product_type=" + products_type;
        query.push(param);
      }
      if (filter.gender.length === 1) {
        let genders = filter.gender.join(",");
        let param = "gender=" + genders;
        query.push(param);
      }
      if (filter.max) {
        const param = "maxprice=" + filter.max;
        query.push(param);
      }
      if (filter.min) {
        const param = "minprice=" + filter.min;
        query.push(param);
      }
      if (filter.name) {
        const param = "name=" + filter.name;
        query.push(param);
      }
      if (page.current !== 1) {
        const param = "page=" + page.current;
        query.push(param);
      }
      setLoading(true);
      const response = await api.get(`/product?${query.join("&")}`);

      return response.data.products;
    } catch (error) {
      setLoading(false);
      console.warn(error);
      alert("Erro no servidor.");
      history.push("Error");
    }
  }

  useEffect(() => {
    page.current = 1;
    getProducts().then((newProducts) => {
      setProducts(newProducts);
      setTimeout(() => {
        setLoading(false);
      }, [500]);
    });
  }, [filter]);

  function handleInputChange(e) {
    const newFilter = { ...filter };
    let fieldProductType;
    let fieldGender;
    switch (e.target.name) {
      case "FEMININO":
        fieldGender = "F";
        break;

      case "MASCULINO":
        fieldGender = "M";
        break;

      case "ESPORTIVO":
        fieldProductType = "sport";
        break;

      case "UNIVERSITÁRIO":
        fieldProductType = "university";
        break;

      case "EMPRESARIAL":
        fieldProductType = "company";
        break;

      case "BONÉS":
        fieldProductType = "cap";
        break;
      default:
        break;
    }

    const checked = e.target.checked;

    if (checked) {
      if (fieldProductType) newFilter.product_type.push(fieldProductType);
      else if (fieldGender) newFilter.gender.push(fieldGender);
    } else {
      if (fieldProductType)
        _.remove(newFilter.product_type, (el) => el === fieldProductType);
      else if (fieldGender)
        _.remove(newFilter.gender, (el) => el === fieldGender);
    }
    setFilter(newFilter);
  }

  function handlePriceChange(e) {
    let min = 0;
    let max = 0;
    const newFilter = { ...filter };
    delete newFilter.min;
    delete newFilter.max;

    switch (e.target.value) {
      case "Até R$25,00":
        min = 0;
        max = 25;
        break;
      case "R$25,00 - R$50,00":
        min = 25;
        max = 50;
        break;
      case "R$50,00 - R$100,00":
        min = 50;
        max = 100;
        break;
      case "R$100,00 - R$150,00":
        min = 100;
        max = 150;
        break;
      case "Acima de R$150,00":
        min = 150;
        break;

      case "Qualquer valor":
        min = 0;
        max = 0;
        break;

      default:
        break;
    }

    if (min > 0) newFilter.min = min;
    if (max > 0) newFilter.max = max;

    setFilter(newFilter);
  }

  function findProduct() {
    const nameToSearch = inputSearch.current.value;

    const filterWithName = { ...filter };

    filterWithName.name = nameToSearch;

    setFilter(filterWithName);

    // alert("Você está pesquisando!")
  }

  useEffect(() => {
    function handleScroll() {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        //bottom reached
        //Fuçã que faz requisição no back pela proxima pagina
        loadNextPage();
        //.then(setOngsData)
        //.catch((error) => console.error(error));
      }
    }
    function loadNextPage() {
      if (!pageLoading.current) {
        pageLoading.current = true;
        page.current++;

        getProducts().then((newProducts) => {
          if (newProducts) {
            setProducts([...products, ...newProducts]);
            pageLoading.current = false;
          }
        });
        setLoading(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  function selectSkeleton() {
    if (window.innerWidth < 500) {
      return <MobileShopSkeleton />;
    } else return <ShopSkeleton />;
  }

  function messageError() {
    if (products.length === 0) {
      alert("Não há produtos");
      history.push("/");
    }
  }

  return (
    <div className="shop">
      {messageError()}
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      {products.length !== 0 && !loading ? (
        <>
          <div className="search">
            <input
              id="search"
              type="text"
              ref={inputSearch}
              placeholder="O que você precisa?"
            />

            <FaSearch onClick={findProduct} className="searchButton" />
          </div>
          <div className="shopContainer">
            <div className="filterContainer">
              <div className="filterTitleProducts">
                <FaFilter /> FILTRAR
              </div>
              <div className="filterContent">
                {FILTER_OPTIONS.map((option, index) => {
                  return (
                    <div className="filtersProducts">
                      <input
                        type="checkbox"
                        id={`filter-${index}`}
                        name={option}
                        onChange={handleInputChange}
                        className="checkbox"
                      />
                      <label for={`filter-${index}`}>{option}</label>
                    </div>
                  );
                })}

                <div className="priceContainer">
                  <br />
                  <p>PREÇO</p>

                  {PRICE_OPTIONS.map((price, index) => {
                    return (
                      <div className="filterPrice">
                        <input
                          type="radio"
                          id={`price-${index}`}
                          name="price"
                          onChange={handlePriceChange}
                          value={price}
                          className="radio"
                        />
                        <label for={`price-${index}`}>{price}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="productContainer">
              {products.map((product) => (
                <ProductCard key={product.product_model_id} product={product} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>{selectSkeleton()}</>
      )}
    </div>
  );
}

export default Loja;
