import React, { useContext, useState, useEffect } from "react";
import CardPedido from "../../components/CardPedido";
import DadosPessoais from "../../components/DadosPessoais/DadosPessoais";
import Enderecos from "../../components/Enderecos";
import PopUpChangeAddress from "../../components/PopUpChangeAddress";
import MetaData from '../../meta/reactHelmet';
import api from '../../services/api';
import { LoginContext } from '../../contexts/LoginContext';
import { useHistory } from 'react-router-dom';
import ExcludeDialog from "../../components/ExcludeDialog/ExcludeDialog";

import "./Perfil.css";

function Perfil() {

  const { user, logOut, token } = useContext(LoginContext);
  const [userAddress, setUserAddress] = useState({});
  const [userOrders, setUserOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dialogItem, setDialogItem] = useState({ open: false, item: null });
  const history = useHistory();

  const meta = {
    titlePage: "Uniformes Ecommerce | Perfil",
    titleSearch: "Profit Uniformes | Perfil",
    description:
      "Verifique seus dados pessoais e informações de envio juntamente com seus pedidos no perfil profit!",
    keyWords: "Uniformes | Perfil | Ecommerce | Profit",
    imageUrl: "",
    imageAlt: "",
  };

  function handleClose() {
    setDialogItem({ open: false, item: null });
  }

  function handleOpen(item) {
    setDialogItem({ open: true, item: item });
  }

  async function deleteUser() {
    try {
      await api.delete(`/users/delClient/${user.user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleClose();
      history.push("/")
      logOut();
    } catch (error) {
      console.warn(error);
      handleClose();
      alert("Erro ao excluir usuário");
    }
  }

  useEffect(() => {
    
    try {
      async function getAddress() {
        const response = await api.get("/address/${user.user_id}", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("aqi", response);
        if (response.data.adresses.length > 0) {
          setUserAddress(response.data.adresses[0]);
        }
        console.log("resposta", response.data.adresses[0]);
      }

      async function getOrders() {
        const response = await api.get(
          `/order/userorder/${user.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("orders", response);
        if (response.data) {
          setUserOrders(response.data);
        }
      }
      getAddress();
      getOrders();

    } catch (err) {
      console.warn(err);
    }
  }, []);

  // Chamado quando address atualiza (depois do popUp fechar)
  useEffect(() => {
    const newAddress = {
      updatedFields: {
        street: userAddress.street,
        neighborhood: userAddress.neighborhood,
        city: userAddress.city,
        state: userAddress.state,
        zip_code: userAddress.zip_code,
        country: userAddress.country,
        complement: userAddress.complement,
      },
    };

    async function updateAddress() {
      await api.put(`/address/${userAddress.address_id}`, newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    // somente se existir endereço
    if (userAddress.address_id) {
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
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <div className="personalDataContainer">
        <h1 className="titleProfile">
          DADOS PESSOAIS
          <span className="titleLine" />
        </h1>
        <div className="containerDados">
            <DadosPessoais dado={user} />
        </div>

        <div className="containerEndereço">
          {userAddress !== {} && user.user_type === 'client' ? (
            <Enderecos
              endereço={userAddress}
              handleOpenModal={handleOpenModal}
            />
          ) : null}
        </div>

        <div>
          <button
            className="button-perfil"
            style={{ width: "22vw", marginTop: "5vh" }}
            onClick={() => handleOpen(user)}
          >
            Apagar conta
          </button>
        </div>
      </div>

      <div className="ordersContainer">
        <h1 className="titleProfile">
          MEUS PEDIDOS
          <span className="titleLine" />
        </h1>
        <div className="containerPedidos">
          {userOrders.length > 0 ? (
            userOrders.map((pedido, index) => (
              <CardPedido key={index} pedido={pedido} token={token} />
            ))
          ) : (
            <span>Sem pedidos</span>
          )}
        </div>
      </div>
      <PopUpChangeAddress
        open={openModal}
        handleClose={handleCloseModal}
        setAddress={setUserAddress}
        address={userAddress}
      />
      <ExcludeDialog
        open={dialogItem.open}
        handleClose={handleClose}
        title={dialogItem.item?.name}
        callback={deleteUser}
      />
    </div>
  );
}

export default Perfil;
