import React, {useContext, useState} from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AuthContext} from "../../contextAPI/Auth"
import { Button, TextField } from "@mui/material";
import css from "../styles/Show.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useMoralis} from "react-moralis"
import { getMoralisOptionSubDAO } from "../../utils/helper";

const init = {
    name: '',
    address: '',
    limit: ''
}


const ShowOwnersData = (props) => {

    const {data, goBack, ownersFun} = props
    const [newOwner, setNewOwner] = useState(false)
    const [form, setForm] = useState(init)
    const {activeDAO, loading, setLoading}  = useContext(AuthContext);
    const {Moralis} = useMoralis();

    const handelChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    const handelSubmit = async () => {
        try{
            //address _add, uint _required, string memory _ownerName
            if(form.limit !== '' && form.address !== '' && form.name !== ''){
                setLoading(true)
                let payload = {
                    _add: form.address,
                    _required: form.limit,
                    _ownerName: form.name
                }
                const option = getMoralisOptionSubDAO('addOwner', {...payload}, activeDAO)
                const tx = await Moralis.executeFunction(option);
                await tx.wait();
                await ownersFun();
                setNewOwner(false)
                setLoading(false)
            }
        }catch{
            setLoading(false)
        }
    }

    const handelDeletOwner = async (address) => {
      console.log("=======address========", address)
      try{
        setLoading(true)
        let payload = {
          _owner: address
        }
        const options = getMoralisOptionSubDAO('removeOwner', {...payload}, activeDAO)
        const tx = await Moralis.executeFunction(options);
        await tx.wait();
        await ownersFun();
        setLoading(false)

      }catch(error){
        setLoading(false)
        console.log("========delete owner handelDeletOwner============", error)
      }
    }

    const handelCancel = () => {
        setNewOwner(false)
        setForm(init)
    }

    const handelGoBack = () => {
        setForm(init)
        goBack()
    }

    return(
        <>
        <div> <ArrowBackIosIcon className={css.delete} onClick = {handelGoBack} /> </div>
        <div className={css.add_new_safe}>
            <div className={css.add_new_safe_container} onClick={() => setNewOwner(true)}>Add New Owner</div>
        </div>
        <div style={{paddingBottom:'10px'}}>
            Safe Address: {activeDAO}
        </div>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data && data.map((row) => (
            <TableRow
              key={row && row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.address}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              {data && data.length > 1 && <TableCell align="right"><DeleteIcon className={css.delete} 
              onClick = {() => handelDeletOwner(row.address) } /></TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {newOwner &&  <div className={css.show_form}>
        <TextField variant = "outlined" label = "limit" name={'limit'} 
        value={form.limit} style = {{width: '20%'}} onChange={handelChange} disabled = {loading ? true : false} />

        <TextField variant = "outlined" name={'name'} 
            label = "name" value={form.name} style = {{width: '20%'}} onChange={handelChange} 
            disabled = {loading ? true : false} />

            <TextField variant = "outlined" name={'address'} 
            label = "address" value={form.address} style = {{width: '20%'}} onChange={handelChange}
            disabled = {loading ? true : false} />

            <Button variant="contained" className={css.submit_btn} onClick={handelSubmit}>Submit</Button>

            <Button variant="outlined" className={css.cancel_btn} onClick={handelCancel}>Cancel</Button>
    </div>}
        </>
    )
}

export default ShowOwnersData

