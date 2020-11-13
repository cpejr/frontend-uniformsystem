import React, { useState, useEffect } from 'react';
import './Loja.css';
import api from '../../services/api';
import ProductCard from '../../components/ProductCard';
import { FaFilter } from 'react-icons/fa';

const FILTER_OPTIONS = [
  'TODOS OS PRODUTOS',
  'FEMININO',
  'MASCULINO',
  'ESPORTIVO',
  'UNIVERSITÁRIO',
  'EMPRESARIAL',
  'CAMISAS',
  'BONÉS',
]
const PRICE_OPTIONS = [
  'Até R$25,00',
  'R$25,00 - R$50,00',
  'R$50,00 - R$100,00',
  'R$100,00 - R$150,00',
  'Acima de R$150,00',
]

function Loja() {

  const [products, setProducts] = useState([]);
  const [route, setRoute] = useState('/productmodels');

  async function getProducts() { //fazendo a requisição pro back
    try {
      const response = await api.get(`${route}`);
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
  }, [])


  const [filter, setFilter] = useState([]);
  const [aux, setAux] = useState(route);

  function handleInputChange(e) {
    const id = e.target.id;
    const query = ['gender=M', 'gender=F', 'product_type=sport'];
    if (filter.indexOf(id) === -1) {
      const newFilter = [...filter, id];
      setFilter(newFilter);
      if (id === 'filter-1') {
        const teste = [aux, query[1]];
        setAux(teste.join('?'));
      }
      if (id === 'filter-2') {
        const teste = [aux, query[0]];
        setAux(teste.join('&'));
      }
      if (id === 'filter-3') {
        const teste = [aux, query[2]];
        setAux(teste.join('&'));
      }
    } else {
      const index = filter.indexOf(id);
      const newFilter = [...filter];
      newFilter.splice(index, 1);
      setFilter(newFilter);
    }
  }


  return (
    <div className="shop">
      <div className="shopContainer">
        <p>{filter.join(" ")}</p>

        <div className="filterContainer">

          <div className="filterTitleProducts">
            <FaFilter />  FILTROS
        </div>

          {FILTER_OPTIONS.map((option, index) => {
            return (
              <div className="filtersProducts">
                <input type="checkbox" id={`filter-${index}`} name="filter" onChange={handleInputChange} />
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
                  <input type="radio" id={`price-${index}`} name="price" onChange={handleInputChange} />
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
