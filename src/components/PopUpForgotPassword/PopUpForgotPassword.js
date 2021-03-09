import React, { useState } from "react";
import { MdVpnKey } from "react-icons/md";
import { Fade, Backdrop, Modal, makeStyles } from "@material-ui/core";
import api from "../../services/api";

function PopUpForgotPassword({ onClose, open }) {
  const [Email, setEmail] = useState(""); //e-mail esqueci minha senha
  const [Sent, setSent] = useState(false);
  const classes = useStyles();

  async function handleForgot(e) {
    try {
      await api.post("/sendpassword", {
        email: Email,
      });
      setSent(true);
    } catch (error) {
      alert(
        "E-mail não reconhecido. Verifique se escreveu corretamete ou faça o cadastro! :) "
      );
    }
  }

  function getContent() {
    if (!Sent)
      return (
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
            <button className="modalbutton" onClick={(e) => handleForgot(e)}>
              ENVIAR
            </button>
          </div>
        </div>
      );
    else
      return (
        <p>
          Um e-mail será enviado para este endereço para alteração de senha.
        </p>
      );
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>{getContent()}</Fade>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4, 4),
  },
  alertStyle: {
    border: "none",
    margin: "0",
    padding: "0",
    color: "red",
    fontSize: "0.8rem",
  },
}));

export default PopUpForgotPassword;
