import React, {useContext, useState, useEffect} from "react"
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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useMoralis} from "react-moralis"
import { getMoralisOptionSubDAO, getProviderSubDAOWallet } from "../../utils/helper";

const oops = Math.pow(10, 18)


const ShowAllTxData = (props) => {

    const {data, goBack, getAllTxData} = props
    const {activeDAO, setOpen, loading, setLoading}  = React.useContext(AuthContext);
    const [allLimit, setAllLimit] = useState(0)
    const {Moralis} = useMoralis()

    useEffect(() => {
      getAllLimit();
    }, [])

    const getAllLimit = async () => {
      try{
        const provider = getProviderSubDAOWallet(activeDAO);
        const tx = await provider.approversLimit();
        setAllLimit(tx)
      }catch(error){

      }
    }

    const approveTxData = async (id) => {
      //coniformTransaction
      //uint _txId
      try{
        setLoading(true)
        let payLoad = {
          _txId: id
        }

        const option = getMoralisOptionSubDAO('coniformTransaction', {...payLoad}, activeDAO)
        const tx = await Moralis.executeFunction(option);
        await tx.wait();
        await getAllTxData();
        setLoading(false)
      }catch(error){
        setLoading(false)
        console.log("======approveTxData=====", error)
      }
    }

    const coifromTxData = async (id) => {
      //executeTransaction
      //uint _txId
      try{
        setLoading(true)
        let payLoad = {
          _txId: id
        }

        const option = getMoralisOptionSubDAO('executeTransaction', {...payLoad}, activeDAO)
        const tx = await Moralis.executeFunction(option);
        await tx.wait();
        await getAllTxData()
        setLoading(false)
      }catch(error){
        setLoading(false)
        console.log("======coifromTxData=====", error)
      }
    }
    

    return(
        <>
          <div onClick={goBack}> <ArrowBackIosIcon className={css.delete} onClick = {goBack} /> </div>
         <div className={css.add_new_safe}>
            <div className={css.add_new_safe_container} onClick={() => setOpen(true)}>Add New Transaction</div>
        </div>
        <div style={{paddingBottom:'10px'}}>
            Safe Address: {activeDAO}
        </div>
        {data && data.length === 0 && <div>no transaction details persent !</div>}
         {data && data.length !== 0 && <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Payee Address</TableCell>
            <TableCell align="right">Amount(ETH)</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data && data.map((row) => (
            <TableRow
              key={row && row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.to}
              </TableCell>
              <TableCell align="right">{row.value / oops}</TableCell>
              <TableCell align="right">{row.executed ? 'Completed' : 'Pending'}</TableCell>
              {+allLimit !== +row.limit && <TableCell align="right">
                <Button variant="contained" className={css.submit_btn} onClick={() => approveTxData(row.id)}>
                  {loading ? 'processing...' : 'approve'}</Button></TableCell>}
              {+allLimit === +row.limit && 
              <TableCell align="right">

              <Button variant="contained" className={css.submit_btn} onClick={() => coifromTxData(row.id)}>
                {loading ? 'processing...' : 'coniform'}</Button></TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>}
        </>
    )
}

export default ShowAllTxData

