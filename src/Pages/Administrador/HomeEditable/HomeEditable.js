import React, { useState, useRef, useEffect, useContext } from "react";
import MetaData from "../../../meta/reactHelmet";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, CircularProgress, TextField } from "@material-ui/core";

import api from "../../../services/api";
import { LoginContext } from "../../../contexts/LoginContext";
import SnackbarMessage from "../../../components/SnackbarMessage";

import "./HomeEditable.css";

function SelectedImages({
  srcImg,
  altImg,
  whoWeAre = false,
  setSelectedImage,
  SelectedImage,
  indexImg
}) {
  const handleClick = () => {
    SelectedImage.map( (item, index) => index === indexImg? setSelectedImage[index](true): setSelectedImage[index](false) );
    console.log('clicou', SelectedImage)
    console.log('index', indexImg)
  };

  if (!whoWeAre) {
    return (
      <div
        className={
          SelectedImage[indexImg] ? "boxOutsideImage selected" : "boxOutsideImage"
        }
        onClick={handleClick}
      >
        <img src={srcImg} alt={altImg} />
      </div>
    );
  } else {
    return (
      <div className={"boxOutsideImage"}>
        <img src={srcImg} alt={altImg} />
      </div>
    );
  }
}

const maskPhone = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})(\d)/, "$1-$2");
};

function InputsOrIconWithInput({
  label,
  placeholderInfo,
  icon,
  hasIcon,
  defaultValue,
  setInfo,
  field,
  errorBoolean,
  errorMessage,
}) {
  const handleChangeText = (value) => {
    setInfo((oldValue) => ({
      textWhoWeAre: oldValue.textWhoWeAre,
      textProducts: oldValue.textProducts,
      telephoneInfo:
        field === "telephone" ? maskPhone(value) : oldValue.telephoneInfo,
      enderecoInfo: field === "endereco" ? value : oldValue.enderecoInfo,
      facebookUsername:
        field === "facebook user" ? value : oldValue.facebookUsername,
      instagramUsername:
        field === "instagram user" ? value : oldValue.instagramUsername,
      facebookLink: field === "facebook" ? value : oldValue.facebookLink,
      instagramLink: field === "instagram" ? value : oldValue.instagramLink,
      whatsAppLink: field === "whatsapp" ? value : oldValue.whatsAppLink,
    }));
  };
  return (
    <div className="labelWithInputHomeEditable">
      {hasIcon ? (
        icon
      ) : (
        <label style={{ marginRight: "16px" }}>{label.toUpperCase()}</label>
      )}
      <TextField
        variant="outlined"
        type="text"
        value={defaultValue}
        label={label}
        error={errorBoolean}
        helperText={errorMessage}
        placeholder={placeholderInfo}
        onChange={(e) => handleChangeText(e.target.value)}
      />
    </div>
  );
}

const validateFields = (value) => {
  let isValid = true;
  if (value === "") {
    isValid = false;
  }
  return isValid;
};

const validateImages = (
  arrayOfImages,
  arrayOfExcludedImages,
  isWhoWeAreImage = false
) => {
  let isValid = true;
  if (isWhoWeAreImage) {
    if (!arrayOfImages.file) {
      isValid = false;
    }
  } else {
    if (
      (arrayOfImages.length === 0 && arrayOfExcludedImages.length === 0) ||
      arrayOfImages.length - arrayOfExcludedImages.length <= 0
    ) {
      isValid = false;
    }
  }
  return isValid;
};

