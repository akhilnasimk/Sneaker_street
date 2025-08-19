import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import {ToastContainer,toast} from "react-toastify" 
import 'react-toastify/dist/ReactToastify.css'
import Lpage from "./modules/Landing/LPage";
import { Route, Routes } from "react-router-dom";
import ProductP from "./modules/User/component/user_view";
import UserLogin from "./modules/User/component/login";
import Register from "./modules/User/component/register";
import axios from "axios";
import Api from "./Api_path/api";
import user from "./modules/User/context/contextU";
import CartContext from "./modules/User/context/cartContext";
import Forgot from "./modules/User/component/forgot";
import Cart from "./modules/User/component/cart";
import ProductDetails from "./modules/User/component/Pdetails";
import WishList from "./modules/User/component/wish";
import wishContext from "./modules/User/context/wishContext";
import Buy from "./modules/User/component/Buynow";
import OrderContext from "./modules/User/context/BuyContext";
import Orders from "./modules/User/component/OrderPage";
function App() {
  let { User } = Api();
  const [cartS,setCartS]=useState([]);
  const [userData, setUserData] = useState({});
  const [WishL,setWishL]=useState([])
  const [OldOrder,setOldOrder]=useState([])
  useEffect(() => {
    async function fee() {
      let data = await axios.get(User);
      setUserData(data.data);
      let CarC=await axios.get(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}/?cart`)
      setCartS(CarC.data.cart)
      let Wish= await axios.get(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}`)
      setWishL(Wish.data.wishlist);
      setOldOrder(Wish.data.orders);
    }
    fee();
  }, []); 

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <user.Provider value={userData}>
        <Routes>
          <Route path="/" element={<Lpage />}></Route>
          <Route path="/products" element={<OrderContext.Provider value={{OldOrder,setOldOrder}}><wishContext.Provider value={{WishL,setWishL}}><CartContext.Provider value={{cartS,setCartS}}><ProductP /></CartContext.Provider></wishContext.Provider></OrderContext.Provider>}></Route>
          <Route path="/Userlogin" element={<UserLogin></UserLogin>}></Route>
          <Route path="/UserRegister" element={<Register></Register>}></Route>
          <Route path="/forgot_pass" element={<Forgot></Forgot>}></Route>
          <Route path="/Cart" element={<CartContext.Provider value={{cartS,setCartS}}><Cart></Cart></CartContext.Provider>}></Route>
          <Route path="/Pdetails" element={<CartContext.Provider value={{cartS,setCartS}}><ProductDetails></ProductDetails></CartContext.Provider>}></Route>
          <Route path="/WishList" element={<wishContext.Provider value={{WishL,setWishL}}><WishList></WishList></wishContext.Provider>}></Route>
          <Route path="/Buynow" element={<OrderContext.Provider value={{OldOrder,setOldOrder}}><Buy></Buy></OrderContext.Provider>}></Route>
          <Route path="/Orders" element={<OrderContext.Provider value={{OldOrder,setOldOrder}}><Orders></Orders></OrderContext.Provider>}></Route>
        </Routes>
      </user.Provider>
      <ToastContainer
        position="top-right" // top-right, top-left, bottom-right, bottom-left
        autoClose={3000} // auto close after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // light, dark, colored
      />
    </>
  );
}

export default App;
{/* </CartContext.Provider> */}