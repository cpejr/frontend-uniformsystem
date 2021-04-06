import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
	TextField
} from "@material-ui/core";

export default function ForgotPasswordDialog({open, handleClose, handleSend}) {
	const [email, setEmail] = useState("");
	const [error, setError] = useState(false);

	const send = ()=>{
		if(email === "" || !email.includes("@") || !email.includes(".com")){
			setError(true);
		}
		else{
			handleSend(email);
		}
	}

	const handleWrite = (value) =>{
		if(value !== ""){
			setError(false);
			setEmail(value);
		}
	}

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"esqueceu sua senha?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Digite seu email abaixo. Então, será enviado um email para alteração da senha
        </DialogContentText>
				<TextField
						onChange={(e)=>handleWrite(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
						error={error}
						helperText="Digite o email corretamente"
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>handleClose()} color="primary">
          Cancelar
        </Button>
        <Button onClick={()=>send()} color="primary" autoFocus>
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
