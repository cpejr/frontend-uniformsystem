import React, { useState, useEffect, useRef, useContext } from "react";
import { Helmet } from "react-helmet";
import MetaData from "../../meta/reactHelmet";
import { withRouter } from "react-router-dom";

import {
  Button,
  CircularProgress,
  makeStyles,
  MenuItem,
  Snackbar,
  TextField,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import api from "../../services/api";
import { LoginContext } from "../../contexts/LoginContext";

import "./EditarPerfil.css";
var telefoneMostra;

function validateInput(type, value) {
  let isValid;
  if (type === "name") {
    value === "" ? (isValid = false) : (isValid = true);
  }

  if (type === "rua") {
    value === "" ? (isValid = false) : (isValid = true);
  }

  if (type === "numero") {
    if (isNaN(Number(value)) || value === "") {
      isValid = false;
    } else {
      isValid = true;
    }
  }

  if (type === "complemento") {
    value === "" ? (isValid = false) : (isValid = true);
  }

  if (type === "bairro") {
    value === "" ? (isValid = false) : (isValid = true);
  }

  if (type === "CEP") {
    if (value.length < 8 || value === "") {
      isValid = false;
    } else {
      isValid = true;
    }
  }

  if (type === "cidade") {
    value === "" ? (isValid = false) : (isValid = true);
  }

  if (type === "estado") {
    value === "" ? (isValid = false) : (isValid = true);
  }

  if (type === "pontoRef") {
    value === "" ? (isValid = false) : (isValid = true);
  }

  if (type === "telefone") {
    if (value.length < 8 || value === "") {
      isValid = false;
    } else {
      isValid = true;
    }
  }

  return isValid;
}

function EditarPerfil({ history }) {
  const { token } = useContext(LoginContext);
  const { user } = useContext(LoginContext);
  const classes = useStyles();

  const [errorName, setErrorName] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState("");

  const [errorRua, setErrorRua] = useState(false);
  const [errorRuaMessage, setErrorRuaMessage] = useState("");

  const [errorNum, setErrorNum] = useState(false);
  const [errorNumMessage, setErrorNumMessage] = useState("");

  const [errorComplemento, setErrorComplemento] = useState(false);
  const [errorComplementoMessage, setErrorComplementoMessage] = useState("");

  const [errorBairro, setErrorBairro] = useState(false);
  const [errorBairroMessage, setErrorBairroMessage] = useState("");

  const [errorCEP, setErrorCEP] = useState(false);
  const [errorCEPMessage, setErrorCEPMessage] = useState("");

  const [errorCidade, setErrorCidade] = useState(false);
  const [errorCidadeMessage, setErrorCidadeMessage] = useState("");

  const [errorEstado, setErrorEstado] = useState(false);
  const [errorEstadoMessage, setErrorEstadoMessage] = useState("");

  const [errorPontoRef, setErrorPontoRef] = useState(false);
  const [errorPontoRefMessage, setErrorPontoRefMessage] = useState("");

  const [errorTelefone, setErrorTelefone] = useState(false);
  const [errorTelefoneMessage, setErrorTelefoneMessage] = useState("");

  const [userInfo, setUserInfo] = useState({ name: user[0].name });
  const [addressInfo, setAddressInfo] = useState();
  const [addressId, setAddressId] = useState();

  const nomeInput = useRef(null);
  const ruaInput = useRef(null);
  const numInput = useRef(null);
  const complementoInput = useRef(null);
  const bairroInput = useRef(null);
  const CEPInput = useRef(null);
  const cidadeInput = useRef(null);
  const estadoInput = useRef(null);
  const pontoRefInput = useRef(null);
  const telefoneInput = useRef(null);

  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const meta = {
    titlePage: "Uniformes E-commerce | Editar Perfil",
    titleSearch: "Editar Perfil",
    description: "Mude seus dados pessoais do seu perfil de usuário",
    keyWords: "Editar perfil",
    imageUrl: "",
    imageAlt: "",
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  async function getUserAddress() {
    const response = await api.get("/address/5", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAddressInfo({ ...response.data.adresses[0] });
    setUserInfo({ name: user[0].name });
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleSubmit = async () => {
    const resultValidateName = validateInput("name", nomeInput.current.value);
    const resultValidateRua = validateInput("rua", ruaInput.current.value);
    const resultValidateNum = validateInput("numero", numInput.current.value);
    const resultValidateComplemento = validateInput(
      "complemento",
      complementoInput.current.value
    );
    const resultValidateBairro = validateInput(
      "bairro",
      bairroInput.current.value
    );
    const resultValidateCEP = validateInput("CEP", CEPInput.current.value);
    const resultValidateCidade = validateInput(
      "cidade",
      cidadeInput.current.value
    );
    const resultValidateEstado = validateInput(
      "estado",
      estadoInput.current.value
    );
    const resultValidatePontoRef = validateInput(
      "pontoRef",
      pontoRefInput.current.value
    );
    const resultValidateTelefone = validateInput(
      "telefone",
      telefoneInput.current.value
    );

    if (
      !resultValidateName ||
      !resultValidateRua ||
      !resultValidateNum ||
      !resultValidateComplemento ||
      !resultValidateBairro ||
      !resultValidateCEP ||
      !resultValidateCidade ||
      !resultValidateEstado ||
      !resultValidatePontoRef ||
      !resultValidateTelefone
    ) {
      if (!resultValidateName) {
        setErrorName(true);
        setErrorNameMessage("Digite um nome.");
      } else {
        setErrorName(false);
        setErrorNameMessage("");
      }

      if (!resultValidateRua) {
        setErrorRua(true);
        setErrorRuaMessage("Digite uma rua.");
      } else {
        setErrorRua(false);
        setErrorRuaMessage("");
      }

      if (!resultValidateNum) {
        setErrorNum(true);
        setErrorNumMessage("Digite um número.");
      } else {
        setErrorNum(false);
        setErrorNumMessage("");
      }

      if (!resultValidateComplemento) {
        setErrorComplemento(true);
        setErrorComplementoMessage("Digite um complemento.");
      } else {
        setErrorComplemento(false);
        setErrorComplementoMessage("");
      }

      if (!resultValidateBairro) {
        setErrorBairro(true);
        setErrorBairroMessage("Digite um bairro");
      } else {
        setErrorBairro(false);
        setErrorBairroMessage("");
      }

      if (!resultValidateCEP) {
        setErrorCEP(true);
        setErrorCEPMessage("CEP inválido.");
      } else {
        setErrorCEP(false);
        setErrorCEPMessage("");
      }

      if (!resultValidateCidade) {
        setErrorCidade(true);
        setErrorCidadeMessage("Digite uma cidade.");
      } else {
        setErrorCidade(false);
        setErrorCidadeMessage("");
      }

      if (!resultValidateEstado) {
        setErrorEstado(true);
        setErrorEstadoMessage("Selecione um estado.");
      } else {
        setErrorEstado(false);
        setErrorEstadoMessage("");
      }

      if (!resultValidatePontoRef) {
        setErrorPontoRef(true);
        setErrorPontoRefMessage("Digite um ponto de referência.");
      } else {
        setErrorPontoRef(false);
        setErrorPontoRefMessage("");
      }

      if (!resultValidateTelefone) {
        setErrorTelefone(true);
        setErrorTelefoneMessage("Insira um telefone válido.");
      } else {
        setErrorTelefone(false);
        setErrorTelefoneMessage("");
      }
    } else {
      setErrorName(false);
      setErrorNameMessage("");
      setErrorRua(false);
      setErrorRuaMessage("");
      setErrorNum(false);
      setErrorNumMessage("");
      setErrorComplemento(false);
      setErrorComplementoMessage("");
      setErrorBairro(false);
      setErrorBairroMessage("");
      setErrorCEP(false);
      setErrorCEPMessage("");
      setErrorCidade(false);
      setErrorCidadeMessage("");
      setErrorEstado(false);
      setErrorEstadoMessage("");
      setErrorPontoRef(false);
      setErrorPontoRefMessage("");
      setErrorTelefone(false);
      setErrorTelefoneMessage("");

      // setAddressInfo({ ...addressInfo, street: street });

      try {
        setLoading(true);
        const street = ruaInput.current.value + "," + numInput.current.value;
        const response = await api.put(
          `/address/${addressInfo.address_id}`,
          {
            updatedFields: {
              street: street,
              neighborhood: bairroInput.current.value,
              city: cidadeInput.current.value,
              state: estadoInput.current.value,
              zip_code: CEPInput.current.value,
              country: addressInfo.country,
              complement: complementoInput.current.value,
            },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);

        const responseUser = await api.put(
          `user/${user[0].user_id}`,
          {
            updatedFields: {
              name: nomeInput.current.value,
              email: user[0].email,
              telefone: telefoneInput.current.value,
              cpf: user[0].cpf,
            },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTimeout(() => {
          setLoading(false);
          setOpenSnackBar(true);
        }, 2000);
        window.alert("Dados alterados com sucesso!");
        history.push("/");
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e, type) => {
    let newUserInfo;
    let newAddressInfo;

    if (type === "name") {
      newUserInfo = {
        name: e.target.value,
      };
      setUserInfo({ ...newUserInfo });
    }

    if (type === "rua") {
      newAddressInfo = {
        rua: e.target.value,
      };
      setAddressInfo({ ...addressInfo, ...newAddressInfo });
    }

    if (type === "number") {
      newAddressInfo = {
        number: e.target.value,
      };
      setAddressInfo({ ...addressInfo, ...newAddressInfo });
    }

    if (type === "city") {
      newAddressInfo = {
        city: e.target.value,
        country: "Brasil",
      };
      setAddressInfo({ ...addressInfo, ...newAddressInfo });
    }

    if (type === "neighborhood") {
      newAddressInfo = {
        neighborhood: e.target.value,
      };
      setAddressInfo({ ...addressInfo, ...newAddressInfo });
    }

    if (type === "zip_code") {
      newAddressInfo = {
        zip_code: e.target.value,
      };
      setAddressInfo({ ...addressInfo, ...newAddressInfo });
    }

    if (type === "complement") {
      newAddressInfo = {
        complement: e.target.value,
      };
      setAddressInfo({ ...addressInfo, ...newAddressInfo });
    }

    if (type === "state") {
      newAddressInfo = {
        state: e.target.value,
      };
      console.log(newAddressInfo.state);
      setAddressInfo({ ...addressInfo, state: e.target.value });
    }
  };

  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RO",
    "RS",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  return (
    <div className="registerEmployeeFullContent">
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <h1 className={classes.mainTitle}>
        EDITAR DADOS PESSOAIS
        <span className={classes.spanInsideTitle} />
      </h1>

      <h1 className={classes.subTitle}>NOME COMPLETO</h1>
      {user[0].name && (
        <TextField
          required
          inputRef={nomeInput}
          error={errorName}
          label="Nome Completo"
          helperText={errorNameMessage}
          className={classes.largeInput}
          variant="outlined"
          onChange={(e) => handleInputChange(e, "name")}
        />
      )}

      <h1 className={classes.subTitle}>ENDEREÇO</h1>
      <div className="horizontalInput">
        <h1 className={classes.caption}>Rua</h1>
        {addressInfo && (
          <TextField
            required
            label="Rua"
            inputRef={ruaInput}
            error={errorRua}
            helperText={errorRuaMessage}
            className={classes.mediumInput}
            variant="outlined"
            defaultValue={addressInfo.street.split(",")[0]}
            onChange={(e) => handleInputChange(e, "rua")}
          />
        )}
        <h1 className={classes.caption}>N°</h1>

        {addressInfo && (
          <TextField
            required
            label="Número"
            inputRef={numInput}
            error={errorNum}
            helperText={errorNumMessage}
            className={classes.smallInput}
            defaultValue={addressInfo.street.split(",")[1]}
            variant="outlined"
            onChange={(e) => handleInputChange(e, "number")}
          />
        )}
        <h1 className={classes.caption}>Complemento</h1>

        {addressInfo && (
          <TextField
            required
            label="Complemento"
            inputRef={complementoInput}
            error={errorComplemento}
            helperText={errorComplementoMessage}
            className={classes.mediumInput}
            variant="outlined"
            defaultValue={addressInfo.complement}
            onChange={(e) => handleInputChange(e, "complement")}
          />
        )}
        <h1 className={classes.caption}>Bairro</h1>

        {addressInfo && (
          <TextField
            required
            label="Bairro"
            inputRef={bairroInput}
            error={errorBairro}
            helperText={errorBairroMessage}
            className={classes.mediumInput}
            variant="outlined"
            defaultValue={addressInfo.neighborhood}
            onChange={(e) => handleInputChange(e, "neighborhood")}
          />
        )}
      </div>

      <div className="horizontalInput">
        <h1 className={classes.caption}>CEP</h1>
        {addressInfo && (
          <TextField
            required
            label="CEP"
            inputRef={CEPInput}
            error={errorCEP}
            helperText={errorCEPMessage}
            variant="outlined"
            className={classes.mediumInput}
            defaultValue={addressInfo.zip_code}
            onChange={(e) => handleInputChange(e, "zip_code")}
          />
        )}
        <h1 className={classes.caption}>Cidade</h1>
        {addressInfo && (
          <TextField
            required
            label="Cidade"
            inputRef={cidadeInput}
            error={errorCidade}
            helperText={errorCidadeMessage}
            className={classes.mediumInput}
            variant="outlined"
            defaultValue={addressInfo.city}
            onChange={(e) => handleInputChange(e, "city")}
          />
        )}
        <h1 className={classes.caption}>Estado</h1>
        {addressInfo && (
          <TextField
            required
            select
            label="Estado"
            error={errorEstado}
            inputRef={estadoInput}
            helperText={errorEstadoMessage}
            className={classes.smallInput}
            defaultValue={addressInfo.state}
            onChange={(e) => handleInputChange(e, "state")}
            variant="outlined"
          >
            {estados.map((estado) => (
              <MenuItem value={estado}>{estado}</MenuItem>
            ))}
          </TextField>
        )}
      </div>

      <div className="horizontalInput">
        <h1 className={classes.caption}>Ponto de referência</h1>
        {addressInfo && (
          <TextField
            required
            label="Ponto de Referência"
            inputRef={pontoRefInput}
            error={errorPontoRef}
            helperText={errorPontoRefMessage}
            className={classes.mediumInput}
            variant="outlined"
            defaultValue={addressInfo.complement}
            // onChange={(e) => handleInputChange(e, 'complement')}
          />
        )}
      </div>

      <h1 className={classes.subTitle}>TELEFONE DE CONTATO</h1>
      <TextField
        required
        label="Telefone"
        inputRef={telefoneInput}
        error={errorTelefone}
        helperText={errorTelefoneMessage}
        className={classes.mediumInput}
        variant="outlined"
      />

      <div className={classes.divButtons}>
        <Button className={classes.saveButton} onClick={() => handleSubmit()}>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            "SALVAR ALTERAÇÕES"
          )}
        </Button>
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
      >
        <MuiAlert
          onClose={handleCloseSnackBar}
          elevation={6}
          variant="filled"
          severity="success"
        >
          Dados alterados com sucesso!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    width: "fit-content",
    fontSize: "32px",
    lineHeight: "49px",
    marginTop: "5px",
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
  },

  spanInsideTitle: {
    width: "90%",
    height: "2px",
    margin: "0 auto",
    borderBottom: "2px solid #0EC4AB",
  },

  subTitle: {
    width: "fit-content",
    fontSize: "24px",
    lineHeight: "30px",
    marginTop: "20px",
    marginBottom: "8px",
    display: "flex",
    flexDirection: "column",

    color: "#0EC4AB",
  },

  caption: {
    width: "fit-content",
    fontSize: "20px",
    lineHeight: "25px",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "5px",
    display: "flex",
    flexDirection: "row",
  },

  inputText: {
    width: "35%",
    outline: "none",
    padding: "5px 10px",
    "&:focus": {
      width: "70%",
    },
    borderRadius: "7px",
    "& + &": {
      marginTop: "16px",
    },
    "& > label": {
      paddingLeft: "14px",
    },
  },

  smallInput: {
    width: "50%",
    [theme.breakpoints.up("800")]: {
      width: "10%",
    },
    outline: "none",
    padding: "5px 10px",
    [`& fieldset`]: {
      borderRadius: 40,
      borderColor: "#0EC4AB",
      borderWidth: 2,
    },
  },

  mediumInput: {
    width: "100%",
    [theme.breakpoints.up("800")]: {
      width: "20%",
    },
    outline: "none",
    padding: "5px 10px",
    [`& fieldset`]: {
      borderRadius: 40,
      borderColor: "#0EC4AB",
      borderWidth: 2,
    },
  },

  largeInput: {
    width: "100%",
    [theme.breakpoints.up("800")]: {
      width: "30%",
    },
    outline: "none",
    padding: "5px 10px",
    [`& fieldset`]: {
      borderRadius: 40,
      borderColor: "#0EC4AB",
      borderWidth: 2,
    },
  },

  divButtons: {
    width: "100%",
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  saveButton: {
    width: "80%",
    [theme.breakpoints.up("800")]: {
      width: "35%",
    },
    outline: "none",
    backgroundColor: "#0EC4AB",
    fontSize: "20px",
    transition: "background 0.6s",

    borderRadius: "40px",
    "&:hover": {
      backgroundColor: "#0EC4ABAA",
    },
  },
}));

export default withRouter(EditarPerfil);
