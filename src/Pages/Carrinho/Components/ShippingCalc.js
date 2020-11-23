import React, { useState } from "react";
import api from '../../../services/api'
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { IconContext } from "react-icons";
import { FaTruck } from "react-icons/fa";
import "../Carrinho.css";

function ShippingCalc({ setShipping }) {
  const [zip, setZip] = useState();
	const [err, setErr] = useState(false);

  function zipValidator(typedZip) {
    if (isNaN(typedZip)||typedZip.length!==8) setErr(true);
    else setErr(false);
    setZip(typedZip);
	}
	
	async function getShipping(){
		if(err){
			alert("Frete no formato incorreto");
		}
		try{
			const response = await api.get(`/shipping/${zip}`);
			const valor = parseFloat((response.data.shipping.Valor).replace(",", "."))
			setShipping(valor);
		}
		catch(error){
			console.warn(error);
			alert("Erro ao procurar o frete")
		}
	}

  return (
    <div className="shippingContainer">
      <p className="shippingText">CEP: </p>
				<InputGroup className="inputShipping">
					<FormControl
						placeholder="Apenas Números"
						aria-label="CEP"
						aria-describedby="basic-addon2"
						onChange={(e) => {
							zipValidator(e.target.value);
						}}
					/>
					<InputGroup.Append>
						<Button variant="outline-dark" onClick={()=>getShipping()}>
							<IconContext.Provider value={{ size: "3vh" }}>
								<FaTruck />
							</IconContext.Provider>
							Calcular Frete
						</Button>
					</InputGroup.Append>
				</InputGroup>
			{(err&&zip.length!==0) && <span style={{color: "red"}}>CEP no formato incorreto</span>}
    </div>
  );
}

export default ShippingCalc;