function HomeEditable() {
  const { token } = useContext(LoginContext);

  const bucketAWS = process.env.REACT_APP_BUCKET_AWS;

  const [loading, setLoading] = useState(false);

  // Estado para armazenar todas as imagens da Home
  // Estados para armazenar textos
  const [homeInfo, setHomeInfo] = useState({
    textWhoWeAre: "",
    textProducts: "",
    telephoneInfo: "",
    enderecoInfo: "",
    facebookUsername: "",
    instagramUsername: "",
    facebookLink: "",
    instagramLink: "",
    whatsAppLink: "",
  });

  const maximumImagesCarousel = 5;
  const maximumImagesProducts = 3;

  const [errorImageCarousel, setErrorImageCarousel] = useState(false);
  const [errorImageCarouselMessage, setErrorImageCarouselMessage] = useState(
    ""
  );

  const [errorImageWhoWeAre, setErrorImageWhoWeAre] = useState(false);
  const [errorImageWhoWeAreMessage, setErrorImageWhoWeAreMessage] = useState(
    ""
  );

  const [errorImageProducts, setErrorImageProducts] = useState(false);
  const [errorImageProductsMessage, setErrorImageProductsMessage] = useState(
    ""
  );

  const [errorTextWhoWeAre, setErrorTextWhoWeAre] = useState(false);
  const [errorTextWhoWeAreMessage, setErrorTextWhoWeAreMessage] = useState("");

  const [errorTextProducts, setErrorTextProducts] = useState(false);
  const [errorTextProductsMessage, setErrorTextProductsMessage] = useState("");

  const [errorTelephone, setErrorTelephone] = useState(false);
  const [errorTelephoneMessage, setErrorTelephoneMessage] = useState("");

  const [errorEndereco, setErrorEndereco] = useState(false);
  const [errorEnderecoMessage, setErrorEnderecoMessage] = useState("");

  const [errorFacebookUsername, setErrorFacebookUsername] = useState(false);
  const [
    errorFacebookUsernameMessage,
    setErrorFacebookUsernameMessage,
  ] = useState("");

  const [errorInstagramUsername, setErrorInstagramUsername] = useState(false);
  const [
    errorInstagramUsernameMessage,
    setErrorInstagramUsernameMessage,
  ] = useState("");

  const [errorFacebookLink, setErrorFacebookLink] = useState(false);
  const [errorFacebookLinkMessage, setErrorFacebookLinkMessage] = useState("");

  const [errorInstagramLink, setErrorInstagramLink] = useState(false);
  const [errorInstagramLinkMessage, setErrorInstagramLinkMessage] = useState(
    ""
  );

  const [errorWhatsAppLink, setErrorWhatsAppLink] = useState(false);
  const [errorWhatsAppLinkMessage, setErrorWhatsAppLinkMessage] = useState("");

  // Estado para armazenar Imagens do Carrossel
  const [imagesCarousel, setImagesCarousel] = useState([]);

  // Estado para armazenar Imagem de Quem Somos
  const [imagesWhoWeAre, setImagesWhoWeAre] = useState({});

  // Estado para armazenar Imagens de Produtos
  const [imagesProducts, setImagesProducts] = useState([]);

  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("success");

  // Estados para armazenar imagens selecionadas do Carrossel
  const [imagemCarousel01, setImagemCarousel01] = useState(false);
  const [imagemCarousel02, setImagemCarousel02] = useState(false);
  const [imagemCarousel03, setImagemCarousel03] = useState(false);
  const [imagemCarousel04, setImagemCarousel04] = useState(false);
  const [imagemCarousel05, setImagemCarousel05] = useState(false);

  const meta = {
    titlePage: "Administrador | Home",
    titleSearch: "Home Profit",
    description:
      "Venha conhecer mais da nossa loja. Nessa página você encontra nossos dados de contato e uma breve história nossa.",
    keyWords: "Redes Sociais, Quem somos, História, Profit",
    imageUrl: "",
    imageAlt: "",
  };

  const arrayImages = [
    imagemCarousel01,
    imagemCarousel02,
    imagemCarousel03,
    imagemCarousel04,
    imagemCarousel05,
  ];

  const arrayStateImages = [
    setImagemCarousel01,
    setImagemCarousel02,
    setImagemCarousel03,
    setImagemCarousel04,
    setImagemCarousel05,
  ];

  // Estados para armazenar imagens selecionadas de Produtos
  const [imagemProducts01, setImagemProducts01] = useState(false);
  const [imagemProducts02, setImagemProducts02] = useState(false);
  const [imagemProducts03, setImagemProducts03] = useState(false);

  const arrayImagesProducts = [
    imagemProducts01,
    imagemProducts02,
    imagemProducts03,
  ];
  const arrayStateImagesProducts = [
    setImagemProducts01,
    setImagemProducts02,
    setImagemProducts03,
  ];

  const [excludedCarouselImages, setExcludedCarouselImages] = useState([]);
  const [excludedWhoWeAreImages, setExcludedWhoWeAreImages] = useState({});
  const [excludedProductsImages, setExcludedProductsImages] = useState([]);

  // UseEffect para inicializar as informações da Home
  useEffect(() => {
    async function getHomeInfo() {
      try {
        const response = await api.get("/home/info", {
          headers: { authorization: `bearer ${token}` },
        });
        if (response.data) {
          const textWhoWeAre = response.data.filter((item) =>
            item.key === "textWhoWeAre" ? item.data : null
          )[0];
          const textProducts = response.data.filter((item) =>
            item.key === "textProducts" ? item.data : null
          )[0];
          const cellphone = response.data.filter((item) =>
            item.key === "cellphone" ? item.data : null
          )[0];
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

          setHomeInfo({
            textWhoWeAre: textWhoWeAre.data,
            textProducts: textProducts.data,
            telephoneInfo: cellphone.data,
            enderecoInfo: address.data,
            facebookUsername: facebookLink.data,
            instagramUsername: instagramLink.data,
            facebookLink: facebookLink.data,
            instagramLink: instagramLink.data,
            whatsAppLink: whatsAppLink.data,
          });
        }
      } catch (error) {
        console.warn(error);
      }
    }
    getHomeInfo();
  }, []);

  // UseEffect para inicializar as imagens da Home
  useEffect(() => {
    async function getHomeImages() {
      const responseCarousel = await api.get(
        "/home/images?img_place=carousel",
        {
          headers: { authorization: `bearer ${token}` },
        }
      );

      let imagesCarousel = [];
      if (responseCarousel.data) {
        imagesCarousel = responseCarousel.data.map((item) => ({
          file: `${bucketAWS}${item.image_id}`,
          imgSrc: item.imgSrc,
          imgAlt: item.imgAlt,
          imgPlace: item.imgPlace,
        }));
      }

      const responseWhoWeAre = await api.get(
        "/home/images?img_place=whoWeAre",
        {
          headers: { authorization: `bearer ${token}` },
        }
      );

      let imagesWhoWeAre = {};
      if (responseWhoWeAre.data[0]) {
        const { image_id, imgSrc, imgAlt, imgPlace } = responseWhoWeAre.data[0];
        imagesWhoWeAre = {
          file: `${bucketAWS}${image_id}`,
          imgSrc: imgSrc,
          imgAlt: imgAlt,
          imgPlace: imgPlace,
        };
      }

      const responseProducts = await api.get(
        "/home/images?img_place=products",
        {
          headers: { authorization: `bearer ${token}` },
        }
      );
      // const imagesProducts = responseProducts.data;
      let imagesProducts = [];
      if (responseProducts.data) {
        imagesProducts = responseProducts.data.map((item) => ({
          file: `${bucketAWS}${item.image_id}`,
          imgSrc: item.imgSrc,
          imgAlt: item.imgAlt,
          imgPlace: item.imgPlace,
        }));
      }
      setImagesCarousel([...imagesCarousel]);
      setImagesWhoWeAre(imagesWhoWeAre);
      setImagesProducts([...imagesProducts]);
    }
    getHomeImages();
  }, []);

  // Manipulação para as imagens do Carrossel
  const inputCarousel = useRef(null);

  function handleAddImageCarousel() {
    inputCarousel.current.click();
  }

  function handleAddImageCarouselFileInput() {
    if (imagesCarousel.length < maximumImagesCarousel) {
      let fileData = new FileReader();
      fileData.readAsDataURL(inputCarousel.current.files[0]);

      fileData.onload = async function () {
        const fileLoaded = fileData.result;
        setImagesCarousel([
          ...imagesCarousel,
          {
            file: fileLoaded,
            imgSrc: inputCarousel.current.files[0],
            imgAlt: "Profit Uniformes",
            imgPlace: "carousel",
          },
        ]);

        // Salva mudanças de Home Images
        try{
          let objImage = new FormData();
  
          objImage.append("file", inputCarousel.current.files[0]);
          objImage.append("imgPlace", "carousel");
          objImage.append("imgSrc", "Profit Uniformes");
          objImage.append("imgAlt", "Profit Uniformes");
  
          await api.post("/home/images", objImage, {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `bearer ${token}`,
            },
          });
        }catch(err){
          console.war(err.message)
        }
      };
    }
  }

  // useEffect para as imagens do carrossel
  useEffect(() => {}, [imagesCarousel, arrayImages]);

  function handleDeleteImageCarousel() {
    const indexToExclude = [];
    arrayImages.forEach(async (item, index) => {
      if (item) {
        indexToExclude.push(index);
        arrayStateImages[index](false);
        const newExcludedCarouselImages = [...excludedCarouselImages];
        newExcludedCarouselImages.push(imagesCarousel[index]);
        
        // Exclui imagens de Home Images
        try{
          const nameWithType = newExcludedCarouselImages[0].file.split(".com/")[1];
          const name = nameWithType.split(".")[0];
          const type = nameWithType.split(".")[1];
          await api.delete(`/home/images/${name}.${type}`, {
            headers: { authorization: `bearer ${token}` },
          });
          setExcludedCarouselImages([]);
        }catch(err){
          console.warn(err.message)
        }

      }
    });
    const newImagesCarousel = [];
    let excludeIndex = 0;
    for (let index = 0; index < imagesCarousel.length; index++) {
      const element = imagesCarousel[index];
      if (indexToExclude[excludeIndex] === index) excludeIndex++;
      else newImagesCarousel.push(element);
    }
    setImagesCarousel(newImagesCarousel);
  }

  // Manipulação para as imagens de Quem Somos
  const inputWhoWeAre = useRef(null);

  function handleAddImageWhoWeAre() {
    inputWhoWeAre.current.click();
  }

  async function handleAddImageWhoWeAreFileInput() {

    if(imagesWhoWeAre.file){

      // // Exclui imagens de Home Images
      try{
        const nameWithType = imagesWhoWeAre.file.split(".com/")[1];
        const name = nameWithType.split(".")[0];
        const type = nameWithType.split(".")[1];
        await api.delete(`/home/images/${name}.${type}`, {
          headers: { authorization: `bearer ${token}` },
        });
        setImagesWhoWeAre({});
        setExcludedWhoWeAreImages([]);
      }catch(err){
        console.warn(err.message)
      }
    }
    let fileData = new FileReader();
    fileData.readAsDataURL(inputWhoWeAre.current.files[0]);
    fileData.onload = async function () {
      const fileLoaded = fileData.result;
      setImagesWhoWeAre({
        file: fileLoaded,
        imgSrc: inputWhoWeAre.current.files[0],
        imgAlt: "Profit Uniformes",
        imgPlace: "whoWeAre",
      });

      // Salva mudanças de Home Images
      try{
        let objImage = new FormData();

        objImage.append("file", inputWhoWeAre.current.files[0]);
        objImage.append("imgPlace", "whoWeAre");
        objImage.append("imgSrc", "Profit Uniformes");
        objImage.append("imgAlt", "Profit Uniformes");

        await api.post("/home/images", objImage, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `bearer ${token}`,
          },
        });
      }catch(err){
        console.war(err.message)
      }
    };
  }

  // useEffect para as imagens do Quem Somos
  useEffect(() => {}, [imagesWhoWeAre, arrayImages]);

  async function handleDeleteImageWhoWeAre() {
    const auxiliarArray = {};
    
    // Exclui imagens de Home Images
    try{
      const nameWithType = imagesWhoWeAre.file.split(".com/")[1];
      const name = nameWithType.split(".")[0];
      const type = nameWithType.split(".")[1];
      await api.delete(`/home/images/${name}.${type}`, {
        headers: { authorization: `bearer ${token}` },
      });
      setImagesWhoWeAre(auxiliarArray);
      setExcludedWhoWeAreImages([]);
    }catch(err){
      console.warn(err.message)
    }
  }

  // Manipulação para as imagens de Produtos
  const inputProducts = useRef(null);

  function handleAddImageProducts() {
    inputProducts.current.click();
  }

  function handleAddImageProductsFileInput() {
    if (Number(imagesProducts.length) < maximumImagesProducts) {
      let fileData = new FileReader();
      fileData.readAsDataURL(inputProducts.current.files[0]);

      fileData.onload = async function () {
        const fileLoaded = fileData.result;
        setImagesProducts([
          ...imagesProducts,
          {
            file: fileLoaded,
            imgSrc: inputProducts.current.files[0],
            imgAlt: "Profit Uniformes",
            imgPlace: "products",
          },
        ]);

        // Salva mudanças de Home Images
        try{
          let objImage = new FormData();
  
          objImage.append("file", inputProducts.current.files[0]);
          objImage.append("imgPlace", "products");
          objImage.append("imgSrc", "Profit Uniformes");
          objImage.append("imgAlt", "Profit Uniformes");
  
          await api.post("/home/images", objImage, {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `bearer ${token}`,
            },
          });
        }catch(err){
          console.war(err.message)
        }
      };
    }
  }

  // useEffect para as imagens de Produtos
  useEffect(() => {}, [imagesProducts, arrayImagesProducts]);

  function handleDeleteImageProducts() {
    const indexToExclude = [];
    arrayImagesProducts.forEach(async (item, index) => {
      if (item) {
        indexToExclude.push(index);
        arrayStateImagesProducts[index](false);
        const newExcludedProductsImages = [...excludedProductsImages];
        newExcludedProductsImages.push(imagesProducts[index]);

        // Exclui imagens de Home Images
        try{
          const nameWithType = newExcludedProductsImages[0].file.split(".com/")[1];
          const name = nameWithType.split(".")[0];
          const type = nameWithType.split(".")[1];
          await api.delete(`/home/images/${name}.${type}`, {
            headers: { authorization: `bearer ${token}` },
          });
          setExcludedProductsImages([]);
        }catch(err){
          console.warn(err.message)
        }
      }
    });

    const newImagesProducts = [];
    let excludeIndex = 0;
    for (let index = 0; index < imagesProducts.length; index++) {
      const element = imagesProducts[index];
      if (indexToExclude[excludeIndex] === index) excludeIndex++;
      else newImagesProducts.push(element);
    }
    setImagesProducts(newImagesProducts);
  }

  // useEffect para excluir elementos
  useEffect(() => {}, [imagesCarousel]);

  // Função para salvar as informações depois de editar a Home
  async function handleSaveChanges() {
    const imageCarouselValidated = validateImages(
      imagesCarousel,
      excludedCarouselImages
    );
    const imageWhoWeAreValidated = validateImages(
      imagesWhoWeAre,
      excludedWhoWeAreImages,
      true
    );
    const imageProductsValidated = validateImages(
      imagesProducts,
      excludedProductsImages
    );

    const textWhoWeAreValidated = validateFields(homeInfo.textWhoWeAre);
    const textProductsValidated = validateFields(homeInfo.textProducts);
    const telephoneInfoValidated = validateFields(homeInfo.telephoneInfo);
    const enderecoInfoValidated = validateFields(homeInfo.enderecoInfo);
    const facebookUsernameValidated = validateFields(homeInfo.facebookUsername);
    const instagramUsernameValidated = validateFields(
      homeInfo.instagramUsername
    );
    const facebookLinkValidated = validateFields(homeInfo.facebookLink);
    const instagramLinkValidated = validateFields(homeInfo.instagramLink);
    const whatsAppLinkValidated = validateFields(homeInfo.whatsAppLink);

    if (
      !imageCarouselValidated ||
      !imageWhoWeAreValidated ||
      !imageProductsValidated ||
      !textWhoWeAreValidated ||
      !textProductsValidated ||
      !telephoneInfoValidated ||
      !enderecoInfoValidated ||
      !facebookUsernameValidated ||
      !instagramUsernameValidated ||
      !facebookLinkValidated ||
      !instagramLinkValidated ||
      !whatsAppLinkValidated
    ) {
      if (!imageCarouselValidated) {
        setErrorImageCarousel(true);
        setErrorImageCarouselMessage("Campo obrigatório.");
      } else {
        setErrorImageCarousel(false);
        setErrorImageCarouselMessage("");
      }

      if (!imageWhoWeAreValidated) {
        setErrorImageWhoWeAre(true);
        setErrorImageWhoWeAreMessage("Campo obrigatório.");
      } else {
        setErrorImageWhoWeAre(false);
        setErrorImageWhoWeAreMessage("");
      }

      if (!imageProductsValidated) {
        setErrorImageProducts(true);
        setErrorImageProductsMessage("Campo obrigatório.");
      } else {
        setErrorImageProducts(false);
        setErrorImageProductsMessage("");
      }

      if (!textWhoWeAreValidated) {
        setErrorTextWhoWeAre(true);
        setErrorTextWhoWeAreMessage("Campo obrigatório.");
      } else {
        setErrorTextWhoWeAre(false);
        setErrorTextWhoWeAreMessage("");
      }

      if (!textProductsValidated) {
        setErrorTextProducts(true);
        setErrorTextProductsMessage("Campo obrigatório.");
      } else {
        setErrorTextProducts(false);
        setErrorTextProductsMessage("");
      }

      if (!telephoneInfoValidated) {
        setErrorTelephone(true);
        setErrorTelephoneMessage("Campo obrigatório.");
      } else {
        setErrorTelephone(false);
        setErrorTelephoneMessage("");
      }

      if (!enderecoInfoValidated) {
        setErrorEndereco(true);
        setErrorEnderecoMessage("Campo obrigatório.");
      } else {
        setErrorEndereco(false);
        setErrorEnderecoMessage("");
      }

      if (!facebookUsernameValidated) {
        setErrorFacebookUsername(true);
        setErrorFacebookUsernameMessage("Campo obrigatório.");
      } else {
        setErrorFacebookUsername(false);
        setErrorFacebookUsernameMessage("");
      }

      if (!instagramUsernameValidated) {
        setErrorInstagramUsername(true);
        setErrorInstagramUsernameMessage("Campo obrigatório.");
      } else {
        setErrorInstagramUsername(false);
        setErrorInstagramUsernameMessage("");
      }

      if (!facebookLinkValidated) {
        setErrorFacebookLink(true);
        setErrorFacebookLinkMessage("Campo obrigatório.");
      } else {
        setErrorFacebookLink(false);
        setErrorFacebookLinkMessage("");
      }

      if (!instagramLinkValidated) {
        setErrorInstagramLink(true);
        setErrorInstagramLinkMessage("Campo obrigatório.");
      } else {
        setErrorInstagramLink(false);
        setErrorInstagramLinkMessage("");
      }

      if (!whatsAppLinkValidated) {
        setErrorWhatsAppLink(true);
        setErrorWhatsAppLinkMessage("Campo obrigatório.");
      } else {
        setErrorWhatsAppLink(false);
        setErrorWhatsAppLinkMessage("");
      }
    } else {
      setLoading(true);

      const objHomeInfo = {
        textWhoWeAre: homeInfo.textWhoWeAre,
        textProducts: homeInfo.textProducts,
        contactInfo: {
          cellphone: homeInfo.telephoneInfo,
          address: homeInfo.enderecoInfo,
          facebookUsername: homeInfo.facebookUsername,
          instagramUsername: homeInfo.instagramUsername,
          facebookLink: homeInfo.facebookLink,
          instagramLink: homeInfo.instagramLink,
          whatsAppLink: homeInfo.whatsAppLink,
        },
      }

      try{
        // Salva mudanças de Home Info
        await api.put('/home/info', objHomeInfo, {
          headers: { authorization: `bearer ${token}` },
        });

        setTimeout(() => {
          setLoading(false);
          setMessageSnackbar("Alterações realizadas com sucesso!");
          setTypeSnackbar("success");
          setOpen(true);
        }, 1500);

        // Refresh da página
        // window.location.reload();
      } catch (err) {
        setMessageSnackbar("Falha ao atualizar os dados");
        setTypeSnackbar("error");
        setLoading(false);
        console.warn(err.message);
        return err.message;
      }
    }
  }

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleTextWhoWeAre = (value) => {
    setHomeInfo((oldValue) => ({
      textWhoWeAre: value,
      textProducts: oldValue.textProducts,
      telephoneInfo: oldValue.telephoneInfo,
      enderecoInfo: oldValue.enderecoInfo,
      facebookUsername: oldValue.facebookLink,
      instagramUsername: oldValue.instagramLink,
      facebookLink: oldValue.facebookLink,
      instagramLink: oldValue.instagramLink,
      whatsAppLink: oldValue.whatsAppLink,
    }));
  };

  const handleProducts = (value) => {
    setHomeInfo((oldValue) => ({
      textWhoWeAre: oldValue.textWhoWeAre,
      textProducts: value,
      telephoneInfo: oldValue.telephoneInfo,
      enderecoInfo: oldValue.enderecoInfo,
      facebookUsername: oldValue.facebookLink,
      instagramUsername: oldValue.instagramLink,
      facebookLink: oldValue.facebookLink,
      instagramLink: oldValue.instagramLink,
      whatsAppLink: oldValue.whatsAppLink,
    }));
  };

  return (
    <div className="HomeEditableContent">
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <div className="carouselPart">
        <div className="titleArea">
          <h1>
            CARROSSEL
            <span></span>
          </h1>
        </div>

        <div className="changeImagesPart">
          <h2>
            ALTERAR IMAGENS ({imagesCarousel.length}/{maximumImagesCarousel})
          </h2>
          <div
            className="boxChangeImages"
            style={
              errorImageCarousel
                ? { marginBottom: "0px", borderColor: "#f44336" }
                : { marginBottom: "24px" }
            }
          >
            {imagesCarousel.map((item, index) =>
              item ? (
                <SelectedImages
                  key={index}
                  srcImg={item.file}
                  altImg={item.imgAlt}
                  setSelectedImage={arrayStateImages}
                  SelectedImage={arrayImages}
                  indexImg={index}
                />
              ) : null
            )}
          </div>
          <span
            style={
              errorImageCarousel
                ? {
                    display: "block",
                    color: "#f44336",
                    fontSize: "14px",
                    marginBottom: "24px",
                  }
                : { display: "none" }
            }
          >
            {errorImageCarouselMessage}
          </span>
          <div className="buttonsCarouselPart">
            <Button className="firstButton" onClick={handleAddImageCarousel}>
              <input
                type="file"
                hidden
                ref={inputCarousel}
                onChange={(e) => handleAddImageCarouselFileInput()}
              />
              ADICIONAR NOVAS IMAGENS
            </Button>
            <Button
              className="secondButton"
              onClick={handleDeleteImageCarousel}
            >
              DELETAR IMAGENS SELECIONADAS
            </Button>
          </div>

          <div className="iconsCarouselPart">
            <Button className="firstButton" onClick={handleAddImageCarousel}>
              <input
                type="file"
                hidden
                ref={inputCarousel}
                onChange={(e) => handleAddImageCarouselFileInput()}
              />
              <AddCircleIcon />
            </Button>
            <Button
              className="secondButton"
              onClick={handleDeleteImageCarousel}
            >
              <DeleteIcon />
            </Button>
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
            <TextField
              variant="outlined"
              multiline={true}
              rows={10}
              size="medium"
              placeholder="Limite de 150 palavras"
              value={homeInfo.textWhoWeAre}
              error={errorTextWhoWeAre}
              helperText={errorTextWhoWeAreMessage}
              onChange={(e) => handleTextWhoWeAre(e.target.value)}
            />
          </div>
        </div>
        <div className="changeImageArea">
          <h2>ALTERAR IMAGEM</h2>
          <div className="imageWhoWeAre">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                height: "100%",
                width: "60%",
              }}
            >
              <div
                className="boxChangeImageWhoWeAre"
                style={
                  errorImageWhoWeAre
                    ? { marginBottom: "0px", borderColor: "#f44336" }
                    : { marginBottom: "24px" }
                }
              >
                {imagesWhoWeAre.file ? (
                  <SelectedImages
                    srcImg={imagesWhoWeAre.file}
                    altImg={imagesWhoWeAre.imgAlt}
                    whoWeAre={true}
                  />
                ) : (
                  <span>Sem imagem</span>
                )}
              </div>
              <span
                style={
                  errorImageWhoWeAre
                    ? { display: "block", color: "#f44336", fontSize: "14px" }
                    : { display: "none" }
                }
              >
                {errorImageWhoWeAreMessage}
              </span>
            </div>
            <div className="buttonsWhoWeArePart">
              <Button className="firstButton" onClick={handleAddImageWhoWeAre}>
                <input
                  type="file"
                  hidden
                  ref={inputWhoWeAre}
                  onChange={(e) => handleAddImageWhoWeAreFileInput()}
                />
                ALTERAR IMAGEM
              </Button>
              <Button
                className="secondButton"
                onClick={handleDeleteImageWhoWeAre}
              >
                DELETAR IMAGEM
              </Button>
            </div>

            <div className="iconsWhoWeArePart">
              <Button className="firstButton" onClick={handleAddImageWhoWeAre}>
                <input
                  type="file"
                  hidden
                  ref={inputWhoWeAre}
                  onChange={(e) => handleAddImageWhoWeAreFileInput()}
                />
                <AddCircleIcon />
              </Button>
              <Button
                className="secondButton"
                onClick={handleDeleteImageWhoWeAre}
              >
                <DeleteIcon />
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
            <TextField
              variant="outlined"
              multiline={true}
              rows={10}
              size="medium"
              placeholder="Limite de 150 palavras"
              value={homeInfo.textProducts}
              error={errorTextProducts}
              helperText={errorTextProductsMessage}
              onChange={(e) => handleProducts(e.target.value)}
            />
          </div>
        </div>

        <div className="changeImagesPart">
          <h2>
            ALTERAR PRODUTOS - UNIVERSITÁRIOS ({imagesProducts.length}/
            {maximumImagesProducts})
          </h2>
          <div
            className="boxChangeImages"
            style={
              errorImageProducts
                ? { marginBottom: "0px", borderColor: "#f44336" }
                : { marginBottom: "24px" }
            }
          >
            {imagesProducts.map((item, index) =>
              item ? (
                <SelectedImages
                  key={index}
                  srcImg={item.file}
                  altImg={item.imgAlt}
                  setSelectedImage={arrayStateImagesProducts}
                  SelectedImage={arrayImagesProducts}
                  indexImg={index}
                />
              ) : null
            )}
          </div>
          <span
            style={
              errorImageProducts
                ? {
                    display: "block",
                    color: "#f44336",
                    fontSize: "14px",
                    marginBottom: "24px",
                  }
                : { display: "none", marginBottom: "24px" }
            }
          >
            {errorImageProductsMessage}
          </span>
          <div className="buttonsCarouselPart">
            <Button className="firstButton" onClick={handleAddImageProducts}>
              <input
                type="file"
                hidden
                ref={inputProducts}
                onChange={(e) => handleAddImageProductsFileInput()}
              />
              ADICIONAR NOVAS IMAGENS
            </Button>
            <Button
              className="secondButton"
              onClick={handleDeleteImageProducts}
            >
              DELETAR IMAGENS SELECIONADAS
            </Button>
          </div>

          <div className="iconsCarouselPart">
            <Button className="firstButton" onClick={handleAddImageProducts}>
              <input
                type="file"
                hidden
                ref={inputProducts}
                onChange={(e) => handleAddImageProductsFileInput()}
              />
              <AddCircleIcon />
            </Button>
            <Button
              className="secondButton"
              onClick={handleDeleteImageProducts}
            >
              <DeleteIcon />
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
          <InputsOrIconWithInput
            label={"TELEFONE"}
            placeholderInfo={"(XX) XXXX-XXXX"}
            icon={<FacebookIcon />}
            defaultValue={homeInfo.telephoneInfo}
            hasIcon={false}
            setInfo={setHomeInfo}
            errorBoolean={errorTelephone}
            errorMessage={errorTelephoneMessage}
            field={"telephone"}
          />
          <InputsOrIconWithInput
            label={"ENDEREÇO"}
            placeholderInfo={"Rua ABC"}
            icon={<FacebookIcon />}
            defaultValue={homeInfo.enderecoInfo}
            hasIcon={false}
            setInfo={setHomeInfo}
            errorBoolean={errorEndereco}
            errorMessage={errorEnderecoMessage}
            field={"endereco"}
          />
          <div className="socialMediaInfo" style={{ marginTop: "24px" }}>
            <h2>REDES SOCIAIS</h2>
            <InputsOrIconWithInput
              label={"Facebook Username"}
              placeholderInfo={"profit"}
              icon={
                <FacebookIcon
                  style={{ fontSize: "45px", marginRight: "16px" }}
                />
              }
              defaultValue={homeInfo.facebookUsername}
              hasIcon={true}
              setInfo={setHomeInfo}
              errorBoolean={errorFacebookUsername}
              errorMessage={errorFacebookUsernameMessage}
              field={"facebook user"}
            />
            <InputsOrIconWithInput
              label={"Facebook Link"}
              placeholderInfo={"www.facebook.com/profit"}
              icon={
                <FacebookIcon
                  style={{ fontSize: "45px", marginRight: "16px" }}
                />
              }
              defaultValue={homeInfo.facebookLink}
              hasIcon={true}
              setInfo={setHomeInfo}
              errorBoolean={errorFacebookLink}
              errorMessage={errorFacebookLinkMessage}
              field={"facebook"}
            />
            <InputsOrIconWithInput
              label={"Instagram Username"}
              placeholderInfo={"profit"}
              icon={
                <InstagramIcon
                  style={{ fontSize: "45px", marginRight: "16px" }}
                />
              }
              defaultValue={homeInfo.instagramUsername}
              hasIcon={true}
              setInfo={setHomeInfo}
              errorBoolean={errorInstagramUsername}
              errorMessage={errorInstagramUsernameMessage}
              field={"instagram user"}
            />
            <InputsOrIconWithInput
              label={"Instagram Link"}
              placeholderInfo={"www.instagram.com/profit"}
              icon={
                <InstagramIcon
                  style={{ fontSize: "45px", marginRight: "16px" }}
                />
              }
              defaultValue={homeInfo.instagramLink}
              hasIcon={true}
              setInfo={setHomeInfo}
              errorBoolean={errorInstagramLink}
              errorMessage={errorInstagramLinkMessage}
              field={"instagram"}
            />
            <InputsOrIconWithInput
              label={"WhatsApp Link"}
              placeholderInfo={""}
              icon={
                <WhatsAppIcon
                  style={{ fontSize: "45px", marginRight: "16px" }}
                />
              }
              defaultValue={homeInfo.whatsAppLink}
              hasIcon={true}
              setInfo={setHomeInfo}
              errorBoolean={errorWhatsAppLink}
              errorMessage={errorWhatsAppLinkMessage}
              field={"whatsapp"}
            />
          </div>
        </div>
      </div>

      <Button className="saveChangesButton" onClick={handleSaveChanges}>
        {loading ? <CircularProgress color="secondary" /> : "SALVAR ALTERAÇÕES"}
      </Button>
      <SnackbarMessage
        open={open}
        handleClose={handleClose}
        message={messageSnackbar}
        type={typeSnackbar}
      />
    </div>
  );
}

export default HomeEditable;
