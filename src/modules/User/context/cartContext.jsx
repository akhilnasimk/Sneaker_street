import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
import Api from "../../../Api_path/api";

const CartContext=createContext()
export default  function CartC({children}){
    let {User} =Api();
    const [cartS,setCartS]=useState([]);
    useEffect(()=>{
        async function carting(){
            let CarC = await axios.get(User + `/${JSON.parse(localStorage.getItem("Localuser")).userId}/?cart`);
            setCartS(CarC?CarC.data.cart:[]);
        }
        carting();
    },[])
    return(
        <CartContext.Provider value={{cartS,setCartS}}> 
            {children}
        </CartContext.Provider>
    )
}
export {CartContext}