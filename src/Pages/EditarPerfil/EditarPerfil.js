import React, { useRef, useState } from "react";

import { withRouter } from 'react-router-dom';

import { Button, CircularProgress, makeStyles, MenuItem, Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { FaChevronLeft } from 'react-icons/fa';

import api from "../../services/api";

import "./EditarPerfil.css";

function validateInput(type, value) {
    let isValid;
    if (type === "name") {
        if (value === '') {
            isValid = false;
        } else {
            isValid = true;
        }
    }
    if (type === "cpf") {
        if (isNaN(Number(value)) || value.length < 11 || value === '') {
            isValid = false;
        } else {
            isValid = true;
        }
    }
    if (type === "email") {
        if (!value.includes('@') || !value.includes('.com') || value === '') {
            isValid = false;
        } else {
            isValid = true;
        }
    }
    if (type === "password") {
        if (
            value.length < 6
            || value === ''
        ) {
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

function EditarPerfil({ history }) {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1c2VyX2lkIjoiMzYwZTg0LWNjM2MtMzhmMi1jZmI1LTc3MzhiNjZmZDJhIiwibmFtZSI6IkRpb2dvIEFkbWluIDEiLCJmaXJlYmFzZV91aWQiOiJFS2xOY05NdjBiVXZKQTVaR2xXZDEzZXZIMjYyIiwidXNlcl90eXBlIjoiYWRtIiwiZW1haWwiOiJkaW9nb2FkbTIwQGVtYWlsLmNvbSIsImNwZiI6IjEyMzQ1Njc4OTIwIiwiY3JlYXRlZF9hdCI6IjIwMjAtMTItMjIgMjM6MTM6MDEiLCJ1cGRhdGVkX2F0IjoiMjAyMC0xMi0yMiAyMzoxMzowMSJ9XSwiaWF0IjoxNjA4Njc5MjA1LCJleHAiOjE2MTEyNzEyMDV9.jJk7yPBwjDCdJPb-JIzj9ealrhMVGMNGwL1vRjyiEq8';

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

    const inputName = useRef(null);
    const inputCPF = useRef(null);
    const inputEmail = useRef(null);
    const inputPassword = useRef(null);

    const [loading, setLoading] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const handleChangeTypeEmployee = (e) => {
        setTypeEmployeeState(e.target.value)
    }


    const handleSubmit = async () => {

        const resultValidateName = validateInput('name', inputName.current.value);
        const resultValidateCPF = validateInput('cpf', inputCPF.current.value);
        const resultValidateEmail = validateInput('email', inputEmail.current.value);
        const resultValidatePassword = validateInput('password', inputPassword.current.value);
        const resultValidateTypeEmployee = validateInput('type employee', typeEmployeeState);

        if (!resultValidateName || !resultValidateCPF || !resultValidateEmail || !resultValidatePassword || !resultValidateTypeEmployee) {

            if (!resultValidateName) {
                setErrorName(true);
                setErrorNameMessage('Digite um nome.')
            } else {
                setErrorName(false);
                setErrorNameMessage('');
            }

            if (!resultValidateCPF) {
                setErrorCPF(true);
                setErrorCPFMessage('CPF inválido.')
            } else {
                setErrorCPF(false);
                setErrorCPFMessage('');
            }

            if (!resultValidateEmail) {
                setErrorEmail(true);
                setErrorEmailMessage('Email inválido.')
            } else {
                setErrorEmail(false);
                setErrorEmailMessage('');
            }

            if (!resultValidatePassword) {
                setErrorPassword(true);
                setErrorPasswordMessage('Senha inválida.')
            } else {
                setErrorPassword(false);
                setErrorPasswordMessage('');
            }

            if (!resultValidateTypeEmployee) {
                setErrorTypeEmployee(true);
                setErrorTypeEmployeeMessage('Selecione uma opção.')
            } else {
                setErrorTypeEmployee(false);
                setErrorTypeEmployeeMessage('');
            }
        }
        else {
            setErrorName(false);
            setErrorNameMessage('');
            setErrorCPF(false);
            setErrorCPFMessage('');
            setErrorEmail(false);
            setErrorEmailMessage('');
            setErrorPassword(false);
            setErrorPasswordMessage('');
            setErrorTypeEmployee(false);
            setErrorTypeEmployeeMessage('');

            try {

                setLoading(true);

                const newUserObj = {
                    name: inputName.current.value,
                    user_type: typeEmployeeState,
                    email: inputEmail.current.value,
                    cpf: inputCPF.current.value,
                    password: inputPassword.current.value,
                };

                const response = await api.post("http://localhost:3333/user",
                    newUserObj
                    ,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                    }
                );

                setTimeout(() => {
                    setLoading(false);
                    setOpenSnackBar(true);
                }, 2000);

                // Reseta as informações nos campos
                inputName.current.value = '';
                inputCPF.current.value = '';
                inputEmail.current.value = '';
                inputPassword.current.value = '';
                setTypeEmployeeState("");

            } catch (err) {
                console.log(err.message);
            }
        }
    }

    return (
        <div className="registerEmployeeFullContent">
            <h1 className={classes.mainTitle}>
                EDITAR DADOS PESSOAIS
          <span className={classes.spanInsideTitle} />
            </h1>

            <h1 className={classes.subTitle}>
                NOME COMPLETO
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

            <h1 className={classes.subTitle}>
                ENDEREÇO
        </h1>
            <div className="address01">
                <h1 className={classes.caption} >
                    Rua
            </h1>
                <TextField
                    required
                    label="Rua"
                    inputRef={inputCPF}
                    error={errorCPF}
                    helperText={errorCPFMessage}
                    variant="outlined"

                    className={classes.sideText}
                />
                <h1 className={classes.caption} >
                    N°
            </h1>

                <TextField
                    required
                    label="Número"
                    inputRef={inputEmail}
                    error={errorEmail}
                    helperText={errorEmailMessage}
                    className={classes.sideText}
                    variant="outlined"
                />
                <h1 className={classes.caption} >
                    Complemento
            </h1>

                <TextField
                    required
                    label="Complemento"
                    inputRef={inputPassword}
                    error={errorPassword}
                    helperText={errorPasswordMessage}
                    className={classes.sideText}
                    variant="outlined"
                />
                <h1 className={classes.caption} >
                    Bairro
            </h1>

                <TextField
                    required
                    label="Bairro"
                    inputRef={inputPassword}
                    error={errorPassword}
                    helperText={errorPasswordMessage}
                    className={classes.sideText}
                    variant="outlined"
                />
            </div>

            <div className="address01">
                <h1 className={classes.caption} >
                    CEP
            </h1>
                <TextField
                    required
                    label="CEP"
                    inputRef={inputCPF}
                    error={errorCPF}
                    helperText={errorCPFMessage}
                    variant="outlined"

                    className={classes.sideText}
                />
                <h1 className={classes.caption} >
                    Cidade
            </h1>
                <TextField
                    required
                    label="Cidade"
                    inputRef={inputEmail}
                    error={errorEmail}
                    helperText={errorEmailMessage}
                    className={classes.sideText}
                    variant="outlined"
                />
                <h1 className={classes.caption} >
                    Estado
            </h1>
                <TextField
                    required
                    label="Estado"
                    inputRef={inputEmail}
                    error={errorEmail}
                    helperText={errorEmailMessage}
                    className={classes.sideText}
                    variant="outlined"
                />

            </div>

            <h1 className={classes.subTitle}>
                TELEFONE DE CONTATO
        </h1>
            <TextField
                required
                label="Telefone"
                inputRef={inputPassword}
                error={errorPassword}
                helperText={errorPasswordMessage}
                className={classes.inputText}
                variant="outlined"
            />

            <div className={classes.divButtons}>
                <Button className={classes.saveButton} onClick={() => handleSubmit()} >
                    {loading ? <CircularProgress color='secondary' /> : "SALVAR ALTERAÇÕES"}
                </Button>
            </div>

            <Button
                type="button"
                className="purchaseFinished"
                onClick={() => alert('1')}
            >
                {loading ? <CircularProgress size={40} color='secondary' className="circular-progress" /> : "SALVAR ALTERAÇÕES"}
            </Button>

            <Snackbar open={openSnackBar} autoHideDuration={5000} onClose={handleCloseSnackBar}>
                <MuiAlert onClose={handleCloseSnackBar} elevation={6} variant="filled" severity="success">
                    Funcionário cadastrado com sucesso!
        </MuiAlert>
            </Snackbar>

        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    mainTitle: {
        width: 'fit-content',
        fontSize: '32px',
        lineHeight: '49px',
        marginTop: '35px',
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
    },

    spanInsideTitle: {
        width: '90%',
        height: '2px',
        margin: '0 auto',
        borderBottom: '2px solid #0EC4AB',
    },

    subTitle: {
        width: 'fit-content',
        fontSize: '24px',
        lineHeight: '30px',
        marginTop: '20px',
        marginBottom: '8px',
        display: 'flex',
        flexDirection: 'column',

        color: '#0EC4AB',
    },

    caption: {
        width: 'fit-content',
        fontSize: '20px',
        lineHeight: '25px',
        marginTop: '10px',
        marginBottom: '25px',
        display: 'flex',
        flexDirection: 'row',
    },

    inputText: {
        width: '35%',
        outline: 'none',
        padding: '5px 10px',
        '&:focus': {
            width: '70%',
        },
        borderRadius: '7px',
        '& + &': {
            marginTop: '16px',
        },
        '& > label': {
            paddingLeft: '14px',
        }
    },

    sideText: {
        width: '20%',

        outline: 'none',
        padding: '5px 10px',
    },

    divButtons: {
        width: '100%',
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    saveButton: {
        width: '85%',
        outline: 'none',
        backgroundColor: '#4BB543',
        fontSize: '18px',
        fontWeight: 600,
        transition: 'background 0.6s',
        '&:hover': {
            backgroundColor: '#4BB543AA',
        }
    }
}));

export default withRouter(EditarPerfil);
