import classes from "./classes.module.scss"
import React, { ReactNode } from "react";

const Container: React.FC<{ children: ReactNode }> = ({ children }) => {

    return(
        <div className={classes.container}>
            {children}
        </div>
    )
}

export default Container;
