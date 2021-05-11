const validators = {
  name: (value) => {
    if (value === "") {
      return "Não deixe o campo vazio!";
    } else {
      return "ok";
    }
  },
  description: (value) => {
    if (value === "") {
      return "Não deixe o campo vazio!";
    } else {
      return "ok";
    }
  },
  height: (value) => {
    if (
      value === "" ||
      isNaN(parseInt(value, 10)) ||
      parseInt(value, 10) <= 0
    ) {
      return "Digite uma altura válida";
    }
    if (parseFloat(value) > 300) {
      return "Altura máxima atingida (100 cm)";
    } else {
      return "ok";
    }
  },
  weight: (value) => {
    if (value === "" || isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      return "Digite um peso válido em gramas";
    }
    if (parseFloat(value) > 30000) {
      return "Peso máximo atingido (30 Kg)";
    } else {
      return "ok";
    }
  },
  length: (value) => {
    if (
      value === "" ||
      isNaN(parseInt(value, 10)) ||
      parseInt(value, 10) <= 0
    ) {
      return "Digite um comprimento válido (100 cm)";
    }
    if (parseFloat(value) > 100) {
      return "Comprimento máximo atingido";
    } else {
      return "ok";
    }
  },
  width: (value) => {
    if (
      value === "" ||
      isNaN(parseInt(value, 10)) ||
      parseInt(value, 10) <= 0
    ) {
      return "Digite uma largura válida";
    }
    if (parseFloat(value) > 100) {
      return "Largura máxima atingida (100 cm)";
    } else {
      return "ok";
    }
  },
  price: (value) => {
    let isValid;
    const regex = /^\d+(?:,\d{2})$/;
    if (regex.test(value)) {
      return "ok";
    } else {
      return "Digite o preço corretamente: xxx,yy";
    }
  },
  model_description: (value) => {
    if (value === "") {
      return "Não deixe o campo vazio!";
    } else {
      return "ok";
    }
  },
  gender: (value) => {
    if (value === "") {
      return "Não deixe o campo vazio!";
    } else if (value !== "M" && value !== "F") {
      return "Digite um gênero válido (M ou F)";
    } else {
      return "ok";
    }
  },
  imgLink(image) {
    if (!image) {
      return "Selecione uma imagem!";
    } else {
      return "ok";
    }
  },
};

export default validators;
