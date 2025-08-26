import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
import Api from "../../../Api_path/api";

const OrderContext=createContext()
export default function  Order({children}){
    let {User} =Api();
    const [OldOrder,setOldOrder]=useState([])
    useEffect(()=>{
        async function set(){
            let Order= await axios.get(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}`)
            setOldOrder(Order.data.orders);
        }
       set();
    },[])
    return(
        <OrderContext.Provider value={{OldOrder,setOldOrder}}>
            {children}
        </OrderContext.Provider>
    )
} 

export {OrderContext}

