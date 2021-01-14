import React from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import "./Contato.css";

function Contato() {
  return (
    <div className="divPagContato">
      <div className="fundoCinza">
        <div className="divFundoBrancoContato">
          <div className="tituloContato">
            <h1 className="escritaTituloC">Contato</h1>
          </div>
          <div className="divisor"></div>

          <div className="divRedesSociais">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="linksContato"
            >
              <FaInstagram className="iconsContato" />
              <h3 className="escritaContato">Instagram</h3>
            </a>
            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="linksContato"
            >
              <FaWhatsapp className="iconsContato" />
              <h3 className="escritaContato">Whatsapp</h3>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="linksContato"
            >
              <FaFacebook className="iconsContato" />
              <h3 className="escritaContato">Facebook</h3>
            </a>
          </div>

          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noreferrer"
            className="aEmail"
          >
            <HiOutlineMail className="envelopeContato" />
            <h3 className="escritaEmail">emailgenerico@gmail.com</h3>
          </a>

          <a
            href="https://www.google.com.br/maps"
            target="_blank"
            rel="noreferrer"
            className="aLocal"
          >
            <FaMapMarkerAlt className="envelopeContato" />
            <h3 className="escritaLocalização">Localização Genérica</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contato;
