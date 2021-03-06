import React, { useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

export default function ProductEditModal({
  fieldName,
  fieldKey,
  validator,
  callback,
  modelId,
  open,
  handleClose,
  placeholder = "",
}) {
  const classes = useStyles();
  const [value, setValue] = useState();
  const inputImg = useRef(null);
  const [errorFlag, setErrorFlag] = useState(false);
  const [error, setError] = useState();

  function handleSend() {
    if (fieldKey === "delete") {
      callback(modelId);
    } else {
      const validation = validator(value);
      if (validation === "ok") {
        modelId !== null && modelId !== undefined
          ? callback(modelId, fieldKey, value)
          : callback(fieldKey, value);
      } else {
        setErrorFlag(true);
        setError(validation);
      }
    }
  }

  function handleAddImageLink() {
    if (inputImg.current.files[0]) {
      let fileData = new FileReader();
      fileData.readAsDataURL(inputImg.current.files[0]);

      fileData.onload = function () {
        const fileLoaded = fileData.result;

        setValue({
          imgFile: inputImg.current.files[0],
          fileToShow: fileLoaded,
        });
      };
    } else {
      setValue({
        imgFile: "",
        fileToShow: null,
      });
    }
  }

  function handleAddImgLink() {
    inputImg.current.click();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>
        {fieldKey === "delete"
          ? "Deletar Modelo"
          : `Alterar ${modelId ? "modelo" : "produto"}`}
      </DialogTitle>
      {fieldKey === "imgLink" ? (
        <DialogContent style={{ width: "350px", maxWidth: "90%" }}>
          <Button
            className={classes.inputFile}
            onClick={() => handleAddImgLink()}
          >
            <input
              type="file"
              hidden
              ref={inputImg}
              onChange={() => handleAddImageLink()}
            />
            {value ? (
              value.imgFile.name
            ) : (
              <Button>
                <AddAPhotoIcon
                  style={errorFlag ? { color: "#f44336" } : { color: "#000" }}
                />
                ADICIONAR IMAGEM
              </Button>
            )}
          </Button>
          <span
            style={
              errorFlag
                ? { display: "block", fontSize: "14px", color: "#f44336" }
                : { display: "none" }
            }
          >
            {error}
          </span>
        </DialogContent>
      ) : (
        fieldKey !== "delete" && (
          <DialogContent style={{ width: "350px", maxWidth: "90%" }}>
            <DialogContentText>
              Digite o(a) novo(a) {fieldName}
            </DialogContentText>
            <TextField
              error={errorFlag}
              helperText={error}
              autoFocus
              margin="dense"
              label={fieldName}
              fullWidth
              placeholder={placeholder}
              onChange={(e) => {
                setValue(e.target.value);
                setError(null);
                setErrorFlag(false);
              }}
            />
          </DialogContent>
        )
      )}
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "red" }}>
          Cancelar
        </Button>
        <Button onClick={handleSend} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  inputFile: {
    width: "70%",
    outline: "none",
    border: "none",
    backgroundColor: "#8ED7CD",
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "16px",
  },
}));
