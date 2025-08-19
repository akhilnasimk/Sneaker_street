import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import user from "../context/contextU";
import axios from "axios";
import Api from "../../../Api_path/api";
import OrderContext from "../context/BuyContext";
import { toast } from "react-toastify";
function Buy(){
    let navig=useNavigate()
    let {OldOrder,setOldOrder}=useContext(OrderContext);
    let [total,setTotal]=useState(0);
    let a=useLocation()
    let {User}=Api();
    let [userdata,setUserdata]=useState([])
    let [order,setOrder]=useState(()=>{
    return(
    {
        id: Date.now(),
        name:"",
        email:"",
        address:"",
        product:a.state,
        Pyment:"",
        orderdate:"",
        deliverDate : "",
        status:"Processing",
        } )
    })
    useEffect(()=>{
        console.log(a.state)
        async function fetchh(){
            // console.log(a.state)
            let totalc=a.state.reduce((ac,val)=>ac+=val.price*val.quantity,0)
            // console.log(total)
            setTotal(totalc);
            let userD= await axios.get(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}`)
            // console.log(a.state)
            // console.log(userD)
            setOrder(prev=>({...prev,name:userD.data.name,email:userD.data.email}))
            setUserdata(userD.data)
        }
        function setdates(){
            //date thing is totally by chatgpt but i found way to impliment it 
            const orderDate = new Date().toISOString().split("T")[0]; // today's date
            const randomDays = Math.floor(Math.random() * 10) + 1;
            let delivery = new Date(orderDate);
            delivery.setDate(delivery.getDate() + randomDays);
            const deliverDate = delivery.toISOString().split("T")[0];
            setOrder((prev)=>({...prev,orderdate:orderDate,deliverDate:deliverDate}))
        }
        setdates();
        fetchh();
        
    },[])
    useEffect(()=>{
        console.log(OldOrder)
    },[OldOrder])
    async function addOrder(ord){
        // console.log(order)
        setOldOrder((prev)=>[...prev,order])
        let userD= await axios.get(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}`)
        let set = await axios.patch(User+`/${JSON.parse(localStorage.getItem("Localuser")).userId}`,{orders:[...userD.data.orders,order]});
        console.log(set)
        toast.success("Order have been placed ")
        navig('/Orders')
        // console.log(OldOrder.data)
    }
    return(
        <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-gray-900/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-violet-600 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-extrabold text-violet-400 mb-6 tracking-wide">
            Checkout
          </h1>

          <form className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                onChange={(e)=>setOrder(prev=>({...prev,name:e.target.value}))}
                defaultValue={userdata.name}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg bg-black border border-violet-500 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
              onChange={(e)=>setOrder(prev=>({...prev,email:e.target.value}))}
              defaultValue={userdata.email}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-black border border-violet-500 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Address</label>
              <textarea
                onChange={(e)=>setOrder(prev=>({...prev,address:e.target.value}))}
                placeholder="Enter your address"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-black border border-violet-500 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm mb-2">Payment Method</label>
              <select
                onChange={(e)=>setOrder(prev=>({...prev,Pyment:e.target.value}))}
                className="w-full px-4 py-3 rounded-lg bg-black border border-violet-500 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
                required
              >
                <option value="">Select</option>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>
            <button
              onClick={(e)=>{
                e.preventDefault()
                addOrder(a.state)}}
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 transition font-semibold text-lg shadow-lg shadow-violet-700/50"
            >
              Place Order
            </button>
          </form>
        </div>
        <div className="bg-black/60 border border-violet-500 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-violet-300 mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {a.state.map((item, index) => (
              <div key={index} className="flex justify-between border-b border-gray-700 pb-2">
                <p>{item.name} (x{item.quantity})</p>
                <p className="text-violet-400">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span className="text-green-400">FREE</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold text-violet-400 border-t border-gray-700 pt-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}
export default Buy