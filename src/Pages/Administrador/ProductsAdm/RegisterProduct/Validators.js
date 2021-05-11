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
  price: (value) => {
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
  size(value) {
    const maximumValueInCentimeter = 100;
    const regex = /^[0-9]*[1-9][0-9]*$/;
    let isValid;
    if (
      value === "" ||
      !regex.test(value) ||
      value > maximumValueInCentimeter
    ) {
      isValid = false;
    } else {
      isValid = true;
    }
    return isValid;
  },
  weight(value) {
    const maximumWeigthInGrams = 30000;
    const regex = /^[1-9]\d{0,2}(?:\.\d{1,3})?$/;
    let isValid;
    if (value === "" || !regex.test(value) || value > maximumWeigthInGrams) {
      isValid = false;
    } else {
      isValid = true;
    }
    return isValid;
  },
};

export default validators;
