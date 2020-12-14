import React, { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import api from "../../../services/api";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { MdVpnKey } from 'react-icons/md';


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
}));


export default function DropDownLoginContent(props) {
    const [User, setUser] = useState("");
    const [Password, setPassword] = useState("");

    const [Email, setEmail] = useState(""); //e-mail esqueci minha senha

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

        handleClickAway();

        try {
            const response = await api.post("login", {
                email: User,
                password: Password,
            });

            localStorage.setItem("accessToken", response.data.accessToken);

            const user = response.data.user[0];

        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    }


    async function handleForgot(e){
        try {
            const response = await api.post("sendpassword", {
                email: Email,
            });
        }catch(error){
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
                            setUser(e.target.value);
                        }}
                    />
                    SENHA
                    <input
                        className="input_password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="buttons">
                    <button className="b_login" onClick={(e) => handleLogin(e)}>
                        ACESSAR
                    </button>

                    <button className="b_register">CADASTRAR</button>
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
                                    onChange = {(e) => setEmail(e.target.value)}
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
