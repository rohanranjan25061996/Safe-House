import React from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AuthContext} from "../../contextAPI/Auth"
import { Button } from "@mui/material";
import css from "../styles/Show.module.css"

function createData(name, calories, fat) {
    return { name, calories, fat};
  }


const ShowData = (props) => {

    const {balance, userAddress, activeDAO, setOpen} = React.useContext(AuthContext)

    const {newSafeHouse} = props

    const rows = [
        createData(`${activeDAO}`, `ETH`, `${balance}`),
      ];

    return(
        <>
        <div className={css.add_new_safe}>
            <div className={css.add_new_safe_container} onClick={newSafeHouse}>Add New Safe</div>
        </div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Contract Address</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Send</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right"> <Button onClick={() => setOpen(true)}>Send</Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
}

export default ShowData