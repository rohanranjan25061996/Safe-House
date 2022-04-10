import React from 'react';
import { AuthContext } from '../../contextAPI/Auth';
import { useMoralis } from "react-moralis";
// import styles from "./../styles/MainPage.module.css";

import { concatStringAddress, getMoralisOptionMainDAO, getProviderMainDAOWallet, getProviderSubDAOWallet } from "../../utils/helper";
const CreateSafe = () => {
    const { balance, setBalance, isAuth, setUserAddress, handelAuth, userAddress, allSubDao, setAllSubDao, activeDAO, setActiveDAO } = React.useContext(AuthContext);

    const { isAuthenticated, isWeb3Enabled, authenticate, enableWeb3, logout } = useMoralis();

    const [loading, setLoading] = React.useState(false)
    // const { balance, setBalance, userAddress, allSubDao, setAllSubDao, activeDAO } = React.useContext(AuthContext)
    const { Moralis } = useMoralis();
    
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

    return (
        <div>
            <h1>CreateSafe</h1>
        </div>
    )
}

export { CreateSafe }