import React, { useEffect, useState, useContext } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "../../Assets/Logo_1.png";

import api from "../../services/api";
import { LoginContext } from "../../contexts/LoginContext";

function ComputerFooter() {
  const { token } = useContext(LoginContext);
  const [FacebookInfo, setFacebookInfo] = useState("");
  const [EnderecoInfo, setEnderecoInfo] = useState("");
  const [InstagramInfo, setInstagramInfo] = useState("");
  const [WhatsappInfo, setWhatsappInfo] = useState("");
  const [TelephoneInfo, setTelephoneInfo] = useState("");

  useEffect(() => {
    async function getContactInfo() {
      try {
        const response = await api.get("/home/info", {
          headers: { authorization: `bearer ${token}` },
        });

        if (response.data.length === 0) {
          throw new Error("Home info is Empty");
        }
        const address = response.data.filter((item) =>
          item.key === "address" ? item.data : null
        )[0];
        const facebookLink = response.data.filter((item) =>
          item.key === "facebookLink" ? item.data : null
        )[0];
        const instagramLink = response.data.filter((item) =>
          item.key === "instagramLink" ? item.data : null
        )[0];
        const whatsAppLink = response.data.filter((item) =>
          item.key === "whatsAppLink" ? item.data : null
        )[0];
        const cellphone = response.data.filter((item) =>
          item.key === "cellphone" ? item.data : null
        )[0];
        setEnderecoInfo(address.data);
        setFacebookInfo(facebookLink.data);
        setInstagramInfo(instagramLink.data);
        setWhatsappInfo(whatsAppLink.data);
        setTelephoneInfo(cellphone.data);
      } catch (error) {
        console.warn(error);
      }
    }
    getContactInfo();
  }, []);
  return (
    <div className="all_footer">
      <div className="content_footer">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" className="Logo" />
          </Link>
        </div>
        <a
          href={`https://www.google.com/maps?q=${EnderecoInfo}`}
          target="_blank"
          rel="noreferrer"
          className="customize"
        >
          <p
            className="address"
            style={{
              height: "80% !important",
              textAlign: "center",
              fontSize: "16px",
              margin: "auto",
              maxWidth: "35vw",
            }}
          >
            {EnderecoInfo}
          </p>
        </a>
        <p className="mt-3">
          {TelephoneInfo === "" ? "Sem dados" : TelephoneInfo}
        </p>
        <a href="/contact" className="contact">
          CONTATO
        </a>
        <div className="icons">
          <a
            href={
              FacebookInfo === "" ? "https://www.facebook.com/" : FacebookInfo
            }
            target="_blank"
            rel="noreferrer"
            className="facebook"
          >
            <FaFacebook />
          </a>
          <a
            href={
              InstagramInfo === ""
                ? "https://www.instagram.com/"
                : `https://www.instagram.com/${InstagramInfo}`
            }
            target="_blank"
            rel="noreferrer"
            className="instagram"
          >
            <FaInstagram />
          </a>

          <a
            href={
              WhatsappInfo === ""
                ? "https://www.whatsapp.com/"
                : `${WhatsappInfo}`
            }
            target="_blank"
            rel="noreferrer"
            className="whatsapp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileFooter() {
  const { token } = useContext(LoginContext);
  const [FacebookInfo, setFacebookInfo] = useState("");
  const [EnderecoInfo, setEnderecoInfo] = useState("");
  const [InstagramInfo, setInstagramInfo] = useState("");
  const [WhatsappInfo, setWhatsappInfo] = useState("");
  const [TelephoneInfo, setTelephoneInfo] = useState("");

  useEffect(() => {
    async function getContactInfo() {
      try {
        const response = await api.get("/home/info", {
          headers: { authorization: `bearer ${token}` },
        });

        if (response.data.length === 0) {
          throw new Error("Home info is Empty");
        }
        const address = response.data.filter((item) =>
          item.key === "address" ? item.data : null
        )[0];
        const facebookLink = response.data.filter((item) =>
          item.key === "facebookLink" ? item.data : null
        )[0];
        const instagramLink = response.data.filter((item) =>
          item.key === "instagramLink" ? item.data : null
        )[0];
        const whatsAppLink = response.data.filter((item) =>
          item.key === "whatsAppLink" ? item.data : null
        )[0];
        const cellphone = response.data.filter((item) =>
          item.key === "cellphone" ? item.data : null
        )[0];
        setEnderecoInfo(address.data);
        setFacebookInfo(facebookLink.data);
        setInstagramInfo(instagramLink.data);
        setWhatsappInfo(whatsAppLink.data);
        setTelephoneInfo(cellphone.data);
      } catch (error) {
        console.warn(error);
      }
    }
    getContactInfo();
  }, []);

  return (
    <div className="cell_footer">
      <div className="logo">
        <Link to="/home">
          <img src={Logo} alt="Logo" className="Logo" />
        </Link>
      </div>
      <div className="content_footer">
        {/* <div className="firstLine"> */}
        <a
          href={`https://www.google.com/maps?q=${EnderecoInfo}`}
          target="_blank"
          rel="noreferrer"
          className="customize"
        >
          <p className="address">{EnderecoInfo}</p>
        </a>
        <p>{TelephoneInfo === "" ? "Sem dados" : TelephoneInfo}</p>
        {/*  </div>
                <div className="secondLine"> */}
        <a href="/contact" className="contact">
          CONTATO
        </a>
        <div className="icons">
          <a
            href={
              FacebookInfo === "" ? "https://www.facebook.com/" : FacebookInfo
            }
            target="_blank"
            rel="noreferrer"
            className="facebook"
          >
            <FaFacebook />
          </a>
          <a
            href={
              InstagramInfo === ""
                ? "https://www.instagram.com/"
                : `${InstagramInfo}`
            }
            target="_blank"
            rel="noreferrer"
            className="instagram"
          >
            <FaInstagram />
          </a>
          <a
            href={
              WhatsappInfo === ""
                ? "https://www.whatsapp.com/"
                : `${WhatsappInfo}`
            }
            target="_blank"
            rel="noreferrer"
            className="whatsapp"
          >
            <FaWhatsapp />
          </a>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default function OngShow(props) {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowDimensions.width >= 850) return <ComputerFooter />;
  else return <MobileFooter />;
}
