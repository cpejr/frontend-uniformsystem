import React, { useRef, useState } from "react";

import { withRouter } from 'react-router-dom';

import { Button, CircularProgress, makeStyles, MenuItem, Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import api from "../../services/api";

import "./EditarPerfil.css";

function validateInput(type, value) {
    let isValid;
    if (type === "name") {
        value === '' ? isValid = false : isValid = true;
    }

    if (type === "rua") {
        value === '' ? isValid = false : isValid = true;
    }

    if (type === "numero") {
        if (isNaN(Number(value)) || value === '') {
            isValid = false;
        } else {
            isValid = true;
        }
    }

    if (type === "complemento") {
        value === '' ? isValid = false : isValid = true;
    }

    if (type === "bairro") {
        value === '' ? isValid = false : isValid = true;
    }

    if (type === "CEP") {
        if (isNaN(Number(value)) || value.length < 8 || value === '') {
            isValid = false;
        } else {
            isValid = true;
        }
    }

    if (type === "cidade") {
        value === '' ? isValid = false : isValid = true;
    }

    if (type === "estado") {
        value === '' ? isValid = false : isValid = true;
    }

    if (type === "pontoRef") {
        value === '' ? isValid = false : isValid = true;
    }

    if (type === "telefone") {
        if (isNaN(Number(value)) || value.length < 8 || value === '') {
            isValid = false;
        } else {
            isValid = true;
        }
    }

    return isValid;
}

function EditarPerfil({ history }) {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1c2VyX2lkIjoiMzYwZTg0LWNjM2MtMzhmMi1jZmI1LTc3MzhiNjZmZDJhIiwibmFtZSI6IkRpb2dvIEFkbWluIDEiLCJmaXJlYmFzZV91aWQiOiJFS2xOY05NdjBiVXZKQTVaR2xXZDEzZXZIMjYyIiwidXNlcl90eXBlIjoiYWRtIiwiZW1haWwiOiJkaW9nb2FkbTIwQGVtYWlsLmNvbSIsImNwZiI6IjEyMzQ1Njc4OTIwIiwiY3JlYXRlZF9hdCI6IjIwMjAtMTItMjIgMjM6MTM6MDEiLCJ1cGRhdGVkX2F0IjoiMjAyMC0xMi0yMiAyMzoxMzowMSJ9XSwiaWF0IjoxNjA4Njc5MjA1LCJleHAiOjE2MTEyNzEyMDV9.jJk7yPBwjDCdJPb-JIzj9ealrhMVGMNGwL1vRjyiEq8';

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


    const inputName = useRef(null);
    const inputRua = useRef(null);
    const inputNum = useRef(null);
    const inputComplemento = useRef(null);
    const inputBairro = useRef(null);
    const inputCEP = useRef(null);
    const inputCidade = useRef(null);
    const inputPontoRef = useRef(null);
    const inputTelefone = useRef(null);
    const [estadoState, setEstadoState] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const handleSubmit = async () => {

        const resultValidateName = validateInput('name', inputName.current.value);
        const resultValidateRua = validateInput('rua', inputRua.current.value);
        const resultValidateNum = validateInput('num', inputNum.current.value);
        const resultValidateComplemento = validateInput('complemento', inputComplemento.current.value);
        const resultValidateBairro = validateInput('bairro', inputBairro.current.value);
        const resultValidateCEP = validateInput('CEP', inputCEP.current.value);
        const resultValidateCidade = validateInput('cidade', inputCidade.current.value);
        const resultValidateEstado = validateInput('estado', estadoState);
        const resultValidatePontoRef = validateInput('pontoRef', inputPontoRef.current.value);
        const resultValidateTelefone = validateInput('telefone', inputTelefone.current.value);

        if (!resultValidateName || !resultValidateRua || !resultValidateNum || !resultValidateComplemento || !resultValidateBairro || !resultValidateCEP ||
            !resultValidateCidade || !resultValidateEstado || !resultValidatePontoRef || !resultValidateTelefone) {

            if (!resultValidateName) {
                setErrorName(true);
                setErrorNameMessage('Digite um nome.')
            } else {
                setErrorName(false);
                setErrorNameMessage('');
            }

            if (!resultValidateRua) {
                setErrorRua(true);
                setErrorRuaMessage('Digite uma rua.')
            } else {
                setErrorRua(false);
                setErrorRuaMessage('');
            }

            if (!resultValidateNum) {
                setErrorNum(true);
                setErrorNumMessage('Digite um número.')
            } else {
                setErrorNum(false);
                setErrorNumMessage('');
            }

            if (!resultValidateComplemento) {
                setErrorComplemento(true);
                setErrorComplementoMessage('Digite um complemento.')
            } else {
                setErrorComplemento(false);
                setErrorComplementoMessage('');
            }

            if (!resultValidateBairro) {
                setErrorBairro(true);
                setErrorBairroMessage('Digite um bairro')
            } else {
                setErrorBairro(false);
                setErrorBairroMessage('');
            }

            if (!resultValidateCEP) {
                setErrorCEP(true);
                setErrorCEPMessage('CEP inválido.')
            } else {
                setErrorCEP(false);
                setErrorCEPMessage('');
            }

            if (!resultValidateCidade) {
                setErrorCidade(true);
                setErrorCidadeMessage('Digite uma cidade.')
            } else {
                setErrorCidade(false);
                setErrorCidadeMessage('');
            }

            if (!resultValidateEstado) {
                setErrorEstado(true);
                setErrorEstadoMessage('Selecione um estado.')
            } else {
                setErrorEstado(false);
                setErrorEstadoMessage('');
            }

            if (!resultValidatePontoRef) {
                setErrorPontoRef(true);
                setErrorPontoRefMessage('Digite um ponto de referência.')
            } else {
                setErrorPontoRef(false);
                setErrorPontoRefMessage('');
            }

            if (!resultValidateTelefone) {
                setErrorTelefone(true);
                setErrorTelefoneMessage('Insira um telefone válido.')
            } else {
                setErrorTelefone(false);
                setErrorTelefoneMessage('');
            }
        }
        else {
            setErrorName(false);
            setErrorNameMessage('');
            setErrorRua(false);
            setErrorRuaMessage('');
            setErrorNum(false);
            setErrorNumMessage('');
            setErrorComplemento(false);
            setErrorComplementoMessage('');
            setErrorBairro(false);
            setErrorBairroMessage('');
            setErrorCEP(false);
            setErrorCEPMessage('');
            setErrorCidade(false);
            setErrorCidadeMessage('');
            setErrorEstado(false);
            setErrorEstadoMessage('');
            setErrorPontoRef(false);
            setErrorPontoRefMessage('');
            setErrorTelefone(false);
            setErrorTelefoneMessage('');

            try {

                setLoading(true);

                /*const newUserObj = {
                    name: inputName.current.value,
                    user_type: typeEmployeeState,
                    email: inputEmail.current.value,
                    cpf: inputCPF.current.value,
                    password: inputPassword.current.value,
                };

                const response = await api.post("http://localhost:3333/user",
                    newUserObj,
        
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
                setTypeEmployeeState(""); */

            } catch (err) {
                console.log(err.message);
            }
        }
    }

    const estados = [ 
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MG',
        'MS',
        'MT',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RO',
        'RS',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO'
    ];

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
                className={classes.largeInput}
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
                    inputRef={inputRua}
                    error={errorRua}
                    helperText={errorRuaMessage}
                    variant="outlined"

                    className={classes.mediumInput}
                />
                <h1 className={classes.caption} >
                    N°
                </h1>

                <TextField
                    required
                    label="Número"
                    inputRef={inputNum}
                    error={errorNum}
                    helperText={errorNumMessage}
                    className={classes.smallInput}
                    variant="outlined"
                />
                <h1 className={classes.caption} >
                    Complemento
                </h1>

                <TextField
                    required
                    label="Complemento"
                    inputRef={inputComplemento}
                    error={errorComplemento}
                    helperText={errorComplementoMessage}
                    className={classes.mediumInput}
                    variant="outlined"
                />
                <h1 className={classes.caption} >
                    Bairro
                </h1>

                <TextField
                    required
                    label="Bairro"
                    inputRef={inputBairro}
                    error={errorBairro}
                    helperText={errorBairroMessage}
                    className={classes.mediumInput}
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
                    inputRef={inputCEP}
                    error={errorCEP}
                    helperText={errorCEPMessage}
                    variant="outlined"

                    className={classes.mediumInput}
                />
                <h1 className={classes.caption} >
                    Cidade
                </h1>
                <TextField
                    required
                    label="Cidade"
                    inputRef={inputCidade}
                    error={errorCidade}
                    helperText={errorCidadeMessage}
                    className={classes.mediumInput}
                    variant="outlined"
                />
                <h1 className={classes.caption} >
                    Estado
                </h1>
                <TextField
                    required
                    select
                    value={estadoState}
                    label="Estado"
                    error={errorEstado}
                    helperText={errorEstadoMessage}
                    className={classes.smallInput}
                    //onChange={(e) => handleChangeTypeEmployee(e)}
                    variant="outlined"
                >
                    {estados.map(estado => (  
                      <MenuItem value={estado}>  
                        {estado}  
                      </MenuItem>  
                    ))} 
                </TextField>

            </div>

            <div className="address01">
                <h1 className={classes.caption}>
                    Ponto de referência
                </h1>
                <TextField
                    required
                    label="Ponto de Referência"
                    inputRef={inputPontoRef}
                    error={errorPontoRef}
                    helperText={errorPontoRefMessage}
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
                inputRef={inputTelefone}
                error={errorTelefone}
                helperText={errorTelefoneMessage}
                className={classes.root}
                variant="outlined"
            />

            <div className={classes.divButtons}>
                <Button className={classes.saveButton} onClick={() => handleSubmit()} >
                    {loading ? <CircularProgress color='secondary' /> : "SALVAR ALTERAÇÕES"}
                </Button>
            </div>

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
        marginTop: '5px',
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

    smallInput: {
        width: '10%',

        outline: 'none',
        padding: '5px 10px',
    },

    mediumInput: {
        width: '20%',

        outline: 'none',
        padding: '5px 10px',
    },

    largeInput: {
        width: '30%',

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
        width: '25%',
        outline: 'none',
        backgroundColor: '#0EC4AB',
        fontSize: '20px',
        transition: 'background 0.6s',

        borderRadius: '40px',
        '&:hover': {
            backgroundColor: '#0EC4ABAA',
        },
    },
}));

export default withRouter(EditarPerfil);
