import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
import Api from "../../../Api_path/api";

 const wishContext=createContext()
export default function WishC({children}){
    let { User } = Api();
    const [WishL,setWishL]=useState([])
    useEffect(() => {
        async function fee() {
          let Wish= await axios.get(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}`)
          setWishL(Wish.data.wishlist);
        }
        fee();
      }, []); 
    return(
        <wishContext.Provider value={{WishL,setWishL}}>
            {children}
        </wishContext.Provider>
    )
}
export {wishContext}