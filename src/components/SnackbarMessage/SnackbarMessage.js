import React from "react";
import "./SnackbarMessage.css";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


export default function SnackbarMessage({open, handleClose, message, type}) {

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={type}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

