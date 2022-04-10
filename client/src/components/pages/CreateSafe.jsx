import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contextAPI/Auth';
import { useMoralis } from "react-moralis";
// import styles from "./../styles/MainPage.module.css";

import { concatStringAddress, getMoralisOptionMainDAO, getProviderMainDAOWallet, getProviderSubDAOWallet } from "../../utils/helper";

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

    return (
        <div>
            <div>
                <input placeholder="safe Name" name="safeName" value={form.safeName} onChange={handelChange} />
                <input placeholder="limit" name="limit" value={form.limit} onChange={handelChange} />
                {form.owners.map((item, index) => <div>
                    <input name={`owners.${index}.name`} value={item.name} onChange={handelChange} />
                    <input name={`owners.${index}.address`} value={item.address} onChange={handelChange} />
                    {index !== 0 && <button onClick={() => handelDelete(index)}>delete</button>}
                </div>)}
                <div>
                    <button onClick={addOwnersForm}>add owners</button>
                    <button onClick={handelSubmit}>submit</button>
                </div>
            </div>
        </div>
    )
}

export { CreateSafe }