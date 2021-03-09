import React, { useState } from "react";
import { MdVpnKey } from "react-icons/md";
import { Fade, Backdrop, Modal, makeStyles } from "@material-ui/core";
import api from "../../services/api";
import Alert from "@material-ui/lab/Alert";
import "./styles.css";

function PopUpForgotPassword({ onClose, open }) {
  const [Email, setEmail] = useState(""); //e-mail esqueci minha senha
  const [Error, setError] = useState();
  const [Sent, setSent] = useState(false);
  const classes = useStyles();

  async function handleForgot(e) {
    if (Error) setError();
    try {
      await api.post("/sendpassword", {
        email: Email,
      });
      setSent(true);
    } catch (error) {
      if (error.response) {
        const { response } = error;
        if (response.data?.validation?.body?.keys[0] === "email")
          setError("E-mail inválido");
        else if (response.data?.code === "auth/user-not-found")
          setError(
            "E-mail não encontrado. Verifique se escreveu corretamente ou faça o cadastro! :) "
          );
      }
    }
  }

  function getContent() {
    if (!Sent)
      return (
        <>
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
            {Error && (
              <Alert
                className={classes.alertStyle}
                variant="outlined"
                severity="error"
              >
                {Error}
              </Alert>
            )}
            <button className="modalbutton" onClick={(e) => handleForgot(e)}>
              ENVIAR
            </button>
          </div>
        </>
      );
    else
      return (
        <div className="conteudo-modal">
          <p>Será enviado um email para você alterar sua senha.</p>
          <button className="modalbutton" onClick={onClose}>
            Ok
          </button>
        </div>
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
      <Fade in={open}>
        <div className={classes.paper}>{getContent()}</div>
      </Fade>
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
    maxWidth: 560,
    flexGrow: 1,
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
