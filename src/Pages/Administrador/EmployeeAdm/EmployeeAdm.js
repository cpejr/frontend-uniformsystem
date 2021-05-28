import React, { useEffect, useState, useContext, useRef } from "react";
import api from "../../../services/api";
import { LoginContext } from "../../../contexts/LoginContext";
import { FaSearch } from "react-icons/fa";
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
  const { token, user } = useContext(LoginContext);
  const [employees, setEmployees] = useState([]);
  const [funcionarioFiltrado, setFuncionarioFiltrado] = useState([]);
  const [dialogItem, setDialogItem] = useState({ open: false, item: null });
  const inputSearch = useRef(null);

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
      const response = await api.get("/users/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees([...response.data.employees]);
      setFuncionarioFiltrado([...response.data.employees]);
    } catch (err) {
      console.warn(err.message);
      alert("Erro ao buscar funcionários");
    }
  }

  async function deleteEmployee() {
    try {
      await api.delete(`/users/delAdmOrEmployee/${dialogItem.item.user_id}`, {
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

  function FilterEmployee() {
    //Seta para vazio
    setFuncionarioFiltrado([]);

    const employee_name = inputSearch.current.value.toLowerCase();
    employees.forEach((employee) => {
      if (employee.name.toLowerCase().includes(employee_name)) {
        //Adiciona funcionario filtrado ao array
        setFuncionarioFiltrado((funcionarioFiltrado) => [
          ...funcionarioFiltrado,
          employee,
        ]);
        // funcionario.push(employee);
        // setEmployees(funcionario);
      }
    });

    // Se nao tiver nada no Input de busca, cooca todos
    if (employee_name === "") {
      setFuncionarioFiltrado([...employees]);
    }
  }

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
      <div className="topEmployee">
        <div className="searchEmployee">
          <input
            id="searchEmployee"
            type="text"
            ref={inputSearch}
            placeholder="Buscar Funcionário"
          />

          <FaSearch onClick={FilterEmployee} className="searchButtonEmployee" />
        </div>
        <div>
          <Link className="buttonEmployee" to="/adm/funcionarios/cadastro">
            <Button type="button">CADASTRAR FUNCIONÁRIO</Button>
          </Link>
        </div>
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
            {funcionarioFiltrado.length > 0 ? (
              funcionarioFiltrado.map((employee) => {
                const id = employee.user_id;
                const colum = (
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
                      {id !== user.user_id ? (
                        <IconButton onClick={() => handleOpen(employee)}>
                          <BsFillTrashFill />
                        </IconButton>
                      ) : null}
                      <IconButton>
                        <Link to={`/adm/funcionario/` + id}>
                          <BsInfoCircle />
                        </Link>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
                return colum;
              })
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
