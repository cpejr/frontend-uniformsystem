import React, { useState, useRef, useEffect } from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import CircularProgress from '@material-ui/core/CircularProgress';

// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';

import Button from '@material-ui/core/Button';

import api from "../../../services/api";

import camisa from '../../../Assets/camisa.jpg';

import './HomeEditable.css';

function SelectedImages({srcImg, altImg, setSelectedImage, SelectedImage}){
  
  const handleClick = () => {
    setSelectedImage(!SelectedImage)
    console.log(SelectedImage)
  }

  return (
    <div className={ SelectedImage? "boxOutsideImage selected" : "boxOutsideImage" } onClick={handleClick}>
      <img src={srcImg} alt={altImg} />
    </div>
  );
}

function InputsOrIconWithInput({label, placeholderInfo, icon, hasIcon, defaultValue, setInfo}){

  return (
    <div className="labelWithInputHomeEditable">
      {hasIcon ? icon
        : <label style={{marginRight: '16px'}}>{label}</label>
      }
      <input type="text" name="inputFromLabel"
        value={defaultValue}
        // placeholder={placeholderInfo}
        onChange={(e) => setInfo(e.target.value)} 
      />
    </div>
  );
}

function HomeEditable(){

  const token = '';

  const bucketAWS = 'https://profit-uniformes.s3.amazonaws.com/';

  const [loading, setLoading] = useState(false);

  // Estado para armazenar todas as imagens da Home
  const [imagesHome, setImagesHome] = useState([]);

  // Estado para armazenar Imagens do Carrossel
  const [imagesCarousel, setImagesCarousel] = useState([
    {
      file: 'https://profit-uniformes.s3.amazonaws.com/27840087-bbe7-43d6-a36e-c435eb52b93a.jpg',
      imgSrc: 'Imagem Source',
      imgAlt: '',
      imgPlace: 'carousel'
    },
  ]);

  // Estado para armazenar Imagem de Quem Somos
  const [imagesWhoWeAre, setImagesWhoWeAre] = useState(
    {
      file: camisa,
      imgSrc: 'Imagem Source',
      imgAlt: '',
      imgPlace: 'whoWeAre'
    }
  );

  // Estado para armazenar Imagens de Produtos
  const [imagesProducts, setImagesProducts] = useState([
    {
      file: camisa,
      imgSrc: 'Imagem Source',
      imgAlt: '',
      imgPlace: 'products'
    },
    {
      file: camisa,
      imgSrc: 'Imagem Source',
      imgAlt: '',
      imgPlace: 'products'
    },
  ]);

  // Estados para armazenar imagens selecionadas do Carrossel
  const [imagemCarousel01, setImagemCarousel01] = useState(false);
  const [imagemCarousel02, setImagemCarousel02] = useState(false);
  const [imagemCarousel03, setImagemCarousel03] = useState(false);
  const [imagemCarousel04, setImagemCarousel04] = useState(false);
  const [imagemCarousel05, setImagemCarousel05] = useState(false);

  const arrayImages = [
    imagemCarousel01,
    imagemCarousel02,
    imagemCarousel03,
    imagemCarousel04,
    imagemCarousel05,
  ]
  const arrayStateImages = [
    setImagemCarousel01,
    setImagemCarousel02,
    setImagemCarousel03,
    setImagemCarousel04,
    setImagemCarousel05,
  ]

  // Estados para armazenar imagens selecionadas de Produtos
  const [imagemProducts01, setImagemProducts01] = useState(false);
  const [imagemProducts02, setImagemProducts02] = useState(false);
  const [imagemProducts03, setImagemProducts03] = useState(false);

  const arrayImagesProducts = [
    imagemProducts01,
    imagemProducts02,
    imagemProducts03,
  ]
  const arrayStateImagesProducts = [
    setImagemProducts01,
    setImagemProducts02,
    setImagemProducts03,
  ]


  // Estados para armazenar textos
  const [textoQuemSomos, setTextoQuemSomos] = useState('');
  const [textoProdutos, setTextoProdutos] = useState('');

  const [telephoneInfo, setTelephoneInfo] = useState('');
  const [enderecoInfo, setEnderecoInfo] = useState('');
  const [facebookInfo, setFacebookInfo] = useState('');
  const [instagramInfo, setInstagramInfo] = useState('');
  const [whatsappInfo, setWhatsappInfo] = useState('');


  // UseEffect para inicializar as informações da Home
  useEffect(() => {
    
    async function getHomeInfo(){
      const response = await api.get('/home/info',
      {
        headers: { authorization: `bearer ${token}` },
      });

      const textWhoWeAre = response.data.filter(item => item.key === 'textWhoWeAre'? item.data: null)[0]; 
      const textProducts = response.data.filter(item => item.key === 'textProducts'? item.data: null)[0]; 
      const cellphone = response.data.filter(item => item.key === 'cellphone'? item.data: null)[0]; 
      const address = response.data.filter(item => item.key === 'address'? item.data: null)[0]; 
      const facebookLink = response.data.filter(item => item.key === 'facebookLink'? item.data: null)[0]; 
      const instagramLink = response.data.filter(item => item.key === 'instagramLink'? item.data: null)[0]; 
      const whatsAppNumber = response.data.filter(item => item.key === 'whatsAppNumber'? item.data: null)[0];
  
      setTextoQuemSomos(textWhoWeAre.data);
      setTextoProdutos(textProducts.data);
      setTelephoneInfo(cellphone.data);
      setEnderecoInfo(address.data);
      setFacebookInfo(facebookLink.data);
      setInstagramInfo(instagramLink.data);
      setWhatsappInfo(whatsAppNumber.data);
    }

    getHomeInfo();

  }, []);

  // UseEffect para inicializar as imagens da Home
  useEffect(() => {
    
    async function getHomeImages(){
      const responseCarousel = await api.get('/home/images?img_place=carousel',
      {
        headers: { authorization: `bearer ${token}` },
      });

      let imagesCarousel = []
      if(responseCarousel.data){
        imagesCarousel = responseCarousel.data.map(item => ({
          file: `${bucketAWS}${item.image_id}.jpg`,
          imgSrc: item.imgSrc, 
          imgAlt: item.imgAlt, 
          imgPlace: item.imgPlace
        }));
      }

      const responseWhoWeAre = await api.get('/home/images?img_place=whoWeAre',
      {
        headers: { authorization: `bearer ${token}` },
      });

      
      let imagesWhoWeAre = {}
      if(responseWhoWeAre.data[0]){
        const { image_id, imgSrc, imgAlt, imgPlace } = responseWhoWeAre.data[0];
        imagesWhoWeAre = {
          file: `${bucketAWS}${image_id}.jpg`,
          imgSrc: imgSrc, 
          imgAlt: imgAlt, 
          imgPlace: imgPlace
        };
      }

      const responseProducts = await api.get('/home/images?img_place=products',
      {
        headers: { authorization: `bearer ${token}` },
      });
      // const imagesProducts = responseProducts.data;
      let imagesProducts = []
      if(responseProducts.data){
        imagesProducts = responseProducts.data.map(item => ({
          file: `${bucketAWS}${item.image_id}.jpg`,
          imgSrc: item.imgSrc, 
          imgAlt: item.imgAlt, 
          imgPlace: item.imgPlace
        }));
      }

      
      setImagesCarousel([...imagesCarousel])
      setImagesWhoWeAre(imagesWhoWeAre)
      setImagesProducts([...imagesProducts])
    
      setImagesHome([...imagesCarousel, imagesWhoWeAre, ...imagesProducts ]);
    }

    getHomeImages();

  }, []);

  // Manipulação para as imagens do Carrossel
  const inputCarousel = useRef(null);

  function handleAddImageCarousel(){
    inputCarousel.current.click();
  }

  function handleAddImageCarouselFileInput(){
    let fileData = new FileReader();
    fileData.readAsDataURL(inputCarousel.current.files[0]) 

    fileData.onload = function() {
      const fileLoaded = fileData.result;
      setImagesCarousel([...imagesCarousel, {
        file: fileLoaded,
        imgSrc: fileData,
        imgAlt: 'Imagem Carrossel',
        imgPlace: 'carousel'
      }])
    }
  }

  // useEffect para as imagens do carrossel
  useEffect(() => {
  }, [imagesCarousel, arrayImages]);

  function handleDeleteImageCarousel(){

    const auxiliarArray = []
    arrayImages.forEach((item, index) =>
    item === true? (
      arrayStateImages[index](false),
      // setExcludedCarouselImages([...excludedCarouselImages, imagesCarousel.splice(index, 1, {}) ]))
      imagesCarousel.splice(index, 1, {}))
      : imagesCarousel[index] !== undefined? auxiliarArray.push(imagesCarousel[index]): null)
      
      setImagesCarousel(auxiliarArray)
  }


  // Manipulação para as imagens de Quem Somos
  const inputWhoWeAre = useRef(null);

  function handleAddImageWhoWeAre(){
    inputWhoWeAre.current.click();
  }

  function handleAddImageWhoWeAreFileInput(){
    let fileData = new FileReader();
    fileData.readAsDataURL(inputWhoWeAre.current.files[0]) 

    fileData.onload = function() {
      const fileLoaded = fileData.result;
      setImagesWhoWeAre({
        file: fileLoaded,
        imgSrc: 'Imagem Quem Somos',
        imgAlt: 'Imagem Quem somos',
        imgPlace: 'whoWeAre'
      })
    }
  }

  // useEffect para as imagens do Quem Somos
  useEffect(() => {
  }, [imagesWhoWeAre, arrayImages]);

  function handleDeleteImageWhoWeAre(){
    const auxiliarArray = {}
    // setExcludedWhoWeAreImages(imagesWhoWeAre);
    
    setImagesWhoWeAre(auxiliarArray)
  }


  // Manipulação para as imagens de Produtos
  const inputProducts = useRef(null);

  function handleAddImageProducts(){
    inputProducts.current.click();
  }

  function handleAddImageProductsFileInput(){
    let fileData = new FileReader();
    fileData.readAsDataURL(inputProducts.current.files[0]) 

    fileData.onload = function() {
      const fileLoaded = fileData.result;
      setImagesProducts([...imagesProducts, {
        file: fileLoaded,
        imgSrc: 'Imagem Produtos',
        imgAlt: 'Imagem Produtos',
        imgPlace: 'products'
      }])
    }
  }

  // useEffect para as imagens de Produtos
  useEffect(() => {
  }, [imagesProducts, arrayImagesProducts]);

  function handleDeleteImageProducts(){
    const auxiliarArray = []
    arrayImagesProducts.forEach((item, index) =>
    item === true? (
      arrayStateImagesProducts[index](false),
      // setExcludedProductsImages([...excludedProductsImages, imagesProducts.splice(index, 1, {}) ]))
      imagesProducts.splice(index, 1, {}) )
      : imagesProducts[index] !== undefined? auxiliarArray.push(imagesProducts[index]): null)
    
      setImagesProducts(auxiliarArray)
  }



  // useEffect para excluir elementos
  useEffect(() => {
    console.log(imagesCarousel)
  }, [imagesCarousel]);


  // Função para salvar as informações depois de editar a Home
  async function handleSaveChanges(){

    setLoading(true);
    // Salva mudanças de Home Info 
    try{
      await api.put('/home/info',
        {
          textWhoWeAre: textoQuemSomos,
          textProducts: textoProdutos, 
          contactInfo: {
            cellphone: telephoneInfo,
            address: enderecoInfo,
            facebookLink: facebookInfo,
            instagramLink: instagramInfo,
            whatsAppNumber: whatsappInfo
          }
        },
        {
          headers: { authorization: `bearer ${token}` },
        });

    }catch(err){
      console.log(err.message)
    }

    // Salva mudanças de Home Images 
    try{
      
      // Deleta imagens para colocar novas
      imagesHome.forEach(async (item) => {

        if(item.file){
          const nameWithType = item.file.split('.com/')[1]
          const name = nameWithType.split('.')[0]
          const type = nameWithType.split('.')[1]
          await api.delete(`/home/images?name=${name}&type=${type}`,
          {
            headers: { authorization: `bearer ${token}` },
          });
        }
      });
      
      
      // Posta novas imagens
      setImagesHome([...imagesCarousel, imagesWhoWeAre, ...imagesProducts]);
      if(imagesHome){
        imagesHome.map( async (item) => {
  
          const objImage = {
            "file": item.imgSrc,
            "imgPlace": item.imgPlace,
            "imgSrc": "HAHA",
            "imgAlt": item.imgAlt
          }
  
          const response = await api.post('/home/images',
            objImage,
            {
              headers: { authorization: `bearer ${token}` },
            });
            console.log(response)
        });
      }

      setTimeout(() => setLoading(false), 3000);
      
    }catch(err){
      console.log(err.message)
      return err.message
    }

  }

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
            {imagesCarousel.map( (item, index) => item ?
              <SelectedImages key={index} srcImg={item.file} 
                altImg={item.imgAlt}
                setSelectedImage={arrayStateImages[index]}
                SelectedImage={arrayImages[index]} 
              />: null
            )}
          </div>
          <div className="buttonsCarouselPart">
            <Button className="firstButton"
              onClick={handleAddImageCarousel}
            >
              <input type="file" hidden ref={inputCarousel} 
                onChange={(e) => handleAddImageCarouselFileInput()}
              />
              ADICIONAR NOVAS IMAGENS
            </Button>
            <Button className="secondButton"
              onClick={handleDeleteImageCarousel}
            >
              DELETAR IMAGENS SELECIONADAS</Button>
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
            <textarea defaultValue={textoQuemSomos} onChange={ (e) => setTextoQuemSomos(e.target.value) } />
          </div>
        </div>
        <div className="changeImageArea">
          <h2>ALTERAR IMAGEM</h2>
          <div className="imageWhoWeAre">
            <div className="boxChangeImageWhoWeAre">
              {imagesWhoWeAre ? <SelectedImages srcImg={imagesWhoWeAre.file} 
                                  altImg={imagesWhoWeAre.imgAlt}
                                />:
                <span>Uma foto legal deles aqui</span>
              }
            </div>
            <div className="buttonsWhoWeArePart">
              <Button  className="firstButton" 
                onClick={handleAddImageWhoWeAre}
              >
                <input type="file" hidden ref={inputWhoWeAre} 
                  onChange={(e) => handleAddImageWhoWeAreFileInput()}
                />
                ALTERAR IMAGEM
              </Button>
              <Button  className="secondButton" 
                onClick={handleDeleteImageWhoWeAre}
              >
                DELETAR IMAGEM
              </Button>
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
            <textarea defaultValue={textoProdutos} onChange={ (e) => setTextoProdutos(e.target.value) } />
          </div>
        </div>
        
        <div className="changeImagesPart">
          <h2>ALTERAR PRODUTOS - UNIVERSITÁRIOS</h2>
          <div className="boxChangeImages">
          {imagesProducts.map( (item, index) => item ?
              <SelectedImages key={index} srcImg={item.file} 
                altImg={item.imgAlt}
                setSelectedImage={arrayStateImagesProducts[index]}
                SelectedImage={arrayImagesProducts[index]} 
              />: null
            )}
          </div>
          <div className="buttonsCarouselPart">
            <Button  className="firstButton" 
              onClick={handleAddImageProducts}
            >
              <input type="file" hidden ref={inputProducts} 
                  onChange={(e) => handleAddImageProductsFileInput()}
              />
              ADICIONAR NOVAS IMAGENS
            </Button>
            <Button  className="secondButton" 
              onClick={handleDeleteImageProducts}
            >
              DELETAR IMAGENS SELECIONADAS
            </Button>
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
            <InputsOrIconWithInput label={"TELEFONE"} 
              placeholderInfo={"(XX) XXXX-XXXX"} icon={<FacebookIcon/>}
              defaultValue={telephoneInfo}
              hasIcon={false}
              setInfo={setTelephoneInfo} 
            />
            <InputsOrIconWithInput label={"ENDEREÇO"} 
              placeholderInfo={"Rua ABC"} icon={<FacebookIcon/>} 
              defaultValue={enderecoInfo}
              hasIcon={false}
              setInfo={setEnderecoInfo}
          />
            <div className="socialMediaInfo">
              <h2>REDES SOCIAIS</h2>
              <InputsOrIconWithInput label={"FACEBOOK"} 
                placeholderInfo={"testeholder"} icon={<FacebookIcon/>} 
                defaultValue={facebookInfo}
                hasIcon={true}
                setInfo={setFacebookInfo}
            />
              <InputsOrIconWithInput label={"INSTAGRAM"} 
                placeholderInfo={"testeholder"} icon={<InstagramIcon/>} 
                defaultValue={instagramInfo}
                hasIcon={true}
                setInfo={setInstagramInfo}
            />
              <InputsOrIconWithInput label={"WHATSAPP"} 
                placeholderInfo={"testeholder"} icon={<WhatsAppIcon />}
                defaultValue={whatsappInfo}
                hasIcon={true}
                setInfo={setWhatsappInfo}
              />
            </div>
        </div>

      </div>

      <Button 
        className="saveChangesButton"
        onClick={handleSaveChanges}
      >
        {loading ? <CircularProgress />: 'SALVAR ALTERAÇÕES'}
      </Button> 

    </div>
  );
}

export default HomeEditable;
