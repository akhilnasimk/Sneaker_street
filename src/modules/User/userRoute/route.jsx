import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lpage from "../../Landing/LPage";
import ProductP from "../component/user_view";
function Routee() {
    <Routes>
      <Route path="/" element={<Lpage></Lpage>}></Route>
      <Route path="/products" element={<ProductP></ProductP>}></Route>
    </Routes>
}

export default Routee