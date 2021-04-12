import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";
import api from "../../services/api";
import MetaData from "../../meta/reactHelmet";
import { HiOutlineMail } from "react-icons/hi";
import "./Contato.css";

function Contato() {
  const [FacebookInfo, setFacebookInfo] = useState("");
  const [EnderecoInfo, setEnderecoInfo] = useState("");
  const [EmailInfo, setEmailInfo] = useState("");
  const [InstagramInfo, setInstagramInfo] = useState("");
  const [cellphoneInfo, setCellphoneInfo] = useState("");
  const [WhatsAppInfo, setWhatsAppInfo] = useState("");
  const [InstagramLinkInfo, setInstagramLinkInfo] = useState("");
  const [FacebookLinkInfo, setFacebookLinkInfo] = useState("");

  const meta = {
    titlePage: "Uniformes E-commerce | Contato",
    titleSearch: "Contato Profit Uniformes",
    description: "Entre em contato conosco!",
    keyWords: "Contato",
    imageUrl: "",
    imageAlt: "",
  };

  useEffect(() => {
    async function getContactInfo() {
      try {
        const response = await api.get("/home/info");
        if (response.data.length === 0) {
          throw new Error("Home info is Empty");
        }
        const address = response.data.filter((item) =>
          item.key === "address" ? item.data : null
        )[0];
        const email = response.data.filter((item) =>
          item.key === "email" ? item.data : null
        )[0];
        const facebookUsername = response.data.filter((item) =>
          item.key === "facebookUsername" ? item.data : null
        )[0];
        const instagramUsername = response.data.filter((item) =>
          item.key === "instagramUsername" ? item.data : null
        )[0];
        const cellphone = response.data.filter((item) =>
          item.key === "cellphone" ? item.data : null
        )[0];
        const WhatsappLink = response.data.filter((item) =>
          item.key === "whatsAppLink" ? item.data : null
        )[0];
        const InstagramLinkInfo = response.data.filter((item) =>
          item.key === "instagramLink" ? item.data : null
        )[0];
        const FacebookLinkInfo = response.data.filter((item) =>
          item.key === "facebookLink" ? item.data : null
        )[0];
        setEnderecoInfo(address.data);
        setEmailInfo(email.data);
        setFacebookInfo(facebookUsername.data);
        setInstagramInfo(instagramUsername.data);
        setCellphoneInfo(cellphone.data);
        setWhatsAppInfo(WhatsappLink.data);
        setInstagramLinkInfo(InstagramLinkInfo.data);
        setFacebookLinkInfo(FacebookLinkInfo.data);
      } catch (error) {
        console.warn(error);
      }
    }
    getContactInfo();
  }, []);

  return (
    <div className="divPagContato">
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <div className="fundoCinza">
        <div className="divFundoBrancoContato">
          <div className="tituloContato">
            <h1 className="escritaTituloC">Contato</h1>
          </div>
          <div className="divisor"></div>

          <div className="divRedesSociais">
            <a
              href={`${InstagramLinkInfo}`}
              target="_blank"
              rel="noreferrer"
              className="linksContato"
            >
              <FaInstagram className="iconsContato" />
              <h3 className="escritaContato">
                {InstagramInfo === "" ? "Sem dados" : `@${InstagramInfo}`}
              </h3>
            </a>
            <a
              href={`${WhatsAppInfo}`}
              target="_blank"
              rel="noreferrer"
              className="linksContato"
            >
              <FaWhatsapp className="iconsContato" />
              <h3 className="escritaContato">
                {cellphoneInfo === "" ? "Sem dados" : cellphoneInfo}
              </h3>
            </a>
            <a
              href={`${FacebookLinkInfo}`}
              target="_blank"
              rel="noreferrer"
              className="linksContato"
            >
              <FaFacebook className="iconsContato" />
              <h3 className="escritaContato">
                {FacebookInfo === "" ? "Sem dados" : FacebookInfo}
              </h3>
            </a>
          </div>

          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noreferrer"
            className="aEmail"
          >
            <HiOutlineMail className="envelopeContato" />
            <h3 className="escritaEmail">{ EmailInfo === "" ? "emailgenerico@gmail.com" : EmailInfo}</h3>
          </a>

          <a
            href={`https://www.google.com.br/maps/${EnderecoInfo}`}
            target="_blank"
            rel="noreferrer"
            className="aLocal"
          >
            <FaMapMarkerAlt className="envelopeContato" />
            <h3 className="escritaLocalização">
              {EnderecoInfo === "" ? "Sem dados" : EnderecoInfo}
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contato;
