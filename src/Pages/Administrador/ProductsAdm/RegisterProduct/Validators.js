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
};

export default validators;
