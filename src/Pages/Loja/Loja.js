import React, { useState, useEffect, useRef } from 'react';
import './Loja.css';
import api from '../../services/api';
import ProductCard from '../../components/ProductCard';
import { FaFilter, FaSearch } from 'react-icons/fa';
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
//as constantes que eu acrescentei
const total = [
  '15'
]
const limit = []
const pages = []
const currentPage = []
const setCurrentPage = []


function Loja() {

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ product_type: [], gender: [] });

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
        let param = 'maxprice=' + filter.max;
        query.push(param);
      }
      if (filter.min) {
        let param = 'minprice=' + filter.min;
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

  function Pagination() {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      async function loadProducts() {
        const response = await api.get(`/shop?page=${currentPage}&limit=${limit}`);
        setTotal(response.headers['x-total-count']);
        const totalPages = Math.ceil(total / limit);
        const arrayPages = [];
        for (let i = 1; i <= totalPages; i++) {
          arrayPages.push(i);
        }
        setPages(arrayPages);
        setProducts(response.data);
      }
      loadProducts();
    }, [currentPage, limit, total]);
  }


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

          {FILTER_OPTIONS.map((option, index) => {
            return (
              <div className="filtersProducts">
                <input type="checkbox" id={`filter-${index}`} name={option} onChange={handleInputChange}/>
                <label for={`filter-${index}`}>{option}</label>
              </div>
            )
          })}

          <div className="priceContainer">
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

      <div className="pagination">
        <div>Quantidade {total} </div>
        <div className="pagination_button">
          <div className="pagination_item">Anterior</div>
          {pages.map(page => (
            <div className="pagination_item" key={page} onClick={() => setCurrentPage(page)}>{page}</div>
          ))}
          <div className="pagination_item">Próximo</div>
        </div>
      </div>
    </div>

  );
}

//Paloma: acescentei a funcao Pagination e pus a parte do pagination no response, e pus a const total tb
export default Loja;
