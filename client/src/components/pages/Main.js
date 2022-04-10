import React, {useEffect} from "react";
import {useMoralis} from "react-moralis"
import { getMoralisOptionMainDAO, getProviderMainDAOWallet, getProviderSubDAOWallet } from "../../utils/helper";
import {AuthContext} from "../../contextAPI/Auth";
import CreateNewSafe from "./CreateSafe";


const Main = () => {

    const [loading, setLoading] = React.useState(false)
    const {balance, setBalance, userAddress, allSubDao, setAllSubDao, activeDAO}  = React.useContext(AuthContext)
    const {Moralis} = useMoralis();

    React.useEffect(() => {
        getAllDAO()
    }, [])

    React.useEffect(() => {
        allOwnersOfSubDAO()
    }, [activeDAO])

    useEffect(() => { 
        if(activeDAO !== ""){
            getSubDAOBalance()
        }
    }, [activeDAO])

    const getAllDAO = async () => {
        try{
            let payLoad = {
                _walletAddress: userAddress
            }
            const option = getMoralisOptionMainDAO('getData', payLoad)
            const allData = await Moralis.executeFunction(option)
            console.log("all data =====", allData)
            if(allData){
                const {subDAO} = allData
                console.log("=====sub DAO=====", subDAO)
                setAllSubDao(subDAO)
            }
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
            // const bal = await Moralis.executeFunction(getMoralisOptionMainDAO('getBalaceOfContract'))
            const provider = getProviderSubDAOWallet(activeDAO)
            const bal = await provider.getBalaceOfContract()

            let tempBal = bal.toNumber() * 1000000000000000000
            setBalance(tempBal)
            // console.log("=====sub DAO balance=====", tempBal)
        }catch(error){
            setLoading(false)
        }
    }

    const allOwnersOfSubDAO = async () => {
        try{
            const provider = getProviderSubDAOWallet(activeDAO)
            const tx = await provider.getAllOwnersList()
            console.log("=======allOwnersOfSubDAO data=====", tx)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ allOwnersOfSubDAO parse ok ========", parseOk)
            // const {error: txError} = parseOk
            // const {message} = txError
            // alert(`Error: ${message}`)
        }
    }

    const addBrandNewSafe = async (data) => {
        console.log("========addBrandNewSafe data======", data)
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
    }

    const addNewSafe = async (data) => {
        try{
            if(data){
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

    
    return(
        <>
        <CreateNewSafe addNewSafe = {addNewSafe} addBrandNewSafe = {addBrandNewSafe} />
        </>
    )
}

export default Main