import React, { useState, useRef } from 'react';
import './PopUpProductModel.css';

import { Dialog, DialogTitle, TextField, Button, 
    makeStyles, Select, MenuItem, InputLabel } from '@material-ui/core';


import { FaEdit, FaStar, FaTrashAlt } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    title: {
        fontSize: '30px',
    },
    dialog: {
        '& .MuiPaper-root': {
            display: 'flex',
            alignItems: 'center',
            width: '350px',
            padding: '30px 10px'
        },
    },
    textInput: {
        width: '90%',
        '& + &': {
            marginTop: '12px',
        },
    },
    button: {
        width: '60%',
        marginTop: '20px',
        outline: 'none',
        backgroundColor: '#7A7A7A',

    }
}));


const PopUpProductModel = ({open, handleClose, titleModal, isEdit, 
    existingInfo, setExistingInfo, setNewInfo}) => {

    // const handleCloseModal = () => {
    //     handleClose(false);
    // }
    const [infoProductModel, setInfoProductModel] = useState({});

    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    const inputIsMain = useRef(null);
    const inputImg = useRef(null);

    const handleChange = (event) => {
        console.log(event.target.value);
    };

    const handleSave = (event) => {
        console.log(event.target.value);
        
        const objInfo = {
            description: inputDescription.current.value,
            price: inputPrice.current.value,
            isMain: inputIsMain.current.value,
            imgLink: inputImg.current.value,
        }

        setInfoProductModel(objInfo)
    };
    
    const classes = useStyles();

    if(isEdit){
        const { isMain, imgLink, price, modelDescription, gender } = existingInfo;
        
        return (
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle>{titleModal}</DialogTitle>
                <TextField required label="Descrição" defaultValue={modelDescription} />
                <TextField required label="Preço" defaultValue={price} />
                <Select label="Gênero" value={gender} 
                displayEmpty
                onChange={handleChange}
                >
                    <MenuItem value={"M"}>Masculino</MenuItem>
                    <MenuItem value={"F"}>Feminino</MenuItem>
                </Select>
                <TextField required label="Modelo principal" defaultValue={isMain} />
                <TextField required label="Link Imagem" defaultValue={imgLink} />
                <Button onClick={handleClose} >Salvar alterações</Button>
            </Dialog>
        );
    }else{
        return (
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle className={classes.title}>{titleModal}</DialogTitle>
                <TextField required label="Descrição" 
                    type="text" className={classes.textInput} 
                    ref={inputDescription} 
                />
                <TextField required label="Preço" 
                    type="text"  className={classes.textInput} 
                    ref={inputPrice}
                />
                <InputLabel id="demo-simple-select-required-label" className={classes.textInput}>Gênero</InputLabel>
                <Select value={"Gênero"} 
                    onChange={handleChange}
                    className={classes.textInput}
                >
                    <MenuItem value={"M"}>Masculino</MenuItem>
                    <MenuItem value={"F"}>Feminino</MenuItem>
                </Select>
                <TextField required label="Modelo principal" 
                    type="text"  className={classes.textInput}
                    ref={inputIsMain}
                />
                <TextField required label="Link Imagem" 
                    type="text"  className={classes.textInput} 
                    ref={inputImg}
                />
                <Button onClick={handleClose} className={classes.button}> Salvar modelo</Button>
            </Dialog>
        );
    }

}

export default PopUpProductModel;