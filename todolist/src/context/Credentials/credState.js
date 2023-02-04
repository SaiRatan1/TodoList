import React from "react";
import CredContext from "./credContext";
import { useState } from "react";
const CredState = (props) =>{
    const [user,setUser] = useState('')
    
    return(
        <CredContext.Provider value={{user,setUser}}>
            {props.children}
        </CredContext.Provider>
    )

}

export default CredState;