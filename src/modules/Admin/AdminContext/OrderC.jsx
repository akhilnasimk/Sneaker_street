import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Api from "../../../Api_path/api";
export let OrderContext=createContext();
export default function OrderC({children}){
    let [Order,setOrder]=useState([])
    let [Sales,setSales]=useState(0)
    let {User}=Api();
    useEffect(()=>{
        async function order() {
          let res=await axios.get(User);
          let orders=res.data.flatMap(val=>val.isAdmin?[]:val.orders);
          let sales = 0;
          orders.forEach(order =>
                order.product.forEach(value => sales += value.price * value.quantity)
            );
          setSales(sales);
          console.log(sales);
          setOrder(orders);
          console.log(orders)
        }
        order();
      },[])
    return(
        <OrderContext.Provider value={{Order,setOrder,Sales}}>
            {children}
        </OrderContext.Provider>
    )
}
