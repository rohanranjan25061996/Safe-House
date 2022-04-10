import React from "react"

export const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {

    const [isAuth, setAuth] = React.useState(false)
    const [userAddress, setUserAddress] = React.useState("")
    const [allSubDao, setAllSubDao] = React.useState([])
    const [activeDAO, setActiveDAO] = React.useState('')

    React.useEffect(() => {
        if(allSubDao.length === 1){
            setActiveDAO(allSubDao[0])
        }
    }, [allSubDao])

    const handelAuth = () =>{

        setAuth((prev) => !prev)
    }

    const value = {isAuth, handelAuth, userAddress, setUserAddress, allSubDao, setAllSubDao, activeDAO, setActiveDAO}

    return(
        <AuthContext.Provider value = {value}> {children} </AuthContext.Provider>
    )
}