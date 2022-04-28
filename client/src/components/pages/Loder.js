import React from "react";
import css from "../styles/Loader.module.css"

const Loader = () => {


    return(
        <>
        <div className={css.main}>
            <div className={css.container}> processing with request, please wait..... </div>
        </div>
        </>
    )
}

export default Loader