import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";
import api from "../../../services/api";
import { LoginContext } from "../../../contexts/LoginContext";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { MdVpnKey } from 'react-icons/md';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 4, 4),
    },
    alertStyle: {
        border: 'none',
        margin: '0',
        padding: '0',
        color: 'red',
        fontSize: '0.8rem',
    },
}));


export default function DropDownLoginContent(props) {
    const { signIn } = useContext(LoginContext);
    const history = useHistory();
    const [User, setUser] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState(""); //e-mail esqueci minha senha

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [submit, setSubmit] = useState(false);

    /* Modal esqueci minha senha */
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* ----------------------------*/

    function handleClickAway() {
        props.setClickLogin(false);
    }

    async function handleLogin(e) {
        e.preventDefault();

        setSubmit(true);
        //handleClickAway();
        if (User.length > 0 && Password.length > 6) {
            try {
                setLoading(true);
                const response = await api.post("/login", {
                    "email": User,
                    "password": Password,
                });
                if (response.data && response.data.accessToken) {
                    const token = response.data.accessToken;
                    const user = response.data.user;
                    signIn(token, user);
                    //Aqui manda para a rota logo apos o login
                    if(user[0].user_type === process.env.REACT_APP_ADM_ROLE){
                        history.push("/adm/home");
                    }else if(user[0].user_type === process.env.REACT_APP_EMPLOYEE_ROLE){
                        history.push("/adm/pedidos");
                    }else{
                        history.push("/");
                    }
                } else {
                    alert(`Email ou senha incorretos!`);
                }

                setError(false);

            } catch (error) {
                console.error(error);
                setError(true);
                //alert(error.response.data.message);
                //<Alert severity="error">This is an error alert — check it out!</Alert>
            }
        }
        setLoading(false);
    }


    async function handleForgot(e) {
        try {
            const response = await api.post("/sendpassword", {
                email: Email,
            });
            console.log('aqui', response);
        } catch (error) {
            console.warn(error);
            alert("E-mail não reconhecido. Verifique se escreveu corretamete ou faça o cadastro! :) ");
        }
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <form className="drop_content">
                <div className="title_login">LOGIN</div>
                <div className="inputs">
                    USUÁRIO
                    <input
                        className="input_login"
                        type="text"
                        onChange={(e) => {
                            setUser(e.target.value)
                        }}
                    />
                    {User.length === 0 && submit &&
                        <Alert className={classes.alertStyle} variant="outlined" severity="error">
                            Digite um usuário.
                        </Alert>}

                    SENHA
                    <input
                        className="input_password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    {Password.length < 6 && submit &&
                        <Alert className={classes.alertStyle} variant="outlined" severity="error">
                            Digite uma senha com no mínimo 6 caracteres.
                        </Alert>}

                </div>
                <div className="buttons">
                    <button className="b_login" onClick={(e) => handleLogin(e)} >
                        {loading ? <CircularProgress color='black' size={25} /> : "ACESSAR"}
                    </button>
                    
                    <Link style={{textDecoration: 'none', color: '#000'}} to="/cadastro">
                        <button>
                            CADASTRAR
                        </button>
                    </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {error &&
                        <Alert className={classes.alertStyle} variant="outlined" severity="error">
                            Usuário e/ou senha incorretos.
                        </Alert>
                    }
                </div>

                <div className="forgetPassword" onClick={handleOpen}>
                    Esqueceu sua senha?
                </div>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <div className="title-modal">
                                <MdVpnKey />
                                <span id="transition-modal-title">ESQUECI MINHA SENHA</span>
                            </div>
                            <div className="conteudo-modal">
                                <input
                                    type="text"
                                    placeholder="DIGITE SEU E-MAIL"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="modalbutton" onClick={(e) => handleForgot(e)}>ENVIAR</button>
                                <p>Um e-mail será enviado para este endereço para alteração de senha.</p>
                            </div>
                        </div>
                    </Fade>
                </Modal>

            </form>
        </ClickAwayListener >
    );
}
