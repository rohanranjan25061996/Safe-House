import React, {useState} from "react"

export const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {

    const [isAuth, setAuth] = React.useState(false)
    const [userAddress, setUserAddress] = React.useState("")
    const [allSubDao, setAllSubDao] = React.useState([])
    const [activeDAO, setActiveDAO] = React.useState('')
    const [balance, setBalance] = useState();
    const [alert, setAlert] = useState({});
    const [showOwner, setShowOwner] = useState(false)
    const [showTx, setShowTx] = React.useState(false)
    const [open, setOpen] = useState(false);
    const [createSafeShow, setCreateSafeShow] = useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if(allSubDao.length === 1){
            setActiveDAO(allSubDao[0])

        }
        if(allSubDao.length > 1){
            setActiveDAO(allSubDao[0])
        }
    }, [allSubDao])

    const handelAuth = () =>{

        setAuth((prev) => !prev)
    }

    const value = {balance, setBalance, isAuth, handelAuth, userAddress, 
        setUserAddress, allSubDao, setAllSubDao, activeDAO, 
        setActiveDAO, alert, setAlert, showOwner, setShowOwner, showTx, setShowTx, open, setOpen,
        createSafeShow, setCreateSafeShow, loading, setLoading}

    return(
        <AuthContext.Provider value = {value}> {children} </AuthContext.Provider>
    )
}