import React, { useState, useRef, useEffect } from 'react';
import './PopUpProductModel.css';

import { Dialog, DialogTitle, TextField, Button, 
    makeStyles, MenuItem, Typography  } from '@material-ui/core';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveIcon from '@material-ui/icons/Save';


function validatePrice(priceString){
    let isValid;
    const regex  = /^\d+(?:\,\d{2})$/;
    if (regex.test(priceString)){
        isValid = true;
    }
    else{
        isValid = false;
    }
    return isValid;
}

function validateGender(gender){
    let isValid;
    if(gender === ""){
        isValid = false;
    }else{
        isValid = true;
    }
    return isValid;
}

const PopUpProductModel = ({open, handleClose, isEdit, 
    productModelIDFromExistingInfo, setProductModelIDFromExistingInfo, setProductModelArray,
    productModelArray }) => {

    const [saveFileFromImgLink, setSaveFileFromImgLink] = useState({
        imgFile: '',
        fileToShow: null
    });

    const [genderState, setGenderState] = useState('');
    
    const [errorPrice, setErrorPrice] = useState(false);
    const [errorPriceMessage, setErrorPriceMessage] = useState('');

    const [errorGender, setErrorGender] = useState(false);
    const [errorGenderMessage, setErrorGenderMessage] = useState('');



    const [storedProductInfo, setStoredProductInfo] = useState({})

    const inputDescription = useRef(null);
    const inputPrice = useRef(null);
    const inputImg = useRef(null);

    const classes = useStyles();

    useEffect(() => {

        setStoredProductInfo({
            imgLink: productModelArray[productModelIDFromExistingInfo] === undefined ? '' : productModelArray[productModelIDFromExistingInfo].imgLink, 
            fileToShow: productModelArray[productModelIDFromExistingInfo] === undefined ? '' : productModelArray[productModelIDFromExistingInfo].fileToShow , 
            price: productModelArray[productModelIDFromExistingInfo] === undefined ? '' : productModelArray[productModelIDFromExistingInfo].price, 
            modelDescription: productModelArray[productModelIDFromExistingInfo] === undefined ? '' : productModelArray[productModelIDFromExistingInfo].modelDescription, 
            gender: productModelArray[productModelIDFromExistingInfo] === undefined ? '' : productModelArray[productModelIDFromExistingInfo].gender
        })
    
        setSaveFileFromImgLink({
            imgFile: productModelArray[productModelIDFromExistingInfo] === undefined ? '' : productModelArray[productModelIDFromExistingInfo].imgLink, 
            fileToShow: productModelArray[productModelIDFromExistingInfo] === undefined ? null : productModelArray[productModelIDFromExistingInfo].fileToShow,
        });

        setGenderState(productModelArray[productModelIDFromExistingInfo]? productModelArray[productModelIDFromExistingInfo].gender : '');

        console.log('produto selecionado', productModelArray[productModelIDFromExistingInfo])
        console.log('info', storedProductInfo)
        console.log('arquivo', saveFileFromImgLink)
        
    }, [open]);

    
    const handleChangeGenderState = (event) => {
        setGenderState(event.target.value);
    };

    const handleSave = (event) => {

        const resultValidatePrice = validatePrice(inputPrice.current.value);
        const resultValidateGender = validateGender(genderState);

        if(!resultValidatePrice && resultValidateGender){
            setErrorPrice( !resultValidatePrice )
            setErrorPriceMessage('Digite um preço válido. Formato XX,XX.');

            setErrorGender( !resultValidateGender )
            setErrorGenderMessage('');
        }else if(resultValidatePrice && !resultValidateGender){
            
            setErrorPrice( !resultValidatePrice );
            setErrorPriceMessage('');

            setErrorGender(!resultValidateGender);
            setErrorGenderMessage('Selecione um gênero.')
            
        }else if(!resultValidatePrice && !resultValidateGender){
            setErrorPrice( !resultValidatePrice );
            setErrorPriceMessage('Digite um preço válido. Formato XX,XX.');

            setErrorGender(!resultValidateGender);
            setErrorGenderMessage('Selecione um gênero.')

        }else{
            setErrorPrice( !resultValidatePrice )
            setErrorPriceMessage('')

            setErrorGender( !resultValidateGender )
            setErrorGenderMessage('')
            if(isEdit){
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
        
                setProductModelIDFromExistingInfo('')
    
            }else{
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
    
            }
    
            handleClose();
        }
        
    };

    // Manipulação para adicionar imagem
    function handleAddImgLink() {
        inputImg.current.click();
    }

    function handleAddImageLink() {

        if( inputImg.current.files[0] ){
        
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
        
        }else{
            setSaveFileFromImgLink({
                imgFile: '',
                fileToShow: null
            });
        }
    }

        return (

            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle>
                    <Typography variant="h2" className={classes.title}>
                    {isEdit? "Edição de Modelo": "Cadastro de modelo"}
                    </Typography>
                </DialogTitle>
                <TextField required label="Descrição" inputRef={inputDescription} 
                    className={classes.textInput}
                    defaultValue={isEdit? storedProductInfo.modelDescription : ''} 
                />
                <TextField required label="Preço" inputRef={inputPrice} 
                    className={classes.textInput}
                    error={errorPrice}
                    helperText={errorPriceMessage}
                    defaultValue={isEdit? storedProductInfo.price: ''}
                />
                <TextField
                    label="Gênero"
                    select
                    error={errorGender}
                    helperText={errorGenderMessage}
                    value={genderState}
                    className={classes.textInput}
                    onChange={(e) => handleChangeGenderState(e)}
                >
                    <MenuItem value={"M"}>Masculino</MenuItem>
                    <MenuItem value={"F"}>Feminino</MenuItem>
                </TextField>
                <Button className={classes.inputFile} onClick={(e) => handleAddImgLink()}>
                    <input
                        type="file"
                        hidden
                        ref={inputImg}
                        onChange={(e) => handleAddImageLink()}
                    />
                    {
                        saveFileFromImgLink.imgFile !== '' ? saveFileFromImgLink.imgFile.name : 
                        (
                            <>
                                <AddAPhotoIcon />   
                                ADICIONAR IMAGEM
                            </>
                        )
                    }
                </Button>
                <Button onClick={(e) => handleSave()} className={classes.saveButton} >
                    <SaveIcon />
                    {isEdit? 'Salvar alterações': 'Salvar modelo'}
                </Button>
            </Dialog>
        );
}

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


export default PopUpProductModel;