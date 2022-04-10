import React, { useEffect } from "react";
import styles from "../styles/Alert.module.css";
// import { IoAlertCircleOutline } from 'react-icons/io5';
import {AuthContext} from "../contextAPI/Auth";

const Alert = () => {
  
    const handleAlert = () => {
        let alertObj = {status: false, msg: ""};
        setAlert(alertObj);
    }

    const {alert, setAlert}  = React.useContext(AuthContext)


    return (
        <div className={styles.wrapper}>
            <div className={styles.overlay}/>
            <div className={styles.alertModal}>
                {/* <IoAlertCircleOutline className={styles.alertIcon}/> */}
                <div className={styles.contentModal}><p>{alert.msg}</p></div>
                <button className={styles.alertButton} onClick={handleAlert}>Ok</button>
            </div>
        </div>
    );
};

export { Alert };
