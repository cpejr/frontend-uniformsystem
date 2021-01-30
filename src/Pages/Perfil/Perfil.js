import React, { useContext, useState, useEffect } from "react";
import CardPedido from "../../components/CardPedido";
import DadosPessoais from "../../components/DadosPessoais/DadosPessoais";
import Enderecos from "../../components/Enderecos";
import PopUpChangeAddress from "../../components/PopUpChangeAddress";

import api from '../../services/api';
import { LoginContext } from '../../contexts/LoginContext';

import "./Perfil.css";

function Perfil() {

  const { user, token } = useContext(LoginContext);
  console.log('usuario', user)
  const currentUser = user[0];
  const [userAddress, setUserAddress] = useState({});
  const [userOrders, setUserOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    try{
      async function getAddress(){
        const response = await api.get('/address',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        );

        console.log('aqi', response)
        if(response.data.adresses.length > 0){
          setUserAddress(response.data.adresses[0]);
        }
        console.log('resposta', response.data.adresses[0])
      }


      async function getOrders(){
        const response = await api.get(`/userorder/${currentUser.user_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        );
        console.log('orders', response)
        if(response.data){
          setUserOrders(response.data);
        }
      }
      getAddress();
      getOrders();

    }catch(err){
      console.warn(err);
    }
  }, []);

  // Chamado quando address atualiza (depois do popUp fechar)
  useEffect(() => {

    const newAddress = {
      updatedFields : {
        street: userAddress.street,
        neighborhood: userAddress.neighborhood,
        city: userAddress.city,
        state: userAddress.state,
        zip_code: userAddress.zip_code,
        country: userAddress.country,
        complement: userAddress.complement,
      }
    }

    async function updateAddress(){
      await api.put(`/address/${userAddress.address_id}`,
      newAddress,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      );
    }
    // somente se existir endereço
    if(userAddress.address_id){
      updateAddress();
    }

  }, [userAddress]);

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  return (
    <div className="profileContainer">
      <div className="personalDataContainer">
        <h1 className="titleProfile">
          DADOS PESSOAIS
          <span className="titleLine"/>
        </h1>
        <div className="containerDados">
            <DadosPessoais dado={currentUser} />
        </div>

        <div className="containerEndereço">
          {
            userAddress !== {} ?
                <Enderecos endereço={userAddress} handleOpenModal={handleOpenModal}/>
            : 
              null
          }
        </div>
      </div>

      <div className="ordersContainer">
        <h1 className="titleProfile">
          MEUS PEDIDOS
          <span className="titleLine"/>
        </h1>
        <div className="containerPedidos">
          { 
            userOrders.length > 0 ?
              userOrders.map((pedido, index) => (
                <CardPedido key={index} pedido={pedido} token={token} />
              ))
            :
            <span>Sem pedidos</span>
          }
        </div>
      </div>
      <PopUpChangeAddress
        open={openModal}
        handleClose={handleCloseModal}
        setAddress={setUserAddress}
        address={userAddress}
      />
    </div>
  );
}

export default Perfil;
