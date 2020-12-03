import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BsFillCaretRightFill, BsFillTrashFill } from 'react-icons/bs';
import { IconButton } from '@material-ui/core';

import './EmployeeAdm.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(ID, NOME) {
  return { ID, NOME };
}

const rows = [
  createData('01', 'JOÃO'),
  createData('02', 'MARIA'),
];

function EmployeeAdm(){
  const classes = useStyles();
  return (
    <div>
      <div>
        <button className= "buttonEmployee" type="submit">CADASTRAR FUNCIONÁRIO</button>
      </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="header-table">ID</TableCell>
            <TableCell align="center" className="header-table">NOME COMPLETO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.ID}
                <IconButton>
                  <BsFillCaretRightFill/>
                </IconButton>
              </TableCell>
              <TableCell align="left" className="trash">
                {row.NOME}
                <IconButton>
                  <BsFillTrashFill/>
                </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>  
  );
}

export default EmployeeAdm;

