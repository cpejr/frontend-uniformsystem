import React, { useState, useRef } from "react";
import {
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

import CircularProgress from "@material-ui/core/CircularProgress";
import { InputGroup, Button, Form } from "react-bootstrap";
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

function CalculateShipping({ onCalculateShipping, product_models, ...props }) {
  const [errorMessage, setErrorMessage] = useState();
  const [shippingResult, setShippingResult] = useState([]);

  const [loadingProgress, setLoadingProgress] = useState(false);

  const inputCEP = useRef();

  async function CalculateShipping() {
    const cepReceived = inputCEP.current.value;
    try {
      if (
        cepReceived === "" ||
        cepReceived.length < 8 ||
        isNaN(Number(cepReceived)) ||
        product_models.length === 0
        ) {
          
          if(product_models.length === 0){
            setErrorMessage("Nenhum produto no carrinho.");
          }else{
            setErrorMessage("Digite um CEP válido.");
          }
        } else {
        setLoadingProgress(true);
        setErrorMessage("");

        const response = await api.post(`/order/shippingQuote`, {
          recipient_CEP: cepReceived,
          product_models,
        });
        
        if(response.data.message === "Weight exceeded.") throw new Error ("Weight exceeded.");

        // onCalculateShipping(response.data.ShippingSevicesArray);
        setTimeout(() => {
          setLoadingProgress(false);
          setShippingResult(response.data.ShippingSevicesArray);
        }, 2000);
      }
      
    } catch (err) {
      setTimeout(() => {
        setLoadingProgress(false);
        if(err.message === "Weight exceeded."){
          setErrorMessage("Peso excedido");
        }else{
          setErrorMessage("Erro ao calcular o frete");
        }
      }, 2000);
      console.warn(err);
    }
  }

  return (
    <div className="quoteShipping" {...props}>
      <span>{`Calcule o Frete: `}</span>
      <div className="calculateQuoteArea">
        <InputGroup className="groupShipping">
          <div className="inputCalculateShipping" >
            <Form.Control
              className="mr-2"
              maxLength={8}
              placeholder="Apenas Números"
              aria-label="CEP"
              isInvalid={!!errorMessage}
              ref={inputCEP}
            />
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </div>
          <Button 
            variant="dark"
            className="calculateShippingButton" 
            onClick={() => CalculateShipping()}
          >
            {
              loadingProgress ? (
                <CircularProgress
                  size={20}
                  color="secondary"
                />
              ) : 
              (
                <div className="d-flex">
                  <div className="mr-2">
                    <IconContext.Provider value={{ size: "20px" }}>
                      <FaTruck />
                    </IconContext.Provider>
                  </div>
                  <span>Calcular Frete</span>
                </div>
                  )
                }
          </Button>
        </InputGroup>
      </div>
      {shippingResult?.length > 0 && (
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
              {shippingResult.map((shipping) => {
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