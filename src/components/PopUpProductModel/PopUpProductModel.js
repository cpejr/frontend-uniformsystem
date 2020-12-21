import React, { useState, useRef, useEffect } from 'react';

import { Dialog, DialogTitle, TextField, Button, 
    makeStyles, MenuItem, Typography  } from '@material-ui/core';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveIcon from '@material-ui/icons/Save';


function validateDescription(description){
    let isValid;
    if(description === ""){
        isValid = false;
    }else{
        isValid = true;
    }
    return isValid;
}

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
    
    // Estados voltados para gerenciar erros no campo Description
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorDescriptionMessage, setErrorDescriptionMessage] = useState('');

    // Estados voltados para gerenciar erros no campo Gender
    const [errorGender, setErrorGender] = useState(false);
    const [errorGenderMessage, setErrorGenderMessage] = useState('');

    // Estados voltados para gerenciar erros no campo Price
    const [errorPrice, setErrorPrice] = useState(false);
    const [errorPriceMessage, setErrorPriceMessage] = useState('');

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

        // Seta valores de erros para ok qunado abrir popUp
        setErrorDescription( false )
        setErrorDescriptionMessage('');

        setErrorPrice( false )
        setErrorPriceMessage('')

        setErrorGender( false )
        setErrorGenderMessage('')
        
    }, [open]);

    
    const handleChangeGenderState = (event) => {
        setGenderState(event.target.value);
    };

    const handleSave = (event) => {

        const resultValidateDescription = validateDescription(inputDescription.current.value);
        const resultValidatePrice = validatePrice(inputPrice.current.value);
        const resultValidateGender = validateGender(genderState);

        // Cobre as opções dos diferentes erros no PopUp
        if(resultValidateDescription && !resultValidatePrice && resultValidateGender){   // description ok, price errado, gender ok
            setErrorDescription( false )
            setErrorDescriptionMessage('');
            
            setErrorPrice( true )
            setErrorPriceMessage('Digite um preço válido. Formato XX,XX.');

            setErrorGender( false )
            setErrorGenderMessage('');
        }else if(resultValidateDescription && resultValidatePrice && !resultValidateGender){ // description ok, price ok, gender errado
            setErrorDescription( false )
            setErrorDescriptionMessage('');

            setErrorPrice(false);
            setErrorPriceMessage('');

            setErrorGender(true);
            setErrorGenderMessage('Selecione um gênero.')
            
        }else if(!resultValidateDescription && resultValidatePrice && resultValidateGender){   // description errado, price ok, gender ok
            setErrorDescription( true )
            setErrorDescriptionMessage('Campo requerido.');
            
            setErrorPrice( false )
            setErrorPriceMessage('');

            setErrorGender( false )
            setErrorGenderMessage('');
        }else if(!resultValidateDescription && !resultValidatePrice && resultValidateGender){ // description errado, price errado, gender ok
            setErrorDescription( true )
            setErrorDescriptionMessage('Campo requerido.');

            setErrorPrice( true )
            setErrorPriceMessage('Digite um preço válido. Formato XX,XX.');

            setErrorGender(false);
            setErrorGenderMessage('')
            
        }else if(!resultValidateDescription && resultValidatePrice && !resultValidateGender){ // description errado, price ok, gender errado
            setErrorDescription( true )
            setErrorDescriptionMessage('Campo requerido.');
            
            setErrorPrice( false );
            setErrorPriceMessage('');

            setErrorGender(true);
            setErrorGenderMessage('Selecione um gênero.')

        }else if(resultValidateDescription && !resultValidatePrice && !resultValidateGender){ // description ok, price errado, gender errado
            setErrorDescription( false )
            setErrorDescriptionMessage('');
            
            setErrorPrice( true );
            setErrorPriceMessage('Digite um preço válido. Formato XX,XX.');

            setErrorGender(true);
            setErrorGenderMessage('Selecione um gênero.')

        }else if(!resultValidateDescription && !resultValidatePrice && !resultValidateGender){ // description errado, price errado, gender errado
            setErrorDescription( true )
            setErrorDescriptionMessage('Campo requerido.');
            
            setErrorPrice( true );
            setErrorPriceMessage('Digite um preço válido. Formato XX,XX.');

            setErrorGender(true);
            setErrorGenderMessage('Selecione um gênero.')

        }else{ // description ok, price ok, gender ok
            setErrorDescription( false );
            setErrorDescriptionMessage('');

            setErrorPrice( false );
            setErrorPriceMessage('');

            setErrorGender( false );
            setErrorGenderMessage('');
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
                setProductModelArray([...productModelArray , objInfo])
    
            }
    
            handleClose();
        }
        
    };

    // Manipulação para adicionar imagem
    function handleAddImgLink() {
        inputImg.current.click();
    }

    // Função para adicionar imagem
    function handleAddImageLink() {

        if( inputImg.current.files[0] ){
        
            let fileData = new FileReader();
            fileData.readAsDataURL(inputImg.current.files[0]);
        
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
                    error={errorDescription}
                    helperText={errorDescriptionMessage} 
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
    title: {
        fontSize: '28px',
        fontWeight: 600,
        padding: '0px 10px 15px 10px',
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