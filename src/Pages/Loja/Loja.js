import React, {useState, useEffect} from 'react';
import './Loja.css';
import Header from '../../components/Header';
import api from '../../services/api';

function Loja(){ 

  const [products, setProducts] = useState([]);

  async function getProducts() { //fazendo a requisição pro back
    try{
      const response = await api.get("/product");
      console.log(response);
      setProducts([...response.data.products]);
    }
    catch(error){
      console.warn(error)
      alert("Erro no servidor");
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <Header/>
      
      <div>
        {products.map(product =>
          <ProductCard product={product} />
        )}
      </div>

    </div>
  );
}

export default Loja;
