import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import ProductCardAdm from '../../../components/ProductCardAdm';
import { FaFilter } from 'react-icons/fa';
import _ from 'lodash';
import './ProductsAdm.css';

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

function ProductsAdm() {

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ product_type: [], gender: [] });

  async function getProducts() {
    try {
      const response = await api.get('/product');
      console.log(response);
      setProducts([...response.data.products]);
    }
    catch (error) {
      console.warn(error);
      alert("Erro no servidor.");
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

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


  return (
    <div className="products-adm-container">

      <div className="sidebar-container">
        <Link className="button-content" to="/"> CADASTRAR NOVO PRODUTO</Link>

        <div className="filter-container">
          <div className="filterTitleProducts">
            <FaFilter />  FILTRAR
          </div>
          <div className="filter-content">
            {FILTER_OPTIONS.map((option, index) => {
              return (
                <div className="filters-products">
                  <input type="checkbox" id={`filter-${index}`} name={option} onChange={handleInputChange} className="checkbox" />
                  <label for={`filter-${index}`} >{option}</label>
                </div>
              )
            })
            }

            <div className="price-container">
              <br></br>
              <p>PREÇO</p>

              {PRICE_OPTIONS.map((price, index) => {
                return (
                  <div className="filter-price">
                    <input type="radio" id={`price-${index}`} name="price" onChange={handlePriceChange} value={price} className="radio" />
                    <label for={`price-${index}`}>{price}</label>

                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>

      <div className="cards-products">
        {products.map(product =>
          <ProductCardAdm key={product.product_model_id} product={product} />
        )}
      </div>

    </div>
  );
}

export default ProductsAdm;
