import React, { useState, useRef } from 'react';
import './PopUpProductModel.css';

import { Dialog, DialogTitle, TextField, Button, 
    makeStyles, Select, MenuItem, InputLabel  } from '@material-ui/core';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
    title: {
        fontSize: '35px',
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
        width: '85%',
        // '& + &': {
        //     marginTop: '12px',
        // },
        marginBottom: '16px',
    },
    labelInput: {
        alignSelf: 'flex-start',
        
    },
    inputFile: {
        width: '70%',
        outline: 'none',
        border: 'none',
        backgroundColor: '#8ED7CD',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '16px',
    },
    saveButton: {
        width: '85%',
        marginTop: '30px',
        outline: 'none',
        backgroundColor: '#4BB543',
        display: 'flex',
        justifyContent: 'space-evenly',
        fontSize: '18px',
        fontWeight: 600,

    }
}));


const PopUpProductModel = ({open, handleClose, titleModal, isEdit, 
    productModelIDFromExistingInfo, setProductModelIDFromExistingInfo, setProductModelArray,
    productModelArray }) => {

    const [saveFileFromImgLink, setSaveFileFromImgLink] = useState(null);

    const [genderState, setGenderState] = useState(null);
    const [isMainState, setIsMainState] = useState(null);

    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    // const inputIsMain = useRef(null);
    const inputImg = useRef(null);

    const handleChangeGenderState = (event) => {
        setGenderState(event.target.value);
    };

    const handleChangeIsMainState = (event) => {
        setIsMainState(event.target.value);
    };

    const handleSave = (event) => {
        console.log(event.target.value);
        
        const objInfo = {
            // isMain: inputIsMain.current.value,
            isMain: isMainState === 'Sim' ? true: false,
            imgLink: saveFileFromImgLink.imgFile,
            fileToShow: saveFileFromImgLink.fileToShow,
            price: inputPrice.current.value,
            modelDescription: inputDescription.current.value,
            gender: genderState,
        }
        console.log('iteravel', objInfo)

        setProductModelArray([...productModelArray , objInfo])
        handleClose();
    };

    const handleSaveChanges = (event) => {
        
        const oldObjInfo = {
            ...productModelArray[productModelIDFromExistingInfo],
            // isMain: inputIsMain.current.value === 'Sim' ? true: false,
            isMain: isMainState === 'Sim' ? true: false,
            imgLink: saveFileFromImgLink.imgFile,
            fileToShow: saveFileFromImgLink.fileToShow,
            price: inputPrice.current.value,
            modelDescription: inputDescription.current.value,
            gender: genderState,
        }

        console.log('depois do obj')

        const copyProductModelsArray = [...productModelArray]
        copyProductModelsArray.splice(productModelIDFromExistingInfo, 1, oldObjInfo)

        setProductModelArray([...copyProductModelsArray])

        setProductModelIDFromExistingInfo('')
        handleClose();
    };

    // Manipulação para adicionar imagem
    function handleAddImgLink() {
        inputImg.current.click();
    }

    function handleAddImageLink() {
        let fileData = new FileReader();
        fileData.readAsDataURL(inputImg.current.files[0]);
    
        console.log(inputImg.current.files[0]);
    
        fileData.onload = function () {
        const fileLoaded = fileData.result;
    
        setSaveFileFromImgLink({
            imgFile: inputImg.current.files[0],
            fileToShow: fileLoaded
        });
    
        };
    }
    
    const classes = useStyles();

    if(isEdit && productModelIDFromExistingInfo !== ''){
        const { isMain, imgLink, price, modelDescription, gender } = productModelArray[productModelIDFromExistingInfo];
        
        setIsMainState(isMain);
        setGenderState(gender);
        // setSaveFileFromImgLink({
        //     imgFile: imgLink.imgFile,
        //     fileToShow: imgLink.fileToShow,
        // })

        console.log('ENTROU EDIT', productModelArray[productModelIDFromExistingInfo])
        return (
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle>{titleModal}</DialogTitle>
                <TextField required error label="Descrição" inputRef={inputDescription} 
                    className={classes.textInput}
                    defaultValue={modelDescription} 
                />
                <TextField required label="Preço" inputRef={inputPrice} 
                    className={classes.textInput}
                    defaultValue={price}
                />
                <Select label="Gênero"
                    displayEmpty
                    value={genderState}
                    className={classes.textInput}
                    onChange={handleChangeGenderState}
                >
                    <MenuItem value={"M"}>Masculino</MenuItem>
                    <MenuItem value={"F"}>Feminino</MenuItem>
                </Select>
                {/* <TextField required label="Modelo principal" inputRef={inputIsMain} 
                    className={classes.textInput}
                    defaultValue={isMain ? 'Sim': 'Não'} 
                /> */}
                <InputLabel id="demo-simple-select-label-isMain" className={classes.labelInput}>Modelo principal</InputLabel>
                <Select labelId="demo-simple-select-label-isMain"
                    displayEmpty
                    value={isMainState}
                    className={classes.textInput}
                    onChange={handleChangeIsMainState}
                >
                    <MenuItem className={classes.menuItem} value={"Sim"}>Sim</MenuItem>
                    <MenuItem value={"Não"}>Não</MenuItem>
                </Select>
                <Button className={classes.inputFile} onClick={handleAddImgLink}>
                    <input
                        type="file"
                        hidden
                        ref={inputImg}
                        onChange={(e) => handleAddImageLink()}
                    />
                    {
                        saveFileFromImgLink ? saveFileFromImgLink.imgFile.name : 
                        (
                            <>
                                <AddAPhotoIcon />   
                                ADICIONAR IMAGEM
                            </>
                        )
                    }
                </Button>
                <Button onClick={handleSaveChanges} className={classes.saveButton} >
                    <SaveIcon />
                    Salvar alterações
                </Button>
            </Dialog>
        );
    }else{
        return (
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle className={classes.title}>{titleModal}</DialogTitle>
                <TextField required label="Descrição" 
                    inputRef={inputDescription} 
                    inputProps={{maxLength: 50}}
                    type="text" 
                    className={classes.textInput} 
                />
                <TextField required label="Preço" 
                    inputRef={inputPrice}
                    type="text"  
                    className={classes.textInput} 
                />
                <InputLabel id="demo-simple-select-label" className={classes.labelInput}>Gênero</InputLabel>
                <Select value={genderState}
                    labelId="demo-simple-select-label" 
                    onChange={handleChangeGenderState}
                    className={classes.textInput}
                >
                    <MenuItem value={"M"}>Masculino</MenuItem>
                    <MenuItem value={"F"}>Feminino</MenuItem>
                </Select>
                {/* <TextField required label="Modelo principal" 
                    inputRef={inputIsMain}
                    type="text"  
                    className={classes.textInput}
                /> */}
                <InputLabel id="demo-simple-select-label-isMain" className={classes.labelInput}>Modelo principal</InputLabel>
                <Select labelId="demo-simple-select-label-isMain"
                    displayEmpty
                    value={isMainState}
                    className={classes.textInput}
                    onChange={handleChangeIsMainState}
                >
                    <MenuItem value={"Sim"}>Sim</MenuItem>
                    <MenuItem value={"Não"}>Não</MenuItem>
                </Select>
                <Button className={classes.inputFile} onClick={handleAddImgLink}>
                    <input
                        type="file"
                        hidden
                        ref={inputImg}
                        onChange={(e) => handleAddImageLink()}
                    />
                    {
                        saveFileFromImgLink ? saveFileFromImgLink.imgFile.name : 
                        (
                            <>
                                <AddAPhotoIcon />   
                                ADICIONAR IMAGEM
                            </>
                        )
                    }
                </Button>
                <Button onClick={handleSave} className={classes.saveButton}>
                    <SaveIcon />
                    Salvar modelo
                </Button>
            </Dialog>
        );
    }

}

export default PopUpProductModel;