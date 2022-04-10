import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contextAPI/Auth';
import { useMoralis } from "react-moralis";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { concatStringAddress, getMoralisOptionMainDAO, getProviderMainDAOWallet, getProviderSubDAOWallet } from "../../utils/helper";
import styles from "../../styles/CreateSafe.module.css";

const init = {
    safeName: '',
    owners: [
        {
            name: '',
            address: ''
        }
    ],
    limit: ''
}

const temp = {
    name: '',
    address: ''
}


const CreateSafe = () => {
    const { Moralis } = useMoralis();

    const { isAuthenticated, isWeb3Enabled, authenticate, enableWeb3, logout } = useMoralis();
    const { balance, setBalance, isAuth, setUserAddress, handelAuth, userAddress, allSubDao, setAllSubDao, activeDAO, setActiveDAO } = useContext(AuthContext);

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState(init)


    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const getAllDAO = async () => {
        try {
            let payLoad = {
                _walletAddress: userAddress
            }
            const option = getMoralisOptionMainDAO('getData', payLoad)
            const allData = await Moralis.executeFunction(option)
            console.log("all data =====", allData)
            if (allData) {
                const { subDAO } = allData
                console.log("=====sub DAO=====", subDAO)
                setAllSubDao(subDAO)
            }
        } catch (error) {
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ getAllDAO parse ok ========", parseOk)
            // const {error: txError} = parseOk
            // const {message} = txError
            // alert(`Error: ${message}`)
        }
    }

    const addBrandNewSafe = async (data) => {
        console.log("========addBrandNewSafe data======", data)
        const { limit, safeName, owners } = data;
        let name = []
        let addr = []
        for (let i = 0; i < owners.length; i++) {
            const { name: n, address } = owners[i]
            name.push(n);
            addr.push(address)
        }

        const payLoad = {
            _owners: addr,
            _ownerName: name,
            _limit: limit,
            _safeName: safeName,
            _walletAddress: userAddress
        }
        const option = getMoralisOptionMainDAO('createNewSubDAO', { ...payLoad })
        const tx = await Moralis.executeFunction(option)
        await tx.wait();
        await getAllDAO();
    }

    const addNewSafe = async (data) => {
        try {
            if (data) {
                console.log("========addNewSafe data======", data)
                const { limit, safeName, owners } = data;
                let name = []
                let addr = []
                for (let i = 0; i < owners.length; i++) {
                    const { name: n, address } = owners[i]
                    name.push(n);
                    addr.push(address)
                }

                const payLoad = {
                    _owners: addr,
                    _ownerName: name,
                    _limit: limit,
                    _safeName: safeName,
                    _walletAddress: userAddress
                }
                const option = getMoralisOptionMainDAO('createSubDAO', { ...payLoad })
                const tx = await Moralis.executeFunction(option)
                await tx.wait();
                await getAllDAO();
            }
        } catch (error) {
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ addSafe parse ok ========", parseOk)
            // const {error: txError} = parseOk
            // const {message} = txError
            // alert(`Error: ${message}`)
        }
    }

    useEffect(() => {
        const { owners } = form
        let ok = owners.map((item) => Object.assign({}, { ...item, address: userAddress }))
        setForm({ ...form, owners: ok })
    }, [])

    const addOwnersForm = () => {
        const { owners } = form
        let ok = [...owners, temp]
        setForm({ ...form, owners: ok })
    }

    const handelDelete = (index) => {
        const { owners } = form
        const newOwners = owners.filter((_, i) => i !== index)
        setForm({ ...form, owners: newOwners })
    }

    const handelChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('owners')) {
            let temp = name.split('.');
            let rightNowI = Number(temp[1]);
            let rightNowN = temp[2];
            const { owners } = form
            let ok = owners.map((item, i) => {
                if (i === rightNowI) {
                    if ('name' == rightNowN) {
                        return Object.assign({}, { ...item, name: value });
                    } else if ('address' == rightNowN) {
                        return Object.assign({}, { ...item, address: value });
                    }
                } else {
                    return item
                }
            })
            setForm({ ...form, owners: ok })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const handelSubmit = () => {
        console.log("form data is => ", form)
        addNewSafe(form)
        // addBrandNewSafe(form)
    }



    const steps = [
        {
            label: 'Create Name',
            content:
                <div>
                    <Typography className={styles.stepperText}>You are about to create a new Gnosis Safe wallet with one or more owners. First, let's give your new wallet a name.</Typography>
                    <TextField
                        id="outlined-basic"
                        label="Safe Name"
                        variant="outlined"
                        placeholder='my-safe'
                        name="safeName"
                        value={form.safeName}
                        onChange={handelChange}
                        className={styles.stepperTextField}
                    />
                </div>
        },
        {
            label: 'Owners and Confirmations',
            content:
                <div>
                    <Typography className={styles.stepperText}>Your Safe will have one or more owners. We have prefilled the first owner with your connected wallet details, but you are free to change this to a different owner.</Typography>
                    <Box />
                    <Typography className={styles.stepperText}>Add additional owners (e.g. wallets of your teammates) and specify how many of them have to confirm a transaction before it gets executed. In general, the more confirmations required, the more secure your Safe is.</Typography>

                        {form.owners.map((item, index) => <div className={styles.ownerRowWrapper}>
                            <TextField
                                label="Owner Name"
                                variant="outlined"
                                placeholder='owner-name'
                                name={`owners.${index}.name`}
                                value={item.name}
                                onChange={handelChange}
                                className={styles.stepperTextField}
                            />
                            <Box className={styles.space}/>
                            <TextField
                                label="Owner Address"
                                variant="outlined"
                                placeholder='owner-address'
                                name={`owners.${index}.address`}
                                value={item.address}
                                onChange={handelChange}
                                className={styles.stepperTextField}
                            />
                            <Box className={styles.space}/>
                            {index !== 0 &&
                                <IconButton onClick={() => handelDelete(index)}><DeleteIcon /></IconButton>
                            }
                        </div>)}
                    <div>
                        <Typography className={styles.stepperTextAdd} onClick={addOwnersForm}>+ Add another owner</Typography>
                    </div>
                    <div>
                        <Typography className={styles.stepperText}>How many owners have to confirm a transaction before it gets executed?</Typography>
                        <TextField
                            label="Limit"
                            variant="outlined"
                            placeholder='1'
                            name="limit"
                            value={form.limit}
                            onChange={handelChange}
                            className={styles.stepperTextField}
                        />
                    </div>
                </div>
        },
        {
            label: 'Create an Safe',
            content:
                <div>
                    <Typography>You're about to create a new Safe on Rinkeby and will have to confirm a transaction with your currently connected wallet. </Typography>
                </div>
        },
    ];


    return (

        <>
            <Box sx={{ maxWidth: 650 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === 2 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Paper elevation={3} className={styles.stepperCard}>
                                    <Box className={styles.cardDivider}>
                                        {step.content}
                                    </Box>
                                    <Divider />
                                    <Box sx={{ mb: 2 }} className={styles.cardDivider}>
                                        <div>
                                            {
                                                index === steps.length - 1 ?
                                                    <Button
                                                        variant="contained"
                                                        onClick={handelSubmit}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Submit
                                                    </Button>
                                                    :
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleNext}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Continue
                                                    </Button>
                                            }
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </Paper>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </>
    )
}

export { CreateSafe }