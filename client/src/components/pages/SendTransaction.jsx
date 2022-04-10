import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styles from "../../styles/SendTransaction.module.css";

const SendTransaction = () => {

    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        console.log("receiver: ", receiver);
        console.log("amount: ", amount);
    }

    return (
        <div>
            <Paper elevation={3} className={styles.pepperWrapper}>
                <Typography variant="h4" className={styles.title}>Send Transaction</Typography>
                <Box className={styles.space} />
                <Box className={styles.textFieldDiv}>
                    <TextField className={styles.textFieldItem} label="Recipient" placeholder="receiver" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
                    <Box className={styles.space} />
                    <TextField className={styles.textFieldItem} label="Amount" placeholder="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <Box className={styles.space} />
                    <Button className={styles.sendButton} variant="contained" color="primary" onClick={() => handleSubmit()}>Send</Button>
                </Box>
            </Paper>
        </div>
    )
}

export { SendTransaction }