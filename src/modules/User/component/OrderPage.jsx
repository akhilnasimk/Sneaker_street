import React, { useContext, useEffect } from "react";
import {OrderContext} from "../context/BuyContext";
import axios from "axios";
import Api from "../../../Api_path/api";
import logo from "../../../assets/slogo.png"
import { Link, useNavigate } from "react-router-dom";
import SecondNav from "../navbar/navbar";
function Orders() {
  const {User,Product}=Api();
  const { OldOrder,setOldOrder } = useContext(OrderContext);
  const navig=useNavigate()
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("Localuser")).isLogedin==false){
      navig("/products")
    }
    console.log(OldOrder);
  }, [OldOrder]);

  if (!OldOrder || OldOrder.length === 0) {
    return <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
      <SecondNav></SecondNav>
        <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>
    <div className="bg-black/60 border border-gray-700 rounded-2xl px-8 py-12 text-center shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 mx-auto mb-4 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h18M3 3v18h18V3M8 9h8m-8 4h5"
        />
      </svg>
      <h2 className="text-xl font-semibold mb-2">Nothing is here yet</h2>
      <p className="text-gray-500 text-sm">You haven’t placed any orders.</p>
    </div>
  </div>;
  }
  async function handleCancel(cid,or){
    console.log(or);
    // or.product.forEach(async (val)=>{
    //   let oldP=await axios.patch(Product+`/${val.id}`);
    //   let patched=await axios.patch(Product+`/${val.id}`,{count:oldP.data.count+val.quantity})
    //   // console.log(patched.data)
    // })
    console.log(OldOrder);
    setOldOrder((prev)=>prev.map(val=>val.id==cid?{...or,status:"cancelled"}:val));
    let olduser=await axios.get(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}`)
    
    let cancel=await axios.patch(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}`,{
       orders: olduser.data.orders.map(val=>val.id==cid?{...val,status:"cancelled"}:val)
    })
    or.product.forEach(async (val)=>{
      let oldP=await axios.patch(Product+`/${val.id}`);
      let patched=await axios.patch(Product+`/${val.id}`,{count:oldP.data.count+val.quantity})
      // console.log(patched.data)
    })
    // console.log(cancel);
  } 
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-12 lg:px-24 py-10 flex justify-center">
        <SecondNav></SecondNav>
      <div className="w-full max-w-4xl mt-36">
        <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

        <div className="space-y-10">
          {OldOrder.map((order, index) => (
            <div key={index} className="bg-black/70 border border-gray-700 rounded-2xl p-8 shadow-lg flex flex-col gap-6">
              
              {/* Order Header */}
              <div className="flex justify-between items-center text-sm text-gray-400">
                <div>
                  <p><span className="font-semibold">Order Date:</span> {order.orderdate}</p>
                  <p><span className="font-semibold">Delivery Date:</span> {order.deliverDate || "Pending"}</p>
                </div>
                <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border
                  ${
                    order.status.toLowerCase() === "pending"
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                    : order.status.toLowerCase() === "processing"
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                    : order.status.toLowerCase() === "delivered"
                      ? "bg-green-500/20 text-green-400 border-green-500/40"
                    : order.status.toLowerCase() === "cancelled"
                      ? "bg-red-500/20 text-red-400 border-red-500/40"
                    : "bg-gray-500/20 text-gray-400 border-gray-500/40"
                  }`}
              >
                {order.status}
              </span>
              </div>

              {/* Product List */}
              <div className="grid gap-5">
                {order.product && order.product.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-6 bg-gray-900/60 rounded-xl p-5">
                    <img src={p.images} alt={p.name} className="w-24 h-24 object-contain rounded-lg border border-gray-700" />
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg">{p.name}</h2>
                      <p className="text-gray-400 text-sm line-clamp-2">{p.description || "No description available"}</p>
                      <p className="mt-1 text-sm">Qty: {p.quantity || 1}</p>
                    </div>
                    <div className="text-right font-bold text-lg">₹{p.price*p.quantity}</div>
                  </div>
                ))}
              </div>

              {order.status !== "delivered" && (
                <div className="flex justify-end">
                  {order.status!=="cancelled"?<button onClick={() => handleCancel(order.id,order)} className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition text-sm font-medium shadow" >Cancel</button>:
                  <button className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-sm font-medium shadow" >Cancelled</button>}
                  
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
