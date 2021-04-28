import React, { useState, useRef, useEffect } from "react";
import { Select } from "@material-ui/core";

import "./SelectShipping.css";
import api from "../../services/api";

import { FormControl, InputGroup, Button, Form } from "react-bootstrap";
import { IconContext } from "react-icons/lib";
import { FaTruck } from "react-icons/fa";

/**
 * Exemplo de product_models:
 *
 * product_models: [
 *  {
 *    product_model_id: String,
 *    quantity: Integer,
 *  },
 * ],
 *
 */

function SelectShipping({ onSelectShipping, cep, product_models, ...props }) {
  const [errorMessage, setErrorMessage] = useState();
  const [shippingResult, setShippingResult] = useState();

  //Isso existe para prevenir um loop (Gambiarra)
  const [propsData, setPropsData] = useState({
    cep,
    product_models,
    onSelectShipping,
  });

  useEffect(() => {
    // A ORDEM DOS ELEMENTOS IMPORTA!
    const data = { cep, product_models, onSelectShipping };
    if (JSON.stringify(data) !== JSON.stringify(propsData))
      setPropsData({ cep, product_models, onSelectShipping });
  }, [cep, product_models, onSelectShipping]);

  useEffect(() => {
    setShippingResult();

    if (cep && product_models)
      api
        .post(`/order/shippingQuote`, {
          recipient_CEP: cep,
          product_models,
        })
        .then((response) => {
          const data = response.data.ShippingSevicesArray;
          setShippingResult(data);

          propsData.onSelectShipping && onSelectShipping(data[0]);
          setErrorMessage();
        })
        .catch((err) => {
          let message = err?.response?.data?.validation?.body?.message;
          if (!message) message = JSON.stringify(err.response?.data);

          setErrorMessage(message);
        });
  }, [propsData]);

  return (
    <div className="selectQuoteShipping" {...props}>
      <Select
        native
        onChange={(e) => {
          const data = shippingResult[e.target.value];
          propsData.onSelectShipping && propsData.onSelectShipping(data);
        }}
        variant="outlined"
      >
        {shippingResult?.map((shipping, index) => {
          const {
            ServiceDescription,
            ShippingPrice,
            DeliveryTime,
            ServiceCode,
            Error,
          } = shipping;

          if (Error) return <></>;

          let price, time;

          if (DeliveryTime) {
            if (DeliveryTime === "1") time = "1 dia";
            else time = `${DeliveryTime} dias`;
          } else {
            time = "-";
          }

          if (ShippingPrice) price = `R$ ${ShippingPrice?.replace(".", ",")}`;
          else price = "Não disponível";

          return (
            <option
              key={ServiceCode}
              value={index}
            >{`${ServiceDescription} - ${price} - ${time}`}</option>
          );
        })}
      </Select>
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </div>
  );
}

export default SelectShipping;
