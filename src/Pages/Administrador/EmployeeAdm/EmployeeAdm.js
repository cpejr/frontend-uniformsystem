import React, { useEffect, useState, useContext } from "react";
import api from "../../../services/api";
import { LoginContext } from "../../../contexts/LoginContext";
import { Helmet } from "react-helmet";
import MetaData from "../../../meta/reactHelmet";
import { Link } from "react-router-dom";

import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";

import { BsInfoCircle, BsFillTrashFill } from "react-icons/bs";
import ExcludeDialog from "../../../components/ExcludeDialog/ExcludeDialog";

import "./EmployeeAdm.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
  },
});

function EmployeeAdm() {
  const classes = useStyles();
  const { token } = useContext(LoginContext);
  const [employees, setEmployees] = useState([]);
  const [dialogItem, setDialogItem] = useState({ open: false, item: null });

  const meta = {
    titlePage: "Administrador | Funcionário",
    titleSearch: "Funcionário Profit Busca",
    description:
      "Encontre ou cadastre o funcionário que você desejar. É possível buscar, cadastrar ou deletar o funcionário do nosso banco de dados.",
    keyWords: "Funcionário, Cadastro, Deletar, Profit",
    imageUrl: "",
    imageAlt: "",
  };

  function handleClose() {
    setDialogItem({ open: false, item: null });
  }

  function handleOpen(item) {
    setDialogItem({ open: true, item: item });
  }

  async function getEmployees() {
    try {
      const response = await api.get("/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees([...response.data.employees]);
    } catch (error) {
      console.warn(error);
      alert("Erro ao buscar funcionários");
    }
  }

  async function deleteEmployee() {
    try {
      await api.delete(`/delAdmOrEmployee/${dialogItem.item.user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      handleClose();
      getEmployees();
    } catch (error) {
      console.warn(error);
      handleClose();
      alert("Erro ao excluir funcionário");
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>
      <MetaData
        titlePage={meta.titlePage}
        titleSearch={meta.titleSearch}
        description={meta.description}
        keyWords={meta.keyWords}
        imageUrl={meta.imageUrl}
        imageAlt={meta.imageAlt}
      />
      <div>
        <Link className="buttonEmployee" to="/adm/cadastrofuncionarios">
          <Button type="button">CADASTRAR FUNCIONÁRIO</Button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" className="header-table">
                NOME COMPLETO
              </TableCell>
              <TableCell align="center" className="header-table">
                EMAIL
              </TableCell>
              <TableCell align="center" className="header-table">
                AÇÕES
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee.user_id}>
                  <TableCell component="td" scope="row">
                    {employee.name}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {employee.email}
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    className={classes.actions}
                  >
                    <IconButton onClick={() => handleOpen(employee)}>
                      <BsFillTrashFill />
                    </IconButton>
                    <IconButton>
                      <Link to={`/adm/funcionario/${employee.user_id}`}>
                        <BsInfoCircle />
                      </Link>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <span>Nenhum funcionário cadastrado</span>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ExcludeDialog
        open={dialogItem.open}
        handleClose={handleClose}
        title={dialogItem.item?.name}
        callback={deleteEmployee}
      />
    </div>
  );
}

export default EmployeeAdm;
