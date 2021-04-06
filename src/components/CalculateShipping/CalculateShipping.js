import React, { useState, useRef } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import "./CalculateShipping.css";
import api from "../../services/api";

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

function CalculateShipping({ product_models, ...props }) {
  const [errorMessage, setErrorMessage] = useState();
  const [shippingResult, setShippingResult] = useState();
  const inputCEP = useRef();

  async function CalculateCEP() {
    const cepReceived = inputCEP.current.value;

    try {
      if (
        cepReceived === "" ||
        cepReceived.length < 8 ||
        isNaN(Number(cepReceived))
      ) {
        setErrorMessage("Digite um CEP válido.");
      } else {
        setErrorMessage();

        const response = await api.post(`/order/shippingQuote`, {
          recipient_CEP: cepReceived,
          product_models,
        });

        setShippingResult(response.data.ShippingSevicesArray);
      }
    } catch (err) {
      setShippingResult();
      console.warn(err);
    }
  }

  return (
    <div {...props}>
      <span>{`Calcule o Frete: `}</span>
      <div className="calculateCEPArea">
        <TextField
          variant="outlined"
          type="text"
          inputProps={{ maxLength: 8 }}
          inputRef={inputCEP}
          error={!!errorMessage}
          helperText={errorMessage}
        />
        <Button className="calculateCEPButton" onClick={CalculateCEP}>
          Calcular
        </Button>
      </div>
      {shippingResult && (
        <TableContainer component={Paper}>
          <Table className="shipping" size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="header-table">
                  Operador
                </TableCell>
                <TableCell align="center" className="header-table">
                  Serviço
                </TableCell>
                <TableCell align="center" className="header-table">
                  Preço
                </TableCell>
                <TableCell align="center" className="header-table">
                  Prazo
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shippingResult?.map((shipping) => {
                const {
                  ServiceDescription,
                  Carrier,
                  ShippingPrice,
                  DeliveryTime,
                } = shipping;

                let price, time;

                if (DeliveryTime) {
                  if (DeliveryTime === "1") time = "1 dia";
                  else time = `${DeliveryTime} dias`;
                } else {
                  time = "-";
                }

                if (ShippingPrice)
                  price = `R$ ${ShippingPrice?.replace(".", ",")}`;
                else price = "Não disponível";

                return (
                  <TableRow>
                    <TableCell component="td" scope="row">
                      {Carrier}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {ServiceDescription}
                    </TableCell>
                    <TableCell align="center" component="td" scope="row">
                      {price}
                    </TableCell>
                    <TableCell align="center" component="td" scope="row">
                      {time}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <a
        href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
        target="_blank"
        rel="noreferrer"
      >
        <span className="forgotPassword">Não sei meu CEP</span>
      </a>
    </div>
  );
}

export default CalculateShipping;
