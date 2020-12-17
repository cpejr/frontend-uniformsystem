import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import ProductCardAdm from '../../../components/ProductCardAdm';
import { FaFilter, FaSearch } from 'react-icons/fa';
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

function ProductsAdm() {

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ product_type: [], gender: [] });
  const page = useRef(1);
  const pageLoading = useRef(false);
  const inputSearchAdm = useRef(null);

  async function getProducts() {
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
      if (page.current !== 1) {
        const param = 'page=' + page.current;
        query.push(param);
      }
      if(filter.name){
        const param = 'name=' + filter.name;
        query.push(param);
      }
      const response = await api.get(`/product?${query.join('&')}`);
      return (response.data.products);
    }
    catch (error) {
      console.warn(error);
      alert("Erro no servidor.");
    }
  }

  useEffect(() => {
    page.current = 1;
    getProducts().then(newProducts => {
      setProducts(newProducts);
    });
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


  function handleNameChange(){
    const product_name = inputSearchAdm.current.value;

    const filterName = {...filter}
    filterName.name = product_name;

    setFilter(filterName)
    //alert('vc está procurando');
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
        getProducts().then(newProducts => {
          setProducts([...products, ...newProducts]);
          pageLoading.current = false;
        })
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);


  return (
    <div className="products-adm">
      <div className="search-products-name">
        <input
          id='search-name'
          type='text'
          ref={inputSearchAdm}
          placeholder="Digite o nome do produto"
        />
        <FaSearch  onClick = {handleNameChange} className="search-button-adm" />
      </div>
      <div className="products-container">

      <div className="sidebar-container">
        <Link className="button-content" to="/adm/produtos/cadastro"> CADASTRAR NOVO PRODUTO</Link>

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
            </div>
          </div>

        </div>

        <div className="cards-products">
          {products.map(product =>
            <ProductCardAdm key={product.product_model_id} product={product} />
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductsAdm;
