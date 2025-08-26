import React from "react";
import { Navigate, Outlet } from "react-router-dom";
export default function AdminRoute(){
    if(JSON.parse(localStorage.getItem("Localuser")).isAdmin){
        return <Outlet/>
    }
    else{
        return <Navigate to={"/products"} replace></Navigate>
    }
}