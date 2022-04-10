import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Avatar } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from "../../styles/TxPage.module.css";
import { AuthContext } from "../../contextAPI/Auth";

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function Transaction() {

  const { alert, setAlert } = useContext(AuthContext)

  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log("send transfer clicked");
    setOpen(true);
    setAlert({status: true, msg: "Something went wrong"})
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit =  () => {
    console.log("address: ", address);
    console.log("amount: ", amount);
  }

  return (
    <>

      <Button variant="contained" style={{ background: '#008c73', width: "200px", margin: "10px" }} onClick={() => handleOpen()}>Send Funds</Button>

      {
        open &&
        <div className={styles.wrapper}>
          <div className={styles.overlay} onClick={handleClose} />
          <div className={styles.modalDiv}>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className={styles.modalInput} placeholder='Receiver Address' />
            <input value={amount} onChange={(e) => setAmount(e.target.value)} className={styles.modalInput} placeholder="Amount" />
            <button className={styles.modalSubmit} onClick={handleSubmit}>SEND</button>
          </div>
        </div>
      }
      {/* <Modal
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
            <Typography >shrayank-rinkeby</Typography>

            <Typography  align="center">rin:0xE2500bD167545cE91253B24a84968D3a96C924d7</Typography>
            </Stack>
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Recipient</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em></em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Select an asset*</em>
          </MenuItem>
          <MenuItem value={10}>Ether</MenuItem>
        
        </Select>
       
      </FormControl>
    </div>
    <Divider/>  
        <div>
        <Button variant="text"  style={{ color: '#008c73',width:"200px",margin:"10px" }} onClick={handleClose}>Cancel</Button>
        <Button variant="contained"  style={{ background: '#008c73',width:"200px",margin:"10px" }} onClick={handleOpen}>Review</Button>
        </div>
        </Box>
      </Modal> */}
    </ >
  );
}

