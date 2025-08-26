import { createContext, useEffect, useState } from "react";
import Api from "../../../Api_path/api";
import axios from "axios";

const UserContext=createContext()

export default function UserC({children}){
    let {User} = Api();
    let [user, setUser] = useState([]);
    useEffect(() => {
        async function sett() {
            let res = await axios.get(User);
            console.log(res.data);
            let updated = res.data.filter(val => val.id != JSON.parse(localStorage.getItem("Localuser")).userId)
            console.log(updated);
            setUser(updated);
        }
        sett();
    }, [])

    return <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>;
}

export {UserContext}
