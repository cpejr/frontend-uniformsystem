import React, { useContext } from 'react';

import { LoginContext } from '../../../contexts/LoginContext';

import './OrdersAdm.css'

async function getOrders(){
  try {
   
  } catch (err) {

  }
}

function OrdersAdm(){

  const { token } = useContext(LoginContext);

  return (
    <div>
      <h1>Pedidos ADM</h1>
      </div>
  );
}

export default OrdersAdm;
