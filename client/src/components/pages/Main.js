import React, {useEffect, useState} from "react";
import {useMoralis} from "react-moralis"
import { getMoralisOptionMainDAO, getProviderMainDAOWallet, getProviderSubDAOWallet, refineOwnerName, refineTxDeatils } from "../../utils/helper";
import {AuthContext} from "../../contextAPI/Auth";
import CreateNewSafe from "./CreateSafe";
import AddNewDAO from "./AddNewDAO";
import ShowData from "./Show";
import {Routes, Route} from "react-router-dom"
import ShowOwnersData from "./ShowOwners";
import ShowAllTxData from "./AllTx";
import Loader from "./Loder";


const Main = () => {

    const [allFlag, setAllFalg] = useState({
        createSafe: false,
        addNewSafe: false,
        ShowTxDeatils: false,
        showOwners: false,
        current: false
    })

    const [activeOwners, setActiveOwners] = useState([])
    const [activeTxDetails, setActiveTxDeatils] = useState([])
    const {balance, setBalance, userAddress, allSubDao, setAllSubDao, 
        activeDAO, showOwner, showTx, setShowOwner, setShowTx, createSafeShow,
        loading, setLoading}  = React.useContext(AuthContext)
    const {Moralis} = useMoralis();

    React.useEffect(() => {
        getAllDAO()
    }, [])

    useEffect(() => { 
        if(activeDAO !== ""){
            allOwnersOfSubDAO()
            getSubDAOBalance()
            getAllTxData()
            setAllFalg({
                createSafe: false,
                addNewSafe: false,
                ShowTxDeatils: false,
                showOwners: false,
                current: true,
            })
        }
    }, [activeDAO])

    useEffect(() => {
        if(showOwner){
            setAllFalg({
                createSafe: false,
                addNewSafe: false,
                ShowTxDeatils: false,
                current: false,
                showOwners: true,

            })
        }
    }, [showOwner])

    useEffect(() => {
        if(showTx){
            setAllFalg({
                createSafe: false,
                addNewSafe: false,
                current: false,
                showOwners: false,
                ShowTxDeatils: true,

            })
        }
    }, [showTx])

    useEffect(() => {
        if(createSafeShow){
            setAllFalg({
                addNewSafe: false,
                current: false,
                showOwners: false,
                ShowTxDeatils: false,
                createSafe: true,

            })
        }
    }, [createSafeShow])

    const getAllDAO = async () => {
        try{
            setLoading(true)
            let payLoad = {
                _walletAddress: userAddress
            }
            const option = getMoralisOptionMainDAO('getData', payLoad)
            console.log("option=======", option)
            const allData = await Moralis.executeFunction(option)
            console.log("all data =====", allData)
            if(allData){
                const {subDAO} = allData
                console.log("=====sub DAO=====", subDAO)
                setAllSubDao(subDAO)
            }
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ getAllDAO parse ok ========", parseOk)
            // const {error: txError} = parseOk
            // const {message} = txError
            // alert(`Error: ${message}`)
        }
    }

    const getSubDAOBalance = async () => {
        try{
            setLoading(true)
            // const bal = await Moralis.executeFunction(getMoralisOptionMainDAO('getBalaceOfContract'))
            const provider = getProviderSubDAOWallet(activeDAO)
            const bal = await provider.getBalaceOfContract()

            let tempBal = bal.toNumber() / 1000000000000000000
            setBalance(tempBal)
            // console.log("=====sub DAO balance=====", tempBal)
            setLoading(false)
        }catch(error){
            setLoading(false)
        }
    }

    const getAllTxData = async () => {
        //getTransactionDetails
        try{
            setLoading(true)
            const provider = getProviderSubDAOWallet(activeDAO)
            const tx = await provider.getTransactionDetails()
            if(tx){
                const dd = refineTxDeatils(tx)
                if(dd){
                    setActiveTxDeatils(dd)
                }
            }
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ getAllTxData parse ok ========", parseOk, error)
            // const {error: txError} = parseOk
            // const {message} = txError
            // alert(`Error: ${message}`)
        }
    }

    const allOwnersOfSubDAO = async () => {
        try{
            setLoading(true)
            console.log("======actibve do====", activeDAO)
            const provider = getProviderSubDAOWallet(activeDAO)
            const tx = await provider.getAllOwnersList()
            if(tx){
                const dd = refineOwnerName(tx)
                if(dd){
                    setActiveOwners(dd)
                }
            }
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ allOwnersOfSubDAO parse ok ========", parseOk, error)
            // const {error: txError} = parseOk
            // const {message} = txError
            // alert(`Error: ${message}`)
        }
    }

    const addBrandNewSafe = async (data) => {

        try{
            setLoading(true)
            const {limit, safeName, owners} = data;
                let name = []
                let addr = []
                for(let i = 0; i < owners.length; i++){
                    const {name:n, address} = owners[i]
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
                const option = getMoralisOptionMainDAO('createNewSubDAO',{...payLoad})
                const tx = await Moralis.executeFunction(option)
                await tx.wait();
                await getAllDAO();
                goBack()
                setLoading(false)

        }catch(error){
            setLoading(false)
        }
    }

    const addNewSafe = async (data) => {
        try{
            if(data){
                setLoading(true)
                console.log("========addNewSafe data======", data)
                const {limit, safeName, owners} = data;
                let name = []
                let addr = []
                for(let i = 0; i < owners.length; i++){
                    const {name:n, address} = owners[i]
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
                const option = getMoralisOptionMainDAO('createSubDAO',{...payLoad})
                const tx = await Moralis.executeFunction(option)
                await tx.wait();
                await getAllDAO();
                goBack()
                setLoading(false)
            }
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ addSafe parse ok ========", parseOk)
            // const {error: txError} = parseOk
            // const {message} = txError
            // alert(`Error: ${message}`)
        }
    }

    const goBack = () => {
        setShowOwner(false) 
        setShowTx(false)
        setAllFalg({
            createSafe: false,
            addNewSafe: false,
            showOwners: false,
            ShowTxDeatils: false,
            current: true,
        })
    }

    const newSafeHouse = () => {
        setShowOwner(false) 
        setShowTx(false)
        setAllFalg({
            createSafe: false,
            showOwners: false,
            ShowTxDeatils: false,
            current: false,
            addNewSafe: true,
        })
    }

    return(
        <>
        {loading && <Loader />}
        {allFlag.createSafe && <CreateNewSafe addNewSafeData = {addNewSafe} />}
        {allFlag.addNewSafe && <AddNewDAO goBack = {goBack} addBrandNewSafe = {addBrandNewSafe} />}
        {allFlag.current && <ShowData newSafeHouse = {newSafeHouse} />}
        {allFlag.showOwners && <ShowOwnersData data = {activeOwners} goBack = {goBack}
        ownersFun = {allOwnersOfSubDAO} />}
        {allFlag.ShowTxDeatils && <ShowAllTxData data = {activeTxDetails} getAllTxData = {getAllTxData} goBack = {goBack} />}
        </>
    )
}

export default Main