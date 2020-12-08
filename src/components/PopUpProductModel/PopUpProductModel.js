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
    productModelIDFromExistingInfo, setProductModelIDFromExistingInfo, setProductModelArray,
    productModelArray }) => {

    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    const inputIsMain = useRef(null);
    const inputImg = useRef(null);

    const handleChange = (event) => {
        console.log(event.target.value);

        handleClose();
    };

    const handleSave = (event) => {
        console.log(event.target.value);
        
        const objInfo = {
            isMain: inputIsMain.current.value,
            imgLink: inputImg.current.value,
            price: inputPrice.current.value,
            modelDescription: inputDescription.current.value,
            gender: 'M',
        }
        console.log('iteravel', objInfo)

        setProductModelArray([...productModelArray , objInfo])
        handleClose();
    };

    const handleSaveChanges = (event) => {
        
        const oldObjInfo = {
            ...productModelArray[productModelIDFromExistingInfo],
            isMain: inputIsMain.current.value === 'Sim' ? true: false,
            imgLink: inputImg.current.value,
            price: inputPrice.current.value,
            modelDescription: inputDescription.current.value,
            gender: 'M',
        }

        console.log('depois do obj')

        const copyProductModelsArray = [...productModelArray]
        copyProductModelsArray.splice(productModelIDFromExistingInfo, 1, oldObjInfo)

        setProductModelArray([...copyProductModelsArray])

        setProductModelIDFromExistingInfo('')
        handleClose();
    };
    
    const classes = useStyles();

    if(isEdit && productModelIDFromExistingInfo !== ''){
        const { isMain, imgLink, price, modelDescription, gender } = productModelArray[productModelIDFromExistingInfo];
        
        console.log('ENTROU EDIT', productModelArray[productModelIDFromExistingInfo])
        return (
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle>{titleModal}</DialogTitle>
                <TextField required label="Descrição" inputRef={inputDescription} defaultValue={modelDescription} />
                <TextField required label="Preço" inputRef={inputPrice} defaultValue={price} />
                <Select label="Gênero" value={gender} 
                displayEmpty
                onChange={handleChange}
                >
                    <MenuItem value={"M"}>Masculino</MenuItem>
                    <MenuItem value={"F"}>Feminino</MenuItem>
                </Select>
                <TextField required label="Modelo principal" inputRef={inputIsMain} defaultValue={isMain ? 'Sim': 'Não'} />
                <TextField required label="Link Imagem" inputRef={inputImg} defaultValue={imgLink} />
                <Button onClick={handleSaveChanges} >Salvar alterações</Button>
            </Dialog>
        );
    }else{
        return (
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle className={classes.title}>{titleModal}</DialogTitle>
                <TextField required label="Descrição" 
                    type="text" className={classes.textInput} 
                    inputRef={inputDescription} 
                />
                <TextField required label="Preço" 
                    type="text"  className={classes.textInput} 
                    inputRef={inputPrice}
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
                    inputRef={inputIsMain}
                />
                <TextField required label="Link Imagem" 
                    type="text"  className={classes.textInput} 
                    inputRef={inputImg}
                />
                <Button onClick={handleSave} className={classes.button}>Salvar modelo</Button>
            </Dialog>
        );
    }

}

export default PopUpProductModel;