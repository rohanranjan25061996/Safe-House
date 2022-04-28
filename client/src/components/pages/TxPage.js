import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Avatar, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from "../../styles/TxPage.module.css";
import { AuthContext } from "../../contextAPI/Auth";
import InsertEmoticonSharpIcon from '@mui/icons-material/InsertEmoticonSharp';
import {useMoralis} from "react-moralis"
import { getMoralisOptionSubDAO } from '../../utils/helper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const init = {
  to: '',
  amount: '',
  type: ''
}

const oneEth = Math.pow(10, 18);


export default function Transaction() {

  const { isAuth, allSubDao, activeDAO, open, setOpen, setCreateSafeShow, balance, loading, setLoading } = useContext(AuthContext)
  const [form, setForm] = React.useState(init)
  const {Moralis} = useMoralis();

  const handleChange = (event) => {
    const {name, value} = event.target;
    console.log(name, value)
    setForm({...form, [name]: value})
  };

  const handleOpen = () => {
    console.log("send transfer clicked");
    setOpen(true);
    // setAlert({status: true, msg: "Something went wrong"})
  };

  const handleClose = () => {
    setOpen(false);
    setForm(init)
  };

  const handleSubmit = async () => {
    // address payable _to, uint _value
    try{
      if(form.amount !== '' && form.to !== '' && form.type){
        if(+balance > +form.amount){
          setLoading(true)
          let payload = {
            _to: form.to,
            _value: +form.amount * oneEth
          }
          const option = getMoralisOptionSubDAO('submitTransaction', {...payload}, activeDAO)
          const tx = await Moralis.executeFunction(option)
          await tx.wait()
          setLoading(false)
          setOpen(false)
          console.log("====paylaod =>", payload)
        }else{
          setLoading(false)
          alert('insufficient fund')
        }
      }
    }catch(error){
      setLoading(false)
      console.log("=====error Transaction handleSubmit=======", error)
    }
  }

  return (
    <>
      <Button variant="contained" style={{ background: '#008c73', width: "200px", margin: "10px" }} 
      onClick={isAuth && activeDAO!=='' ? () => handleOpen() : () => setCreateSafeShow(true) }>{isAuth && activeDAO !== '' ? 'Send Funds' : 'Create Safe'}</Button>
     <div style={{marginTop: '5%'}}>
     <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
        
          <p id="child-modal-description">
          Sending from
          </p>
          <div variant='p' style={{color:"black",display:"flex"}} >
            <Avatar alt="Remy Sharp" src="/metamas.png" />
            <Stack  style={{marginLeft:"20px"}}>
            <Typography ><InsertEmoticonSharpIcon /></Typography>

            <Typography  align="center">rin:{activeDAO}</Typography>
            </Stack>
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Recipient</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={form.to}
          name='to'
          onChange={handleChange}
          disabled = {loading ? true : false}
        >
          <MenuItem value="">
            <em></em>
          </MenuItem>
          {allSubDao && allSubDao.map((item) => <MenuItem value = {item}><InsertEmoticonSharpIcon />{item}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={form.type}
          onChange={handleChange}
          displayEmpty
          name='type'
          inputProps={{ 'aria-label': 'Without label' }}
          disabled = {loading ? true : false}
        >
          <MenuItem value="">
            <em>Select an asset*</em>
          </MenuItem>
          <MenuItem value={'ETH'}>Ether</MenuItem>
        
        </Select>
        <TextField id="outlined-basic" label="Amount(wei)" variant="outlined" name="amount"
        value={form.amount} disabled = {loading ? true : false} onChange={handleChange} style = {{paddingTop: '10px'}}/>
      </FormControl>
    </div>
    <Divider/>  
        <div>
        <Button variant="text"  style={{ color: '#008c73',width:"200px",margin:"10px" }} disabled = {loading ? true:  false} onClick={handleClose}>Cancel</Button>
        <Button variant="contained"  style={{ background: '#008c73',width:"200px",margin:"10px" }} onClick={loading ? null : handleSubmit}>{loading ? 'loding...' : 'Submit'}</Button>
        </div>
        </Box>
      </Modal>
     </div>
    </ >
  );
}

