import React from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import './Contato.css'

function Contato(){
  return (
    <div className="divPagContato">
      <div className="fundoCinza">
        <div className="divFundoBrancoContato">
          <div className="tituloContato">
            <h1>Contato</h1>
          </div>
          <div className="divRedesSociais">
            <a href="https://www.instagram.com" className="linksContato">
              <FaInstagram className="iconsContato"/>
            </a>
            <a href="https://www.whatsapp.com" className="linksContato">
              <FaWhatsapp className="iconsContato"/>
            </a>
            <a href="https://www.facebook.com" className="linksContato">
              <FaFacebook className="iconsContato"/>
            </a>
          </div>
          <div className="divEmail">
            <HiOutlineMail className="iconsContato"/>
          </div>
          <div className="divLocal">
            <FaMapMarkerAlt className="iconsContato"/>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contato;
