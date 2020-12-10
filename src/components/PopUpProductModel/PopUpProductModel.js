import React, { useState, useRef, useEffect } from 'react';
import './PopUpProductModel.css';

import { Dialog, DialogTitle, TextField, Button, 
    makeStyles, Select, MenuItem, InputLabel, Typography  } from '@material-ui/core';

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
        fontSize: '28px',
        fontWeight: 500,
    },
    dialog: {
        '& .MuiPaper-root': {
            display: 'flex',
            alignItems: 'center',
            width: '350px',
            padding: '30px 10px'
        },
    },
    label: {
        alignSelf: 'flex-start',
        paddingLeft: '25px',
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

    const [genderState, setGenderState] = useState('');
    const [storedProductInfo, setStoredProductInfo] = useState({})

    // useEffect(() => {
    //     setStoredProductInfo({
    //         productModelStored: productModelArray[productModelIDFromExistingInfo],
    //         idProductModelStored: productModelIDFromExistingInfo
    //     })
    // }, [])

    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    const inputImg = useRef(null);

    const handleChangeGenderState = (event) => {
        setGenderState(event.target.value);
    };

    const handleSave = (event) => {
        console.log(event.target.value);
        
        const objInfo = {
            isMain: false,
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
            isMain: false,
            imgLink: saveFileFromImgLink.imgFile,
            fileToShow: saveFileFromImgLink.fileToShow,
            price: inputPrice.current.value,
            modelDescription: inputDescription.current.value,
            gender: genderState,
        }

        console.log('depois do obj')

        const copyProductModelsArray = [...productModelArray];
        copyProductModelsArray.splice(productModelIDFromExistingInfo, 1, oldObjInfo)

        setProductModelArray([...copyProductModelsArray])

        // setProductModelIDFromExistingInfo('')
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

        console.log('id auqi', productModelIDFromExistingInfo)
        console.log('coisas', productModelArray[productModelIDFromExistingInfo])
        const { imgLink, price, modelDescription, gender } = productModelArray[productModelIDFromExistingInfo];
        
        console.log(' genero', gender)
        console.log(' genero tipo', typeof gender)
        console.log(genderState)
        // setGenderState(gender);
        console.log('passou aqui')

        let fileData = new FileReader();
        fileData.readAsDataURL(imgLink);
    
        console.log(imgLink);
    
        fileData.onload = function () {
        const fileLoaded = fileData.result;
    
        setSaveFileFromImgLink({
            imgFile: imgLink,
            fileToShow: fileLoaded
        });
    
        };

        
        console.log('ENTROU EDIT', productModelArray[productModelIDFromExistingInfo])
        setProductModelIDFromExistingInfo('');

        return (

            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle>
                    <Typography variant="h2" className={classes.title}>
                    {titleModal}
                    </Typography>
                </DialogTitle>
                <TextField required error label="Descrição" inputRef={inputDescription} 
                    className={classes.textInput}
                    defaultValue={modelDescription} 
                />
                <TextField required label="Preço" inputRef={inputPrice} 
                    className={classes.textInput}
                    defaultValue={price}
                />
                <InputLabel id="demo-simple-select-label" className={classes.label} >Gênero</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={genderState}
                    className={classes.textInput}
                    onChange={(e) => handleChangeGenderState(e)}
                >
                    <MenuItem value={"M"}>Masculino</MenuItem>
                    <MenuItem value={"F"}>Feminino</MenuItem>
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
                <DialogTitle>
                    <Typography variant="h2" className={classes.title}>
                    {titleModal}
                    </Typography>
                </DialogTitle>
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
                <InputLabel id="demo-simple-select-label" className={classes.label} >Gênero</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={genderState}
                    onChange={(e) => handleChangeGenderState(e)}
                    className={classes.textInput}
                >
                    <MenuItem value={"M"}>Masculino</MenuItem>
                    <MenuItem value={"F"}>Feminino</MenuItem>
                </Select>
                <Button className={classes.inputFile} onClick={handleAddImgLink}>
                    <input
                        type="file"
                        hidden
                        ref={inputImg}
                        onChange={(e) => handleAddImageLink(e)}
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