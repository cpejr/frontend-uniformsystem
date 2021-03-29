import React, { useState, useRef, useEffect, useContext } from 'react';

import { CircularProgress, Dialog, DialogTitle, TextField, Button, 
    makeStyles, MenuItem, Typography  } from '@material-ui/core';

import api from "../../services/api";
import { LoginContext } from "../../contexts/LoginContext";

import SaveIcon from '@material-ui/icons/Save';


function validateText(text){
    let isValid;
    if(text === ""){
        isValid = false;
    }else{
        isValid = true;
    }
    return isValid;
}

function validateZipcode(zipcodeString){
    let isValid;
    const regex  = /^\d{8}$/;
    if (regex.test(zipcodeString)){
        isValid = true;
    }
    else{
        isValid = false;
    }
    return isValid;
}

function validateState(state){
    let isValid;
    if(state === ""){
        isValid = false;
    }else{
        isValid = true;
    }
    return isValid;
}

const PopUpChangeAddress = ({open, handleClose, 
    setAddress,
    address }) => {

    const { token } = useContext(LoginContext);

    const [loading, setLoading] = useState(false);

    const [stateState, setStateState] = useState('');
    
    // Estados voltados para gerenciar erros no campo Street
    const [errorStreet, setErrorStreet] = useState(false);
    const [errorStreetMessage, setErrorStreetMessage] = useState('');

    // Estados voltados para gerenciar erros no campo Neighborhood
    const [errorNeighborhood, setErrorNeighborhood] = useState(false);
    const [errorNeighborhoodMessage, setErrorNeighborhoodMessage] = useState('');

    // Estados voltados para gerenciar erros no campo City
    const [errorCity, setErrorCity] = useState(false);
    const [errorCityMessage, setErrorCityMessage] = useState('');

    // Estados voltados para gerenciar erros no campo Country
    const [errorCountry, setErrorCountry] = useState(false);
    const [errorCountryMessage, setErrorCountryMessage] = useState('');

    // Estados voltados para gerenciar erros no campo State
    const [errorState, setErrorState] = useState(false);
    const [errorStateMessage, setErrorStateMessage] = useState('');

    // Estados voltados para gerenciar erros no campo Zipcode
    const [errorZipcode, setErrorZipcode] = useState(false);
    const [errorZipcodeMessage, setErrorZipcodeMessage] = useState('');

    const [storedAddressInfo, setStoredAddressInfo] = useState({})

    const inputStreet = useRef(null);
    const inputComplement = useRef(null);
    const inputNeighborhood = useRef(null);
    const inputCity = useRef(null);
    const inputCountry = useRef(null);
    const inputZipcode = useRef(null);

    const classes = useStyles();

    useEffect(() => {

        setStoredAddressInfo({
            address_id: address.address_id,
            street: address.street,
            complement: address.complement,
            neighborhood: address.neighborhood,
            city: address.city,
            country: address.country,
            zip_code: address.zip_code,
        })

        setStateState(address.state);

        // Seta valores de erros para ok qunado abrir popUp
        setErrorStreet( false );
        setErrorStreetMessage('');

        setErrorNeighborhood( false );
        setErrorNeighborhoodMessage('');

        setErrorCity( false );
        setErrorCityMessage('');

        setErrorCountry( false );
        setErrorCountryMessage('');

        setErrorState( false );
        setErrorStateMessage('');

        setErrorZipcode( false );
        setErrorZipcodeMessage('');
        
    }, [open, address]);

    
    const handleChangeStateState = (event) => {
        setStateState(event.target.value);
    };

    const handleSave = async (event) => {

        const resultValidateStreet = validateText(inputStreet.current.value);
        const resultValidateNeighborhood = validateText(inputNeighborhood.current.value);
        const resultValidateCity = validateText(inputCity.current.value);
        const resultValidateCountry = validateText(inputCountry.current.value);
        const resultValidateState = validateState(stateState);
        const resultValidateZipcode = validateZipcode(inputZipcode.current.value);

        // Cobre as opções dos diferentes erros no PopUp
        if(!resultValidateStreet || !resultValidateNeighborhood || !resultValidateCity || !resultValidateCountry || !resultValidateState || !resultValidateZipcode){   // description ok, price errado, gender ok
            
            // Validação para Rua
            if(!resultValidateStreet){
                setErrorStreet( true );
                setErrorStreetMessage('Digite um endereço válido.');
            }else{
                setErrorStreet( false );
                setErrorStreetMessage('');
            }

            // Validação para Bairro
            if(!resultValidateNeighborhood){
                setErrorNeighborhood( true );
                setErrorNeighborhoodMessage('Digite um bairro válido.');
            }else{
                setErrorNeighborhood( false );
                setErrorNeighborhoodMessage('');
            }

            // Validação para Cidade
            if(!resultValidateCity){
                setErrorCity( true );
                setErrorCityMessage('Digite uma cidade válido.');
            }else{
                setErrorCity( false );
                setErrorCityMessage('');
            }

            // Validação para Estado
            if(!resultValidateState){
                setErrorState( true );
                setErrorStateMessage('Selecione um estado.');
            }else{
                setErrorState( false );
                setErrorStateMessage('');
            }

            // Validação para País
            if(!resultValidateCountry){
                setErrorCountry( true );
                setErrorCountryMessage('Digite um páis válido.');
            }else{
                setErrorCountry( false );
                setErrorCountryMessage('');
            }

            // Validação para CEP
            if(!resultValidateZipcode){
                setErrorZipcode( true );
                setErrorZipcodeMessage('Digite um código postal.');
            }else{
                setErrorZipcode( false );
                setErrorZipcodeMessage('');
            }

        }else{ // description ok, price ok, gender ok

            setLoading(true);

            setErrorStreet( false );
            setErrorStreetMessage('');

            setErrorNeighborhood( false );
            setErrorNeighborhoodMessage('');

            setErrorCity( false );
            setErrorCityMessage('');

            setErrorCountry( false );
            setErrorCountryMessage('');

            setErrorState( false );
            setErrorStateMessage('');

            setErrorZipcode( false );
            setErrorZipcodeMessage('');

            const objInfo = {
                updatedFields: {
                    street: inputStreet.current.value,
                    complement: inputComplement.current.value,
                    neighborhood: inputNeighborhood.current.value,
                    city: inputCity.current.value,
                    state: stateState,
                    country: inputCountry.current.value,
                    zip_code: inputZipcode.current.value,
                }
            }

            // Cria novo objeto para adicionar o address_id (necessário em próximas alterações de endereço)
            const newAddress = {
                address_id: storedAddressInfo.address_id, 
                ...objInfo.updatedFields
            }

            setAddress(newAddress);

            // Realiza chamada a API
            await api.put(`/address/${storedAddressInfo.address_id}`,
            objInfo,
            {
                headers: { authorization: `bearer ${token}` },
            });

            setLoading(false);

            handleClose();
        }
        
    };
        return (

            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <DialogTitle>
                    <Typography variant="h2" className={classes.title}>
                        Alterar endereço
                    </Typography>
                </DialogTitle>
                <TextField required label="Rua" inputRef={inputStreet}
                    error={errorStreet}
                    helperText={errorStreetMessage} 
                    className={classes.textInput}
                    defaultValue={storedAddressInfo.street} 
                />
                <TextField label="Complemento" inputRef={inputComplement}
                    className={classes.textInput}
                    defaultValue={storedAddressInfo.complement} 
                />
                <TextField required label="Bairro" inputRef={inputNeighborhood}
                    error={errorNeighborhood}
                    helperText={errorNeighborhoodMessage} 
                    className={classes.textInput}
                    defaultValue={storedAddressInfo.neighborhood} 
                />
                <TextField required label="Cidade" inputRef={inputCity}
                    error={errorCity}
                    helperText={errorCityMessage} 
                    className={classes.textInput}
                    defaultValue={storedAddressInfo.city} 
                />
                <TextField
                    label="Estado"
                    select
                    error={errorState}
                    helperText={errorStateMessage}
                    value={stateState}
                    className={classes.textInput}
                    onChange={(e) => handleChangeStateState(e)}
                >
                    <MenuItem value={"AC"}>Acre</MenuItem>
                    <MenuItem value={"AL"}>Alagoas</MenuItem>
                    <MenuItem value={"AP"}>Amapá</MenuItem>
                    <MenuItem value={"AM"}>Amazonas</MenuItem>
                    <MenuItem value={"BA"}>Bahia</MenuItem>
                    <MenuItem value={"CE"}>Ceará</MenuItem>
                    <MenuItem value={"DF"}>Distrito Federal</MenuItem>
                    <MenuItem value={"ES"}>Espírito Santo</MenuItem>
                    <MenuItem value={"GO"}>Goiás</MenuItem>
                    <MenuItem value={"MA"}>Maranhão</MenuItem>
                    <MenuItem value={"MT"}>Mato Grosso</MenuItem>
                    <MenuItem value={"MS"}>Mato Grosso do Sul</MenuItem>
                    <MenuItem value={"MG"}>Minas Gerais</MenuItem>
                    <MenuItem value={"PA"}>Pará</MenuItem>
                    <MenuItem value={"PR"}>Paraná</MenuItem>
                    <MenuItem value={"PE"}>Pernambuco</MenuItem>
                    <MenuItem value={"PI"}>Piauí</MenuItem>
                    <MenuItem value={"RJ"}>Rio de Janeiro</MenuItem>
                    <MenuItem value={"RN"}>Rio Grande do Norte</MenuItem>
                    <MenuItem value={"RS"}>Rio Grande do Sul</MenuItem>
                    <MenuItem value={"RO"}>Rondônia</MenuItem>
                    <MenuItem value={"RR"}>Roraima</MenuItem>
                    <MenuItem value={"SC"}>Santa Catarina</MenuItem>
                    <MenuItem value={"SP"}>São Paulo</MenuItem>
                    <MenuItem value={"SE"}>Sergipe</MenuItem>
                    <MenuItem value={"TO"}>Tocantins</MenuItem>
                    <MenuItem value={"*"}>Selecione um estado</MenuItem>
                </TextField>
                <TextField required label="País" inputRef={inputCountry}
                    error={errorCountry}
                    helperText={errorCountryMessage} 
                    className={classes.textInput}
                    defaultValue={storedAddressInfo.country} 
                />
                <TextField required label="CEP" inputRef={inputZipcode} 
                    className={classes.textInput}
                    error={errorZipcode}
                    helperText={errorZipcodeMessage}
                    defaultValue={storedAddressInfo.zip_code}
                />
                <Button onClick={(e) => handleSave()} className={classes.saveButton} >
                    {loading ? <CircularProgress /> :
                        <>
                            <SaveIcon />
                            Salvar alterações
                        </>
                    }
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
        '&:focus': {
            outline: 'none',
        },

        marginBottom: '32px'
    }
}));

export default PopUpChangeAddress;