import React, { useState, useContext } from 'react';
import styles from "../styles/ConfirmAlert.module.css";
import {AuthContext} from "../contextAPI/Auth";
import Button from '@mui/material/Button';

const ConfirmAlert = () => {

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

      <Button variant="contained" style={{ background: '#008c73', width: "200px", margin: "10px" }} onClick={() => handleOpen()}>Confirm</Button>

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
    </ >
  );
}



export { ConfirmAlert };