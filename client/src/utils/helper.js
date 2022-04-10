import {ethers} from "ethers";
import {MainDAOABI} from "../abi/MainDAO"
import {SubDAOABI} from "../abi/SubDAO"

export const getProvider = () => {
    const provider = new ethers.providers.JsonRpcBatchProvider(process.env.REACT_APP_RINKEBY_NEWTORK_URL);
    return provider
}

export const getSigner = () => {
    const provider = getProvider();
    const signer = provider.getSigner(process.env.REACT_APP_MY_ADDRESS);
    return signer
}

export const getProviderMainDAOWallet = () => {
    const provider = getProvider();
    const wallet = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, MainDAOABI, provider );
    return wallet
}

export const getSignerMainDAOWallet = async () => {
    const signer = getSigner();
    const wallet = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, MainDAOABI , signer );
    return wallet
}

export const getProviderSubDAOWallet = (contractAddress) => {
    const provider = getProvider();
    const wallet = new ethers.Contract(contractAddress, SubDAOABI, provider );
    return wallet
}

export const getMoralisOptionMainDAO = (functionName, params) => {
    if(functionName && params){
        let option = {
            contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
            abi: MainDAOABI,
            functionName: `${functionName}`,
            params: {...params}
        }
        return option
    }else{
        return null
    }
}

export const getMoralisOptionSubDAO = (functionName, params, contractAddress) => {
    if(functionName && params){
        let option = {
            contractAddress: contractAddress,
            abi: SubDAOABI,
            functionName: `${functionName}`,
            params: {...params}
        }
        return option
    }else{
        return null
    }
}

export const concatStringAddress = (para) => {
    let adr = para.split("")
    let start = adr.slice(0, 4).join("")
    let end = adr.slice(-4).join("")
    let string = `${start}...${end}`
    return string;
}