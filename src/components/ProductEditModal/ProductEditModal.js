import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { Button } from '@material-ui/core';

export default function ProductEditModal({fieldName, fieldkey, validator, callback, modelId, open, handleClose}) {
  const [value, setValue] = useState();
  const [error, setError] = useState();
  
  function handleSend(){
    const validation = validator(value);
    if(validation==="ok"){
      modelId ? callback(modelId, fieldkey, value) : callback(fieldkey, value);
    }
    else{
      setError(validation);
    }
  }

  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Alterar {modelId ? "modelo" : "produto"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite o novo {fieldName}
          </DialogContentText>
          <TextField
            error
            helperText={error}
            autoFocus
            margin="dense"
            label={fieldName}
            fullWidth
            onChange={(e) =>{setValue(e.target.value); setError(null)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSend} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
  );
}
