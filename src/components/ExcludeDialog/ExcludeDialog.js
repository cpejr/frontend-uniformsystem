import React from "react";

import { DialogTitle, Dialog } from "@material-ui/core";
import { Button } from "react-bootstrap";


function ExcludeDialog({ title, callback, open, handleClose }) {

  return (
  <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
      <DialogTitle id="simple-dialog-title">Certeza que deseja excluir {title}?</DialogTitle>

      <div style={{display: "flex", justifyContent: "space-evenly", padding: '20px'}}>
        <Button variant="secondary" onClick={() =>handleClose()}>Cancelar</Button>
        <Button variant="danger" type="submit" onClick={() =>callback()}>Excluir</Button>
      </div>
  </Dialog>
  );
}

export default ExcludeDialog;
