import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {AuthContext} from "../../contextAPI/Auth"
import css from "../styles/AddNewDAO.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

const CreateNewSafe = (props) => {

    const {userAddress, setLoading}  = React.useContext(AuthContext)
    const [form, setForm] = React.useState(init)
    const {addNewSafeData} = props

    React.useEffect(() => {
        const {owners} = form
        let ok = owners.map((item) => Object.assign({}, {...item, address: userAddress}))
        setForm({...form, owners: ok})
    }, [])

    const addOwnersForm = () => {
        const {owners} = form
        let ok = [...owners, temp]
        setForm({...form, owners: ok})
    }

    const handelDelete = (index) => {
        const {owners} = form
        const newOwners = owners.filter((_, i) => i !== index)
        setForm({...form, owners: newOwners})
    }

    const handelChange = (e) => {
        const {name, value} = e.target;
        if(name.includes('owners')){
            let temp = name.split('.');
            let rightNowI = Number(temp[1]);
            let rightNowN = temp[2];
            const {owners}  = form
            let ok = owners.map((item, i) => {
                if(i === rightNowI){
                    if ('name' == rightNowN) {
                        return Object.assign({}, { ...item, name: value });
                    } else if ('address' == rightNowN) {
                        return Object.assign({}, { ...item, address: value });
                    }
                }else{
                    return item
                }
            })
            setForm({...form, owners: ok})
        }else{
            setForm({...form, [name]: value})
        }
    }

    const handelSubmit = async () => {
       if(form.limit !== '' && form.safeName){
           const {owners} = form
           let flag = false
           owners.forEach((item) => {
               if(item.name === ''){
                flag = true
               }
           })

           if(!flag){
                setLoading(true)
             await addNewSafeData(form)
             setLoading(false)
             setForm(init)
           }
       }
    }

    return(
        <>
        <div className={css.main}>
        <div className={css.container}>
            <Box component="form">

                <div className={css.text_1}>
                    <TextField id="outlined-basic" label="Safe Name" variant="outlined" name="safeName" 
                    value={form.safeName} style = {{width: '45%'}} onChange={handelChange} />

                    <TextField id="outlined-basic" label="Limit" variant="outlined" name = "limit" 
                    value={form.limit} style = {{width: '45%'}} onChange={handelChange} />
                </div>
                <div className={css.text_2}>
                    {form.owners.map((item, index) =>  <div className={css.text_sub_1}>
                    <TextField  id="outlined-basic" label="Owner Name" variant="outlined" 
                    name={`owners.${index}.name`} value = {item.name} style = {{width: '45%'}} onChange={handelChange} />

                    <TextField  id="outlined-basic" label="Owner Address" variant="outlined" 
                    name={`owners.${index}.address`} style = {{width: '45%'}} onChange={handelChange} />
                   {index !== 0 ?  <div> <DeleteIcon className={css.delete} onClick = {() => handelDelete(index)} /> </div> : <div></div>}
                    </div>)}
                </div>
            </Box>
            <div className={css.add_owners} onClick={addOwnersForm}>Add Owners</div>
            <div className={css.button}>
                <Button variant="outlined" className={css.button_1}>CANCEL</Button>
                <Button variant="contained" className={css.button_2} onClick={handelSubmit}>SUBMIT</Button>
            </div>
        </div>
        </div>
        </>
    )
}

export default CreateNewSafe