const validators = {
    name: (value)=>{
        if (value===""){
            return "Não deixe o campo vazio!"
        }
        else{
            return "ok"
        }
    },
    description: (value)=>{
        if (value===""){
            return "Não deixe o campo vazio!"
        }
        else{
            return "ok"
        }
    },
    price: (value)=>{

    },
    model_description: (value)=>{

    },
    genders: (value)=>{

    }
}

export default validators;