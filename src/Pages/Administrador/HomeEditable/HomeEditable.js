import React from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import Button from '@material-ui/core/Button';

import './HomeEditable.css';

function SelectedImages({srcImg, altImg}){
  
  return (
    <div className="boxOutsideImage">
      <img src={srcImg} alt={altImg} />
    </div>
  );
}

function InputsOrIconWithInput({label, placeholderInfo, icon, hasIcon}){

  return (
    <div className="labelWithInputHomeEditable">
      {hasIcon ? icon
        : <label style={{marginRight: '16px'}}>{label}</label>
      }
      <input type="text" name="inputFromLabel" placeholder={placeholderInfo} />
    </div>
  );
}

function HomeEditable(){

  const imagesCarousel = [
    {
      imgSrc: '',
      imgAlt: ''
    },
    {
      imgSrc: '',
      imgAlt: ''
    },
  ]

  return (
    <div className="HomeEditableContent">
      <div className="carouselPart">
        
        <div className="titleArea">
          <h1>
            CARROSSEL
            <span></span>
          </h1>
        </div>

        <div className="changeImagesPart">
          <h2>ALTERAR IMAGENS</h2>
          <div className="boxChangeImages">
            {imagesCarousel.map(item => {
              return <SelectedImages srcImg={item.imgSrc} altImg={item.imgAlt} />
            })}
          </div>
          <div className="buttonsCarouselPart">
            <button type="button" className="firstButton">ADICIONAR NOVAS IMAGENS</button>
            <button type="button" className="secondButton">DELETAR IMAGENS SELECIONADAS</button>
          </div>
        </div>
      </div>

      <div className="whoWeArePart">
        
        <div className="titleArea">
          <h1>
            QUEM SOMOS
            <span />
          </h1>
        </div>

        <div className="changeTextArea">
          <h2>ALTERAR TEXTO</h2>
          <div className="textWhoWeAre">
            <textarea defaultValue={"Texto"}/>
          </div>
        </div>
        <div className="changeImageArea">
          <h2>ALTERAR IMAGEM</h2>
          <div className="imageWhoWeAre">
            <div className="boxChangeImageWhoWeAre">
              <span>Uma foto legal deles aqui</span>
            </div>
            <div className="buttonsWhoWeArePart">
              <button type="button" className="firstButton" >ALTERAR IMAGEM</button>
              <button type="button" className="secondButton" >DELETAR IMAGEM</button>
            </div>
          </div>
        </div>
      </div>

      <div className="productsPart">
        <div className="titleArea">
          <h1>
            PRODUTOS
            <span />
          </h1>
        </div>

        <div className="changeTextArea">
          <h2>ALTERAR TEXTO</h2>
          <div className="textProducts">
            <textarea defaultValue={"Texto"}/>
          </div>
        </div>
        
        <div className="changeImagesPart">
          <h2>ALTERAR PRODUTOS - UNIVERSITÁRIOS</h2>
          <div className="boxChangeImages">
            {imagesCarousel.map((item, index) => {
              return <SelectedImages key={index} srcImg={item.imgSrc} altImg={item.imgAlt} />
            })}
          </div>
          <div className="buttonsCarouselPart">
            <button type="button" className="firstButton" >ADICIONAR NOVAS IMAGENS</button>
            <button type="button" className="secondButton" >DELETAR IMAGENS SELECIONADAS</button>
          </div>
        </div>
      </div>

      <div className="contactInfoPart">
        <div className="titleArea">
          <h1>
            INFORMAÇÕES DE CONTATO
            <span />
          </h1>
        </div>

        <div className="changeInfoArea">
            <InputsOrIconWithInput label={"teste"} placeholderInfo={"testeholder"} icon={<FacebookIcon/>} hasIcon={false} />
            <InputsOrIconWithInput label={"teste"} placeholderInfo={"testeholder"} icon={<FacebookIcon/>} hasIcon={false} />
            <div className="socialMediaInfo">
              <h2>REDES SOCIAIS</h2>
              <InputsOrIconWithInput label={"teste"} placeholderInfo={"testeholder"} icon={<FacebookIcon/>} hasIcon={true} />
              <InputsOrIconWithInput label={"teste"} placeholderInfo={"testeholder"} icon={<InstagramIcon/>} hasIcon={true} />
              <InputsOrIconWithInput label={"teste"} placeholderInfo={"testeholder"} icon={<WhatsAppIcon />} hasIcon={true} />
            </div>
        </div>

      </div>

      <Button 
        className="saveChangesButton"
      >
        SALVAR ALTERAÇÕES
      </Button>

    </div>
  );
}

export default HomeEditable;
