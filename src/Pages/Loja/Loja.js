import React, { useState, useEffect, useRef } from 'react';
import './Loja.css';
import api from '../../services/api';
import ProductCard from '../../components/ProductCard';
import { FaFilter, FaSearch, FaTruckLoading } from 'react-icons/fa';
import _ from 'lodash';

const FILTER_OPTIONS = [
  'FEMININO',
  'MASCULINO',
  'ESPORTIVO',
  'UNIVERSITÁRIO',
  'EMPRESARIAL',
  'BONÉS',
]
const PRICE_OPTIONS = [
  'Até R$25,00',
  'R$25,00 - R$50,00',
  'R$50,00 - R$100,00',
  'R$100,00 - R$150,00',
  'Acima de R$150,00',
  'Qualquer valor'
]


function Loja() {

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ product_type: [], gender: [] });
  const page = useRef(1);

  async function getProducts() { //fazendo a requisição pro back
    try {

      let query = [];
      if (filter.product_type.length > 0) {
        let products_type = filter.product_type.join(',');
        let param = 'product_type=' + products_type;
        query.push(param);
      }
      if (filter.gender.length === 1) {
        let genders = filter.gender.join(',');
        let param = 'gender=' + genders;
        query.push(param);
      }
      if (filter.max) {
        const param = 'maxprice=' + filter.max;
        query.push(param);
      }
      if (filter.min) {
        const param = 'minprice=' + filter.min;
        query.push(param);
      }
      if (page.current!==1){
        const param = 'page='+ page.current;
        query.push(param);
      }

      const response = await api.get(`/productmodels?${query.join('&')}`);
      console.log(response);
      setProducts([...response.data.models]);
    }
    catch (error) {
      console.warn(error)
      alert("Erro no servidor.");
    }
  }

  useEffect(() => {
    page.current = 1;
    getProducts()
  }, [filter])

  function handleInputChange(e) {
    const newFilter = { ...filter };
    let fieldProductType;
    let fieldGender;
    switch (e.target.name) {
      case 'FEMININO':
        fieldGender = 'F';
        break;

      case 'MASCULINO':
        fieldGender = 'M'
        break;

      case 'ESPORTIVO':
        fieldProductType = 'sport';
        break;

      case 'UNIVERSITÁRIO':
        fieldProductType = 'university';
        break;

      case 'EMPRESARIAL':
        fieldProductType = 'company';
        break;

      case 'BONÉS':
        fieldProductType = 'cap'
        break;
        default: break;
    }

    const checked = e.target.checked;

    if (checked) {
      if (fieldProductType)
        newFilter.product_type.push(fieldProductType);
      else if (fieldGender)
        newFilter.gender.push(fieldGender);
    }
    else {
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
      case 'Até R$25,00':
        max = 25;
        break;
      case 'R$25,00 - R$50,00':
        min = 25;
        max = 50;
        break;
      case 'R$50,00 - R$100,00':
        min = 50;
        max = 100;
        break;
      case 'R$100,00 - R$150,00':
        min = 100;
        max = 150;
        break;
      case 'Acima de R$150,00':
        min = 150;
        break;

      case 'Qualquer valor':
        min = 0;
        max = 0;
        break;

        default: break;

    }

    if (min > 0)
      newFilter.min = min;
    if (max > 0)
      newFilter.max = max;

    setFilter(newFilter);

  }

  function findProduct() {
    alert("Você está pesquisando!")
  }

  function loadNextPage(){
    page.current++;
    getProducts();
  }



//coisas que eu fiz agr a tarde
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
		window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <div className="shop">
      <div className="search">
        <input
          id='search'
          type='text'
          placeholder="O que você precisa?"
        />

        <FaSearch onClick={findProduct} className="searchButton" />
      </div>

      <div className="shopContainer">

        <div className="filterContainer">
          <div className="filterTitleProducts">
            <FaFilter />  FILTROS
            </div>
          {
            FILTER_OPTIONS.map((option, index) => {
              return (
                <div className="filtersProducts">
                  <input type="checkbox" id={`filter-${index}`} name={option} onChange={handleInputChange} />
                  <label for={`filter-${index}`}>{option}</label>
                </div>
              )
            })
          }

          <div className="priceContainer">
            <br></br>
            <p>PREÇO</p>

            {PRICE_OPTIONS.map((price, index) => {
              return (
                <div className="filterPrice">
                  <label for={`price-${index}`}>{price}</label>
                  <input type="radio" id={`price-${index}`} name="price" onChange={handlePriceChange} value={price} />
                </div>
              )
            })}
          </div>
        </div>

        <div className="productContainer">
          {products.map(product =>
            <ProductCard key={product.product_model_id} product={product} />
          )}
      </div>
      </div>

      

      
    </div>

  );
}


export default Loja;

