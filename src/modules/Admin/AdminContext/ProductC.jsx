import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Api from "../../../Api_path/api";
const ProductContext=createContext();

export default function ProductC({children}){
    let {Product}=Api();
    let [Products,setProducts]=useState([])
    useEffect(()=>{
        async function set() {
            let res=await axios.get(Product)
            setProducts(res.data);
            // console.log(res.data);
        }
        set();
    },[])
    return (
        <ProductContext.Provider value={{Products,setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}
export {ProductContext};