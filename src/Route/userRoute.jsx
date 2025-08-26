import React, { useEffect, useState } from "react";
import Api from "../Api_path/api";
import { Outlet, useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
export default function UserRoute(){
    if(JSON.parse(localStorage.getItem("Localuser")).isAdmin){
        return <Navigate to={"/"} replace></Navigate>
    }
    else{
        return <Outlet></Outlet>
    }

}