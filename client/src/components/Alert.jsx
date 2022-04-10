import React, { useEffect } from "react";
import styles from "../styles/Alert.module.css";
import {AuthContext} from "../contextAPI/Auth";
import ErrorIcon from '@mui/icons-material/Error';

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
                <ErrorIcon className={styles.alertIcon}/>
                <div className={styles.contentModal}><p>{alert.msg}</p></div>
                <button className={styles.alertButton} onClick={handleAlert}>Ok</button>
            </div>
        </div>
    );
};

export { Alert };
