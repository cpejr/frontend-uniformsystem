import React from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { IconContext } from "react-icons";
import { FaTruck } from "react-icons/fa";
import "../Carrinho.css";

function ShippingCalc({ setShipping }) {
  return (
    <div className="shippingContainer">
      <p className="shippingText">Calcule o Frete: </p>
      <InputGroup className="inputShipping">
        <FormControl
          placeholder="CEP"
          aria-label="CEP"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-dark">
            <IconContext.Provider value={{ size: "3vh"}}>
                <FaTruck />
            </IconContext.Provider>
            Calcular
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export default ShippingCalc;
