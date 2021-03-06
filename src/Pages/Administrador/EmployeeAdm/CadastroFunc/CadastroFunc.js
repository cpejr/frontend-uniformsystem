import React, { useRef, useState } from "react";
import MetaData from "../../../../meta/reactHelmet";
import { withRouter } from "react-router-dom";

import SnackbarMessage from "../../../../components/SnackbarMessage";

import {
  Button,
  CircularProgress,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";

import { FaChevronLeft } from "react-icons/fa";
import api from "../../../../services/api";

import "./CadastroFunc.css";

function validateInput(type, value) {
  let isValid;
  if (type === "name") {
    if (value === "") {
      isValid = false;
    } else {
      isValid = true;
    }
  }
  if (type === "cpf") {
    if (isNaN(Number(value)) || value.length < 11 || value === "") {
      isValid = false;
    } else {
      isValid = true;
    }
  }
  if (type === "email") {
    if (!value.includes("@") || !value.includes(".com") || value === "") {
      isValid = false;
    } else {
      isValid = true;
    }
  }
  if (type === "password") {
    if (value.length < 6 || value === "") {
      isValid = false;
    } else {
      isValid = true;
    }
  }
  if (type === "type employee") {
    if (value === "") {
      isValid = false;
    } else {
      isValid = true;
    }
  }
  return isValid;
}

function CadastroFunc({ history }) {
  const [typeEmployeeState, setTypeEmployeeState] = useState("");

  const classes = useStyles();

  const [errorName, setErrorName] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState("");

  const [errorCPF, setErrorCPF] = useState(false);
  const [errorCPFMessage, setErrorCPFMessage] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const [errorTypeEmployee, setErrorTypeEmployee] = useState(false);
  const [errorTypeEmployeeMessage, setErrorTypeEmployeeMessage] = useState("");

  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("success");

  const inputName = useRef(null);
  const inputCPF = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);

  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const meta = {
    titlePage: "Administrador - Cadastro Funcionário",
    titleSearch: "Cadastrar Funcionário Profit",
    description:
      "Insira os dados do funcionário desejado e realize seu cadastro em nosso banco de dados.",
    keyWords: "Cadastro, Funcionário, Dados, Profit",
    imageUrl: "",
    imageAlt: "",
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleChangeTypeEmployee = (e) => {
    setTypeEmployeeState(e.target.value);
  };

  const handleSubmit = async () => {
    const resultValidateName = validateInput("name", inputName.current.value);
    const resultValidateCPF = validateInput("cpf", inputCPF.current.value);
    const resultValidateEmail = validateInput(
      "email",
      inputEmail.current.value
    );
    const resultValidatePassword = validateInput(
      "password",
      inputPassword.current.value
    );
    const resultValidateTypeEmployee = validateInput(
      "type employee",
      typeEmployeeState
    );

    if (
      !resultValidateName ||
      !resultValidateCPF ||
      !resultValidateEmail ||
      !resultValidatePassword ||
      !resultValidateTypeEmployee
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
        setErrorCPFMessage("CPF inválido.");
      } else {
        setErrorCPF(false);
        setErrorCPFMessage("");
      }

      if (!resultValidateEmail) {
        setErrorEmail(true);
        setErrorEmailMessage("Email inválido.");
      } else {
        setErrorEmail(false);
        setErrorEmailMessage("");
      }

      if (!resultValidatePassword) {
        setErrorPassword(true);
        setErrorPasswordMessage("Senha inválida.");
      } else {
        setErrorPassword(false);
        setErrorPasswordMessage("");
      }

      if (!resultValidateTypeEmployee) {
        setErrorTypeEmployee(true);
        setErrorTypeEmployeeMessage("Selecione uma opção.");
      } else {
        setErrorTypeEmployee(false);
        setErrorTypeEmployeeMessage("");
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
      setErrorTypeEmployee(false);
      setErrorTypeEmployeeMessage("");

      try {
        setLoading(true);

        const response = await api.post("/users", {
          name: inputName.current.value,
          user_type: typeEmployeeState,
          email: inputEmail.current.value,
          cpf: inputCPF.current.value,
          password: inputPassword.current.value,
          telefone: "000000000", // validator nao deixa ficar sem telefone
        });

        setTimeout(() => {
          setLoading(false);
          setMessageSnackbar("Funcionário cadastrado com sucesso!");
          setTypeSnackbar("success");
          setOpenSnackBar(true);
        }, 1000);

        // Reseta as informações nos campos
        inputName.current.value = "";
        inputCPF.current.value = "";
        inputEmail.current.value = "";
        inputPassword.current.value = "";
        setTypeEmployeeState("");
      } catch (err) {
        setMessageSnackbar("Falha cadastrar funcionário");
        setTypeSnackbar("error");
        setLoading(false);
        console.warn(err.message);
      }
    }
  };

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
      <FaChevronLeft
        className={classes.icon}
        onClick={() => history.goBack()}
      />
      <h1 className={classes.mainTitle}>
        CADASTRAR NOVO FUNCIONÁRIO
        <span className={classes.spanInsideTitle} />
      </h1>
      <TextField
        required
        inputRef={inputName}
        error={errorName}
        label="Nome Completo"
        helperText={errorNameMessage}
        className={classes.inputText}
        variant="outlined"
      />
      <TextField
        required
        label="CPF"
        inputRef={inputCPF}
        error={errorCPF}
        inputProps={{ maxLength: 11 }}
        helperText={errorCPFMessage}
        className={classes.inputText}
        variant="outlined"
      />
      <TextField
        required
        label="E-mail"
        inputRef={inputEmail}
        error={errorEmail}
        helperText={errorEmailMessage}
        className={classes.inputText}
        variant="outlined"
      />
      <TextField
        required
        label="Senha"
        inputRef={inputPassword}
        error={errorPassword}
        helperText={errorPasswordMessage}
        className={classes.inputText}
        variant="outlined"
      />
      <TextField
        required
        select
        value={typeEmployeeState}
        label="Tipo de Funcionário"
        error={errorTypeEmployee}
        helperText={errorTypeEmployeeMessage}
        className={classes.inputText}
        onChange={(e) => handleChangeTypeEmployee(e)}
        variant="outlined"
      >
        <MenuItem value="">Selecione uma opção</MenuItem>
        <MenuItem value="employee">Funcionário</MenuItem>
        <MenuItem value="adm">Adminstrador</MenuItem>
      </TextField>

      <div className={classes.divButtons}>
        <Button className={classes.saveButton} onClick={() => handleSubmit()}>
          {loading ? <CircularProgress color="secondary" /> : "CADASTRAR"}
        </Button>
      </div>

      <SnackbarMessage
        open={openSnackBar}
        handleClose={handleCloseSnackBar}
        message={messageSnackbar}
        type={typeSnackbar}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    position: "absolute",
    fontSize: "35px",
    top: "10px",
    left: "5px",
    color: "#666",
    cursor: "pointer",
    "&:hover": {
      color: "#007bff",
    },
  },
  mainTitle: {
    width: "fit-content",
    fontSize: "32px",
    lineHeight: "49px",
    marginTop: "35px",
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
  inputText: {
    width: "100%",
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
  divButtons: {
    width: "100%",
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    width: "85%",
    outline: "none",
    backgroundColor: "#4BB543",
    fontSize: "18px",
    fontWeight: 600,
    transition: "background 0.6s",
    "&:hover": {
      backgroundColor: "#4BB543AA",
    },
  },
}));

export default withRouter(CadastroFunc);
