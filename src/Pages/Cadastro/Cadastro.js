import React, { useState, useEffect, useRef, useContext } from "react";

import { withRouter } from "react-router-dom";

import {
  Button,
  CircularProgress,
  colors,
  makeStyles,
  MenuItem,
  Snackbar,
  TextField,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import api from "../../services/api";
import { LoginContext } from "../../contexts/LoginContext";

import "./Cadastro.css";
import {Helmet} from 'react-helmet';
import MetaData from '../../meta/reactHelmet';

function validateInput(type, value) {
  let isValid;
  if (type === "name") {
    value === "" ? (isValid = false) : (isValid = true);
  }

  if (type === "CPF") {
    if (isNaN(Number(value)) || value.length !== 11 || value === "") {
      isValid = false;
    } else {
      isValid = true;
    }
  }

  if (type === "email") {
    if ( !value.includes('@') || !value.includes('.com') || value === ''){
      isValid = false;
    } else {
      isValid = true;
    }
  }

  if (type === "password") {
    if (value.length < 6 || value === '') {
      isValid = false;
    } else {
      isValid = true;
    }
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
    if ( value.length < 6 || value === "" ) {
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
    if ( value.length < 8 || value === "" ) {
      isValid = false;
    } else {
      isValid = true;
    }
  }

  return isValid;
}

function Cadastro({ history }) {
  // const { token } = useContext(LoginContext);
  const classes = useStyles();

  const [errorName, setErrorName] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState("");

  const [errorCPF, setErrorCPF] = useState(false);
  const [errorCPFMessage, setErrorCPFMessage] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

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

  const [userInfo, setUserInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState({});

  const nomeInput = useRef(null);
  const CPFInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const ruaInput = useRef(null);
  const numInput = useRef(null);
  const complementoInput = useRef(null);
  const bairroInput = useRef(null);
  const CEPInput = useRef(null);
  const cidadeInput = useRef(null);
  const estadoInput = useRef("");
  const pontoRefInput = useRef(null);
  const telefoneInput = useRef(null);

  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  // useEffect(() => {
  //   console.log(userInfo)
  // }, [userInfo]);

  // useEffect(() => {
  //   console.log(addressInfo);
  // }, [addressInfo])

  const handleInputChange = (e, type) => {
    let newUserInfo;
    let newAddressInfo;

    if(type === 'name'){
      newUserInfo = {
        name: e.target.value,
        user_type: "client"
      }
    }

    if(type === 'email'){
      newUserInfo = {
        email: e.target.value
      }
    }

    if(type === 'password'){
      newUserInfo = {
        password: e.target.value
      }
    }

    if(type === 'cpf'){
      newUserInfo = {
        cpf: e.target.value
      }
    }

    if(type === 'rua'){
      newAddressInfo = {
        rua: e.target.value
      }
      setAddressInfo({ ...addressInfo, ...newAddressInfo })
    }

    if(type === 'number'){
      newAddressInfo = {
        number: e.target.value
      }
      setAddressInfo({ ...addressInfo, ...newAddressInfo })
    }

    if(type === 'city'){
      newAddressInfo = {
        city: e.target.value,
        country: "Brasil"
      }
      setAddressInfo({ ...addressInfo, ...newAddressInfo })
    }

    if(type === 'neighborhood'){
      newAddressInfo = {
        neighborhood: e.target.value
      }
      setAddressInfo({ ...addressInfo, ...newAddressInfo })
    }

    if(type === 'zip_code'){
      newAddressInfo = {
        zip_code: e.target.value
      }
      setAddressInfo({ ...addressInfo, ...newAddressInfo })
    }

    if(type === 'complement'){
      newAddressInfo = {
        complement: e.target.value
      }
      setAddressInfo({ ...addressInfo, ...newAddressInfo })
    }

    if(type === 'state'){
      newAddressInfo = {
        state: e.target.value
      }
      console.log(newAddressInfo.state);
      setAddressInfo({ ...addressInfo, state: e.target.value });
    }

    const Address = {
      address: { ...addressInfo }
    }

    setUserInfo({ ...userInfo, ...newUserInfo, ...Address });
  }

  const handleSubmit = async () => {
    const resultValidateName = validateInput("name", nomeInput.current.value);
    const resultValidateCPF = validateInput("CPF", CPFInput.current.value);
    const resultValidateEmail = validateInput("email", emailInput.current.value);
    const resultValidatePassword = validateInput("password", passwordInput.current.value);
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
    const resultValidateEstado = validateInput('estado', estadoInput.current.value);
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
      !resultValidateCPF ||
      !resultValidateEmail ||
      !resultValidatePassword ||
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

      if (!resultValidateCPF) {
        setErrorCPF(true);
        setErrorCPFMessage("Digite um CPF válido.");
      } else {
        setErrorCPF(false);
        setErrorCPFMessage("");
      }

      if (!resultValidateEmail) {
        setErrorEmail(true);
        setErrorEmailMessage("Digite um email válido.");
      } else {
        setErrorEmail(false);
        setErrorEmailMessage("");
      }

      if (!resultValidatePassword) {
        setErrorPassword(true);
        setErrorPasswordMessage("Digite uma senha válida. Mínimo 6 caracteres");
      } else {
        setErrorPassword(false);
        setErrorPasswordMessage("");
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
      setErrorCPF(false);
      setErrorCPFMessage("");
      setErrorEmail(false);
      setErrorEmailMessage("");
      setErrorPassword(false);
      setErrorPasswordMessage("");
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

      const str1 = addressInfo.rua;
      const str2 = addressInfo.number;

      const halfStreet = str1.concat(" ");
      const street = halfStreet.concat(str2);

      console.log('street = ', street);

      setAddressInfo({ ...addressInfo, street: street });

      delete addressInfo['number'];
      delete addressInfo['rua'];

      delete userInfo.address['number'];
      delete userInfo.address['rua'];

      const Address = {
        address: { ...addressInfo }
      }
  
      setUserInfo({ ...userInfo, ...Address });

      console.log(userInfo);

      try {
        setLoading(true);

        const response = await api.post(
          "/user",
          userInfo,
          // {
          //   headers: { authorization: `Bearer ${token}` },
          // }
        );

        console.log(response);

        setTimeout(() => {
          setLoading(false);
          setOpenSnackBar(true);
        }, 2000);

        history.push('/login');
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
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

  const meta = {
    titlePage: "Uniformes Ecommerce | Cadastro",
    titleSearch: "Profit Uniformes | Cadastro",
    description: "Cadastre-se no nosso ecommerce e tenha a melhor experiência possível com sua conta profit e nossos uniformes personalizados!",
    keyWords: "Uniformes | Cadastro | Ecommerce | Profit",
    imageUrl: "",
    imageAlt: "",
  }

  return (

    <div className="registerEmployeeFullContent">
      <MetaData titlePage={meta.titlePage} titleSearch={meta.titleSearch} description={meta.description} keyWords={meta.keyWords} imageUrl={meta.imageUrl} imageAlt={meta.imageAlt} />
      <h1 className={classes.mainTitle}>
        CADASTRO
        <span className={classes.spanInsideTitle} />
      </h1>

      <h1 className={classes.subTitle}>INFORMAÇÕES PESSOAIS</h1>
      <div className="horizontalInput">
        <h1 className={classes.caption}>Nome</h1>
          <TextField
            required

            label="Nome"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.inputBox
              }
            }}
            inputRef={nomeInput}
            error={errorName}
            helperText={errorNameMessage}
            variant="outlined"
            onChange={(event) => handleInputChange(event, 'name')}
            className={classes.largeInput}
          />

          <h1 className={classes.caption}>CPF</h1>
          <TextField
            required
            label="CPF"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.inputBox
              }
            }}
            inputRef={CPFInput}
            error={errorCPF}
            helperText={errorCPFMessage}
            className={classes.mediumInput}
            variant="outlined"
            onChange={(event) => handleInputChange(event, 'cpf')}
          />
      </div>

      <div className="horizontalInput">
      <h1 className={classes.caption}>Email</h1>
          <TextField
            required
            label="Email"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.inputBox
              }
            }}
            inputRef={emailInput}
            error={errorEmail}
            helperText={errorEmailMessage}
            className={classes.largeInput}
            variant="outlined"
            onChange={(event) => handleInputChange(event, 'email')}
          />
        <h1 className={classes.caption}>Senha</h1>

          <TextField
            required
            label="Senha"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.inputBox
              }
            }}
            type="password"
            inputRef={passwordInput}
            error={errorPassword}
            helperText={errorPasswordMessage}
            className={classes.mediumInput}
            variant="outlined"
            onChange={(event) => handleInputChange(event, 'password')}
          />
      </div>

      <h1 className={classes.subTitle}>ENDEREÇO</h1>
      <div className="horizontalInput">
        <h1 className={classes.caption}>Rua</h1>
          <TextField
            required
            label="Rua"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.inputBox
              }
            }}
            inputRef={ruaInput}
            error={errorRua}
            helperText={errorRuaMessage}
            variant="outlined"
            onChange={(event) => handleInputChange(event, 'rua')} 
            className={classes.mediumInput}
          />
        <h1 className={classes.caption}>N°</h1>

        <TextField
          required
          label="N°"
          InputLabelProps={{
            classes: {
              root: classes.inputLabel,
              focused: classes.inputLabelFocused
            }
          }}
          InputProps={{
            classes: {
              root: classes.inputBox
            }
          }}
          inputRef={numInput}
          error={errorNum}
          helperText={errorNumMessage}
          className={classes.smallInput}
          variant="outlined"
          onChange={(event) => handleInputChange(event, 'number')}
        />
        <h1 className={classes.caption}>Complemento</h1>

          <TextField
            required
            label="Complemento"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.inputBox
              }
            }}
            inputRef={complementoInput}
            error={errorComplemento}
            helperText={errorComplementoMessage}
            className={classes.mediumInput}
            variant="outlined"
            onChange={(event) => handleInputChange(event, 'complement')}
          />
        <h1 className={classes.caption}>Bairro</h1>

          <TextField
            required
            label="Bairro"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.inputBox
              }
            }}
            inputRef={bairroInput}
            error={errorBairro}
            helperText={errorBairroMessage}
            className={classes.mediumInput}
            variant="outlined"
            onChange={(event) => handleInputChange(event, 'neighborhood')}
          />
      </div>

      <div className="horizontalInput">
        <h1 className={classes.caption}>CEP</h1>
          <TextField
            required
            label="CEP"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.inputBox
              }
            }}
            inputRef={CEPInput}
            error={errorCEP}
            helperText={errorCEPMessage}
            variant="outlined"
            className={classes.mediumInput}
            onChange={(event) => handleInputChange(event, 'zip_code')}
          />
        <h1 className={classes.caption}>Cidade</h1>
          <TextField
            required
            label="Cidade"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.inputBox
              }
            }}
            inputRef={cidadeInput}
            error={errorCidade}
            helperText={errorCidadeMessage}
            className={classes.mediumInput}
            variant="outlined"
            onChange={(event) => handleInputChange(event, 'city')}
          />
        <h1 className={classes.caption}>Estado</h1>
          <TextField
            required
            select
            label="Estado"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            InputProps={{
              classes: {
                root: classes.inputBox
              }
            }}
            inputRef={estadoInput}
            error={errorEstado}
            helperText={errorEstadoMessage}
            className={classes.mediumInput}
            defaultValue=""
            onChange={(event) => handleInputChange(event, 'state')}
            variant="outlined"
          >
            {estados.map((estado) => (
              <MenuItem value={estado}>{estado}</MenuItem>
            ))}
          </TextField>
      </div>

      <div className="horizontalInput">
        <h1 className={classes.caption}>Ponto de referência</h1>
          <TextField
            required
            label="Ponto de Referência"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.inputLabelFocused
              }
            }}
            inputRef={pontoRefInput}
            error={errorPontoRef}
            helperText={errorPontoRefMessage}
            className={classes.mediumInput}
            variant="outlined"
            //onChange={(event) => setPontoRef(event.target.value)}
          />
        
      </div>

      <h1 className={classes.subTitle}>TELEFONE DE CONTATO</h1>
      <TextField
        required
        label="Telefone"
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            focused: classes.inputLabelFocused
          }
        }}
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
            "CADASTRAR"
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
          Funcionário cadastrado com sucesso!
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

  inputLabel: {
    color: '#000000',
    marginLeft: 15,
  },

  inputLabelFocused: {
    marginLeft: 15,
  },

  inputBox: {
    marginRight: 40,
    marginLeft: -10,

    [theme.breakpoints.down("800")]: {
      marginRight: 0,
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

export default withRouter(Cadastro);