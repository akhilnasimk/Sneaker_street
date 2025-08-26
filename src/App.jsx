import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Lpage = lazy(() => import("./modules/Landing/LPage"));
const ProductP = lazy(() => import("./modules/User/component/user_view"));
const UserLogin = lazy(() => import("./modules/User/component/login"));
const Register = lazy(() => import("./modules/User/component/register"));
const Forgot = lazy(() => import("./modules/User/component/forgot"));
const Cart = lazy(() => import("./modules/User/component/cart"));
const ProductDetails = lazy(() => import("./modules/User/component/Pdetails"));
const WishList = lazy(() => import("./modules/User/component/wish"));
const Buy = lazy(() => import("./modules/User/component/Buynow"));
const Orders = lazy(() => import("./modules/User/component/OrderPage"));
const AdminDash = lazy(() => import("./modules/Admin/components/AdminDash"));
const AddProduct = lazy(() => import("./modules/Admin/components/AddProduct/AddProduct"));
const AllProducts = lazy(() => import("./modules/Admin/components/allproducts/AllProducts"));

import CartC from "./modules/User/context/cartContext";
import WishC from "./modules/User/context/wishContext";
import Order from "./modules/User/context/BuyContext";
import UserRoute from "./Route/userRoute";
import AdminRoute from "./Route/AdminRoute";
import SideBarOutlet from "./Outlets/sidebar";
import ProductC from "./modules/Admin/AdminContext/ProductC";
import OrderC from "./modules/Admin/AdminContext/OrderC";
import OrderPage from "./modules/Admin/components/Orders/OrderPage";
import MangeUser from "./modules/Admin/components/UserManage/ManageUser";
import UserC from "./modules/Admin/AdminContext/UserC";

function App() {
  return (
    <>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Lpage />} />
          <Route path="/Userlogin" element={<UserLogin />} />
          <Route path="/UserRegister" element={<Register />} />
          <Route path="/forgot_pass" element={<Forgot />} />
          <Route element={<UserRoute />}>
            <Route path="/products" element={<Order><WishC><CartC><ProductP /></CartC></WishC></Order>} />
            <Route path="/Cart" element={<CartC><Cart /></CartC>} />
            <Route path="/Pdetails/:id" element={<CartC><ProductDetails /></CartC>} />
            <Route path="/WishList" element={<WishC><WishList /></WishC>} />
            <Route path="/Buynow" element={<Order><Buy /></Order>} />
            <Route path="/Orders" element={<Order><Orders /></Order>} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route element={<SideBarOutlet />}>
              <Route path="/AdminDash" element={<UserC><OrderC><ProductC><AdminDash /></ProductC></OrderC></UserC>} />
              <Route path="/AddProduct" element={<AddProduct />} />
              <Route path="/AllProducts" element={<ProductC><AllProducts/></ProductC>}/>
              <Route path="/AllOrders" element={<OrderC><OrderPage/></OrderC>}/>
              <Route path="/MangeUser" element={<UserC><MangeUser/></UserC>}></Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
}

export default App;
