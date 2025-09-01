import React, { useEffect, useState } from "react";
import Api from "../Api_path/api";
import { Outlet, useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export default function UserRoute(){
    if(JSON.parse(localStorage.getItem("Localuser")).isAdmin){
        toast.error("LOGIN AS A USER TOO SEE THE USER PAGES");
        return <Navigate to={"/"} replace></Navigate>
    }
    else{
        return <Outlet></Outlet>
    }

}