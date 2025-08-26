import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
import Api from "../../../Api_path/api";
let userContext=createContext()
export default function UserP({children}){
    let {User}=Api();
    const [userData, setUserData] = useState({});
    useEffect(()=>{
        async function Setuer() {
            let data = await axios.get(User);
            setUserData(data.data);
        }
        Setuer();
    })
    return(
        <userContext.Provider value={userData}>
            {children}
        </userContext.Provider>
    )
}
export {userContext}